"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Eye, Trash2, Check, Download, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

/* =======================
   TYPES
======================= */
type Row = {
  no: number;
  usulanId?: string;
  esl: string;
  jabatan: string;
  namaPktGolNrpNip: string;
  kondisi: string;

  // ✅ NEW: sesuai Buat Bahan Rapat
  jabatanUsulan: string;

  catatan: string;

  // ✅ dipakai untuk "KETERANGAN" di list (gabungan rows[].ket)
  ket: string;
};

type BahanRapat = {
  id: string;
  tanggal: string; // yyyy-mm-dd
  materiRapat: string;
  rows: Row[];
  status: "draft" | "dirapatkan" | "diajukan";
  createdAt: string;
  updatedAt?: string;
};

const STORAGE_KEY_BAHAN_RAPAT = "bnn_bahan_rapat_v1";

/* =======================
   A4 LANDSCAPE SETTINGS
======================= */
const PAGE_W_MM = 297;
const PAGE_H_MM = 210;
const PADDING_MM = 10;

const MM_TO_PX = 96 / 25.4;

/* =======================
   LIST PAGINATION SETTINGS
======================= */
const LIST_PAGE_SIZE = 10;

/* =======================
   STORAGE
======================= */
function loadBahanRapat(): BahanRapat[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BAHAN_RAPAT);
    const data = raw ? (JSON.parse(raw) as any[]) : [];
    if (!Array.isArray(data)) return [];

    // ✅ migrasi:
    // - status lama "final" -> "diajukan"
    // - row lama "calonPengisiJabatan" -> "jabatanUsulan"
    return data.map((x) => {
      const s = x?.status;
      const nextStatus: BahanRapat["status"] =
        s === "final"
          ? "diajukan"
          : s === "draft" || s === "dirapatkan" || s === "diajukan"
          ? s
          : "draft";

      const rowsRaw = Array.isArray(x?.rows) ? x.rows : [];
      const migratedRows: Row[] = rowsRaw.map((r: any, idx: number) => {
        const jabatanUsulan =
          String(r?.jabatanUsulan ?? "").trim() || String(r?.calonPengisiJabatan ?? "").trim();

        return {
          no: Number(r?.no ?? idx + 1),
          usulanId: r?.usulanId ? String(r.usulanId) : "",
          esl: String(r?.esl ?? ""),
          jabatan: String(r?.jabatan ?? ""),
          namaPktGolNrpNip: String(r?.namaPktGolNrpNip ?? ""),
          kondisi: String(r?.kondisi ?? ""),
          jabatanUsulan,
          catatan: String(r?.catatan ?? ""),
          ket: String(r?.ket ?? ""),
        };
      });

      return {
        id: String(x?.id ?? ""),
        tanggal: String(x?.tanggal ?? ""),
        materiRapat: String(x?.materiRapat ?? ""),
        rows: migratedRows,
        status: nextStatus,
        createdAt: String(x?.createdAt ?? ""),
        updatedAt: x?.updatedAt ? String(x.updatedAt) : undefined,
      } as BahanRapat;
    });
  } catch {
    return [];
  }
}

function saveBahanRapat(list: BahanRapat[]) {
  localStorage.setItem(STORAGE_KEY_BAHAN_RAPAT, JSON.stringify(list));
}

/* =======================
   UTILS
======================= */
function fmtDate(iso: string) {
  if (!iso) return "-";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}
function toUpperClean(s: string) {
  return String(s ?? "").trim().toUpperCase();
}
function buildJudul(materiRapat: string) {
  const m = String(materiRapat ?? "").trim();
  if (!m) return "MATERI RAPAT";
  return `MATERI RAPAT ${toUpperClean(m)}`;
}
function rowKey(r: Row) {
  return `${r.no}|${r.usulanId ?? ""}|${r.esl ?? ""}|${r.jabatan ?? ""}`;
}

type StatusBR = BahanRapat["status"];
function statusLabel(s: StatusBR) {
  if (s === "draft") return "DRAFT";
  if (s === "dirapatkan") return "DIRAPATKAN";
  return "DIAJUKAN";
}
function nextStatus(s: StatusBR): StatusBR | null {
  if (s === "draft") return "dirapatkan";
  if (s === "dirapatkan") return "diajukan";
  return null;
}
function nextActionLabel(s: StatusBR) {
  if (s === "draft") return "Rapatkan";
  if (s === "dirapatkan") return "Ajukan";
  return "";
}
function statusBadgeClass(s: StatusBR) {
  if (s === "draft") return "bg-zinc-100 text-zinc-700 border-zinc-300";
  if (s === "dirapatkan") return "bg-amber-50 text-amber-700 border-amber-300";
  return "bg-emerald-50 text-emerald-700 border-emerald-300";
}

