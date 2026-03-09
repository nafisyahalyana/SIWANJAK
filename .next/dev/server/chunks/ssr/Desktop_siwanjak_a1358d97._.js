module.exports = [
"[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DaftarUsulanPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/pencil.js [app-ssr] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$up$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsUpDown$3e$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/chevrons-up-down.js [app-ssr] (ecmascript) <export default as ChevronsUpDown>");
"use client";
;
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
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
}
function saveUsulan(next) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
function normalize(s) {
    return String(s ?? "").toLowerCase().trim();
}
function useDebouncedValue(value, delayMs) {
    const [debounced, setDebounced] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(value);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const t = window.setTimeout(()=>setDebounced(value), delayMs);
        return ()=>window.clearTimeout(t);
    }, [
        value,
        delayMs
    ]);
    return debounced;
}
function getPaginationRange(current, total, siblingCount = 1) {
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
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [queryInput, setQueryInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const queryDebounced = useDebouncedValue(queryInput, SEARCH_DEBOUNCE_MS);
    // ✅ SORT
    const [sortKey, setSortKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("createdAt");
    const [sortDir, setSortDir] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("desc");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setRows(loadUsulan());
    }, []);
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>rows, [
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
    function compare(a, b) {
        const av = a[sortKey];
        const bv = b[sortKey];
        const as = sortKey === "createdAt" ? String(av ?? "") : normalize(av);
        const bs = sortKey === "createdAt" ? String(bv ?? "") : normalize(bv);
        if (as < bs) return sortDir === "asc" ? -1 : 1;
        if (as > bs) return sortDir === "asc" ? 1 : -1;
        return 0;
    }
    const filteredData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (editingId) return data;
        const q = normalize(queryDebounced);
        const base = !q ? data : data.filter((r)=>{
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
            return hay.some((x)=>x.includes(q));
        });
        return base.slice().sort(compare);
    }, [
        data,
        queryDebounced,
        editingId,
        sortKey,
        sortDir
    ]);
    const totalPages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
    }, [
        filteredData.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setPage(1);
    }, [
        queryDebounced
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (page > totalPages) setPage(totalPages);
    }, [
        page,
        totalPages
    ]);
    const visibleRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (editingId) return data.filter((r)=>r.id === editingId);
        const start = (page - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        return filteredData.slice(start, end);
    }, [
        data,
        filteredData,
        editingId,
        page
    ]);
    const paginationRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return getPaginationRange(page, totalPages, 1);
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-2 py-2",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto w-full max-w-[1300px] rounded-md bg-white shadow-[0_14px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[11px] font-semibold text-zinc-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "BADAN NARKOTIKA NASIONAL"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                        lineNumber: 317,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "REPUBLIK INDONESIA"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                        lineNumber: 318,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 h-[2px] w-[190px] bg-zinc-700/70"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                        lineNumber: 319,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 316,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 pt-2 text-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm font-bold tracking-wide text-zinc-900",
                                    children: "DAFTAR USULAN"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                    lineNumber: 323,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 322,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-[190px]"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 328,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                        lineNumber: 315,
                        columnNumber: 11
                    }, this),
                    editingId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 rounded-md border border-[#123473]/20 bg-[#123473]/5 px-4 py-3 text-xs text-[#123473]",
                        children: [
                            "Sedang mengedit 1 data. Klik ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "Batal"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 333,
                                columnNumber: 44
                            }, this),
                            " untuk kembali melihat semua daftar."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                        lineNumber: 332,
                        columnNumber: 13
                    }, this),
                    !editingId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-zinc-600",
                                children: [
                                    "Menampilkan ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-zinc-900",
                                        children: filteredData.length
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                        lineNumber: 341,
                                        columnNumber: 29
                                    }, this),
                                    " data",
                                    normalize(queryDebounced) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            " ",
                                            "untuk kata kunci",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-[#123473]",
                                                children: [
                                                    '"',
                                                    queryDebounced.trim(),
                                                    '"'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 346,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 340,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full sm:max-w-[420px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: queryInput,
                                    onChange: (e)=>setQueryInput(e.target.value),
                                    placeholder: "Search",
                                    className: "h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-[#123473] focus:ring-2 focus:ring-[#123473]/20"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                    lineNumber: 352,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 351,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                        lineNumber: 339,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full border border-zinc-700 text-[12px] text-zinc-900",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "bg-zinc-200/80",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                className: "w-[60px] text-center",
                                                children: "NO"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 367,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTh, {
                                                className: "w-[80px] text-center",
                                                label: "ESL",
                                                colKey: "esl",
                                                sortKey: sortKey,
                                                sortDir: sortDir,
                                                onSort: toggleSort
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 369,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTh, {
                                                className: "w-[170px] text-center",
                                                label: "JABATAN",
                                                colKey: "jabatan",
                                                sortKey: sortKey,
                                                sortDir: sortDir,
                                                onSort: toggleSort
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 378,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTh, {
                                                className: "w-[220px] text-center",
                                                label: "NAMA",
                                                colKey: "nama",
                                                sortKey: sortKey,
                                                sortDir: sortDir,
                                                onSort: toggleSort
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 387,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTh, {
                                                className: "w-[110px] text-center",
                                                label: "JENIS",
                                                colKey: "jenisPegawai",
                                                sortKey: sortKey,
                                                sortDir: sortDir,
                                                onSort: toggleSort
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 396,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTh, {
                                                className: "w-[160px] text-center",
                                                label: "PANGKAT/GOL",
                                                colKey: "pangkatGol",
                                                sortKey: sortKey,
                                                sortDir: sortDir,
                                                onSort: toggleSort
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 405,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTh, {
                                                className: "w-[200px] text-center",
                                                label: "JABATAN USULAN",
                                                colKey: "jabatanUsulan",
                                                sortKey: sortKey,
                                                sortDir: sortDir,
                                                onSort: toggleSort
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 414,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTh, {
                                                className: "w-[240px] text-center",
                                                label: "KETERANGAN",
                                                colKey: "keterangan",
                                                sortKey: sortKey,
                                                sortDir: sortDir,
                                                onSort: toggleSort
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 423,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTh, {
                                                className: "w-[130px] text-center",
                                                label: "NRP/NIP",
                                                colKey: "nrpNip",
                                                sortKey: sortKey,
                                                sortDir: sortDir,
                                                onSort: toggleSort
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 432,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                                className: "w-[160px] text-center",
                                                children: "AKSI"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                lineNumber: 441,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                        lineNumber: 366,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                    lineNumber: 365,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: data.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-t border-zinc-700",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                            colSpan: 10,
                                            className: "py-10 text-center text-zinc-500",
                                            children: "Belum ada data. Silakan input usulan dulu."
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                            lineNumber: 448,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                        lineNumber: 447,
                                        columnNumber: 19
                                    }, this) : !editingId && filteredData.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-t border-zinc-700",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                            colSpan: 10,
                                            className: "py-10 text-center text-zinc-500",
                                            children: [
                                                "Data tidak ditemukan untuk kata kunci ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                    children: [
                                                        '"',
                                                        queryDebounced.trim(),
                                                        '"'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 61
                                                }, this),
                                                "."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                            lineNumber: 454,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                        lineNumber: 453,
                                        columnNumber: 19
                                    }, this) : visibleRows.map((r, idx)=>{
                                        const isEdit = editingId === r.id;
                                        const listNo = editingId ? data.findIndex((x)=>x.id === r.id) + 1 : (page - 1) * PAGE_SIZE + idx + 1;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-t border-zinc-700 align-top",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    className: "text-center",
                                                    children: [
                                                        listNo,
                                                        "."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 467,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CellInput, {
                                                        value: String(draft.esl ?? ""),
                                                        onChange: (v)=>setDraft((p)=>({
                                                                    ...p,
                                                                    esl: v
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 29
                                                    }, this) : r.esl
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 469,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CellInput, {
                                                        value: String(draft.jabatan ?? ""),
                                                        onChange: (v)=>setDraft((p)=>({
                                                                    ...p,
                                                                    jabatan: v
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 482,
                                                        columnNumber: 29
                                                    }, this) : r.jabatan
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 480,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CellInput, {
                                                        value: String(draft.nama ?? ""),
                                                        onChange: (v)=>setDraft((p)=>({
                                                                    ...p,
                                                                    nama: v
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 493,
                                                        columnNumber: 29
                                                    }, this) : r.nama
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 491,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CellInput, {
                                                        value: String(draft.jenisPegawai ?? ""),
                                                        onChange: (v)=>setDraft((p)=>({
                                                                    ...p,
                                                                    jenisPegawai: v
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 504,
                                                        columnNumber: 29
                                                    }, this) : r.jenisPegawai
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 502,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CellInput, {
                                                        value: String(draft.pangkatGol ?? ""),
                                                        onChange: (v)=>setDraft((p)=>({
                                                                    ...p,
                                                                    pangkatGol: v
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 517,
                                                        columnNumber: 29
                                                    }, this) : r.pangkatGol
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 515,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CellInput, {
                                                        value: String(draft.jabatanUsulan ?? ""),
                                                        onChange: (v)=>setDraft((p)=>({
                                                                    ...p,
                                                                    jabatanUsulan: v
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 528,
                                                        columnNumber: 29
                                                    }, this) : r.jabatanUsulan
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 526,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CellInput, {
                                                        value: String(draft.keterangan ?? ""),
                                                        onChange: (v)=>setDraft((p)=>({
                                                                    ...p,
                                                                    keterangan: v
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 541,
                                                        columnNumber: 29
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "whitespace-pre-wrap",
                                                        children: r.keterangan || "-"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 546,
                                                        columnNumber: 29
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 539,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CellInput, {
                                                        value: String(draft.nrpNip ?? ""),
                                                        onChange: (v)=>setDraft((p)=>({
                                                                    ...p,
                                                                    nrpNip: v
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 552,
                                                        columnNumber: 29
                                                    }, this) : r.nrpNip
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 550,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center gap-2",
                                                        children: !isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#123473]/40 bg-white text-[#123473] shadow-sm transition hover:bg-[#123473]/5 active:scale-[0.98]",
                                                                    title: "Edit",
                                                                    onClick: ()=>startEdit(r),
                                                                    disabled: !!editingId,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                                        size: 18
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                                        lineNumber: 572,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                                    lineNumber: 565,
                                                                    columnNumber: 33
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "inline-flex h-9 w-9 items-center justify-center rounded-md border border-red-500/40 bg-white text-red-600 shadow-sm transition hover:bg-red-50 active:scale-[0.98]",
                                                                    title: "Hapus",
                                                                    onClick: ()=>onDelete(r.id),
                                                                    disabled: !!editingId,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                        size: 18
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                                        lineNumber: 582,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                                    lineNumber: 575,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "rounded-md bg-[#123473] px-3 py-2 text-xs font-semibold text-white hover:brightness-110",
                                                                    onClick: applyEdit,
                                                                    children: "Simpan"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                                    lineNumber: 587,
                                                                    columnNumber: 33
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "rounded-md border border-zinc-300 px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50",
                                                                    onClick: cancelEdit,
                                                                    children: "Batal"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                                    lineNumber: 594,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, void 0, true)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                        lineNumber: 562,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                                    lineNumber: 561,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, r.id, true, {
                                            fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                            lineNumber: 466,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                    lineNumber: 445,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                            lineNumber: 364,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                        lineNumber: 363,
                        columnNumber: 11
                    }, this),
                    !editingId && filteredData.length > 0 && totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex flex-col items-center justify-center gap-2 text-xs sm:flex-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setPage((p)=>Math.max(1, p - 1)),
                                disabled: page === 1,
                                className: "rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-700 transition disabled:cursor-not-allowed disabled:opacity-40",
                                children: "Prev"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 616,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-center gap-2",
                                children: paginationRange.map((it, idx)=>it === "..." ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-1 text-zinc-400",
                                        children: "..."
                                    }, `dots-${idx}`, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                        lineNumber: 628,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setPage(it),
                                        className: [
                                            "h-9 min-w-9 rounded-md border px-2 font-semibold transition",
                                            it === page ? "bg-[#123473] text-white border-[#123473] shadow-sm" : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50"
                                        ].join(" "),
                                        children: it
                                    }, it, false, {
                                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                        lineNumber: 632,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 625,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setPage((p)=>Math.min(totalPages, p + 1)),
                                disabled: page === totalPages,
                                className: "rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-700 transition disabled:cursor-not-allowed disabled:opacity-40",
                                children: "Next"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 649,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                        lineNumber: 615,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-10 text-[10px] text-zinc-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "Biro SDM Aparatur dan Organisasi"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 662,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "Sekretariat Utama BNN 2026"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                                lineNumber: 663,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                        lineNumber: 661,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                lineNumber: 313,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
            lineNumber: 312,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
        lineNumber: 311,
        columnNumber: 5
    }, this);
}
function SortIcon({ active, dir }) {
    if (!active) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$up$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsUpDown$3e$__["ChevronsUpDown"], {
        className: "h-4 w-4 text-zinc-500"
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
        lineNumber: 678,
        columnNumber: 23
    }, this);
    if (dir === "asc") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
        className: "h-4 w-4 text-zinc-900"
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
        lineNumber: 679,
        columnNumber: 29
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
        className: "h-4 w-4 text-zinc-900"
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
        lineNumber: 680,
        columnNumber: 10
    }, this);
}
function SortableTh({ label, colKey, sortKey, sortDir, onSort, className = "" }) {
    const active = sortKey === colKey;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
        onClick: ()=>onSort(colKey),
        title: "Klik untuk sort",
        className: [
            className,
            "cursor-pointer select-none",
            active ? "bg-zinc-300/60 text-zinc-950" : "text-zinc-900"
        ].join(" "),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: label
                }, void 0, false, {
                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                    lineNumber: 711,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortIcon, {
                    active: active,
                    dir: sortDir
                }, void 0, false, {
                    fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
                    lineNumber: 712,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
            lineNumber: 710,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
        lineNumber: 701,
        columnNumber: 5
    }, this);
}
function Th({ children, className = "", onClick, title }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
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
        lineNumber: 730,
        columnNumber: 5
    }, this);
}
function Td({ children, className = "", colSpan }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
        colSpan: colSpan,
        className: [
            "border border-zinc-700 px-3 py-3",
            className
        ].join(" "),
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
        lineNumber: 754,
        columnNumber: 5
    }, this);
}
function CellInput({ value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        value: value,
        onChange: (e)=>onChange(e.target.value),
        className: "h-9 w-full rounded-md border border-zinc-300 bg-white px-2 text-[12px] outline-none focus:border-[#123473] focus:ring-2 focus:ring-[#123473]/20"
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/usulan/daftar_usulan/page.tsx",
        lineNumber: 771,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/pencil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
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
const Pencil = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("pencil", __iconNode);
;
 //# sourceMappingURL=pencil.js.map
}),
"[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/pencil.js [app-ssr] (ecmascript) <export default as Pencil>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Pencil",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/pencil.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
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
const Trash2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("trash-2", __iconNode);
;
 //# sourceMappingURL=trash-2.js.map
}),
"[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Trash2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    ()=>ChevronUp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m18 15-6-6-6 6",
            key: "153udz"
        }
    ]
];
const ChevronUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("chevron-up", __iconNode);
;
 //# sourceMappingURL=chevron-up.js.map
}),
"[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/chevrons-up-down.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    ()=>ChevronsUpDown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m7 15 5 5 5-5",
            key: "1hf1tw"
        }
    ],
    [
        "path",
        {
            d: "m7 9 5-5 5 5",
            key: "sgt6xg"
        }
    ]
];
const ChevronsUpDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("chevrons-up-down", __iconNode);
;
 //# sourceMappingURL=chevrons-up-down.js.map
}),
"[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/chevrons-up-down.js [app-ssr] (ecmascript) <export default as ChevronsUpDown>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronsUpDown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$up$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$up$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/lucide-react/dist/esm/icons/chevrons-up-down.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=Desktop_siwanjak_a1358d97._.js.map