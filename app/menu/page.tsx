"use client";

import Image from "next/image";
import Link from "next/link";
import { useDemo } from "@/lib/demo-state";
import {
  brand,
  defaultExtras,
  getBox,
  getSandwich,
  schoolDays,
  sandwichesForStage,
} from "@/lib/mock-data";

export default function MenuPage() {
  const { state, setDayPick } = useDemo();
  const box = getBox(state.boxId);
  const menu = sandwichesForStage(state.stage);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm font-bold tracking-wide text-accent-dark uppercase">
        Week of 5 Oct · {brand.cutoff}
      </p>
      <h1 className="font-display mt-2 text-4xl font-semibold">
        Daily sandwich for the drop-box
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">
        Choose one sandwich per school day
        {box?.sandwichCount === 2 ? " (Power Box: two)" : ""}. Then add the
        extras included in your {box?.name ?? "box"}.
      </p>
      <p className="mt-2 text-sm">
        Current box:{" "}
        <Link href="/subscribe" className="font-bold text-accent-dark">
          {box?.name ?? "pick a box"}
        </Link>
      </p>

      <div className="mt-10 space-y-12">
        {schoolDays.map((day) => {
          const pick = state.picks[day.id];
          return (
            <section key={day.id} id={day.id}>
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h2 className="font-display text-2xl font-semibold">{day.label}</h2>
                  <p className="text-sm text-muted">
                    {day.date}
                    {pick?.sandwichIds.length
                      ? ` · ${pick.sandwichIds.map((id) => getSandwich(id)?.name).join(" + ")}`
                      : " · not chosen"}
                  </p>
                </div>
                <Link
                  href={`/menu/${day.id}`}
                  className="text-sm font-bold text-accent-dark"
                >
                  Customize extras →
                </Link>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {menu.map((s) => {
                  const on = pick?.sandwichIds.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        if (!box) return;
                        let ids = pick?.sandwichIds ?? [];
                        if (box.sandwichCount === 1) ids = [s.id];
                        else if (ids.includes(s.id))
                          ids = ids.filter((id) => id !== s.id);
                        else ids = [...ids, s.id].slice(-2);
                        setDayPick(day.id, {
                          sandwichIds: ids,
                          extras: pick?.extras ?? defaultExtras(box, state.stage),
                        });
                      }}
                      className={`overflow-hidden rounded-3xl bg-card text-left ring-2 ${
                        on ? "ring-forest" : "ring-foreground/8"
                      }`}
                    >
                      <div className="relative aspect-[5/4]">
                        <Image
                          src={s.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="33vw"
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-bold">{s.name}</p>
                        <p className="mt-1 line-clamp-2 text-sm text-muted">
                          {s.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
