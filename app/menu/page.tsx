"use client";

import Image from "next/image";
import Link from "next/link";
import { useDemo } from "@/lib/demo-state";
import {
  brand,
  dayLockReason,
  defaultExtras,
  getBox,
  getExtra,
  getSandwich,
  isDayLocked,
  schoolDays,
  sandwichesForStage,
} from "@/lib/mock-data";

export default function MenuPage() {
  const { state, setDayPick, setDefaultSandwich } = useDemo();
  const box = getBox(state.boxId);
  const menu = sandwichesForStage(state.stage);

  const defaultId = state.defaultSandwichId ?? menu[0]?.id;
  const defaultSandwich = getSandwich(defaultId);
  const openDays = schoolDays.filter((day) => !isDayLocked(day.id, state.cutoffPassed));

  function applyDefaultToAll() {
    if (!box) return;
    openDays.forEach((day) => {
      const pick = state.picks[day.id];
      const ids =
        box.sandwichCount === 2
          ? [defaultId, menu.find((s) => s.id !== defaultId)?.id ?? menu[0].id]
          : [defaultId];
      setDayPick(day.id, {
        sandwichIds: ids,
        extras: pick?.extras ?? defaultExtras(box, state.stage),
      });
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm font-bold tracking-wide text-accent-dark uppercase">
        Week of 5 Oct · {brand.cutoff}
      </p>
      <h1 className="font-display mt-2 text-4xl font-semibold">
        Daily sandwich for the drop-box
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">
        Pick a default sandwich for the week, then fine-tune any day. Each
        school day still has its own drop-box — change one without touching the
        rest.
      </p>
      <p className="mt-2 text-sm">
        Current box:{" "}
        <Link href="/subscribe" className="font-bold text-accent-dark">
          {box?.name ?? "pick a box"}
        </Link>
        {box?.sandwichCount === 2 ? " · Power Box: two sandwiches per day" : ""}
      </p>

      {state.cutoffPassed ? (
        <p className="mt-6 rounded-2xl bg-accent/15 px-4 py-3 text-sm font-semibold">
          8:00 pm cutoff has passed. Tomorrow&apos;s box is locked for packing.
          Past days stay locked. Later days can still be changed.
        </p>
      ) : null}

      {/* Default sandwich picker — shown once */}
      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-display text-2xl font-semibold">
            Default sandwich for the week
          </h2>
          <button
            type="button"
            onClick={applyDefaultToAll}
            disabled={!box || openDays.length === 0}
            className="rounded-full bg-accent px-5 py-2 text-sm font-bold text-white hover:bg-accent-dark disabled:opacity-50"
          >
            Apply to open days
          </button>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {menu.map((s) => {
            const on = s.id === defaultId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setDefaultSandwich(s.id)}
                className={`overflow-hidden rounded-3xl bg-card text-left ring-2 ${
                  on ? "ring-forest" : "ring-foreground/8"
                }`}
              >
                <div className="relative aspect-[5/4]">
                  <Image src={s.image} alt="" fill className="object-cover" sizes="33vw" />
                </div>
                <div className="p-4">
                  <p className="font-bold">{s.name}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">{s.description}</p>
                </div>
              </button>
            );
          })}
        </div>
        {box?.sandwichCount === 2 && defaultSandwich ? (
          <p className="mt-3 text-sm text-muted">
            Power Box pairs <strong>{defaultSandwich.name}</strong> with{" "}
            <strong>
              {menu.find((s) => s.id !== defaultId)?.name ?? "—"}
            </strong>{" "}
            by default. Change either one per day in the builder.
          </p>
        ) : null}
      </section>

      {/* Compact week overview — one row per day */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">Your week</h2>
        <p className="mt-1 text-sm text-muted">
          Past days and, after 8:00 pm, tomorrow are locked. Other days can still
          be changed.
        </p>
        <div className="mt-4 divide-y divide-foreground/10 overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/8">
          {schoolDays.map((day) => {
            const pick = state.picks[day.id];
            const lock = dayLockReason(day.id, state.cutoffPassed);
            const names = pick?.sandwichIds
              .map((id) => getSandwich(id)?.name)
              .filter(Boolean);
            const extraSummary = pick?.extras
              ? Object.entries(pick.extras)
                  .map(([catId, optId]) => getExtra(catId as never, optId)?.name)
                  .filter(Boolean)
                  .join(" · ")
              : null;
            const rowClass = `flex items-center gap-4 px-5 py-4 ${
              lock ? "cursor-not-allowed opacity-70" : "transition hover:bg-foreground/5"
            }`;
            const rowInner = (
              <>
                <div className="w-20 shrink-0">
                  <p className="font-bold">{day.label}</p>
                  <p className="text-xs text-muted">{day.date}</p>
                </div>
                <div className="flex-1">
                  {names?.length ? (
                    <>
                      <p className="font-semibold">{names.join(" + ")}</p>
                      {extraSummary ? (
                        <p className="text-sm text-muted">{extraSummary}</p>
                      ) : null}
                    </>
                  ) : (
                    <p className="text-sm text-muted">
                      Not chosen · defaults to {defaultSandwich?.name ?? "—"}
                    </p>
                  )}
                </div>
                <span
                  className={`shrink-0 text-sm font-bold ${
                    lock ? "text-muted" : "text-accent-dark"
                  }`}
                >
                  {lock === "past" ? "Passed" : lock === "cutoff" ? "Locked" : "Change →"}
                </span>
              </>
            );
            if (lock) {
              return (
                <div key={day.id} className={rowClass} aria-disabled="true">
                  {rowInner}
                </div>
              );
            }
            return (
              <Link key={day.id} href={`/menu/${day.id}`} className={rowClass}>
                {rowInner}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
