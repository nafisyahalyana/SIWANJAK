"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/* =======================
   TYPE & STORAGE
======================= */

type JenisPegawai = "PNS" | "POLRI" | "TNI";

type Usulan = {
  id: string;

  esl: string;
  jabatan: string;
  nama: string;

  jenisPegawai: JenisPegawai;
  pangkatGol: string;

  jabatanUsulan: string;
  keterangan: string;

  nrpNip: string;

  createdAt: string;
  updatedAt?: string;
};

type Row = {
  no: number;
  usulanId?: string;

  esl: string;
  jabatan: string;

  namaPktGolNrpNip: string;

  kondisi: string;

  jabatanUsulan: string;

  catatan: string;
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

const DEFAULT_ROWS = 1;
const STORAGE_KEY_USULAN = "bnn_usulan_v1";
const STORAGE_KEY_BAHAN_RAPAT = "bnn_bahan_rapat_v1";

/* =======================
   STORAGE HELPERS
======================= */

function loadUsulan(): Usulan[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY_USULAN);
    const arr = raw ? (JSON.parse(raw) as unknown[]) : [];
    if (!Array.isArray(arr)) return [];

    let changed = false;

    const migrated: Usulan[] = arr.map((x) => {
      const obj = x as Record<string, unknown>;

      const pangkatGol =
        String(obj?.pangkatGol ?? "").trim() || String(obj?.pktGol ?? "").trim();

      if (obj?.pangkatGol == null && obj?.pktGol != null) changed = true;
      if (obj?.jenisPegawai == null) changed = true;
      if (obj?.jabatanUsulan == null) changed = true;
      if (obj?.keterangan == null) changed = true;

      const jenisRaw = String(obj?.jenisPegawai ?? "PNS").toUpperCase().trim();
      const jenisPegawai: JenisPegawai =
        jenisRaw === "POLRI" ? "POLRI" : jenisRaw === "TNI" ? "TNI" : "PNS";

      return {
        id: String(obj?.id ?? crypto.randomUUID()),

        esl: String(obj?.esl ?? "").trim(),
        jabatan: String(obj?.jabatan ?? "").trim(),
        nama: String(obj?.nama ?? "").trim(),

        jenisPegawai,
        pangkatGol,

        jabatanUsulan: String(obj?.jabatanUsulan ?? "").trim(),
        keterangan: String(obj?.keterangan ?? "").trim(),

        nrpNip: String(obj?.nrpNip ?? "").trim(),

        createdAt: String(obj?.createdAt ?? new Date().toISOString()),
        updatedAt: obj?.updatedAt ? String(obj.updatedAt) : undefined,
      };
    });

    if (changed) localStorage.setItem(STORAGE_KEY_USULAN, JSON.stringify(migrated));
    return migrated;
  } catch {
    return [];
  }
}

