(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InputUsulanPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/siwanjak/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const STORAGE_KEY = "bnn_usulan_v1";
function loadUsulan() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch  {
        return [];
    }
}
function saveUsulan(next) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
function uid() {
    // simple id
    return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
function InputUsulanPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        esl: "",
        jabatan: "",
        nama: "",
        pktGol: "",
        nrpNip: ""
    });
    const disabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "InputUsulanPage.useMemo[disabled]": ()=>{
            return !form.esl.trim() || !form.jabatan.trim() || !form.nama.trim() || !form.pktGol.trim() || !form.nrpNip.trim();
        }
    }["InputUsulanPage.useMemo[disabled]"], [
        form
    ]);
    function onChange(key, value) {
        setForm((p)=>({
                ...p,
                [key]: value
            }));
    }
    function onSubmit(e) {
        e.preventDefault();
        // validasi simple
        if (disabled) {
            alert("Mohon lengkapi semua field.");
            return;
        }
        const nextItem = {
            id: uid(),
            esl: form.esl.trim(),
            jabatan: form.jabatan.trim(),
            nama: form.nama.trim(),
            pktGol: form.pktGol.trim(),
            nrpNip: form.nrpNip.trim(),
            createdAt: new Date().toISOString()
        };
        const prev = loadUsulan();
        const next = [
            nextItem,
            ...prev
        ]; // terbaru di atas
        saveUsulan(next);
        // reset (opsional)
        setForm({
            esl: "",
            jabatan: "",
            nama: "",
            pktGol: "",
            nrpNip: ""
        });
        // pindah ke daftar usulan
        router.push("/daftar_usulan");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-[calc(100vh-0px)] items-center justify-center px-4 py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-[420px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-md bg-white shadow-[0_18px_55px_rgba(0,0,0,0.14)] ring-1 ring-black/5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-10 pt-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-16 w-16",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/LogoBNN.png",
                                    alt: "BNN",
                                    fill: true,
                                    className: "object-contain",
                                    priority: true
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx",
                                    lineNumber: 101,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx",
                                lineNumber: 100,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "mt-4 text-center text-sm font-semibold tracking-wide text-zinc-900",
                            children: "INPUT USULAN"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx",
                            lineNumber: 112,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: onSubmit,
                            className: "mt-6 space-y-4 pb-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    label: "ESL",
                                    value: form.esl,
                                    onChange: (v)=>onChange("esl", v)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx",
                                    lineNumber: 118,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    label: "Jabatan",
                                    value: form.jabatan,
                                    onChange: (v)=>onChange("jabatan", v)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx",
                                    lineNumber: 119,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    label: "Nama",
                                    value: form.nama,
                                    onChange: (v)=>onChange("nama", v)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx",
                                    lineNumber: 124,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    label: "PKT/GOL",
                                    value: form.pktGol,
                                    onChange: (v)=>onChange("pktGol", v)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    label: "NRP/NIP",
                                    value: form.nrpNip,
                                    onChange: (v)=>onChange("nrpNip", v)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx",
                                    lineNumber: 130,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: disabled,
                                    className: [
                                        "mt-4 w-full rounded-md px-4 py-2.5",
                                        "text-xs font-semibold tracking-wide text-white",
                                        "shadow-[0_10px_25px_rgba(52,85,143,0.25)] transition",
                                        disabled ? "bg-[#34558f]/60 cursor-not-allowed" : "bg-[#34558f] hover:bg-[#2f4c80] active:bg-[#29416e]",
                                        "focus:outline-none focus:ring-2 focus:ring-[#34558f]/40 focus:ring-offset-2"
                                    ].join(" "),
                                    children: "SIMPAN"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx",
                            lineNumber: 117,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx",
                    lineNumber: 97,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx",
                lineNumber: 96,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx",
            lineNumber: 95,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_s(InputUsulanPage, "ZyzclmiXPvrR9D7z5dWNb2bB3P0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = InputUsulanPage;
/* =======================
   Reusable Field
======================= */ function Field({ label, value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mb-1 block text-[11px] text-zinc-700",
                children: label
            }, void 0, false, {
                fileName: "[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$siwanjak$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                value: value,
                onChange: (e)=>onChange(e.target.value),
                className: [
                    "h-9 w-full rounded-[4px]",
                    "border border-zinc-300 bg-white",
                    "px-3 text-sm text-zinc-900",
                    "placeholder:text-zinc-400",
                    "outline-none transition",
                    "focus:border-[#34558f] focus:ring-2 focus:ring-[#34558f]/20"
                ].join(" ")
            }, void 0, false, {
                fileName: "[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/siwanjak/app/(main)/input_usulan/page.tsx",
        lineNumber: 172,
        columnNumber: 5
    }, this);
}
_c1 = Field;
var _c, _c1;
__turbopack_context__.k.register(_c, "InputUsulanPage");
__turbopack_context__.k.register(_c1, "Field");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_siwanjak_app_%28main%29_input_usulan_page_tsx_3c9113f2._.js.map