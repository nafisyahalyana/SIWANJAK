module.exports = [
"[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BuatBahanRapatPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const DEFAULT_ROWS = 1;
const STORAGE_KEY_USULAN = "bnn_usulan_v1";
const STORAGE_KEY_BAHAN_RAPAT = "bnn_bahan_rapat_v1";
/* =======================
   STORAGE HELPERS
======================= */ function loadUsulan() {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
}
function loadBahanRapat() {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
}
function saveBahanRapat(list) {
    localStorage.setItem(STORAGE_KEY_BAHAN_RAPAT, JSON.stringify(list));
}
/* =======================
   UTIL
======================= */ function normalize(s) {
    return String(s ?? "").toLowerCase().trim();
}
function displayUsulanInline(u) {
    const nama = u.nama?.trim() || "-";
    const pkt = u.pangkatGol?.trim() || "-";
    const nip = u.nrpNip?.trim() || "-";
    return `${nama} / ${pkt} / ${nip}`;
}
function createEmptyRow(no) {
    return {
        no,
        usulanId: "",
        esl: "",
        jabatan: "",
        namaPktGolNrpNip: "",
        kondisi: "",
        jabatanUsulan: "",
        catatan: "",
        ket: ""
    };
}
function isRowEmpty(r) {
    const fields = [
        r.esl,
        r.jabatan,
        r.namaPktGolNrpNip,
        r.kondisi,
        r.jabatanUsulan,
        r.catatan,
        r.ket
    ];
    return fields.every((x)=>!String(x ?? "").trim());
}
function reorder(list, from, to) {
    const arr = [
        ...list
    ];
    const [moved] = arr.splice(from, 1);
    arr.splice(to, 0, moved);
    return arr;
}
function renumberRows(rows) {
    return rows.map((r, i)=>({
            ...r,
            no: i + 1
        }));
}
function BuatBahanRapatPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const sp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    // ✅ mode edit
    const editId = sp.get("edit")?.trim() || "";
    const focusUsulanId = sp.get("focusUsulan")?.trim() || "";
    const [tanggal, setTanggal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [materiRapat, setMateriRapat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [usulanList, setUsulanList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(Array.from({
        length: DEFAULT_ROWS
    }, (_, i)=>createEmptyRow(i + 1)));
    const [dragIndex, setDragIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // untuk auto-scroll ke baris tertentu
    const rowRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setUsulanList(loadUsulan());
    }, []);
    // ✅ load data bahan rapat saat edit
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!editId) return;
        const all = loadBahanRapat();
        const found = all.find((x)=>x.id === editId);
        if (!found) return;
        setTanggal(found.tanggal || "");
        setMateriRapat(found.materiRapat || "");
        const incoming = Array.isArray(found.rows) && found.rows.length ? found.rows : [
            createEmptyRow(1)
        ];
        setRows(renumberRows(incoming.map((r)=>({
                ...r
            })))); // clone + renumber
    }, [
        editId
    ]);
    // ✅ auto scroll + highlight (opsional)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!focusUsulanId) return;
        const idx = rows.findIndex((r)=>String(r.usulanId || "") === String(focusUsulanId));
        if (idx < 0) return;
        // tunggu render
        const t = window.setTimeout(()=>{
            rowRefs.current[idx]?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 150);
        return ()=>window.clearTimeout(t);
    }, [
        focusUsulanId,
        rows
    ]);
    const canSave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>Boolean(tanggal.trim()), [
        tanggal
    ]);
    function updateRow(idx, patch) {
        setRows((prev)=>prev.map((r, i)=>i === idx ? {
                    ...r,
                    ...patch
                } : r));
    }
    function applyFromUsulan(idx, u) {
        updateRow(idx, {
            usulanId: u.id,
            esl: u.esl ?? "",
            jabatan: u.jabatan ?? "",
            namaPktGolNrpNip: displayUsulanInline(u),
            jabatanUsulan: u.jabatanUsulan ?? ""
        });
    }
    function clearPickedUsulan(idx) {
        updateRow(idx, {
            usulanId: ""
        });
    }
    function addRow() {
        setRows((prev)=>[
                ...prev,
                createEmptyRow(prev.length + 1)
            ]);
    }
    function removeLastRow() {
        setRows((prev)=>prev.length <= 1 ? prev : renumberRows(prev.slice(0, -1)));
    }
    function moveRow(from, to) {
        if (from === to) return;
        setRows((prev)=>renumberRows(reorder(prev, from, to)));
    }
    function onSave() {
        if (!tanggal.trim()) {
            alert("Tanggal wajib diisi.");
            return;
        }
        const cleanedRows = renumberRows(rows.filter((r)=>!isRowEmpty(r)));
        const finalRows = cleanedRows.length ? cleanedRows : [
            createEmptyRow(1)
        ];
        const now = new Date().toISOString();
        const prev = loadBahanRapat();
        // ✅ EDIT MODE: update existing
        if (editId) {
            const existing = prev.find((x)=>x.id === editId);
            if (!existing) {
                alert("Data bahan rapat yang mau diedit tidak ditemukan.");
                return;
            }
            const updated = {
                ...existing,
                tanggal,
                materiRapat,
                rows: finalRows,
                updatedAt: now
            };
            const next = prev.map((x)=>x.id === editId ? updated : x);
            saveBahanRapat(next);
            // balik ke daftar + auto open preview
            router.push(`/bahan_rapat/daftar?open=${encodeURIComponent(editId)}${focusUsulanId ? `&focusUsulan=${encodeURIComponent(focusUsulanId)}` : ""}`);
            return;
        }
        // ✅ CREATE MODE: new doc
        const doc = {
            id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()),
            tanggal,
            materiRapat,
            rows: finalRows,
            status: "draft",
            createdAt: now,
            updatedAt: now
        };
        const next = [
            doc,
            ...prev
        ];
        saveBahanRapat(next);
        router.push(`/bahan_rapat/daftar?open=${encodeURIComponent(doc.id)}`);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-2 py-2",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-[1100px] rounded-md bg-white shadow ring-1 ring-black/5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[11px] font-semibold",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "BADAN NARKOTIKA NASIONAL"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                        lineNumber: 367,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "REPUBLIK INDONESIA"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                        lineNumber: 368,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 h-[2px] w-[190px] bg-zinc-700/70"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                        lineNumber: 369,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                lineNumber: 366,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-bold",
                                        children: editId ? "EDIT MATERI RAPAT" : "MATERI RAPAT"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                        lineNumber: 373,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mx-auto mt-3 max-w-[420px]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AutoTextarea, {
                                            value: materiRapat,
                                            onChange: setMateriRapat,
                                            placeholder: "Tulis materi rapat di sini..."
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                            lineNumber: 378,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                        lineNumber: 377,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 flex justify-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-semibold",
                                                children: "Tanggal"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                lineNumber: 386,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                value: tanggal,
                                                onChange: (e)=>setTanggal(e.target.value),
                                                className: "h-9 w-[170px] rounded border px-2 text-xs"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                lineNumber: 387,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                        lineNumber: 385,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                lineNumber: 372,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-[190px]"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                lineNumber: 397,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                        lineNumber: 365,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full border text-[12px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "bg-zinc-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                className: "w-[40px] text-center",
                                                children: "↕"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                lineNumber: 405,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                children: "NO"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                lineNumber: 406,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                children: "ESL"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                lineNumber: 407,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                children: "JABATAN"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                lineNumber: 408,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                className: "w-[360px]",
                                                children: [
                                                    "NAMA / PKT-GOL / NRP-NIP",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] font-normal text-zinc-600",
                                                        children: "ketik untuk cari dari Daftar Usulan"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                        lineNumber: 412,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                lineNumber: 410,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                children: "KONDISI"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                lineNumber: 417,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                children: "JABATAN USULAN"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                lineNumber: 418,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                children: "CATATAN"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                lineNumber: 419,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                children: "KET"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                lineNumber: 420,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                        lineNumber: 404,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                    lineNumber: 403,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: rows.map((r, idx)=>{
                                        const highlight = focusUsulanId && String(r.usulanId || "") === String(focusUsulanId);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            ref: (el)=>{
                                                rowRefs.current[idx] = el;
                                            },
                                            className: [
                                                "border-t",
                                                dragIndex === idx ? "opacity-60" : "",
                                                highlight ? "bg-yellow-100/70" : ""
                                            ].join(" "),
                                            onDragOver: (e)=>e.preventDefault(),
                                            onDrop: (e)=>{
                                                e.preventDefault();
                                                const from = Number(e.dataTransfer.getData("text/rowIndex"));
                                                if (Number.isFinite(from)) moveRow(from, idx);
                                                setDragIndex(null);
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    className: "text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        draggable: true,
                                                        onDragStart: (e)=>{
                                                            setDragIndex(idx);
                                                            e.dataTransfer.setData("text/rowIndex", String(idx));
                                                            e.dataTransfer.effectAllowed = "move";
                                                        },
                                                        onDragEnd: ()=>setDragIndex(null),
                                                        className: "cursor-grab active:cursor-grabbing rounded px-2 py-1 hover:bg-zinc-100",
                                                        title: "Tarik untuk pindahkan baris",
                                                        children: "☰"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                        lineNumber: 450,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                    lineNumber: 449,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    className: "text-center",
                                                    children: r.no
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                    lineNumber: 466,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CellInput, {
                                                        value: r.esl,
                                                        onChange: (v)=>updateRow(idx, {
                                                                esl: v
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                        lineNumber: 469,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                    lineNumber: 468,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CellTextarea, {
                                                        value: r.jabatan,
                                                        onChange: (v)=>updateRow(idx, {
                                                                jabatan: v
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                        lineNumber: 476,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                    lineNumber: 475,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UsulanCombo, {
                                                        value: r.namaPktGolNrpNip,
                                                        usulanId: r.usulanId,
                                                        options: usulanList,
                                                        onChangeValue: (v)=>updateRow(idx, {
                                                                namaPktGolNrpNip: v,
                                                                usulanId: ""
                                                            }),
                                                        onPick: (u)=>applyFromUsulan(idx, u),
                                                        onClearPick: ()=>clearPickedUsulan(idx)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                        lineNumber: 483,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                    lineNumber: 482,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CellTextarea, {
                                                        value: r.kondisi,
                                                        onChange: (v)=>updateRow(idx, {
                                                                kondisi: v
                                                            }),
                                                        minRows: 2
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                        lineNumber: 496,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                    lineNumber: 495,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CellTextarea, {
                                                        value: r.jabatanUsulan,
                                                        onChange: (v)=>updateRow(idx, {
                                                                jabatanUsulan: v
                                                            }),
                                                        minRows: 2
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                        lineNumber: 504,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                    lineNumber: 503,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CellTextarea, {
                                                        value: r.catatan,
                                                        onChange: (v)=>updateRow(idx, {
                                                                catatan: v
                                                            }),
                                                        minRows: 2
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                        lineNumber: 512,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                    lineNumber: 511,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CellTextarea, {
                                                        value: r.ket,
                                                        onChange: (v)=>updateRow(idx, {
                                                                ket: v
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                        lineNumber: 520,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                                    lineNumber: 519,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, r.no, true, {
                                            fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                            lineNumber: 431,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                    lineNumber: 424,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                            lineNumber: 402,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                        lineNumber: 401,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: addRow,
                                        className: "btn",
                                        children: "+ Baris"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                        lineNumber: 535,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: removeLastRow,
                                        className: "btn",
                                        children: "- Baris"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                        lineNumber: 538,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>router.push("/bahan_rapat/daftar"),
                                        className: "btn",
                                        title: "Kembali ke daftar bahan rapat",
                                        children: "Kembali"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                        lineNumber: 542,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                lineNumber: 534,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onSave,
                                disabled: !canSave,
                                className: "btn-primary",
                                children: editId ? "Simpan Perubahan" : "Simpan"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                lineNumber: 552,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                        lineNumber: 533,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                lineNumber: 363,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
            lineNumber: 362,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
        lineNumber: 361,
        columnNumber: 5
    }, this);
}
/* =======================
   USULAN COMBO
======================= */ function UsulanCombo({ value, usulanId, options, onChangeValue, onPick, onClearPick }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const wrapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const listRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function onDocClick(e) {
            if (!wrapRef.current) return;
            if (!wrapRef.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("mousedown", onDocClick);
        return ()=>document.removeEventListener("mousedown", onDocClick);
    }, []);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const q = normalize(value);
        const src = !q ? options : options.filter((u)=>{
            const hay = [
                u.nama,
                u.jabatan,
                u.esl,
                u.jenisPegawai,
                u.pangkatGol,
                u.jabatanUsulan,
                u.keterangan,
                u.nrpNip,
                displayUsulanInline(u)
            ].map(normalize);
            return hay.some((x)=>x.includes(q));
        });
        return src.slice(0, 50);
    }, [
        value,
        options
    ]);
    const pickedText = usulanId ? "Terhubung dengan Daftar Usulan" : "";
    function handleWheelCapture(e) {
        const el = listRef.current;
        if (!el) return;
        e.stopPropagation();
        e.preventDefault();
        el.scrollTop += e.deltaY;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: wrapRef,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 rounded border bg-white px-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-zinc-400",
                        children: "🔎"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                        lineNumber: 636,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: value,
                        onChange: (e)=>{
                            onChangeValue(e.target.value);
                            setOpen(true);
                        },
                        onFocus: ()=>setOpen(true),
                        placeholder: "Cari nama pegawai...",
                        className: "h-10 w-full border-0 bg-transparent px-0 text-[12px] outline-none"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                        lineNumber: 638,
                        columnNumber: 9
                    }, this),
                    value ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            onChangeValue("");
                            onClearPick();
                            setOpen(true);
                        },
                        className: "rounded px-1 text-zinc-500 hover:bg-zinc-100",
                        title: "Clear",
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                        lineNumber: 650,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                lineNumber: 635,
                columnNumber: 7
            }, this),
            pickedText ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 text-[10px] text-emerald-700",
                children: pickedText
            }, void 0, false, {
                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                lineNumber: 666,
                columnNumber: 9
            }, this) : value.trim() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 text-[10px] text-zinc-500",
                children: "Pilih salah satu dari dropdown (atau lanjut ketik manual)."
            }, void 0, false, {
                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                lineNumber: 668,
                columnNumber: 9
            }, this) : null,
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-[9999] mt-2 w-full rounded-md border bg-white shadow-lg",
                children: filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-3 py-2 text-[12px] text-zinc-500",
                    children: "Tidak ada data yang cocok."
                }, void 0, false, {
                    fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                    lineNumber: 676,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: listRef,
                    onWheelCapture: handleWheelCapture,
                    className: "max-h-56 overflow-y-auto overscroll-contain py-1",
                    children: filtered.map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onMouseDown: (e)=>e.preventDefault(),
                            onClick: ()=>{
                                onPick(u);
                                setOpen(false);
                            },
                            className: "w-full px-3 py-2 text-left hover:bg-zinc-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[12px] font-semibold text-zinc-900",
                                    children: u.nama || "-"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                    lineNumber: 696,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-0.5 text-[11px] text-zinc-600",
                                    children: [
                                        u.jabatan ? u.jabatan : "-",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-zinc-300",
                                            children: "•"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                            lineNumber: 702,
                                            columnNumber: 21
                                        }, this),
                                        " ",
                                        u.esl ? `ESL: ${u.esl}` : "ESL: -"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                    lineNumber: 700,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-0.5 text-[11px] text-zinc-600",
                                    children: (u.pangkatGol?.trim() || "-") + " / " + (u.nrpNip?.trim() || "-")
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                    lineNumber: 706,
                                    columnNumber: 19
                                }, this),
                                u.jabatanUsulan?.trim() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-0.5 text-[11px] text-zinc-500",
                                    children: [
                                        "Usulan: ",
                                        u.jabatanUsulan
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                                    lineNumber: 713,
                                    columnNumber: 21
                                }, this) : null
                            ]
                        }, u.id, true, {
                            fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                            lineNumber: 686,
                            columnNumber: 17
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                    lineNumber: 680,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
                lineNumber: 674,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
        lineNumber: 634,
        columnNumber: 5
    }, this);
}
function Th({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        className: `border px-3 py-2 font-bold ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
        lineNumber: 733,
        columnNumber: 10
    }, this);
}
function Td({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
        className: `align-top border px-2 py-2 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
        lineNumber: 738,
        columnNumber: 10
    }, this);
}
function CellInput({ value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        value: value,
        onChange: (e)=>onChange(e.target.value),
        className: "h-9 w-full rounded border px-2 text-[12px]"
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
        lineNumber: 744,
        columnNumber: 5
    }, this);
}
function CellTextarea({ value, onChange, minRows = 1 }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!ref.current) return;
        ref.current.style.height = "auto";
        ref.current.style.height = ref.current.scrollHeight + "px";
    }, [
        value
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        ref: ref,
        rows: minRows,
        value: value,
        onChange: (e)=>onChange(e.target.value),
        className: "w-full resize-none overflow-hidden rounded border px-2 py-2 text-[12px]"
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
        lineNumber: 763,
        columnNumber: 5
    }, this);
}
function AutoTextarea({ value, onChange, placeholder }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!ref.current) return;
        ref.current.style.height = "auto";
        ref.current.style.height = ref.current.scrollHeight + "px";
    }, [
        value
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        ref: ref,
        value: value,
        placeholder: placeholder,
        onChange: (e)=>onChange(e.target.value),
        className: "w-full resize-none overflow-hidden rounded border px-3 py-2 text-sm"
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/bahan_rapat/buat/page.tsx",
        lineNumber: 784,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Desktop_siwanjak_app_%28main%29_bahan_rapat_buat_page_tsx_4083ad41._.js.map