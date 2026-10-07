"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DemoModeSwitch } from "./demo-mode-switch";
import { useDemo } from "@/lib/demo-state";
import { brand } from "@/lib/mock-data";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/subscribe", label: "Boxes" },
  { href: "/account", label: "Parent app" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { state } = useDemo();

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-forest"
              aria-hidden
            >
              <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]">
                <path
                  d="M8.2 7.4a3.8 3.8 0 0 1 7.6 0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <rect x="4.6" y="7.8" width="14.8" height="12" rx="3" fill="currentColor" />
                <path d="M4.6 12.2h14.8" stroke="#f4ab23" strokeWidth="1.7" />
                <circle cx="12" cy="16.1" r="1.15" fill="#f4ab23" />
              </svg>
            </span>
            <span>
              <span className="font-display block text-lg leading-tight font-semibold">
                {brand.name}
              </span>
              <span className="text-xs text-muted">{brand.tagline}</span>
            </span>
          </Link>
          <nav className="flex max-w-full flex-wrap items-center gap-1 text-sm font-semibold">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-1.5 ${
                    active
                      ? "bg-foreground text-background"
                      : "text-foreground/80 hover:bg-foreground/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <DemoModeSwitch />
          <p className="text-xs text-muted">
            Pitch prototype · parent web app
            {state.mode === "subscribed" ? (
              <span className="ml-2 rounded-full bg-forest/10 px-2 py-0.5 font-semibold text-forest">
                Subscribed
              </span>
            ) : null}
          </p>
        </div>
      </div>
    </header>
  );
}
