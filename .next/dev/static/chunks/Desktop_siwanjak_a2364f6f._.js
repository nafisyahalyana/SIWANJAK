(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DaftarUsulanPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const STORAGE_KEY = "bnn_usulan_v1";
const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 300;
/**
 * Load + MIGRASI data lama:
 * - dulu: pktGol
 * - sekarang: pangkatGol + jenisPegawai + jabatanUsulan + keterangan
 */ function loadUsulan() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const arr = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(arr)) return [];
        let changed = false;
        const migrated = arr.map((x)=>{
            const pangkatGol = String(x?.pangkatGol ?? "").trim() || String(x?.pktGol ?? "").trim();
            if (x?.pangkatGol == null && x?.pktGol != null) changed = true;
            if (x?.jenisPegawai == null) changed = true;
            if (x?.jabatanUsulan == null) changed = true;
            if (x?.keterangan == null) changed = true;
            const jenisPegawaiRaw = String(x?.jenisPegawai ?? "PNS").toUpperCase().trim();
            const jenisPegawai = jenisPegawaiRaw === "POLRI" ? "POLRI" : jenisPegawaiRaw === "TNI" ? "TNI" : "PNS";
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
                updatedAt: x?.updatedAt ? String(x.updatedAt) : undefined
            };
        });
        if (changed) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        }
        return migrated;
    } catch  {
        return [];
    }
}
function saveUsulan(next) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
function normalize(s) {
    return String(s ?? "").toLowerCase().trim();
}
function useDebouncedValue(value, delayMs) {
    _s();
    const [debounced, setDebounced] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDebouncedValue.useEffect": ()=>{
            const t = window.setTimeout({
                "useDebouncedValue.useEffect.t": ()=>setDebounced(value)
            }["useDebouncedValue.useEffect.t"], delayMs);
            return ({
                "useDebouncedValue.useEffect": ()=>window.clearTimeout(t)
            })["useDebouncedValue.useEffect"];
        }
    }["useDebouncedValue.useEffect"], [
        value,
        delayMs
    ]);
    return debounced;
}
_s(useDebouncedValue, "33bQBlXg6j7MFSTRBeGy5/ui5G8=");
/** bikin daftar page compact: [1, "...", 4,5,6, "...", 20] */ function getPaginationRange(current, total, siblingCount = 1) {
    if (total <= 7) return Array.from({
        length: total
    }, (_, i)=>i + 1);
    const firstPage = 1;
    const lastPage = total;
    const leftSibling = Math.max(current - siblingCount, firstPage);
    const rightSibling = Math.min(current + siblingCount, lastPage);
    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < total - 1;
    if (!showLeftDots && showRightDots) {
        const leftRange = Array.from({
            length: 3 + 2 * siblingCount
        }, (_, i)=>i + 1);
        return [
            ...leftRange,
            "...",
            lastPage
        ];
    }
    if (showLeftDots && !showRightDots) {
        const start = total - (3 + 2 * siblingCount) + 1;
        const rightRange = Array.from({
            length: 3 + 2 * siblingCount
        }, (_, i)=>start + i);
        return [
            firstPage,
            "...",
            ...rightRange
        ];
    }
    const middleRange = Array.from({
        length: rightSibling - leftSibling + 1
    }, (_, i)=>leftSibling + i);
    return [
        firstPage,
        "...",
        ...middleRange,
        "...",
        lastPage
    ];
}
function DaftarUsulanPage() {
    _s1();
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [queryInput, setQueryInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const queryDebounced = useDebouncedValue(queryInput, SEARCH_DEBOUNCE_MS);
    // ✅ SORT STATE
    const [sortKey, setSortKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("createdAt");
    const [sortDir, setSortDir] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("desc");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DaftarUsulanPage.useEffect": ()=>{
            setRows(loadUsulan());
        }
    }["DaftarUsulanPage.useEffect"], []);
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DaftarUsulanPage.useMemo[data]": ()=>rows
    }["DaftarUsulanPage.useMemo[data]"], [
        rows
    ]);
    function toggleSort(key) {
        setPage(1);
        setSortKey((prevKey)=>{
            if (prevKey !== key) {
                setSortDir("asc");
                return key;
            }
            setSortDir((d)=>d === "asc" ? "desc" : "asc");
            return prevKey;
        });
    }
    function sortIndicator(key) {
        if (sortKey !== key) return "";
        return sortDir === "asc" ? " ▲" : " ▼";
    }
    function compare(a, b) {
        const av = a[sortKey];
        const bv = b[sortKey];
        // createdAt ISO string => aman dibanding string langsung
        const as = sortKey === "createdAt" ? String(av ?? "") : normalize(av);
        const bs = sortKey === "createdAt" ? String(bv ?? "") : normalize(bv);
        if (as < bs) return sortDir === "asc" ? -1 : 1;
        if (as > bs) return sortDir === "asc" ? 1 : -1;
        return 0;
    }
    const filteredData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DaftarUsulanPage.useMemo[filteredData]": ()=>{
            if (editingId) return data;
            const q = normalize(queryDebounced);
            const base = !q ? data : data.filter({
                "DaftarUsulanPage.useMemo[filteredData]": (r)=>{
                    const hay = [
                        r.esl,
                        r.jabatan,
                        r.nama,
                        r.jenisPegawai,
                        r.pangkatGol,
                        r.jabatanUsulan,
                        r.keterangan,
                        r.nrpNip
                    ].map(normalize);
                    return hay.some({
                        "DaftarUsulanPage.useMemo[filteredData]": (x)=>x.includes(q)
                    }["DaftarUsulanPage.useMemo[filteredData]"]);
                }
            }["DaftarUsulanPage.useMemo[filteredData]"]);
            // ✅ sort setelah filter
            return base.slice().sort(compare);
        }
    }["DaftarUsulanPage.useMemo[filteredData]"], [
        data,
        queryDebounced,
        editingId,
        sortKey,
        sortDir
    ]);
    const totalPages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DaftarUsulanPage.useMemo[totalPages]": ()=>{
            return Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
        }
    }["DaftarUsulanPage.useMemo[totalPages]"], [
        filteredData.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DaftarUsulanPage.useEffect": ()=>{
            setPage(1);
        }
    }["DaftarUsulanPage.useEffect"], [
        queryDebounced
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DaftarUsulanPage.useEffect": ()=>{
            if (page > totalPages) setPage(totalPages);
        }
    }["DaftarUsulanPage.useEffect"], [
        page,
        totalPages
    ]);
    const visibleRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DaftarUsulanPage.useMemo[visibleRows]": ()=>{
            if (editingId) return data.filter({
                "DaftarUsulanPage.useMemo[visibleRows]": (r)=>r.id === editingId
            }["DaftarUsulanPage.useMemo[visibleRows]"]);
            const start = (page - 1) * PAGE_SIZE;
            const end = start + PAGE_SIZE;
            return filteredData.slice(start, end);
        }
    }["DaftarUsulanPage.useMemo[visibleRows]"], [
        data,
        filteredData,
        editingId,
        page
    ]);
    const paginationRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DaftarUsulanPage.useMemo[paginationRange]": ()=>{
            return getPaginationRange(page, totalPages, 1);
        }
    }["DaftarUsulanPage.useMemo[paginationRange]"], [
        page,
        totalPages
    ]);
    function onDelete(id) {
        const ok = confirm("Yakin mau hapus data ini?");
        if (!ok) return;
        const next = rows.filter((r)=>r.id !== id);
        setRows(next);
        saveUsulan(next);
        if (editingId === id) {
            setEditingId(null);
            setDraft({});
        }
    }
    function startEdit(row) {
        setEditingId(row.id);
        setDraft({
            ...row
        });
    }
    function cancelEdit() {
        setEditingId(null);
        setDraft({});
    }
    function applyEdit() {
        if (!editingId) return;
        const now = new Date().toISOString();
        const jenisRaw = String(draft.jenisPegawai ?? "PNS").toUpperCase().trim();
        const jenisPegawai = jenisRaw === "POLRI" ? "POLRI" : jenisRaw === "TNI" ? "TNI" : "PNS";
        const next = rows.map((r)=>{
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
                updatedAt: now
            };
        });
        setRows(next);
        saveUsulan(next);
        cancelEdit();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-2 py-2",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto w-full max-w-[1300px] rounded-md bg-white shadow-[0_14px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[11px] font-semibold text-zinc-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "BADAN NARKOTIKA NASIONAL"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                        lineNumber: 323,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "REPUBLIK INDONESIA"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                        lineNumber: 324,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 h-[2px] w-[190px] bg-zinc-700/70"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                        lineNumber: 325,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 322,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 pt-2 text-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm font-bold tracking-wide text-zinc-900",
                                    children: "DAFTAR USULAN"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                    lineNumber: 329,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 328,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-[190px]"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 334,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                        lineNumber: 321,
                        columnNumber: 11
                    }, this),
                    editingId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 rounded-md border border-[#123473]/20 bg-[#123473]/5 px-4 py-3 text-xs text-[#123473]",
                        children: [
                            "Sedang mengedit 1 data. Klik ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "Batal"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 339,
                                columnNumber: 44
                            }, this),
                            " untuk kembali melihat semua daftar."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                        lineNumber: 338,
                        columnNumber: 13
                    }, this),
                    !editingId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-zinc-600",
                                children: [
                                    "Menampilkan ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-zinc-900",
                                        children: filteredData.length
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                        lineNumber: 347,
                                        columnNumber: 29
                                    }, this),
                                    " data",
                                    normalize(queryDebounced) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            " ",
                                            "untuk kata kunci",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-[#123473]",
                                                children: [
                                                    '"',
                                                    queryDebounced.trim(),
                                                    '"'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 352,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 346,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full sm:max-w-[420px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: queryInput,
                                    onChange: (e)=>setQueryInput(e.target.value),
                                    placeholder: "Search (nama / jabatan / esl / jenis / pangkat / usulan / nip)...",
                                    className: "h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-[#123473] focus:ring-2 focus:ring-[#123473]/20"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                    lineNumber: 358,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 357,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                        lineNumber: 345,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full border border-zinc-700 text-[12px] text-zinc-900",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "bg-zinc-200/80",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                className: "w-[60px] text-center",
                                                children: "NO"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 373,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                className: "w-[80px] text-center cursor-pointer select-none",
                                                onClick: ()=>toggleSort("esl"),
                                                title: "Klik untuk sort",
                                                children: [
                                                    "ESL",
                                                    sortIndicator("esl")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 375,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                className: "w-[170px] text-center cursor-pointer select-none",
                                                onClick: ()=>toggleSort("jabatan"),
                                                title: "Klik untuk sort",
                                                children: [
                                                    "JABATAN",
                                                    sortIndicator("jabatan")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 383,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                className: "w-[220px] text-center cursor-pointer select-none",
                                                onClick: ()=>toggleSort("nama"),
                                                title: "Klik untuk sort",
                                                children: [
                                                    "NAMA",
                                                    sortIndicator("nama")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 391,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                className: "w-[110px] text-center cursor-pointer select-none",
                                                onClick: ()=>toggleSort("jenisPegawai"),
                                                title: "Klik untuk sort",
                                                children: [
                                                    "JENIS",
                                                    sortIndicator("jenisPegawai")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 399,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                className: "w-[160px] text-center cursor-pointer select-none",
                                                onClick: ()=>toggleSort("pangkatGol"),
                                                title: "Klik untuk sort",
                                                children: [
                                                    "PANGKAT/GOL",
                                                    sortIndicator("pangkatGol")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 407,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                className: "w-[200px] text-center cursor-pointer select-none",
                                                onClick: ()=>toggleSort("jabatanUsulan"),
                                                title: "Klik untuk sort",
                                                children: [
                                                    "JABATAN USULAN",
                                                    sortIndicator("jabatanUsulan")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 415,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                className: "w-[240px] text-center cursor-pointer select-none",
                                                onClick: ()=>toggleSort("keterangan"),
                                                title: "Klik untuk sort",
                                                children: [
                                                    "KETERANGAN",
                                                    sortIndicator("keterangan")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 423,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                className: "w-[130px] text-center cursor-pointer select-none",
                                                onClick: ()=>toggleSort("nrpNip"),
                                                title: "Klik untuk sort",
                                                children: [
                                                    "NRP/NIP",
                                                    sortIndicator("nrpNip")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 431,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                className: "w-[160px] text-center",
                                                children: "AKSI"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 439,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                        lineNumber: 372,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                    lineNumber: 371,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: data.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-t border-zinc-700",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                            colSpan: 10,
                                            className: "py-10 text-center text-zinc-500",
                                            children: "Belum ada data. Silakan input usulan dulu."
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                            lineNumber: 446,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                        lineNumber: 445,
                                        columnNumber: 19
                                    }, this) : !editingId && filteredData.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-t border-zinc-700",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                            colSpan: 10,
                                            className: "py-10 text-center text-zinc-500",
                                            children: [
                                                "Data tidak ditemukan untuk kata kunci ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                    children: [
                                                        '"',
                                                        queryDebounced.trim(),
                                                        '"'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 61
                                                }, this),
                                                "."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                            lineNumber: 452,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                        lineNumber: 451,
                                        columnNumber: 19
                                    }, this) : visibleRows.map((r, idx)=>{
                                        const isEdit = editingId === r.id;
                                        const listNo = editingId ? data.findIndex((x)=>x.id === r.id) + 1 : (page - 1) * PAGE_SIZE + idx + 1;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-t border-zinc-700 align-top",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    className: "text-center",
                                                    children: [
                                                        listNo,
                                                        "."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 465,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CellInput, {
                                                        value: String(draft.esl ?? ""),
                                                        onChange: (v)=>setDraft((p)=>({
                                                                    ...p,
                                                                    esl: v
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 469,
                                                        columnNumber: 29
                                                    }, this) : r.esl
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 467,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CellInput, {
                                                        value: String(draft.jabatan ?? ""),
                                                        onChange: (v)=>setDraft((p)=>({
                                                                    ...p,
                                                                    jabatan: v
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 480,
                                                        columnNumber: 29
                                                    }, this) : r.jabatan
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 478,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CellInput, {
                                                        value: String(draft.nama ?? ""),
                                                        onChange: (v)=>setDraft((p)=>({
                                                                    ...p,
                                                                    nama: v
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 491,
                                                        columnNumber: 29
                                                    }, this) : r.nama
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 489,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CellInput, {
                                                        value: String(draft.jenisPegawai ?? ""),
                                                        onChange: (v)=>setDraft((p)=>({
                                                                    ...p,
                                                                    jenisPegawai: v
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 502,
                                                        columnNumber: 29
                                                    }, this) : r.jenisPegawai
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 500,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CellInput, {
                                                        value: String(draft.pangkatGol ?? ""),
                                                        onChange: (v)=>setDraft((p)=>({
                                                                    ...p,
                                                                    pangkatGol: v
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 515,
                                                        columnNumber: 29
                                                    }, this) : r.pangkatGol
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 513,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CellInput, {
                                                        value: String(draft.jabatanUsulan ?? ""),
                                                        onChange: (v)=>setDraft((p)=>({
                                                                    ...p,
                                                                    jabatanUsulan: v
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 526,
                                                        columnNumber: 29
                                                    }, this) : r.jabatanUsulan
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 524,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CellInput, {
                                                        value: String(draft.keterangan ?? ""),
                                                        onChange: (v)=>setDraft((p)=>({
                                                                    ...p,
                                                                    keterangan: v
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 539,
                                                        columnNumber: 29
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "whitespace-pre-wrap",
                                                        children: r.keterangan || "-"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 544,
                                                        columnNumber: 29
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 537,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CellInput, {
                                                        value: String(draft.nrpNip ?? ""),
                                                        onChange: (v)=>setDraft((p)=>({
                                                                    ...p,
                                                                    nrpNip: v
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 550,
                                                        columnNumber: 29
                                                    }, this) : r.nrpNip
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 548,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center gap-2",
                                                        children: !isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#123473]/40 bg-white text-[#123473] shadow-sm transition hover:bg-[#123473]/5 active:scale-[0.98]",
                                                                    title: "Edit",
                                                                    onClick: ()=>startEdit(r),
                                                                    disabled: !!editingId,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                                        size: 18
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                                        lineNumber: 570,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                                    lineNumber: 563,
                                                                    columnNumber: 33
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "inline-flex h-9 w-9 items-center justify-center rounded-md border border-red-500/40 bg-white text-red-600 shadow-sm transition hover:bg-red-50 active:scale-[0.98]",
                                                                    title: "Hapus",
                                                                    onClick: ()=>onDelete(r.id),
                                                                    disabled: !!editingId,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                        size: 18
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                                        lineNumber: 580,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                                    lineNumber: 573,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "rounded-md bg-[#123473] px-3 py-2 text-xs font-semibold text-white hover:brightness-110",
                                                                    onClick: applyEdit,
                                                                    children: "Simpan"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                                    lineNumber: 585,
                                                                    columnNumber: 33
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "rounded-md border border-zinc-300 px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50",
                                                                    onClick: cancelEdit,
                                                                    children: "Batal"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                                    lineNumber: 592,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, void 0, true)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 560,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 559,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, r.id, true, {
                                            fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                            lineNumber: 464,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                    lineNumber: 443,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                            lineNumber: 370,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                        lineNumber: 369,
                        columnNumber: 11
                    }, this),
                    !editingId && filteredData.length > 0 && totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex flex-col items-center justify-center gap-2 text-xs sm:flex-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setPage((p)=>Math.max(1, p - 1)),
                                disabled: page === 1,
                                className: "rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-700 transition disabled:cursor-not-allowed disabled:opacity-40",
                                children: "Prev"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 614,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-center gap-2",
                                children: paginationRange.map((it, idx)=>it === "..." ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-1 text-zinc-400",
                                        children: "..."
                                    }, `dots-${idx}`, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                        lineNumber: 626,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setPage(it),
                                        className: [
                                            "h-9 min-w-9 rounded-md border px-2 font-semibold transition",
                                            it === page ? "bg-[#123473] text-white border-[#123473] shadow-sm" : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50"
                                        ].join(" "),
                                        children: it
                                    }, it, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                        lineNumber: 630,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 623,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setPage((p)=>Math.min(totalPages, p + 1)),
                                disabled: page === totalPages,
                                className: "rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-700 transition disabled:cursor-not-allowed disabled:opacity-40",
                                children: "Next"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 647,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                        lineNumber: 613,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-10 text-[10px] text-zinc-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "Biro SDM Aparatur dan Organisasi"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 660,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "Sekretariat Utama BNN 2026"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 661,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                        lineNumber: 659,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                lineNumber: 319,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
            lineNumber: 318,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
        lineNumber: 317,
        columnNumber: 5
    }, this);
}
_s1(DaftarUsulanPage, "n+woWl+xrJsVraq/AjbC6JY3bR4=", false, function() {
    return [
        useDebouncedValue
    ];
});
_c = DaftarUsulanPage;
function Th({ children, className = "", onClick, title }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        onClick: onClick,
        title: title,
        className: [
            "border border-zinc-700 px-3 py-2 font-bold",
            onClick ? "hover:bg-zinc-300/70" : "",
            className
        ].join(" "),
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
        lineNumber: 681,
        columnNumber: 5
    }, this);
}
_c1 = Th;
function Td({ children, className = "", colSpan }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
        colSpan: colSpan,
        className: [
            "border border-zinc-700 px-3 py-3",
            className
        ].join(" "),
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
        lineNumber: 705,
        columnNumber: 5
    }, this);
}
_c2 = Td;
function CellInput({ value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        value: value,
        onChange: (e)=>onChange(e.target.value),
        className: "h-9 w-full rounded-md border border-zinc-300 bg-white px-2 text-[12px] outline-none focus:border-[#123473] focus:ring-2 focus:ring-[#123473]/20"
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
        lineNumber: 719,
        columnNumber: 5
    }, this);
}
_c3 = CellInput;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "DaftarUsulanPage");
__turbopack_context__.k.register(_c1, "Th");
__turbopack_context__.k.register(_c2, "Td");
__turbopack_context__.k.register(_c3, "CellInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Pencil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
            key: "1a8usu"
        }
    ],
    [
        "path",
        {
            d: "m15 5 4 4",
            key: "1mk7zo"
        }
    ]
];
const Pencil = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("pencil", __iconNode);
;
 //# sourceMappingURL=pencil.js.map
}),
"[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Pencil",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript)");
}),
"[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Trash2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M10 11v6",
            key: "nco0om"
        }
    ],
    [
        "path",
        {
            d: "M14 11v6",
            key: "outv1u"
        }
    ],
    [
        "path",
        {
            d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
            key: "miytrc"
        }
    ],
    [
        "path",
        {
            d: "M3 6h18",
            key: "d0wm0j"
        }
    ],
    [
        "path",
        {
            d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
            key: "e791ji"
        }
    ]
];
const Trash2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("trash-2", __iconNode);
;
 //# sourceMappingURL=trash-2.js.map
}),
"[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Trash2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=Desktop_siwanjak_a2364f6f._.js.map