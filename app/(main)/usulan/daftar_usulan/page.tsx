"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Eye,
  X,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";

type JenisPegawai = "PNS" | "POLRI" | "TNI";

type Usulan = {
  id: string;

  esl: string;
  jabatan: string; // jabatan saat ini
  nama: string;

  jenisPegawai: JenisPegawai;
  pangkatGol: string;

  jabatanUsulan: string;
  keterangan: string;

  nrpNip: string;

  createdAt: string;
  updatedAt?: string;
};

type RowBR = {
  no: number;
  usulanId?: string;

  esl: string;
  jabatan: string;
  namaPktGolNrpNip: string;

  kondisi: string;
  calonPengisiJabatan: string;
  catatan: string;
  ket: string;
};

type BahanRapat = {
  id: string;
  tanggal: string; // yyyy-mm-dd
  materiRapat: string;
  rows: RowBR[];
  status: "draft" | "dirapatkan" | "diajukan";
  createdAt: string;
  updatedAt?: string;
};

const STORAGE_KEY = "bnn_usulan_v1";
const STORAGE_KEY_BAHAN_RAPAT = "bnn_bahan_rapat_v1";

const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 300;

function loadUsulan(): Usulan[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? (JSON.parse(raw) as any[]) : [];
    if (!Array.isArray(arr)) return [];

    let changed = false;

    const migrated: Usulan[] = arr.map((x) => {
      const pangkatGol =
        String(x?.pangkatGol ?? "").trim() || String(x?.pktGol ?? "").trim();

      if (x?.pangkatGol == null && x?.pktGol != null) changed = true;
      if (x?.jenisPegawai == null) changed = true;
      if (x?.jabatanUsulan == null) changed = true;
      if (x?.keterangan == null) changed = true;

      const jenisPegawaiRaw = String(x?.jenisPegawai ?? "PNS")
        .toUpperCase()
        .trim();
      const jenisPegawai: JenisPegawai =
        jenisPegawaiRaw === "POLRI"
          ? "POLRI"
          : jenisPegawaiRaw === "TNI"
          ? "TNI"
          : "PNS";

      return {
        id: String(x?.id ?? crypto.randomUUID()),

        esl: String(x?.esl ?? "").trim(),
        jabatan: String(x?.jabatan ?? "").trim(),
        nama: String(x?.nama ?? "").trim(),

        jenisPegawai,
        pangkatGol,

        jabatanUsulan: String(x?.jabatanUsulan ?? "").trim(),
        keterangan: String(x?.keterangan ?? "").trim(),

        nrpNip: String(x?.nrpNip ?? "").trim(),

        createdAt: String(x?.createdAt ?? new Date().toISOString()),
        updatedAt: x?.updatedAt ? String(x.updatedAt) : undefined,
      };
    });

    if (changed) localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  } catch {
    return [];
  }
}

function saveUsulan(next: Usulan[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function loadBahanRapat(): BahanRapat[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BAHAN_RAPAT);
    const data = raw ? (JSON.parse(raw) as any[]) : [];
    if (!Array.isArray(data)) return [];

    return data.map((x) => {
      const s = x?.status;
      const nextStatus: BahanRapat["status"] =
        s === "final"
          ? "diajukan"
          : s === "draft" || s === "dirapatkan" || s === "diajukan"
          ? s
          : "draft";
      return { ...x, status: nextStatus } as BahanRapat;
    }) as BahanRapat[];
  } catch {
    return [];
  }
}

function normalize(s: unknown) {
  return String(s ?? "").toLowerCase().trim();
}

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(t);
  }, [value, delayMs]);

  return debounced;
}

function getPaginationRange(
  current: number,
  total: number,
  siblingCount = 1
): Array<number | "..."> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const firstPage = 1;
  const lastPage = total;

  const leftSibling = Math.max(current - siblingCount, firstPage);
  const rightSibling = Math.min(current + siblingCount, lastPage);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < total - 1;

  if (!showLeftDots && showRightDots) {
    const leftRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => i + 1
    );
    return [...leftRange, "...", lastPage];
  }

  if (showLeftDots && !showRightDots) {
    const start = total - (3 + 2 * siblingCount) + 1;
    const rightRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => start + i
    );
    return [firstPage, "...", ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i
  );
  return [firstPage, "...", ...middleRange, "...", lastPage];
}

