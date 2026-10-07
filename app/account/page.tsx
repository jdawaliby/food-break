"use client";

import Link from "next/link";
import { useDemo } from "@/lib/demo-state";
import {
  brand,
  extraCategories,
  getBox,
  getExtra,
  getSandwich,
  money,
  dayLockReason,
  pickedCount,
  schoolDays,
  stages,
} from "@/lib/mock-data";

export default function AccountPage() {
  const { state, setState } = useDemo();
  const box = getBox(state.boxId);
  const guest = state.mode !== "subscribed";
  const rate = box?.rates[state.cadence];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-sm font-bold tracking-wide text-forest uppercase">
        Parent web app
      </p>
      <h1 className="font-display mt-1 text-4xl font-semibold">
        {guest ? "Guest preview" : `Hi, ${state.parentName.split(" ")[0]}`}
      </h1>
      <p className="mt-3 text-muted">
        {guest
          ? "Subscribe or tap Demo → Parent to see a filled drop-box week."
          : `${state.childName} · ${state.className} · ${state.schoolName}`}
      </p>

      {guest ? (
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/subscribe"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white"
          >
            Choose a box
          </Link>
          <Link
            href="/menu"
            className="rounded-full border border-foreground/15 bg-card px-5 py-2.5 text-sm font-bold"
          >
            Menu
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          <section className="rounded-3xl bg-card p-6 ring-1 ring-foreground/8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold tracking-wide text-muted uppercase">
                  {stages.find((s) => s.id === state.stage)?.name} · {state.cadence}
                </p>
                <h2 className="mt-1 text-xl font-bold">{box?.name}</h2>
                {rate ? (
                  <p className="mt-1 text-muted">
                    {money(rate.perDay)}/day · {money(rate.periodTotal)} / {rate.periodLabel}
                  </p>
                ) : null}
                <p className="mt-2 text-sm text-muted">
                  {pickedCount(state.picks)} / 5 days set · {brand.cutoff}
                </p>
              </div>
              <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-bold text-forest">
                Drop-box: {state.childName}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/subscribe" className="text-sm font-bold text-accent-dark">
                Upgrade cadence (10% steps)
              </Link>
              <button
                type="button"
                onClick={() => setState({ pausedTomorrow: !state.pausedTomorrow })}
                className="rounded-full bg-foreground/5 px-3 py-1 text-sm font-bold"
              >
                {state.pausedTomorrow
                  ? "Tomorrow paused — credit rolls forward"
                  : "Pause tomorrow (before 8:00 am)"}
              </button>
            </div>
          </section>

          {schoolDays.map((day) => {
            const pick = state.picks[day.id];
            return (
              <section key={day.id} className="rounded-3xl bg-card p-5 ring-1 ring-foreground/8">
                <p className="text-xs font-bold tracking-wide text-muted uppercase">
                  {day.label} · {day.date}
                </p>
                {pick?.sandwichIds.length ? (
                  <>
                    <ul className="mt-2 font-semibold">
                      {pick.sandwichIds.map((id) => (
                        <li key={id}>{getSandwich(id)?.name}</li>
                      ))}
                    </ul>
                    <ul className="mt-2 text-sm text-muted">
                      {box?.includes.map((catId) => {
                        const optionId = pick.extras[catId];
                        const option = optionId ? getExtra(catId, optionId) : undefined;
                        const label = extraCategories.find((c) => c.id === catId)?.label;
                        return (
                          <li key={catId}>
                            · {label}: {option?.name ?? "—"}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <p className="mt-2 text-muted">No sandwich yet.</p>
                )}
                {(() => {
                  const lock = dayLockReason(day.id, state.cutoffPassed);
                  if (lock === "past") {
                    return (
                      <p className="mt-3 text-sm font-semibold text-muted">Passed</p>
                    );
                  }
                  if (lock === "cutoff") {
                    return (
                      <p className="mt-3 text-sm font-semibold text-muted">
                        Locked after 8:00 pm
                      </p>
                    );
                  }
                  return (
                    <Link
                      href={`/menu/${day.id}`}
                      className="mt-3 inline-block text-sm font-bold text-forest"
                    >
                      Edit {day.short}
                    </Link>
                  );
                })()}
              </section>
            );
          })}

          {state.allergyIds.length > 0 ? (
            <p className="text-sm font-semibold">
              Allergen flags: {state.allergyIds.join(", ")} (red kitchen sticker)
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}
