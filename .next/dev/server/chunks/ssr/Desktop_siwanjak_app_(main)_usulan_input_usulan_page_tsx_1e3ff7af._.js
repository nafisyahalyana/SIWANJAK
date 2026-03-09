module.exports = [
"[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InputUsulanPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const STORAGE_KEY = "bnn_usulan_v1";
const JENIS_PEGAWAI_OPTIONS = [
    {
        label: "PNS",
        value: "PNS"
    },
    {
        label: "Polri",
        value: "POLRI"
    },
    {
        label: "TNI",
        value: "TNI"
    }
];
/* =======================
   PNS: pangkat + golongan (fix pairing)
======================= */ const PNS_PANGKAT_GOL_OPTIONS = [
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
    "Pembina Utama / IV.e"
];
/* =======================
   POLRI (contoh)
======================= */ const POLRI_PANGKAT_GOL_OPTIONS = [
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
    "Jenderal Pol"
];
/* =======================
   TNI (contoh)
======================= */ const TNI_PANGKAT_GOL_OPTIONS = [
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
    "Jenderal"
];
function loadUsulan() {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
}
function saveUsulan(next) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
function InputUsulanPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        esl: "",
        jabatan: "",
        nama: "",
        jenisPegawai: "PNS",
        pangkatGol: "",
        jabatanUsulan: "",
        keterangan: "",
        nrpNip: ""
    });
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const pangkatGolOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (form.jenisPegawai === "PNS") return PNS_PANGKAT_GOL_OPTIONS;
        if (form.jenisPegawai === "POLRI") return POLRI_PANGKAT_GOL_OPTIONS;
        return TNI_PANGKAT_GOL_OPTIONS;
    }, [
        form.jenisPegawai
    ]);
    function onChange(key, value) {
        setForm((p)=>({
                ...p,
                [key]: value
            }));
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
            nrpNip: ""
        });
    }
    function onJenisPegawaiChange(nextJenis) {
        // reset pangkatGol biar ga nyangkut
        setForm((p)=>({
                ...p,
                jenisPegawai: nextJenis,
                pangkatGol: ""
            }));
    }
    function onSubmit(e) {
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
        const newItem = {
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
            updatedAt: now
        };
        const current = loadUsulan();
        const next = [
            newItem,
            ...current
        ];
        saveUsulan(next);
        reset();
        setSaving(false);
        router.push("/usulan/daftar_usulan");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-[520px] rounded-md bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-8 pt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative h-20 w-20",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: "/LogoBNN.png",
                                alt: "Logo BNN",
                                fill: true,
                                className: "object-contain",
                                priority: true
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                                lineNumber: 238,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                            lineNumber: 237,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                        lineNumber: 236,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mt-4 text-center text-sm font-bold tracking-wide text-zinc-900",
                        children: "INPUT USULAN"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                        lineNumber: 242,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: onSubmit,
                        className: "mt-6 space-y-4 pb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "ESL",
                                value: form.esl,
                                onChange: (v)=>onChange("esl", v)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                                lineNumber: 247,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "Jabatan (Saat Ini)",
                                value: form.jabatan,
                                onChange: (v)=>onChange("jabatan", v),
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                                lineNumber: 249,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "Nama",
                                value: form.nama,
                                onChange: (v)=>onChange("nama", v),
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                                lineNumber: 256,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectField, {
                                label: "Jenis Pegawai",
                                value: form.jenisPegawai,
                                onChange: (v)=>onJenisPegawaiChange(v),
                                required: true,
                                options: JENIS_PEGAWAI_OPTIONS.map((o)=>({
                                        label: o.label,
                                        value: o.value
                                    }))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                                lineNumber: 258,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectField, {
                                label: form.jenisPegawai === "PNS" ? "Pangkat / Golongan" : "Pangkat",
                                value: form.pangkatGol,
                                onChange: (v)=>onChange("pangkatGol", v),
                                required: true,
                                placeholder: pangkatGolOptions.length ? "Pilih" : "Tidak ada opsi",
                                options: pangkatGolOptions.map((x)=>({
                                        label: x,
                                        value: x
                                    }))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                                lineNumber: 266,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "NRP/NIP",
                                value: form.nrpNip,
                                onChange: (v)=>onChange("nrpNip", v)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                                lineNumber: 275,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "Jabatan Usulan",
                                value: form.jabatanUsulan,
                                onChange: (v)=>onChange("jabatanUsulan", v),
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                                lineNumber: 277,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TextAreaField, {
                                label: "Keterangan",
                                value: form.keterangan,
                                onChange: (v)=>onChange("keterangan", v)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                                lineNumber: 284,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                disabled: saving,
                                type: "submit",
                                className: "mt-4 w-full rounded-md bg-[#123473] py-3 text-xs font-semibold tracking-wider text-white shadow-sm transition hover:brightness-110 active:brightness-95 disabled:opacity-60",
                                children: saving ? "MENYIMPAN..." : "SIMPAN"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                                lineNumber: 290,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                        lineNumber: 246,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                lineNumber: 235,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
            lineNumber: 234,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
        lineNumber: 233,
        columnNumber: 5
    }, this);
}
/* =======================
   INPUT COMPONENTS
======================= */ function Field({ label, value, onChange, required }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-1 text-[11px] font-medium text-zinc-800",
                children: [
                    label,
                    " ",
                    required ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-500",
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                        lineNumber: 322,
                        columnNumber: 29
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                lineNumber: 321,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                value: value,
                onChange: (e)=>onChange(e.target.value),
                className: [
                    "h-10 w-full rounded-[4px] border border-zinc-300 bg-white px-3 text-sm text-zinc-900",
                    "outline-none transition",
                    "focus:border-[#123473] focus:ring-2 focus:ring-[#123473]/20"
                ].join(" ")
            }, void 0, false, {
                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                lineNumber: 324,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
        lineNumber: 320,
        columnNumber: 5
    }, this);
}
function SelectField({ label, value, onChange, required, options, placeholder = "Pilih" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-1 text-[11px] font-medium text-zinc-800",
                children: [
                    label,
                    " ",
                    required ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-500",
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                        lineNumber: 355,
                        columnNumber: 29
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                lineNumber: 354,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: value,
                onChange: (e)=>onChange(e.target.value),
                className: [
                    "h-10 w-full rounded-[4px] border border-zinc-300 bg-white px-3 text-sm text-zinc-900",
                    "outline-none transition",
                    "focus:border-[#123473] focus:ring-2 focus:ring-[#123473]/20"
                ].join(" "),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "",
                        children: placeholder
                    }, void 0, false, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                        lineNumber: 366,
                        columnNumber: 9
                    }, this),
                    options.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: o.value,
                            children: o.label
                        }, o.value, false, {
                            fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                            lineNumber: 368,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                lineNumber: 357,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
        lineNumber: 353,
        columnNumber: 5
    }, this);
}
function TextAreaField({ label, value, onChange, required, placeholder }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-1 text-[11px] font-medium text-zinc-800",
                children: [
                    label,
                    " ",
                    required ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-500",
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                        lineNumber: 393,
                        columnNumber: 29
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                lineNumber: 392,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                value: value,
                onChange: (e)=>onChange(e.target.value),
                placeholder: placeholder,
                rows: 3,
                className: [
                    "w-full rounded-[4px] border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900",
                    "outline-none transition",
                    "focus:border-[#123473] focus:ring-2 focus:ring-[#123473]/20"
                ].join(" ")
            }, void 0, false, {
                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
                lineNumber: 395,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/input_usulan/page.tsx",
        lineNumber: 391,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Desktop_siwanjak_app_%28main%29_usulan_input_usulan_page_tsx_1e3ff7af._.js.map