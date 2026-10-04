"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDemo } from "@/lib/demo-state";
import {
  allergies,
  brand,
  defaultExtras,
  extraCategories,
  getBox,
  nextOpenDay,
  optionsFor,
  schoolDays,
  sandwichesForStage,
} from "@/lib/mock-data";

export default function DayBuilderPage() {
  const params = useParams<{ dayId: string }>();
  const router = useRouter();
  const { state, setDayPick, setState } = useDemo();
  const day = schoolDays.find((d) => d.id === params.dayId);
  const box = getBox(state.boxId);
  const menu = sandwichesForStage(state.stage);
  const pick = state.picks[params.dayId];
  const sandwichIds = pick?.sandwichIds ?? [];
  const extras = pick?.extras ?? (box ? defaultExtras(box, state.stage) : {});
  const blocked = state.cutoffPassed && state.mode === "subscribed";

  if (!day || !box) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="font-display text-3xl font-semibold">Pick a box first</p>
        <Link href="/subscribe" className="mt-6 inline-block font-bold text-accent-dark">
          Open boxes
        </Link>
      </div>
    );
  }

  const selectedDay = day;
  const selectedBox = box;

  function persist(ids: string[], nextExtras = extras) {
    setDayPick(selectedDay.id, { sandwichIds: ids, extras: nextExtras });
  }

  function save() {
    let ids = sandwichIds;
    if (ids.length === 0) ids = [menu[0].id];
    if (selectedBox.sandwichCount === 2 && ids.length < 2) {
      const extra = menu.find((s) => s.id !== ids[0]);
      if (extra) ids = [ids[0], extra.id];
    }
    persist(ids);
    const merged = {
      ...state.picks,
      [selectedDay.id]: { sandwichIds: ids, extras },
    };
    const next = nextOpenDay(merged, selectedDay.id);
    if (next) router.push(`/menu/${next}`);
    else if (state.mode === "logged-out") router.push("/subscribe");
    else router.push("/account");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link href="/menu" className="text-sm font-bold text-muted">
        ← Full week
      </Link>
      <p className="mt-4 text-sm font-bold tracking-wide text-accent-dark uppercase">
        {day.label} · {day.date} · {box.name}
      </p>
      <h1 className="font-display mt-1 text-4xl font-semibold">
        Pack {day.label}&apos;s drop-box
      </h1>
      <p className="mt-2 text-muted">{brand.cutoff}.</p>

      {blocked ? (
        <p className="mt-6 rounded-2xl bg-accent/15 px-4 py-3 text-sm font-semibold">
          8:00 pm cutoff has passed. This week&apos;s boxes are locked for packing.
        </p>
      ) : null}

      <h2 className="mt-10 text-xl font-bold">
        Sandwich{box.sandwichCount === 2 ? "es (pick 2)" : ""}
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {menu.map((s) => {
          const on = sandwichIds.includes(s.id);
          return (
            <button
              key={s.id}
              type="button"
              disabled={blocked}
              onClick={() => {
                let ids = sandwichIds;
                if (box.sandwichCount === 1) ids = [s.id];
                else if (on) ids = ids.filter((id) => id !== s.id);
                else ids = [...ids, s.id].slice(-2);
                persist(ids);
              }}
              className={`overflow-hidden rounded-3xl bg-card text-left ring-2 ${
                on ? "ring-forest" : "ring-foreground/8"
              }`}
            >
              <div className="relative aspect-[5/4]">
                <Image src={s.image} alt="" fill className="object-cover" sizes="33vw" />
              </div>
              <div className="p-4">
                <p className="font-bold">{s.name}</p>
                <p className="mt-1 text-sm text-muted">{s.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {box.includes.map((catId) => {
        const cat = extraCategories.find((c) => c.id === catId);
        const opts = optionsFor(catId, state.stage);
        if (!cat) return null;
        return (
          <div key={catId} className="mt-10">
            <h2 className="text-xl font-bold">{cat.label}</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {opts.map((option) => {
                const on = extras[catId] === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={blocked}
                    onClick={() =>
                      persist(sandwichIds, { ...extras, [catId]: option.id })
                    }
                    className={`flex items-center gap-3 rounded-2xl bg-card p-3 text-left ring-2 ${
                      on ? "ring-forest" : "ring-foreground/8"
                    }`}
                  >
                    <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                      <Image src={option.image} alt="" fill className="object-cover" sizes="56px" />
                    </span>
                    <span>
                      <span className="block font-bold">{option.name}</span>
                      <span className="text-sm text-muted">{option.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <h2 className="mt-10 text-xl font-bold">Allergen flags</h2>
      <p className="mt-1 text-sm text-muted">
        Color-coded in the kitchen (red = contains, green = gluten-free).
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {allergies.map((a) => {
          const on = state.allergyIds.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              disabled={blocked}
              onClick={() =>
                setState({
                  allergyIds: on
                    ? state.allergyIds.filter((id) => id !== a.id)
                    : [...state.allergyIds, a.id],
                })
              }
              className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 ${
                on
                  ? "bg-red-700 text-white ring-red-700"
                  : "bg-card ring-foreground/15"
              }`}
            >
              {a.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={save}
          className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-white hover:bg-accent-dark"
        >
          Save this day
        </button>
        <Link href="/subscribe" className="rounded-full border border-foreground/15 bg-card px-6 py-3 text-sm font-bold">
          Choose box & cadence
        </Link>
      </div>
    </div>
  );
}
