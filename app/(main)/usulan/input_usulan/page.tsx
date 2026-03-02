"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

type JenisPegawai = "PNS" | "POLRI" | "TNI";

type Usulan = {
  id: string;

  esl: string;
  jabatan: string; // jabatan saat ini
  nama: string;

  jenisPegawai: JenisPegawai;

  // ✅ jadi 1 field saja
  pangkatGol: string;

  jabatanUsulan: string;
  keterangan: string;

  nrpNip: string;

  createdAt: string;
  updatedAt?: string;
};

const STORAGE_KEY = "bnn_usulan_v1";

const JENIS_PEGAWAI_OPTIONS: { label: string; value: JenisPegawai }[] = [
  { label: "PNS", value: "PNS" },
  { label: "Polri", value: "POLRI" },
  { label: "TNI", value: "TNI" },
];

/* =======================
   PNS: pangkat + golongan (fix pairing)
======================= */
const PNS_PANGKAT_GOL_OPTIONS = [
  // Golongan I
  "Juru Muda / I.a",
  "Juru Muda Tingkat I / I.b",
  "Juru / I.c",
  "Juru Tingkat I / I.d",
  // Golongan II
  "Pengatur Muda / II.a",
  "Pengatur Muda Tingkat I / II.b",
  "Pengatur / II.c",
  "Pengatur Tingkat I / II.d",
  // Golongan III
  "Penata Muda / III.a",
  "Penata Muda Tingkat I / III.b",
  "Penata / III.c",
  "Penata Tingkat I / III.d",
  // Golongan IV
  "Pembina / IV.a",
  "Pembina Tingkat I / IV.b",
  "Pembina Utama Muda / IV.c",
  "Pembina Utama Madya / IV.d",
  "Pembina Utama / IV.e",
];

/* =======================
   POLRI (contoh)
======================= */
const POLRI_PANGKAT_GOL_OPTIONS = [
  "Bhayangkara Dua",
  "Bhayangkara Satu",
  "Bhayangkara Kepala",
  "Bripda",
  "Briptu",
  "Brigadir",
  "Bripka",
  "Aipda",
  "Aiptu",
  "Ipda",
  "Iptu",
  "AKP",
  "Kompol",
  "AKBP",
  "Kombes Pol",
  "Brigjen Pol",
  "Irjen Pol",
  "Komjen Pol",
  "Jenderal Pol",
];

/* =======================
   TNI (contoh)
======================= */
const TNI_PANGKAT_GOL_OPTIONS = [
  "Prajurit Dua",
  "Prajurit Satu",
  "Prajurit Kepala",
  "Sersan Dua",
  "Sersan Satu",
  "Sersan Kepala",
  "Sersan Mayor",
  "Pembantu Letnan Dua",
  "Pembantu Letnan Satu",
  "Letnan Dua",
  "Letnan Satu",
  "Kapten",
  "Mayor",
  "Letnan Kolonel",
  "Kolonel",
  "Brigadir Jenderal",
  "Mayor Jenderal",
  "Letnan Jenderal",
  "Jenderal",
];

function loadUsulan(): Usulan[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Usulan[]) : [];
  } catch {
    return [];
  }
}

