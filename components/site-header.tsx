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
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-citrus text-sm font-bold text-forest">
              FB
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