function fmtDate(iso: string) {
  if (!iso) return "-";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

function toUpperClean(s: string) {
  return String(s ?? "").trim().toUpperCase();
}

type SortDir = "asc" | "desc";
type SortKey =
  | "esl"
  | "jabatan"
  | "nama"
  | "jenisPegawai"
  | "pangkatGol"
  | "jabatanUsulan"
  | "keterangan"
  | "nrpNip"
  | "createdAt";

// ✅ DEFAULT SORT (buat reset balik ke awal)
const DEFAULT_SORT_KEY: SortKey = "createdAt";
const DEFAULT_SORT_DIR: SortDir = "desc";

export default function DaftarUsulanPage() {
  const router = useRouter();

  const [rows, setRows] = useState<Usulan[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<Usulan>>({});
  const [page, setPage] = useState(1);

  const [queryInput, setQueryInput] = useState("");
  const queryDebounced = useDebouncedValue(queryInput, SEARCH_DEBOUNCE_MS);

  // ✅ SORT (pakai default)
  const [sortKey, setSortKey] = useState<SortKey>(DEFAULT_SORT_KEY);
  const [sortDir, setSortDir] = useState<SortDir>(DEFAULT_SORT_DIR);

  const [bahanRapat, setBahanRapat] = useState<BahanRapat[]>([]);
  const [relOpenForUsulanId, setRelOpenForUsulanId] = useState<string | null>(
    null
  );

  useEffect(() => {
    setRows(loadUsulan());
    setBahanRapat(loadBahanRapat());
  }, []);

  useEffect(() => {
    const onFocus = () => setBahanRapat(loadBahanRapat());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const data = useMemo(() => rows, [rows]);

  // ✅ 3-step sort: ASC -> DESC -> RESET (default)
  function toggleSort(key: SortKey) {
    setPage(1);

    // klik kolom baru -> mulai ASC
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
      return;
    }

    // klik kolom sama -> ASC -> DESC -> reset
    if (sortDir === "asc") {
      setSortDir("desc");
      return;
    }

    // sortDir === "desc" -> reset ke default awal
    setSortKey(DEFAULT_SORT_KEY);
    setSortDir(DEFAULT_SORT_DIR);
  }

  function compare(a: Usulan, b: Usulan) {
    const av = a[sortKey] as unknown;
    const bv = b[sortKey] as unknown;

    const as = sortKey === "createdAt" ? String(av ?? "") : normalize(av);
    const bs = sortKey === "createdAt" ? String(bv ?? "") : normalize(bv);

    if (as < bs) return sortDir === "asc" ? -1 : 1;
    if (as > bs) return sortDir === "asc" ? 1 : -1;
    return 0;
  }

  const filteredData = useMemo(() => {
    if (editingId) return data;

    const q = normalize(queryDebounced);

    const base = !q
      ? data
      : data.filter((r) => {
          const hay = [
            r.esl,
            r.jabatan,
            r.nama,
            r.jenisPegawai,
            r.pangkatGol,
            r.jabatanUsulan,
            r.keterangan,
            r.nrpNip,
          ].map(normalize);
          return hay.some((x) => x.includes(q));
        });

    return base.slice().sort(compare);
  }, [data, queryDebounced, editingId, sortKey, sortDir]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  }, [filteredData.length]);

  useEffect(() => {
    setPage(1);
  }, [queryDebounced]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const visibleRows = useMemo(() => {
    if (editingId) return data.filter((r) => r.id === editingId);

    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredData.slice(start, end);
  }, [data, filteredData, editingId, page]);

  const paginationRange = useMemo(() => {
    return getPaginationRange(page, totalPages, 1);
  }, [page, totalPages]);

  const brByUsulanId = useMemo(() => {
    const map = new Map<string, BahanRapat[]>();
    for (const br of bahanRapat) {
      const rows = br.rows ?? [];
      for (const r of rows) {
        if (!r?.usulanId) continue;
        const list = map.get(r.usulanId) ?? [];
        list.push(br);
        map.set(r.usulanId, list);
      }
    }

    for (const [k, list] of map.entries()) {
      map.set(
        k,
        [...list].sort((a, b) =>
          String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? ""))
        )
      );
    }
    return map;
  }, [bahanRapat]);

  const relatedList = useMemo(() => {
    if (!relOpenForUsulanId) return [];
    return brByUsulanId.get(relOpenForUsulanId) ?? [];
  }, [relOpenForUsulanId, brByUsulanId]);

  function onDelete(id: string) {
    const ok = confirm("Yakin mau hapus data ini?");
    if (!ok) return;

    const next = rows.filter((r) => r.id !== id);
    setRows(next);
    saveUsulan(next);

    if (editingId === id) {
      setEditingId(null);
      setDraft({});
    }
  }

  function startEdit(row: Usulan) {
    setEditingId(row.id);
    setDraft({ ...row });
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft({});
  }

  function applyEdit() {
    if (!editingId) return;

    const now = new Date().toISOString();

    const jenisRaw = String(draft.jenisPegawai ?? "PNS").toUpperCase().trim();
    const jenisPegawai: JenisPegawai =
      jenisRaw === "POLRI" ? "POLRI" : jenisRaw === "TNI" ? "TNI" : "PNS";

    const next = rows.map((r) => {
      if (r.id !== editingId) return r;

      return {
        ...r,
        esl: String(draft.esl ?? "").trim(),
        jabatan: String(draft.jabatan ?? "").trim(),
        nama: String(draft.nama ?? "").trim(),

        jenisPegawai,
        pangkatGol: String(draft.pangkatGol ?? "").trim(),

        jabatanUsulan: String(draft.jabatanUsulan ?? "").trim(),
        keterangan: String(draft.keterangan ?? "").trim(),

        nrpNip: String(draft.nrpNip ?? "").trim(),
        updatedAt: now,
      };
    });

    setRows(next);
    saveUsulan(next);
    cancelEdit();
  }

  function openRelated(usulanId: string) {
    setBahanRapat(loadBahanRapat());
    setRelOpenForUsulanId(usulanId);
  }

  function closeRelated() {
    setRelOpenForUsulanId(null);
  }

  function gotoBahanRapat(brId: string, usulanId: string) {
    router.push(
      `/bahan_rapat/daftar?open=${encodeURIComponent(
        brId
      )}&focusUsulan=${encodeURIComponent(usulanId)}`
    );
    closeRelated();
  }

  return (
    <div className="px-2 py-2">
      <div className="mx-auto w-full max-w-[1300px] rounded-md bg-white shadow-[0_14px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
        <div className="p-10">
          {/* Header */}
          <div className="flex items-start justify-between gap-6">
            <div className="text-[11px] font-semibold text-zinc-900">
              <div>BADAN NARKOTIKA NASIONAL</div>
              <div>REPUBLIK INDONESIA</div>
              <div className="mt-2 h-[2px] w-[190px] bg-zinc-700/70" />
            </div>

            <div className="flex-1 pt-2 text-center">
              <div className="text-sm font-bold tracking-wide text-zinc-900">
                DAFTAR USULAN
              </div>
            </div>

            <div className="w-[190px]" />
          </div>

          {editingId && (
            <div className="mt-6 rounded-md border border-[#123473]/20 bg-[#123473]/5 px-4 py-3 text-xs text-[#123473]">
              Sedang mengedit 1 data. Klik <b>Batal</b> untuk kembali melihat
              semua daftar.
            </div>
          )}

          {/* Search */}
          {!editingId && (
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-zinc-600">
                Menampilkan{" "}
                <b className="text-zinc-900">{filteredData.length}</b> data
                {normalize(queryDebounced) ? (
                  <>
                    {" "}
                    untuk kata kunci{" "}
                    <b className="text-[#123473]">"{queryDebounced.trim()}"</b>
                  </>
                ) : null}
              </div>

              <div className="w-full sm:max-w-[420px]">
                <input
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="Search"
                  className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-[#123473] focus:ring-2 focus:ring-[#123473]/20"
                />
              </div>
            </div>
          )}

          {/* Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border border-zinc-700 text-[12px] text-zinc-900">
              <thead>
                <tr className="bg-zinc-200/80">
                  <Th className="w-[60px] text-center">NO</Th>

                  <SortableTh
                    className="w-[80px] text-center"
                    label="ESL"
                    colKey="esl"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={toggleSort}
                  />

                  <SortableTh
                    className="w-[170px] text-center"
                    label="JABATAN"
                    colKey="jabatan"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={toggleSort}
                  />

                  <SortableTh
                    className="w-[220px] text-center"
                    label="NAMA"
                    colKey="nama"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={toggleSort}
                  />

                  <SortableTh
                    className="w-[110px] text-center"
                    label="JENIS"
                    colKey="jenisPegawai"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={toggleSort}
                  />

                  <SortableTh
                    className="w-[160px] text-center"
                    label="PANGKAT/GOL"
                    colKey="pangkatGol"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={toggleSort}
                  />

                  <SortableTh
                    className="w-[200px] text-center"
                    label="JABATAN USULAN"
                    colKey="jabatanUsulan"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={toggleSort}
                  />

                  <SortableTh
                    className="w-[240px] text-center"
                    label="KETERANGAN"
                    colKey="keterangan"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={toggleSort}
                  />

                  <SortableTh
                    className="w-[130px] text-center"
                    label="NRP/NIP"
                    colKey="nrpNip"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={toggleSort}
                  />

                  <Th className="w-[170px] text-center">BAHAN RAPAT</Th>

                  <Th className="w-[160px] text-center">AKSI</Th>
                </tr>
              </thead>

              <tbody>
                {data.length === 0 ? (
                  <tr className="border-t border-zinc-700">
                    <Td colSpan={11} className="py-10 text-center text-zinc-500">
                      Belum ada data. Silakan input usulan dulu.
                    </Td>
                  </tr>
                ) : !editingId && filteredData.length === 0 ? (
                  <tr className="border-t border-zinc-700">
                    <Td colSpan={11} className="py-10 text-center text-zinc-500">
                      Data tidak ditemukan untuk kata kunci{" "}
                      <b>"{queryDebounced.trim()}"</b>.
                    </Td>
                  </tr>
                ) : (
                  visibleRows.map((r, idx) => {
                    const isEdit = editingId === r.id;
                    const listNo = editingId
                      ? data.findIndex((x) => x.id === r.id) + 1
                      : (page - 1) * PAGE_SIZE + idx + 1;

                    const relatedCount = (brByUsulanId.get(r.id) ?? []).length;

                    return (
                      <tr
                        key={r.id}
                        className="border-t border-zinc-700 align-top"
                      >
                        <Td className="text-center">{listNo}.</Td>

                        <Td>
                          {isEdit ? (
                            <CellInput
                              value={String(draft.esl ?? "")}
                              onChange={(v) =>
                                setDraft((p) => ({ ...p, esl: v }))
                              }
                            />
                          ) : (
                            r.esl
                          )}
                        </Td>

                        <Td>
                          {isEdit ? (
                            <CellInput
                              value={String(draft.jabatan ?? "")}
                              onChange={(v) =>
                                setDraft((p) => ({ ...p, jabatan: v }))
                              }
                            />
                          ) : (
                            r.jabatan
                          )}
                        </Td>

                        <Td>
                          {isEdit ? (
                            <CellInput
                              value={String(draft.nama ?? "")}
                              onChange={(v) =>
                                setDraft((p) => ({ ...p, nama: v }))
                              }
                            />
                          ) : (
                            r.nama
                          )}
                        </Td>

                        <Td>
                          {isEdit ? (
                            <CellInput
                              value={String(draft.jenisPegawai ?? "")}
                              onChange={(v) =>
                                setDraft((p) => ({
                                  ...p,
                                  jenisPegawai: v as JenisPegawai,
                                }))
                              }
                            />
                          ) : (
                            r.jenisPegawai
                          )}
                        </Td>

                        <Td>
                          {isEdit ? (
                            <CellInput
                              value={String(draft.pangkatGol ?? "")}
                              onChange={(v) =>
                                setDraft((p) => ({ ...p, pangkatGol: v }))
                              }
                            />
                          ) : (
                            r.pangkatGol
                          )}
                        </Td>

                        <Td>
                          {isEdit ? (
                            <CellInput
                              value={String(draft.jabatanUsulan ?? "")}
                              onChange={(v) =>
                                setDraft((p) => ({ ...p, jabatanUsulan: v }))
                              }
                            />
                          ) : (
                            r.jabatanUsulan
                          )}
                        </Td>

                        <Td>
                          {isEdit ? (
                            <CellInput
                              value={String(draft.keterangan ?? "")}
                              onChange={(v) =>
                                setDraft((p) => ({ ...p, keterangan: v }))
                              }
                            />
                          ) : (
                            <span className="whitespace-pre-wrap">
                              {r.keterangan || "-"}
                            </span>
                          )}
                        </Td>

                        <Td>
                          {isEdit ? (
                            <CellInput
                              value={String(draft.nrpNip ?? "")}
                              onChange={(v) =>
                                setDraft((p) => ({ ...p, nrpNip: v }))
                              }
                            />
                          ) : (
                            r.nrpNip
                          )}
                        </Td>

                        {/* Bahan rapat column */}
                        <Td className="text-center">
                          <div className="flex flex-col items-center gap-2">
                            <div className="text-[11px] text-zinc-700">
                              Dipakai:{" "}
                              <b className="text-zinc-900">{relatedCount}</b>
                            </div>

                            <button
                              type="button"
                              onClick={() => openRelated(r.id)}
                              disabled={relatedCount === 0 || !!editingId}
                              className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-2 text-[11px] font-semibold text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
                              title={
                                relatedCount === 0
                                  ? "Belum ada bahan rapat yang menautkan usulan ini"
                                  : "Lihat bahan rapat terkait"
                              }
                            >
                              <Eye size={14} />
                              Lihat
                            </button>
                          </div>
                        </Td>

                        <Td>
                          <div className="flex items-center justify-center gap-2">
                            {!isEdit ? (
                              <>
                                <button
                                  type="button"
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#123473]/40 bg-white text-[#123473] shadow-sm transition hover:bg-[#123473]/5 active:scale-[0.98]"
                                  title="Edit"
                                  onClick={() => startEdit(r)}
                                  disabled={!!editingId}
                                >
                                  <Pencil size={18} />
                                </button>

                                <button
                                  type="button"
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-red-500/40 bg-white text-red-600 shadow-sm transition hover:bg-red-50 active:scale-[0.98]"
                                  title="Hapus"
                                  onClick={() => onDelete(r.id)}
                                  disabled={!!editingId}
                                >
                                  <Trash2 size={18} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  className="rounded-md bg-[#123473] px-3 py-2 text-xs font-semibold text-white hover:brightness-110"
                                  onClick={applyEdit}
                                >
                                  Simpan
                                </button>
                                <button
                                  type="button"
                                  className="rounded-md border border-zinc-300 px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
                                  onClick={cancelEdit}
                                >
                                  Batal
                                </button>
                              </>
                            )}
                          </div>
                        </Td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!editingId && filteredData.length > 0 && totalPages > 1 && (
            <div className="mt-6 flex flex-col items-center justify-center gap-2 text-xs sm:flex-row">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-700 transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {paginationRange.map((it, idx) =>
                  it === "..." ? (
                    <span key={`dots-${idx}`} className="px-1 text-zinc-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={it}
                      type="button"
                      onClick={() => setPage(it)}
                      className={[
                        "h-9 min-w-9 rounded-md border px-2 font-semibold transition",
                        it === page
                          ? "bg-[#123473] text-white border-[#123473] shadow-sm"
                          : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50",
                      ].join(" ")}
                    >
                      {it}
                    </button>
                  )
                )}
              </div>

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-700 transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}

          <div className="mt-10 text-[10px] text-zinc-700">
            <div>Biro SDM Aparatur dan Organisasi</div>
            <div>Sekretariat Utama BNN 2026</div>
          </div>
        </div>
      </div>

      {/* MODAL: Bahan Rapat Terkait */}
      {relOpenForUsulanId && (
        <div className="fixed inset-0 z-[9999] bg-black/40 p-4">
          <div className="mx-auto w-full max-w-[900px] overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black/10">
            <div className="flex items-start justify-between gap-3 border-b px-5 py-4">
              <div>
                <div className="text-sm font-bold text-zinc-900">
                  Bahan Rapat Terkait
                </div>
                <div className="mt-1 text-xs text-zinc-600">
                  Menampilkan{" "}
                  <b className="text-zinc-900">{relatedList.length}</b> bahan
                  rapat
                </div>
              </div>

              <button
                type="button"
                onClick={closeRelated}
                className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
              >
                <X size={16} />
                Tutup
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-5">
              {relatedList.length === 0 ? (
                <div className="rounded-md border border-zinc-200 bg-zinc-50 px-4 py-6 text-sm text-zinc-600">
                  Belum ada bahan rapat yang menautkan usulan ini.
                  <div className="mt-2 text-xs text-zinc-500">
                    Pastikan saat membuat Bahan Rapat, row menyimpan{" "}
                    <code className="rounded bg-white px-1 py-0.5">
                      usulanId
                    </code>
                    .
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {relatedList.map((br) => (
                    <div
                      key={br.id}
                      className="flex flex-col gap-2 rounded-md border border-zinc-200 bg-white p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-semibold text-zinc-500">
                            {fmtDate(br.tanggal)} • {toUpperClean(br.status)}
                          </div>
                          <div className="mt-1 text-sm font-bold text-zinc-900">
                            {br.materiRapat?.trim()
                              ? toUpperClean(br.materiRapat)
                              : "(Tanpa nama rapat)"}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            gotoBahanRapat(br.id, relOpenForUsulanId)
                          }
                          className="inline-flex items-center gap-2 rounded-md bg-[#123473] px-3 py-2 text-xs font-semibold text-white hover:brightness-110"
                          title="Buka bahan rapat dan fokus ke usulan ini"
                        >
                          <ExternalLink size={16} />
                          Buka
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SortIcon({ active, dir }: { active: boolean; dir: "asc" | "desc" }) {
  if (!active) return <ChevronsUpDown className="h-4 w-4 text-zinc-500" />;
  if (dir === "asc") return <ChevronUp className="h-4 w-4 text-zinc-900" />;
  return <ChevronDown className="h-4 w-4 text-zinc-900" />;
}

function SortableTh({
  label,
  colKey,
  sortKey,
  sortDir,
  onSort,
  className = "",
}: {
  label: string;
  colKey: SortKey;
  sortKey: SortKey;
  sortDir: "asc" | "desc";
  onSort: (k: SortKey) => void;
  className?: string;
}) {
  const active = sortKey === colKey;

  return (
    <Th
      onClick={() => onSort(colKey)}
      title="Klik untuk sort"
      className={[
        className,
        "cursor-pointer select-none",
        active ? "bg-zinc-300/60 text-zinc-950" : "text-zinc-900",
      ].join(" ")}
    >
      <div className="flex items-center justify-center gap-2">
        <span>{label}</span>
        <SortIcon active={active} dir={sortDir} />
      </div>
    </Th>
  );
}

function Th({
  children,
  className = "",
  onClick,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
}) {
  return (
    <th
      onClick={onClick}
      title={title}
      className={[
        "border border-zinc-700 px-3 py-2 font-bold",
        onClick ? "hover:bg-zinc-300/70" : "",
        className,
      ].join(" ")}
    >
      {children}
    </th>
  );
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
    <td
      colSpan={colSpan}
      className={["border border-zinc-700 px-3 py-3", className].join(" ")}
    >
      {children}
    </td>
  );
}

function CellInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 w-full rounded-md border border-zinc-300 bg-white px-2 text-[12px] outline-none focus:border-[#123473] focus:ring-2 focus:ring-[#123473]/20"
    />
  );
}