function loadBahanRapat(): BahanRapat[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BAHAN_RAPAT);
    const data = raw ? (JSON.parse(raw) as unknown[]) : [];
    if (!Array.isArray(data)) return [];

    return data.map((x) => {
      const obj = x as Record<string, unknown>;

      const s = String(obj?.status ?? "draft");
      const status: BahanRapat["status"] =
        s === "final"
          ? "diajukan"
          : s === "draft" || s === "dirapatkan" || s === "diajukan"
          ? s
          : "draft";

      // pastikan rows array
      const rows = Array.isArray(obj?.rows) ? (obj.rows as Row[]) : [];

      return {
        id: String(obj?.id ?? crypto.randomUUID()),
        tanggal: String(obj?.tanggal ?? "").trim(),
        materiRapat: String(obj?.materiRapat ?? "").trim(),
        rows,
        status,
        createdAt: String(obj?.createdAt ?? new Date().toISOString()),
        updatedAt: obj?.updatedAt ? String(obj.updatedAt) : undefined,
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
   UTIL
======================= */

function normalize(s: unknown) {
  return String(s ?? "").toLowerCase().trim();
}

function displayUsulanInline(u: Usulan) {
  const nama = u.nama?.trim() || "-";
  const pkt = u.pangkatGol?.trim() || "-";
  const nip = u.nrpNip?.trim() || "-";
  return `${nama} / ${pkt} / ${nip}`;
}

function createEmptyRow(no: number): Row {
  return {
    no,
    usulanId: "",
    esl: "",
    jabatan: "",
    namaPktGolNrpNip: "",
    kondisi: "",
    jabatanUsulan: "",
    catatan: "",
    ket: "",
  };
}

function isRowEmpty(r: Row) {
  const fields = [
    r.esl,
    r.jabatan,
    r.namaPktGolNrpNip,
    r.kondisi,
    r.jabatanUsulan,
    r.catatan,
    r.ket,
  ];
  return fields.every((x) => !String(x ?? "").trim());
}

function reorder<T>(list: T[], from: number, to: number) {
  const arr = [...list];
  const [moved] = arr.splice(from, 1);
  arr.splice(to, 0, moved);
  return arr;
}

function renumberRows(rows: Row[]) {
  return rows.map((r, i) => ({ ...r, no: i + 1 }));
}

/* =======================
   PAGE
======================= */
import { Suspense } from "react";
// export default function BuatBahanRapatPage() {
function BuatBahanRapatContent() {
  const router = useRouter();
  const sp = useSearchParams();

  // ✅ mode edit
  const editId = sp.get("edit")?.trim() || "";
  const focusUsulanId = sp.get("focusUsulan")?.trim() || "";

  const [tanggal, setTanggal] = useState("");
  const [materiRapat, setMateriRapat] = useState("");

  const [usulanList, setUsulanList] = useState<Usulan[]>([]);
  const [rows, setRows] = useState<Row[]>(
    Array.from({ length: DEFAULT_ROWS }, (_, i) => createEmptyRow(i + 1))
  );

  const [dragIndex, setDragIndex] = useState<number | null>(null);

  // untuk auto-scroll ke baris tertentu
  const rowRefs = useRef<Array<HTMLTableRowElement | null>>([]);

  useEffect(() => {
    setUsulanList(loadUsulan());
  }, []);

  // ✅ load data bahan rapat saat edit
  useEffect(() => {
    if (!editId) return;

    const all = loadBahanRapat();
    const found = all.find((x) => x.id === editId);
    if (!found) return;

    setTanggal(found.tanggal || "");
    setMateriRapat(found.materiRapat || "");

    const incoming = Array.isArray(found.rows) && found.rows.length ? found.rows : [createEmptyRow(1)];
    setRows(renumberRows(incoming.map((r) => ({ ...r })))); // clone + renumber
  }, [editId]);

  // ✅ auto scroll + highlight (opsional)
  useEffect(() => {
    if (!focusUsulanId) return;
    const idx = rows.findIndex((r) => String(r.usulanId || "") === String(focusUsulanId));
    if (idx < 0) return;

    // tunggu render
    const t = window.setTimeout(() => {
      rowRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);

    return () => window.clearTimeout(t);
  }, [focusUsulanId, rows]);

  const canSave = useMemo(() => Boolean(tanggal.trim()), [tanggal]);

  function updateRow(idx: number, patch: Partial<Row>) {
    setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)));
  }

  function applyFromUsulan(idx: number, u: Usulan) {
    updateRow(idx, {
      usulanId: u.id,
      esl: u.esl ?? "",
      jabatan: u.jabatan ?? "",
      namaPktGolNrpNip: displayUsulanInline(u),
      jabatanUsulan: u.jabatanUsulan ?? "",
    });
  }

  function clearPickedUsulan(idx: number) {
    updateRow(idx, { usulanId: "" });
  }

  function addRow() {
    setRows((prev) => [...prev, createEmptyRow(prev.length + 1)]);
  }

  function removeLastRow() {
    setRows((prev) =>
      prev.length <= 1 ? prev : renumberRows(prev.slice(0, -1))
    );
  }

  function moveRow(from: number, to: number) {
    if (from === to) return;
    setRows((prev) => renumberRows(reorder(prev, from, to)));
  }

  function onSave() {
    if (!tanggal.trim()) {
      alert("Tanggal wajib diisi.");
      return;
    }

    const cleanedRows = renumberRows(rows.filter((r) => !isRowEmpty(r)));
    const finalRows = cleanedRows.length ? cleanedRows : [createEmptyRow(1)];

    const now = new Date().toISOString();
    const prev = loadBahanRapat();

    // ✅ EDIT MODE: update existing
    if (editId) {
      const existing = prev.find((x) => x.id === editId);
      if (!existing) {
        alert("Data bahan rapat yang mau diedit tidak ditemukan.");
        return;
      }

      const updated: BahanRapat = {
        ...existing,
        tanggal,
        materiRapat,
        rows: finalRows,
        updatedAt: now,
      };

      const next = prev.map((x) => (x.id === editId ? updated : x));
      saveBahanRapat(next);

      // balik ke daftar + auto open preview
      router.push(`/bahan_rapat/daftar?open=${encodeURIComponent(editId)}${focusUsulanId ? `&focusUsulan=${encodeURIComponent(focusUsulanId)}` : ""}`);
      return;
    }

    // ✅ CREATE MODE: new doc
    const doc: BahanRapat = {
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : String(Date.now()),
      tanggal,
      materiRapat,
      rows: finalRows,
      status: "draft",
      createdAt: now,
      updatedAt: now,
    };

    const next = [doc, ...prev];
    saveBahanRapat(next);

    router.push(`/bahan_rapat/daftar?open=${encodeURIComponent(doc.id)}`);
  }

  return (
    <div className="px-2 py-2">
      <div className="mx-auto max-w-[1100px] rounded-md bg-white shadow ring-1 ring-black/5">
        <div className="p-10">
          {/* HEADER */}
          <div className="flex justify-between gap-6">
            <div className="text-[11px] font-semibold">
              <div>BADAN NARKOTIKA NASIONAL</div>
              <div>REPUBLIK INDONESIA</div>
              <div className="mt-2 h-[2px] w-[190px] bg-zinc-700/70" />
            </div>

            <div className="flex-1 text-center">
              <div className="text-sm font-bold">
                {editId ? "EDIT MATERI RAPAT" : "MATERI RAPAT"}
              </div>

              <div className="mx-auto mt-3 max-w-[420px]">
                <AutoTextarea
                  value={materiRapat}
                  onChange={setMateriRapat}
                  placeholder="Tulis materi rapat di sini..."
                />
              </div>

              <div className="mt-4 flex justify-center gap-3">
                <div className="text-sm font-semibold">Tanggal</div>
                <input
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="h-9 w-[170px] rounded border px-2 text-xs"
                />
              </div>

            </div>

            <div className="w-[190px]" />
          </div>

          {/* TABLE */}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border text-[12px]">
              <thead>
                <tr className="bg-zinc-200">
                  <Th className="w-[40px] text-center">↕</Th>
                  <Th>NO</Th>
                  <Th>ESL</Th>
                  <Th>JABATAN</Th>

                  <Th className="w-[360px]">
                    NAMA / PKT-GOL / NRP-NIP
                    <div className="text-[10px] font-normal text-zinc-600">
                      ketik untuk cari dari Daftar Usulan
                    </div>
                  </Th>

                  <Th>KONDISI</Th>
                  <Th>JABATAN USULAN</Th>
                  <Th>CATATAN</Th>
                  <Th>KET</Th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r, idx) => {
                  const highlight =
                    focusUsulanId &&
                    String(r.usulanId || "") === String(focusUsulanId);

                  return (
                    <tr
                      key={r.no}
                      ref={(el) => {
                        rowRefs.current[idx] = el;
                      }}
                      className={[
                        "border-t",
                        dragIndex === idx ? "opacity-60" : "",
                        highlight ? "bg-yellow-100/70" : "",
                      ].join(" ")}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const from = Number(e.dataTransfer.getData("text/rowIndex"));
                        if (Number.isFinite(from)) moveRow(from, idx);
                        setDragIndex(null);
                      }}
                    >
                      <Td className="text-center">
                        <button
                          type="button"
                          draggable
                          onDragStart={(e) => {
                            setDragIndex(idx);
                            e.dataTransfer.setData("text/rowIndex", String(idx));
                            e.dataTransfer.effectAllowed = "move";
                          }}
                          onDragEnd={() => setDragIndex(null)}
                          className="cursor-grab active:cursor-grabbing rounded px-2 py-1 hover:bg-zinc-100"
                          title="Tarik untuk pindahkan baris"
                        >
                          ☰
                        </button>
                      </Td>

                      <Td className="text-center">{r.no}</Td>

                      <Td>
                        <CellInput
                          value={r.esl}
                          onChange={(v) => updateRow(idx, { esl: v })}
                        />
                      </Td>

                      <Td>
                        <CellTextarea
                          value={r.jabatan}
                          onChange={(v) => updateRow(idx, { jabatan: v })}
                        />
                      </Td>

                      <Td>
                        <UsulanCombo
                          value={r.namaPktGolNrpNip}
                          usulanId={r.usulanId}
                          options={usulanList}
                          onChangeValue={(v) =>
                            updateRow(idx, { namaPktGolNrpNip: v, usulanId: "" })
                          }
                          onPick={(u) => applyFromUsulan(idx, u)}
                          onClearPick={() => clearPickedUsulan(idx)}
                        />
                      </Td>

                      <Td>
                        <CellTextarea
                          value={r.kondisi}
                          onChange={(v) => updateRow(idx, { kondisi: v })}
                          minRows={2}
                        />
                      </Td>

                      <Td>
                        <CellTextarea
                          value={r.jabatanUsulan}
                          onChange={(v) => updateRow(idx, { jabatanUsulan: v })}
                          minRows={2}
                        />
                      </Td>

                      <Td>
                        <CellTextarea
                          value={r.catatan}
                          onChange={(v) => updateRow(idx, { catatan: v })}
                          minRows={2}
                        />
                      </Td>

                      <Td>
                        <CellTextarea
                          value={r.ket}
                          onChange={(v) => updateRow(idx, { ket: v })}
                        />
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ACTION */}
          <div className="mt-6 flex justify-between">
            <div className="flex gap-2">
              <button type="button" onClick={addRow} className="btn">
                + Baris
              </button>
              <button type="button" onClick={removeLastRow} className="btn">
                - Baris
              </button>

              <button
                type="button"
                onClick={() => router.push("/bahan_rapat/daftar")}
                className="btn"
                title="Kembali ke daftar bahan rapat"
              >
                Kembali
              </button>
            </div>

            <button
              type="button"
              onClick={onSave}
              disabled={!canSave}
              className="btn-primary"
            >
              {editId ? "Simpan Perubahan" : "Simpan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function BuatBahanRapatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BuatBahanRapatContent />
    </Suspense>
  );
}