function saveUsulan(next: Usulan[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export default function InputUsulanPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    esl: "",
    jabatan: "",
    nama: "",

    jenisPegawai: "PNS" as JenisPegawai,
    pangkatGol: "",

    jabatanUsulan: "",
    keterangan: "",

    nrpNip: "",
  });

  const [saving, setSaving] = useState(false);

  const pangkatGolOptions = useMemo(() => {
    if (form.jenisPegawai === "PNS") return PNS_PANGKAT_GOL_OPTIONS;
    if (form.jenisPegawai === "POLRI") return POLRI_PANGKAT_GOL_OPTIONS;
    return TNI_PANGKAT_GOL_OPTIONS;
  }, [form.jenisPegawai]);

  function onChange<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function reset() {
    setForm({
      esl: "",
      jabatan: "",
      nama: "",

      jenisPegawai: "PNS",
      pangkatGol: "",

      jabatanUsulan: "",
      keterangan: "",

      nrpNip: "",
    });
  }

  function onJenisPegawaiChange(nextJenis: JenisPegawai) {
    // reset pangkatGol biar ga nyangkut
    setForm((p) => ({
      ...p,
      jenisPegawai: nextJenis,
      pangkatGol: "",
    }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.nama.trim() || !form.jabatan.trim()) {
      alert("Minimal isi Nama dan Jabatan ya.");
      return;
    }
    if (!form.jabatanUsulan.trim()) {
      alert("Jabatan Usulan wajib diisi ya.");
      return;
    }
    if (!form.pangkatGol) {
      alert("Pilih Pangkat/Gol dulu ya.");
      return;
    }

    setSaving(true);

    const now = new Date().toISOString();

    const newItem: Usulan = {
      id: crypto.randomUUID(),

      esl: form.esl.trim(),
      jabatan: form.jabatan.trim(),
      nama: form.nama.trim(),

      jenisPegawai: form.jenisPegawai,
      pangkatGol: form.pangkatGol,

      jabatanUsulan: form.jabatanUsulan.trim(),
      keterangan: form.keterangan.trim(),

      nrpNip: form.nrpNip.trim(),

      createdAt: now,
      updatedAt: now,
    };

    const current = loadUsulan();
    const next = [newItem, ...current];
    saveUsulan(next);

    reset();
    setSaving(false);

    router.push("/usulan/daftar_usulan");
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-[520px] rounded-md bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
        <div className="px-8 pt-8">
          <div className="flex justify-center">
            <div className="relative h-20 w-20">
              <Image src="/LogoBNN.png" alt="Logo BNN" fill className="object-contain" priority />
            </div>
          </div>

          <h1 className="mt-4 text-center text-sm font-bold tracking-wide text-zinc-900">
            INPUT USULAN
          </h1>

          <form onSubmit={onSubmit} className="mt-6 space-y-4 pb-8">
            <Field label="ESL" value={form.esl} onChange={(v) => onChange("esl", v)} />

            <Field
              label="Jabatan (Saat Ini)"
              value={form.jabatan}
              onChange={(v) => onChange("jabatan", v)}
              required
            />

            <Field label="Nama" value={form.nama} onChange={(v) => onChange("nama", v)} required />

            <SelectField
              label="Jenis Pegawai"
              value={form.jenisPegawai}
              onChange={(v) => onJenisPegawaiChange(v as JenisPegawai)}
              required
              options={JENIS_PEGAWAI_OPTIONS.map((o) => ({ label: o.label, value: o.value }))}
            />

            <SelectField
              label={form.jenisPegawai === "PNS" ? "Pangkat / Golongan" : "Pangkat"}
              value={form.pangkatGol}
              onChange={(v) => onChange("pangkatGol", v)}
              required
              placeholder={pangkatGolOptions.length ? "Pilih" : "Tidak ada opsi"}
              options={pangkatGolOptions.map((x) => ({ label: x, value: x }))}
            />

            <Field label="NRP/NIP" value={form.nrpNip} onChange={(v) => onChange("nrpNip", v)} />

            <Field
              label="Jabatan Usulan"
              value={form.jabatanUsulan}
              onChange={(v) => onChange("jabatanUsulan", v)}
              required
            />

            <TextAreaField
              label="Keterangan"
              value={form.keterangan}
              onChange={(v) => onChange("keterangan", v)}
            />

            <button
              disabled={saving}
              type="submit"
              className="mt-4 w-full rounded-md bg-[#123473] py-3 text-xs font-semibold tracking-wider text-white shadow-sm transition hover:brightness-110 active:brightness-95 disabled:opacity-60"
            >
              {saving ? "MENYIMPAN..." : "SIMPAN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* =======================
   INPUT COMPONENTS
======================= */

function Field({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-[11px] font-medium text-zinc-800">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={[
          "h-10 w-full rounded-[4px] border border-zinc-300 bg-white px-3 text-sm text-zinc-900",
          "outline-none transition",
          "focus:border-[#123473] focus:ring-2 focus:ring-[#123473]/20",
        ].join(" ")}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  required,
  options,
  placeholder = "Pilih",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  options: { label: string; value: string }[];
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-[11px] font-medium text-zinc-800">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={[
          "h-10 w-full rounded-[4px] border border-zinc-300 bg-white px-3 text-sm text-zinc-900",
          "outline-none transition",
          "focus:border-[#123473] focus:ring-2 focus:ring-[#123473]/20",
        ].join(" ")}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-[11px] font-medium text-zinc-800">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className={[
          "w-full rounded-[4px] border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900",
          "outline-none transition",
          "focus:border-[#123473] focus:ring-2 focus:ring-[#123473]/20",
        ].join(" ")}
      />
    </label>
  );
}