/** ✅ Ambil "keterangan" list dari KET per baris
 * - Ambil ket yang terisi
 * - Buang yang duplikat
 * - Gabung jadi 1 teks ringkas
 */
function buildKeteranganFromRows(rows: Row[]) {
  const list = (rows || [])
    .map((r) => String(r.ket ?? "").trim())
    .filter(Boolean);

  if (list.length === 0) return "-";

  const uniq = Array.from(new Set(list));
  return uniq.join(", ");
}

/* =======================
   COLUMN WIDTHS (PERCENT)
   TOTAL = 100%
======================= */
const COLS = {
  no: "3%",
  esl: "5%",
  jabatan: "18%",
  nama: "18%",
  kondisi: "14%",
  jabatanUsulan: "20%", // ✅ ganti dari calon
  catatan: "12%",
  ket: "10%",
};

/* =======================
   PAGE
======================= */
export default function DaftarBahanRapatPage() {
  const searchParams = useSearchParams();

  const [items, setItems] = useState<BahanRapat[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  // pagination untuk PREVIEW A4
  const [pageIndex, setPageIndex] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [pages, setPages] = useState<Row[][]>([]);

  // pagination untuk LIST
  const [listPage, setListPage] = useState(1);

  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);

  const measureWrapRef = useRef<HTMLDivElement | null>(null);
  const measureHeaderRef = useRef<HTMLDivElement | null>(null);
  const measureTheadRef = useRef<HTMLTableSectionElement | null>(null);
  const measureFooterRef = useRef<HTMLDivElement | null>(null);
  const measureRowRefs = useRef<Array<HTMLTableRowElement | null>>([]);

  // ✅ ambil focusUsulan dari URL
  const focusUsulanId = useMemo(() => {
    return searchParams.get("focusUsulan") || "";
  }, [searchParams]);

  useEffect(() => {
    setItems(loadBahanRapat());
  }, []);

  // ✅ auto open modal jika ada open=...
  useEffect(() => {
    const open = searchParams.get("open");
    if (!open) return;
    if (items.length === 0) return;

    const found = items.some((x) => x.id === open);
    if (found) setOpenId(open);
  }, [searchParams, items]);

  /* =======================
     ✅ SORTING (LIST)
  ======================= */
  type SortKey = "materiRapat" | "tanggal";
  type SortDir = "asc" | "desc";

  const [sortKey, setSortKey] = useState<SortKey>("tanggal"); // default: tanggal terbaru
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function getNamaRapat(doc: BahanRapat) {
    return toUpperClean(doc.materiRapat || "");
  }
  function getTanggal(doc: BahanRapat) {
    return String(doc.tanggal || "");
  }

  function toggleSort(key: SortKey) {
    setListPage(1);
    setSortKey((prevKey) => {
      if (prevKey === key) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        return prevKey;
      }
      setSortDir(key === "tanggal" ? "desc" : "asc");
      return key;
    });
  }

  function sortIcon(key: SortKey) {
    if (sortKey !== key) return "↕";
    return sortDir === "asc" ? "▲" : "▼";
  }

  const sorted = useMemo(() => {
    const arr = [...items];

    arr.sort((a, b) => {
      if (sortKey === "materiRapat") {
        const va = getNamaRapat(a);
        const vb = getNamaRapat(b);
        const cmp = va.localeCompare(vb, "id", { sensitivity: "base" });
        return sortDir === "asc" ? cmp : -cmp;
      }

      // sortKey === "tanggal"
      const va = getTanggal(a);
      const vb = getTanggal(b);
      const cmp = va.localeCompare(vb); // ISO yyyy-mm-dd
      return sortDir === "asc" ? cmp : -cmp;
    });

    return arr;
  }, [items, sortKey, sortDir]);

  // total halaman list
  const totalListPages = useMemo(() => {
    return Math.max(1, Math.ceil(sorted.length / LIST_PAGE_SIZE));
  }, [sorted.length]);

  // potong data list per halaman
  const pagedSorted = useMemo(() => {
    const start = (listPage - 1) * LIST_PAGE_SIZE;
    return sorted.slice(start, start + LIST_PAGE_SIZE);
  }, [sorted, listPage]);

  // reset list page saat jumlah data berubah
  useEffect(() => {
    setListPage(1);
  }, [items.length]);

  // jaga-jaga kalau listPage lewat batas setelah delete
  useEffect(() => {
    if (listPage > totalListPages) setListPage(totalListPages);
  }, [listPage, totalListPages]);

  const active = useMemo(() => {
    if (!openId) return null;
    return items.find((x) => x.id === openId) ?? null;
  }, [openId, items]);

  useEffect(() => {
    setPageIndex(0);
  }, [openId]);

  function advanceStatus(id: string) {
    const next: BahanRapat[] = items.map((x) => {
      if (x.id !== id) return x;
      const ns = nextStatus(x.status);
      if (!ns) return x;
      return {
        ...x,
        status: ns,
        updatedAt: new Date().toISOString(),
      };
    });
    setItems(next);
    saveBahanRapat(next);
  }

  function onDelete(id: string) {
    const target = items.find((x) => x.id === id);
    if (!target) return;

    if (target.status === "diajukan") {
      alert("Data sudah DIAJUKAN dan tidak dapat dihapus.");
      return;
    }

    const ok = confirm("Yakin mau hapus bahan rapat ini?");
    if (!ok) return;

    const next = items.filter((x) => x.id !== id);
    setItems(next);
    saveBahanRapat(next);
    if (openId === id) setOpenId(null);
  }

  /* =======================
     PAGINATION DINAMIS (A4 PREVIEW)
  ======================= */
  useLayoutEffect(() => {
    if (!active) {
      setPages([]);
      return;
    }

    measureRowRefs.current = [];

    const raf = requestAnimationFrame(() => {
      const wrap = measureWrapRef.current;
      const headerEl = measureHeaderRef.current;
      const theadEl = measureTheadRef.current;
      const footerEl = measureFooterRef.current;

      if (!wrap || !headerEl || !theadEl || !footerEl) {
        setPages([active.rows || []]);
        return;
      }

      const innerHpx = (PAGE_H_MM - PADDING_MM * 2) * MM_TO_PX;

      const headerH = headerEl.offsetHeight;
      const theadH = theadEl.offsetHeight;
      const footerH = footerEl.offsetHeight;

      const srcRows = active.rows || [];

      const heightsByKey = new Map<string, number>();
      srcRows.forEach((r, i) => {
        const h = measureRowRefs.current[i]?.offsetHeight ?? 30;
        heightsByKey.set(rowKey(r), h);
      });

      const basePages: Row[][] = [];
      let cur: Row[] = [];
      let curH = headerH + theadH;

      for (let i = 0; i < srcRows.length; i++) {
        const r = srcRows[i];
        const rh = heightsByKey.get(rowKey(r)) ?? 30;

        if (cur.length === 0) {
          cur.push(r);
          curH = headerH + theadH + rh;
          continue;
        }

        if (curH + rh <= innerHpx) {
          cur.push(r);
          curH += rh;
        } else {
          basePages.push(cur);
          cur = [r];
          curH = headerH + theadH + rh;
        }
      }
      if (cur.length) basePages.push(cur);

      const adjusted: Row[][] = [...basePages];

      const lastContentHeight = (rows: Row[]) => {
        let sum = 0;
        for (const r of rows) sum += heightsByKey.get(rowKey(r)) ?? 30;
        return headerH + theadH + sum;
      };

      while (adjusted.length) {
        const last = adjusted[adjusted.length - 1];
        const h = lastContentHeight(last);

        if (h + footerH <= innerHpx) break;
        if (last.length <= 1) break;

        const moved = last.pop();
        if (!moved) break;

        if (last.length === 0) adjusted.pop();
        adjusted.push([moved]);
      }

      setPages(adjusted.length ? adjusted : [[]]);
      setPageIndex(0);
    });

    return () => cancelAnimationFrame(raf);
  }, [active?.id, active?.rows, active]);

  // ✅ auto lompat ke page yang berisi focusUsulan
  useEffect(() => {
    if (!active) return;
    if (!focusUsulanId) return;
    if (!pages.length) return;

    const targetIndex = pages.findIndex((pg) =>
      (pg || []).some((r) => String(r.usulanId || "") === String(focusUsulanId))
    );

    if (targetIndex >= 0) setPageIndex(targetIndex);
  }, [active?.id, pages, focusUsulanId, active]);

  /* =======================
     EXPORT PDF
  ======================= */
  async function onExportPdf() {
    if (!active) return;

    try {
      setExporting(true);
      await new Promise((r) => setTimeout(r, 120));

      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

      const listPages = pages.length ? pages : [active.rows || []];

      for (let i = 0; i < listPages.length; i++) {
        const el = pageRefs.current[i];
        if (!el) continue;

        const canvas = await html2canvas(el, {
          scale: 2,
          backgroundColor: "#ffffff",
          useCORS: true,
          logging: false,
          scrollX: 0,
          scrollY: 0,
          windowWidth: el.scrollWidth,
          windowHeight: el.scrollHeight,
          onclone: (clonedDoc) => {
            const style = clonedDoc.createElement("style");
            style.innerHTML = `
              html, body { background:#fff !important; }
              .a4l-pdf-page { overflow: hidden !important; }
              .a4l-page, .a4l-page * {
                font-family: Arial, Helvetica, sans-serif !important;
                -webkit-font-smoothing: antialiased !important;
                text-rendering: geometricPrecision !important;
                background-color: #ffffff !important;
                color: #111111 !important;
                border-color: #000000 !important;
                box-shadow: none !important;
                text-shadow: none !important;
                filter: none !important;
                overflow-wrap: anywhere !important;
                word-break: break-word !important;
              }
              .a4l-page thead tr { background: #e5e7eb !important; }
            `;
            clonedDoc.head.appendChild(style);
          },
        });

        const img = canvas.toDataURL("image/png");
        if (i > 0) pdf.addPage("a4", "landscape");
        pdf.addImage(img, "PNG", 0, 0, PAGE_W_MM, PAGE_H_MM, undefined, "FAST");
      }

      const fileName = `BahanRapat_${active.tanggal || "tanggal"}_${active.id}.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error(err);
      alert("Gagal download PDF. Lihat console untuk detail error.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="px-2 py-2">
      {/* =======================
          LIST
      ======================= */}
      <div className="mx-auto w-full max-w-[1100px] rounded-md bg-white shadow-[0_14px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
        <div className="p-10">
          {/* HEADER LIST */}
          <div className="flex items-start justify-between gap-6">
            <div className="w-[190px]" />
            <div className="flex-1 pt-2 text-center">
              <div className="text-sm font-bold tracking-wide text-zinc-900">DAFTAR BAHAN RAPAT</div>
            </div>
            <div className="w-[190px]" />
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full border border-zinc-700 text-[12px] text-zinc-900">
              <thead>
                <tr className="bg-zinc-200/80">
                  <Th className="w-[60px] text-center">NO</Th>

                  {/* ✅ sortable: NAMA RAPAT */}
                  <Th className="w-[360px] text-center">
                    <button
                      type="button"
                      onClick={() => toggleSort("materiRapat")}
                      className="inline-flex w-full items-center justify-center gap-2"
                      title="Sort Nama Rapat"
                    >
                      NAMA RAPAT <span className="text-[11px] text-zinc-600">{sortIcon("materiRapat")}</span>
                    </button>
                  </Th>

                  <Th className="w-[300px] text-center">KETERANGAN</Th>

                  {/* ✅ sortable: TANGGAL */}
                  <Th className="w-[160px] text-center">
                    <button
                      type="button"
                      onClick={() => toggleSort("tanggal")}
                      className="inline-flex w-full items-center justify-center gap-2"
                      title="Sort Tanggal"
                    >
                      TANGGAL <span className="text-[11px] text-zinc-600">{sortIcon("tanggal")}</span>
                    </button>
                  </Th>

                  <Th className="w-[160px] text-center">STATUS</Th>
                  <Th className="w-[120px] text-center">AKSI</Th>
                </tr>
              </thead>

              <tbody>
                {sorted.length === 0 ? (
                  <tr className="border-t border-zinc-700">
                    <Td colSpan={6} className="py-10 text-center text-zinc-500">
                      Belum ada data bahan rapat. Silakan buat dulu di menu “Buat Bahan Rapat”.
                    </Td>
                  </tr>
                ) : (
                  pagedSorted.map((doc, idx) => {
                    const namaRapat = doc.materiRapat?.trim() ? toUpperClean(doc.materiRapat) : "-";
                    const ketRapat = buildKeteranganFromRows(doc.rows || []);
                    const globalNo = (listPage - 1) * LIST_PAGE_SIZE + idx + 1;
                    const ns = nextStatus(doc.status);

                    return (
                      <tr key={doc.id} className="border-t border-zinc-700">
                        <Td className="text-center">{globalNo}.</Td>
                        <Td className="align-top whitespace-pre-wrap font-semibold">{namaRapat}</Td>
                        <Td className="align-top whitespace-pre-wrap text-zinc-800">{ketRapat}</Td>
                        <Td className="text-center">{fmtDate(doc.tanggal)}</Td>

                        <Td className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span
                              className={[
                                "inline-flex items-center rounded-md border px-2 py-1 text-[11px] font-bold",
                                statusBadgeClass(doc.status),
                              ].join(" ")}
                            >
                              {statusLabel(doc.status)}
                            </span>

                            {ns ? (
                              <button
                                type="button"
                                onClick={() => advanceStatus(doc.id)}
                                className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-2 py-1 text-[11px] font-bold text-zinc-800 hover:bg-zinc-50"
                                title={`Ubah status menjadi ${statusLabel(ns)}`}
                              >
                                {nextActionLabel(doc.status)}
                              </button>
                            ) : null}
                          </div>
                        </Td>

                        <Td className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => setOpenId(doc.id)}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#123473]/40 bg-white text-[#123473] shadow-sm hover:bg-[#123473]/5 active:scale-[0.98]"
                              title="Lihat"
                            >
                              <Eye size={18} />
                            </button>

                            <button
                              type="button"
                              onClick={() => onDelete(doc.id)}
                              disabled={doc.status === "diajukan"}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-red-500/40 bg-white text-red-600 shadow-sm hover:bg-red-50 active:scale-[0.98] disabled:opacity-50"
                              title={doc.status === "diajukan" ? "Tidak bisa hapus (sudah diajukan)" : "Hapus"}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </Td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            {/* PAGINATION LIST */}
            {sorted.length > 0 && (
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="text-xs text-zinc-600">
                  Menampilkan <b>{(listPage - 1) * LIST_PAGE_SIZE + 1}</b> –{" "}
                  <b>{Math.min(listPage * LIST_PAGE_SIZE, sorted.length)}</b> dari <b>{sorted.length}</b> data
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setListPage((p) => Math.max(1, p - 1))}
                    disabled={listPage === 1}
                    className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-xs font-semibold text-zinc-700 shadow-sm disabled:opacity-50"
                  >
                    <ChevronLeft size={16} /> Prev
                  </button>

                  <div className="text-xs text-zinc-700">
                    Halaman <b>{listPage}</b> / {totalListPages}
                  </div>

                  <button
                    type="button"
                    onClick={() => setListPage((p) => Math.min(totalListPages, p + 1))}
                    disabled={listPage === totalListPages}
                    className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-xs font-semibold text-zinc-700 shadow-sm disabled:opacity-50"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 text-[10px] text-zinc-700">
            <div>Biro SDM Aparatur dan Organisasi</div>
            <div>Sekretariat Utama BNN 2026</div>
          </div>
        </div>
      </div>

      {/* =======================
          MODAL PREVIEW
      ======================= */}
      {active && (
        <div className="fixed inset-0 z-[9999] bg-black/40 p-4">
          <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black/10">
            {/* toolbar */}
            <div className="flex items-center justify-between gap-3 border-b px-5 py-4">
              <div>
                <div className="text-sm font-bold text-zinc-900">Preview A4 Landscape</div>
                <div className="mt-1 text-xs text-zinc-600">
                  Nama Rapat:{" "}
                  <b className="text-zinc-900">{active.materiRapat?.trim() ? toUpperClean(active.materiRapat) : "-"}</b>{" "}
                  • Tanggal: <b className="text-zinc-900">{fmtDate(active.tanggal)}</b> • Status:{" "}
                  <b
                    className={
                      active.status === "diajukan"
                        ? "text-emerald-700"
                        : active.status === "dirapatkan"
                        ? "text-amber-700"
                        : "text-zinc-900"
                    }
                  >
                    {statusLabel(active.status)}
                  </b>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {(() => {
                  const ns = nextStatus(active.status);
                  if (!ns) return null;
                  return (
                    <button
                      type="button"
                      onClick={() => advanceStatus(active.id)}
                      className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:brightness-110"
                      title={`Ubah status menjadi ${statusLabel(ns)}`}
                    >
                      <Check size={16} />
                      {nextActionLabel(active.status)}
                    </button>
                  );
                })()}

                <button
                  type="button"
                  onClick={onExportPdf}
                  disabled={exporting}
                  className="inline-flex items-center gap-2 rounded-md bg-[#123473] px-3 py-2 text-xs font-semibold text-white hover:brightness-110 disabled:opacity-60"
                >
                  <Download size={16} />
                  {exporting ? "Membuat PDF..." : "Download PDF"}
                </button>

                <button
                  type="button"
                  onClick={() => setOpenId(null)}
                  className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
                >
                  <X size={16} />
                  Tutup
                </button>
              </div>
            </div>

            {/* content */}
            <div className="flex-1 overflow-y-auto bg-zinc-100 p-6">
              <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
                  disabled={pageIndex === 0}
                  className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-xs font-semibold text-zinc-700 shadow-sm disabled:opacity-50"
                >
                  <ChevronLeft size={16} /> Prev
                </button>

                <div className="text-xs text-zinc-700">
                  Halaman <b>{pageIndex + 1}</b> / {pages.length || 1}
                </div>

                <button
                  type="button"
                  onClick={() => setPageIndex((p) => Math.min((pages.length || 1) - 1, p + 1))}
                  disabled={pageIndex >= (pages.length || 1) - 1}
                  className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-xs font-semibold text-zinc-700 shadow-sm disabled:opacity-50"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>

              <div className="mt-4 flex justify-center">
                <A4LandscapePageView
                  doc={active}
                  rows={(pages[pageIndex] || []) as Row[]}
                  pageIndex={pageIndex}
                  totalPages={pages.length || 1}
                  focusUsulanId={focusUsulanId}
                />
              </div>
            </div>

            {/* hidden render untuk export PDF */}
            <div className="pointer-events-none absolute left-[-99999px] top-0 opacity-0">
              {(pages.length ? pages : [active.rows || []]).map((rows, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    pageRefs.current[i] = el;
                  }}
                  className="a4l-pdf-page"
                >
                  <A4LandscapePageInner
                    doc={active}
                    rows={rows}
                    pageIndex={i}
                    totalPages={pages.length || 1}
                    isLastPage={i === (pages.length || 1) - 1}
                    focusUsulanId={focusUsulanId}
                  />
                </div>
              ))}
            </div>

            {/* hidden measurement untuk pagination */}
            <div className="pointer-events-none absolute left-[-99999px] top-0 opacity-0">
              <div ref={measureWrapRef} className="a4l-pdf-page">
                <div className="a4l-page">
                  <div ref={measureHeaderRef}>
                    <HeaderBlock judul={buildJudul(active.materiRapat)} tanggal={active.tanggal} />
                  </div>

                  <div style={{ marginTop: 10 }}>
                    <table className="a4l-table">
                      <colgroup>
                        <col style={{ width: COLS.no }} />
                        <col style={{ width: COLS.esl }} />
                        <col style={{ width: COLS.jabatan }} />
                        <col style={{ width: COLS.nama }} />
                        <col style={{ width: COLS.kondisi }} />
                        <col style={{ width: COLS.jabatanUsulan }} />
                        <col style={{ width: COLS.catatan }} />
                        <col style={{ width: COLS.ket }} />
                      </colgroup>

                      <thead ref={measureTheadRef}>
                        <tr>
                          <ThPDF>NO</ThPDF>
                          <ThPDF>ESL</ThPDF>
                          <ThPDF>JABATAN</ThPDF>
                          <ThPDF>
                            NAMA/PKT/GOL <br /> NRP/NIP
                          </ThPDF>
                          <ThPDF>KONDISI</ThPDF>
                          <ThPDF>JABATAN USULAN</ThPDF>
                          <ThPDF>CATATAN</ThPDF>
                          <ThPDF>KET</ThPDF>
                        </tr>
                      </thead>

                      <tbody>
                        {(active.rows || []).map((r, i) => (
                          <tr
                            key={rowKey(r)}
                            ref={(el) => {
                              measureRowRefs.current[i] = el;
                            }}
                          >
                            <TdPDF center>{i + 1}.</TdPDF>
                            <TdPDF>{r.esl || "-"}</TdPDF>
                            <TdPDF>{r.jabatan || "-"}</TdPDF>
                            <TdPDF>{r.namaPktGolNrpNip || "-"}</TdPDF>
                            <TdPDF>{r.kondisi || "-"}</TdPDF>
                            <TdPDF>{r.jabatanUsulan || "-"}</TdPDF>
                            <TdPDF>{r.catatan || "-"}</TdPDF>
                            <TdPDF>{r.ket || "-"}</TdPDF>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div ref={measureFooterRef} style={{ marginTop: 10 }}>
                    <FooterBlock />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* global style khusus page A4 */}
      <style jsx global>{`
        .a4l-pdf-page {
          width: ${PAGE_W_MM}mm;
          height: ${PAGE_H_MM}mm;
          background: #fff;
          overflow: hidden;
        }
        .a4l-page {
          width: ${PAGE_W_MM}mm;
          height: ${PAGE_H_MM}mm;
          padding: ${PADDING_MM}mm;
          box-sizing: border-box;
          font-family: Arial, Helvetica, sans-serif;
          display: flex;
          flex-direction: column;
        }
        .a4l-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
          font-size: 12px;
          color: #111;
        }
        .a4l-table thead tr {
          background: #e5e7eb;
        }
      `}</style>
    </div>
  );
}

/* =======================
   A4 VIEW WRAPPER
======================= */
function A4LandscapePageView({
  doc,
  rows,
  pageIndex,
  totalPages,
  focusUsulanId,
}: {
  doc: BahanRapat;
  rows: Row[];
  pageIndex: number;
  totalPages: number;
  focusUsulanId?: string;
}) {
  return (
    <div className="rounded-md border border-zinc-200 bg-white shadow-sm">
      <div style={{ width: `${PAGE_W_MM}mm`, height: `${PAGE_H_MM}mm` }}>
        <A4LandscapePageInner
          doc={doc}
          rows={rows}
          pageIndex={pageIndex}
          totalPages={totalPages}
          isLastPage={pageIndex === totalPages - 1}
          focusUsulanId={focusUsulanId}
        />
      </div>
    </div>
  );
}

/* =======================
   PAGE CONTENT
======================= */
function A4LandscapePageInner({
  doc,
  rows,
  pageIndex,
  totalPages,
  isLastPage,
  focusUsulanId,
}: {
  doc: BahanRapat;
  rows: Row[];
  pageIndex: number;
  totalPages: number;
  isLastPage: boolean;
  focusUsulanId?: string;
}) {
  const judul = buildJudul(doc.materiRapat);

  const idxByKey = useMemo(() => {
    const m = new Map<string, number>();
    (doc.rows || []).forEach((r, i) => m.set(rowKey(r), i + 1));
    return m;
  }, [doc.rows]);

  return (
    <div className="a4l-page">
      <HeaderBlock judul={judul} tanggal={doc.tanggal} />

      <div style={{ marginTop: 10 }}>
        <table className="a4l-table">
          <colgroup>
            <col style={{ width: COLS.no }} />
            <col style={{ width: COLS.esl }} />
            <col style={{ width: COLS.jabatan }} />
            <col style={{ width: COLS.nama }} />
            <col style={{ width: COLS.kondisi }} />
            <col style={{ width: COLS.jabatanUsulan }} />
            <col style={{ width: COLS.catatan }} />
            <col style={{ width: COLS.ket }} />
          </colgroup>

          <thead>
            <tr>
              <ThPDF>NO</ThPDF>
              <ThPDF>ESL</ThPDF>
              <ThPDF>JABATAN</ThPDF>
              <ThPDF>
                NAMA/PKT/GOL <br /> NRP/NIP
              </ThPDF>
              <ThPDF>KONDISI</ThPDF>
              <ThPDF>JABATAN USULAN</ThPDF>
              <ThPDF>CATATAN</ThPDF>
              <ThPDF>KET</ThPDF>
            </tr>
          </thead>

          <tbody>
            {rows.length ? (
              rows.map((r) => {
                const isFocus = focusUsulanId && String(r.usulanId || "") === String(focusUsulanId);

                return (
                  <tr
                    key={rowKey(r)}
                    style={
                      isFocus
                        ? { outline: "3px solid #f59e0b", outlineOffset: "-2px", background: "#fff7ed" }
                        : undefined
                    }
                  >
                    <TdPDF center>{idxByKey.get(rowKey(r)) ?? "-"}</TdPDF>
                    <TdPDF>{r.esl || "-"}</TdPDF>
                    <TdPDF>{r.jabatan || "-"}</TdPDF>
                    <TdPDF>{r.namaPktGolNrpNip || "-"}</TdPDF>
                    <TdPDF>{r.kondisi || "-"}</TdPDF>
                    <TdPDF>{r.jabatanUsulan || "-"}</TdPDF>
                    <TdPDF>{r.catatan || "-"}</TdPDF>
                    <TdPDF>{r.ket || "-"}</TdPDF>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} style={{ border: "1px solid #000", padding: 12, textAlign: "center", color: "#666" }}>
                  Tidak ada baris data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isLastPage ? (
        <div style={{ marginTop: "auto", paddingTop: 10 }}>
          <FooterBlock />
        </div>
      ) : null}

      <div style={{ marginTop: 6, textAlign: "right", fontSize: 11, color: "#666" }}>
        Halaman {pageIndex + 1} / {totalPages}
      </div>
    </div>
  );
}

/* =======================
   HEADER BLOCK
======================= */
function HeaderBlock({ judul, tanggal }: { judul: string; tanggal: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
      <div style={{ minWidth: 220 }} />
      <div style={{ flex: 1, textAlign: "center" }}>
        <div
          style={{
            color: "#111",
            fontSize: 13,
            fontWeight: 800,
            lineHeight: 1.25,
            whiteSpace: "pre-wrap",
            transform: "translateZ(0)",
          }}
        >
          {judul}
        </div>

        <div style={{ marginTop: 4, color: "#111", fontSize: 12, fontWeight: 700, lineHeight: 1.25 }}>
          Tanggal {fmtDate(tanggal)}
        </div>
      </div>
      <div style={{ minWidth: 220 }} />
    </div>
  );
}

/* =======================
   FOOTER BLOCK
======================= */
function FooterBlock() {
  return (
    <div>
      <div style={{ borderTop: "1px solid #555", marginBottom: 10 }} />

      <div style={{ fontSize: 11, color: "#111", marginBottom: 10 }}>
        <i>Biro SDM Aparatur dan Organisasi Sekretariat Utama BNN 2026</i>
      </div>

      <div style={{ paddingTop: 6 }}>
        <div style={{ fontSize: 11, color: "#555" }}>PARAF:</div>
        <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, fontSize: 11 }}>
          <ParafBox title="1. SESTAMA" />
          <ParafBox title="2. DEPUTI PENCEGAHAN" />
          <ParafBox title="3. PLT. IRTAMA" />
          <ParafBox title="4. PLT. IRWASRIKSUS" />
          <ParafBox title="5. PLT. KARO SDMA & ORG" />
        </div>
      </div>
    </div>
  );
}

/* =======================
   PDF TABLE CELLS
======================= */
function ThPDF({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        border: "1px solid #000",
        padding: "6px 6px",
        textAlign: "center",
        fontWeight: 700,
        verticalAlign: "middle",
      }}
    >
      {children}
    </th>
  );
}

function TdPDF({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <td
      style={{
        border: "1px solid #000",
        padding: "6px 6px",
        verticalAlign: "top",
        whiteSpace: "pre-wrap",
        overflowWrap: "anywhere",
        wordBreak: "break-word",
        hyphens: "auto",
        textAlign: center ? "center" : "left",
      }}
    >
      {children}
    </td>
  );
}

function ParafBox({ title }: { title: string }) {
  return (
    <div style={{ border: "1px solid #555", padding: 8, minHeight: 54 }}>
      <div style={{ fontWeight: 700 }}>{title}</div>
      <div style={{ marginTop: 18, borderBottom: "1px solid #555" }} />
    </div>
  );
}

/* =======================
   TABLE COMPONENTS LIST
======================= */
function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={["border border-zinc-700 px-3 py-2 font-bold", className].join(" ")}>{children}</th>;
}

function Td({
  children,
  className = "",
  colSpan,
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
}) {
  return (
    <td colSpan={colSpan} className={["border border-zinc-700 px-2 py-2", className].join(" ")}>
      {children}
    </td>
  );
}