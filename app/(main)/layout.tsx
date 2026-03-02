"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  Home,
  FileText,
  ClipboardList,
  ChevronDown,
  User,
} from "lucide-react";

/* =======================
   Helpers
======================= */
function useSidebarExpanded() {
  const [expanded, setExpanded] = useState(false);

  return {
    expanded,
    bind: {
      onMouseEnter: () => setExpanded(true),
      onMouseLeave: () => setExpanded(false),
    },
  };
}

function NavItem({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "group/item flex items-center gap-3 rounded-xl px-3 py-2 transition",
        "text-white/90 hover:bg-white/15 hover:text-white",
        active ? "bg-white/20 text-white" : "",
      ].join(" ")}
    >
      <span className="grid h-9 w-9 place-items-center">{icon}</span>

      <span
        className={[
          "whitespace-nowrap text-sm font-semibold",
          "opacity-0 -translate-x-2 transition-all duration-200",
          "group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0",
        ].join(" ")}
      >
        {label}
      </span>
    </Link>
  );
}

/* =======================
   Dropdown Sidebar
======================= */
function SidebarDropdown({
  expanded,
  rootLabel,
  rootIcon,
  isActiveRoot,
  items,
}: {
  expanded: boolean;
  rootLabel: string;
  rootIcon: React.ReactNode;
  isActiveRoot: boolean;
  items: Array<{
    href: string;
    label: string;
    active: boolean;
  }>;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (!expanded) setOpen(false);
  }, [expanded]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={[
          "group/item w-full flex items-center gap-3 rounded-xl px-3 py-2 transition",
          "text-white/90 hover:bg-white/15 hover:text-white",
          isActiveRoot ? "bg-white/20 text-white" : "",
        ].join(" ")}
      >
        <span className="grid h-9 w-9 place-items-center">{rootIcon}</span>

        <span
          className={[
            "flex-1 whitespace-nowrap text-sm font-semibold text-left",
            "opacity-0 -translate-x-2 transition-all duration-200",
            "group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0",
          ].join(" ")}
        >
          {rootLabel}
        </span>

        <span
          className={[
            "opacity-0 transition-all duration-200",
            "group-hover/sidebar:opacity-100",
          ].join(" ")}
        >
          <ChevronDown
            size={16}
            className={[
              "transition-transform duration-200",
              open ? "rotate-180" : "rotate-0",
            ].join(" ")}
          />
        </span>
      </button>

      {/* Expanded: submenu dalam sidebar */}
      {expanded && open && (
        <div className="mt-2 ml-[44px] mr-2 rounded-xl bg-white/10 p-2">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className={[
                "block rounded-lg px-3 py-2 text-sm transition",
                it.active
                  ? "bg-white/20 text-white font-semibold"
                  : "text-white/90 hover:bg-white/15",
              ].join(" ")}
            >
              {it.label}
            </Link>
          ))}
        </div>
      )}

      {/* Collapsed: popover di samping */}
      {!expanded && open && (
        <div className="absolute left-[76px] top-1/2 -translate-y-1/2 w-[260px] rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-100">
            <div className="text-xs font-semibold tracking-wide text-zinc-500">
              {rootLabel.toUpperCase()}
            </div>
          </div>

          <div className="p-2">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className={[
                  "block rounded-xl px-3 py-2 text-sm transition",
                  it.active
                    ? "bg-[#123473]/10 text-[#123473] font-semibold"
                    : "text-zinc-700 hover:bg-zinc-50",
                ].join(" ")}
              >
                {it.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* =======================
   Layout
======================= */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { expanded, bind } = useSidebarExpanded();

  const bahanActiveRoot = pathname.startsWith("/bahan_rapat");
  const usulanActiveRoot = pathname.startsWith("/usulan");
  const profileActive = pathname.startsWith("/profile");

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* bubbles background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_top,rgba(18,52,115,0.35),transparent_60%)]" />

        <div className="absolute bottom-[-140px] left-[-220px] h-[520px] w-[520px] rounded-full bg-[#123473]/30 animate-floating shadow-[0_0_70px_rgba(18,52,115,0.22)]" />
        <div className="absolute bottom-[-220px] left-[-70px] h-[420px] w-[420px] rounded-full bg-[#123473]/55 animate-floating-slow shadow-[0_0_80px_rgba(18,52,115,0.20)]" />

        <div className="absolute bottom-[-140px] right-[-220px] h-[520px] w-[520px] rounded-full bg-[#123473]/30 animate-floating shadow-[0_0_70px_rgba(18,52,115,0.22)]" />
        <div className="absolute bottom-[-220px] right-[-70px] h-[420px] w-[420px] rounded-full bg-[#123473]/55 animate-floating-slow shadow-[0_0_80px_rgba(18,52,115,0.20)]" />
      </div>

      <div className="relative flex">
        {/* sidebar */}
        <aside
          {...bind}
          className={[
            "group/sidebar sticky top-0 h-screen shrink-0",
            "w-[72px] hover:w-[240px]",
            "bg-[#123473] text-white shadow-lg",
            "transition-all duration-300 ease-in-out overflow-hidden",
            "flex flex-col",
          ].join(" ")}
        >
          <div className="flex h-14 items-center justify-center border-b border-white/15">
            <Menu className="h-6 w-6" />
          </div>

          <nav className="flex flex-col gap-2 px-3 py-6">
            <NavItem
              href="/dashboard"
              icon={<Home size={18} />}
              label="Dashboard"
              active={pathname === "/dashboard"}
            />

            <SidebarDropdown
              expanded={expanded}
              rootLabel="Bahan Rapat"
              rootIcon={<FileText size={18} />}
              isActiveRoot={bahanActiveRoot}
              items={[
                {
                  href: "/bahan_rapat/buat",
                  label: "Buat Bahan Rapat",
                  active: pathname.startsWith("/bahan_rapat/buat"),
                },
                {
                  href: "/bahan_rapat/daftar",
                  label: "Daftar Bahan Rapat",
                  active: pathname.startsWith("/bahan_rapat/daftar"),
                },
              ]}
            />

            <SidebarDropdown
              expanded={expanded}
              rootLabel="Usulan"
              rootIcon={<ClipboardList size={18} />}
              isActiveRoot={usulanActiveRoot}
              items={[
                {
                  href: "/usulan/daftar_usulan",
                  label: "Daftar Usulan",
                  active: pathname === "/usulan/daftar_usulan",
                },
                {
                  href: "/usulan/input_usulan",
                  label: "Input Usulan",
                  active: pathname.startsWith("/usulan/input_usulan"),
                },
              ]}
            />

            {/*Profil sekarang link biasa ke /profile */}
            <NavItem
              href="/profile"
              icon={<User size={18} />}
              label="Profile"
              active={profileActive}
            />
          </nav>
        </aside>

        {/* content */}
        <main className="flex-1 px-5 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
