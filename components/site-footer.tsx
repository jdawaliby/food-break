import Link from "next/link";
import { brand } from "@/lib/mock-data";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-forest-dark bg-forest text-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-xl font-semibold">{brand.name}</p>
          <p className="mt-1 max-w-sm text-sm text-background/70">
            Tech-enabled school recess catering. Pre-order on the parent web app.
            Warm-pressed at the campus kiosk. Named drop-box before the bell.
          </p>
        </div>
        <div className="flex gap-4 text-sm font-semibold">
          <Link href="/menu" className="hover:underline">
            Menu
          </Link>
          <Link href="/subscribe" className="hover:underline">
            Boxes
          </Link>
          <Link href="/account" className="hover:underline">
            Parent app
          </Link>
        </div>
      </div>
    </footer>
  );
}