/* =======================
   USULAN COMBO
======================= */

function UsulanCombo({
  value,
  usulanId,
  options,
  onChangeValue,
  onPick,
  onClearPick,
}: {
  value: string;
  usulanId?: string;
  options: Usulan[];
  onChangeValue: (v: string) => void;
  onPick: (u: Usulan) => void;
  onClearPick: () => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(value);

    const src = !q
      ? options
      : options.filter((u) => {
          const hay = [
            u.nama,
            u.jabatan,
            u.esl,
            u.jenisPegawai,
            u.pangkatGol,
            u.jabatanUsulan,
            u.keterangan,
            u.nrpNip,
            displayUsulanInline(u),
          ].map(normalize);

          return hay.some((x) => x.includes(q));
        });

    return src.slice(0, 50);
  }, [value, options]);

  const pickedText = usulanId ? "Terhubung dengan Daftar Usulan" : "";

  function handleWheelCapture(e: React.WheelEvent<HTMLDivElement>) {
    const el = listRef.current;
    if (!el) return;
    e.stopPropagation();
    e.preventDefault();
    el.scrollTop += e.deltaY;
  }

  return (
    <div ref={wrapRef} className="relative">
      <div className="flex items-center gap-2 rounded border bg-white px-2">
        <span className="text-zinc-400">🔎</span>

        <input
          value={value}
          onChange={(e) => {
            onChangeValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Cari nama pegawai..."
          className="h-10 w-full border-0 bg-transparent px-0 text-[12px] outline-none"
        />

        {value ? (
          <button
            type="button"
            onClick={() => {
              onChangeValue("");
              onClearPick();
              setOpen(true);
            }}
            className="rounded px-1 text-zinc-500 hover:bg-zinc-100"
            title="Clear"
          >
            ✕
          </button>
        ) : null}
      </div>

      {pickedText ? (
        <div className="mt-1 text-[10px] text-emerald-700">{pickedText}</div>
      ) : value.trim() ? (
        <div className="mt-1 text-[10px] text-zinc-500">
          Pilih salah satu dari dropdown (atau lanjut ketik manual).
        </div>
      ) : null}

      {open && (
        <div className="absolute z-[9999] mt-2 w-full rounded-md border bg-white shadow-lg">
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-[12px] text-zinc-500">
              Tidak ada data yang cocok.
            </div>
          ) : (
            <div
              ref={listRef}
              onWheelCapture={handleWheelCapture}
              className="max-h-56 overflow-y-auto overscroll-contain py-1"
            >
              {filtered.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onPick(u);
                    setOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-zinc-50"
                >
                  <div className="text-[12px] font-semibold text-zinc-900">
                    {u.nama || "-"}
                  </div>

                  <div className="mt-0.5 text-[11px] text-zinc-600">
                    {u.jabatan ? u.jabatan : "-"}{" "}
                    <span className="text-zinc-300">•</span>{" "}
                    {u.esl ? `ESL: ${u.esl}` : "ESL: -"}
                  </div>

                  <div className="mt-0.5 text-[11px] text-zinc-600">
                    {(u.pangkatGol?.trim() || "-") +
                      " / " +
                      (u.nrpNip?.trim() || "-")}
                  </div>

                  {u.jabatanUsulan?.trim() ? (
                    <div className="mt-0.5 text-[11px] text-zinc-500">
                      Usulan: {u.jabatanUsulan}
                    </div>
                  ) : null}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* =======================
   UI HELPERS
======================= */

type ThProps = { children: React.ReactNode; className?: string };
function Th({ children, className = "" }: ThProps) {
  return <th className={`border px-3 py-2 font-bold ${className}`}>{children}</th>;
}

type TdProps = { children: React.ReactNode; className?: string };
function Td({ children, className = "" }: TdProps) {
  return <td className={`align-top border px-2 py-2 ${className}`}>{children}</td>;
}

type CellInputProps = { value: string; onChange: (v: string) => void };
function CellInput({ value, onChange }: CellInputProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 w-full rounded border px-2 text-[12px]"
    />
  );
}

type CellTextareaProps = { value: string; onChange: (v: string) => void; minRows?: number };
function CellTextarea({ value, onChange, minRows = 1 }: CellTextareaProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = ref.current.scrollHeight + "px";
  }, [value]);

  return (
    <textarea
      ref={ref}
      rows={minRows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full resize-none overflow-hidden rounded border px-2 py-2 text-[12px]"
    />
  );
}

type AutoTextareaProps = { value: string; onChange: (v: string) => void; placeholder?: string };
function AutoTextarea({ value, onChange, placeholder }: AutoTextareaProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = ref.current.scrollHeight + "px";
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full resize-none overflow-hidden rounded border px-3 py-2 text-sm"
    />
  );
}