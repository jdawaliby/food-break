"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDemo } from "@/lib/demo-state";
import {
  boxesForStage,
  brand,
  cadences,
  defaultBoxId,
  defaultFamily,
  getBox,
  money,
  stages,
  type CadenceId,
  type StageId,
} from "@/lib/mock-data";

export default function SubscribePage() {
  const router = useRouter();
  const { state, setState, completeCheckout } = useDemo();
  const [stage, setStage] = useState<StageId>(state.stage);
  const [boxId, setBoxId] = useState(state.boxId || defaultBoxId(stage));
  const [cadence, setCadence] = useState<CadenceId>(state.cadence);
  const [parentName, setParentName] = useState(
    state.parentName || defaultFamily.parentName,
  );
  const [childName, setChildName] = useState(
    state.childName || defaultFamily.childName,
  );
  const [schoolName, setSchoolName] = useState(
    state.schoolName || defaultFamily.schoolName,
  );
  const [className, setClassName] = useState(
    state.className || defaultFamily.className,
  );
  const [grade, setGrade] = useState(state.grade || defaultFamily.grade);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const stageBoxes = boxesForStage(stage);
  const box = getBox(boxId) ?? stageBoxes[0];
  const rate = box.rates[cadence];

  function changeStage(next: StageId) {
    setStage(next);
    const first = defaultBoxId(next);
    setBoxId(first);
    setState({ stage: next, boxId: first });
  }

  function checkout() {
    setBusy(true);
    window.setTimeout(() => {
      completeCheckout({
        stage,
        boxId: box.id,
        cadence,
        parentName,
        childName,
        schoolName,
        className,
        grade,
      });
      setBusy(false);
      setDone(true);
    }, 600);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-sm font-bold tracking-wide text-forest uppercase">
          Subscription locked
        </p>
        <h1 className="font-display mt-2 text-4xl font-semibold">
          {childName}&apos;s drop-box is ready.
        </h1>
        <p className="mt-4 text-muted">
          {box.name} · {cadences.find((c) => c.id === cadence)?.name} ·{" "}
          {money(rate.perDay)}/day ({money(rate.periodTotal)} / {rate.periodLabel}
          ). No payment was taken.
        </p>
        <button
          type="button"
          onClick={() => router.push("/account")}
          className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white"
        >
          Open parent app
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-semibold">Subscribe</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Daily a la carte, Weekly (10% off), or Monthly (~19% vs daily).{" "}
        {brand.cutoff}. Instant tier upgrades in the live product.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {stages.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => changeStage(s.id)}
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              stage === s.id ? "bg-forest text-white" : "bg-card ring-1 ring-foreground/10"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm text-muted">
        {stages.find((s) => s.id === stage)?.note}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {cadences.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setCadence(c.id);
              setState({ cadence: c.id });
            }}
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              cadence === c.id ? "bg-accent text-white" : "bg-card ring-1 ring-foreground/10"
            }`}
          >
            {c.name}
            <span className="ml-2 font-normal opacity-80">{c.discount}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {stageBoxes.map((item) => {
          const on = item.id === box.id;
          const r = item.rates[cadence];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setBoxId(item.id);
                setState({ boxId: item.id, stage });
              }}
              className={`rounded-3xl bg-card p-6 text-left ring-2 ${
                on ? "ring-forest shadow-md" : "ring-foreground/8"
              }`}
            >
              {item.badge ? (
                <span className="rounded-full bg-citrus px-2 py-0.5 text-xs font-bold text-forest">
                  {item.badge}
                </span>
              ) : null}
              <h2 className="mt-2 text-xl font-bold">{item.name}</h2>
              <p className="mt-1">
                <span className="font-display text-4xl">{money(r.perDay)}</span>
                <span className="text-muted"> / day</span>
              </p>
              <p className="text-sm font-semibold text-forest">
                {money(r.periodTotal)} / {r.periodLabel}
              </p>
              <p className="mt-3 text-sm text-muted">{item.blurb}</p>
              <ul className="mt-3 space-y-1 text-sm">
                {item.features.map((f) => (
                  <li key={f}>· {f}</li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <form
        className="mt-12 max-w-xl space-y-4 rounded-3xl bg-card p-6 ring-1 ring-foreground/8"
        onSubmit={(e) => {
          e.preventDefault();
          checkout();
        }}
      >
        <h2 className="text-xl font-bold">Child & drop-box</h2>
        <label className="block text-sm font-semibold">
          Parent
          <input
            className="mt-1 w-full rounded-xl border border-foreground/15 bg-background px-3 py-2 font-normal"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            required
          />
        </label>
        <label className="block text-sm font-semibold">
          Child (name on drop-box)
          <input
            className="mt-1 w-full rounded-xl border border-foreground/15 bg-background px-3 py-2 font-normal"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            required
          />
        </label>
        <label className="block text-sm font-semibold">
          School
          <input
            className="mt-1 w-full rounded-xl border border-foreground/15 bg-background px-3 py-2 font-normal"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            required
          />
        </label>
        <label className="block text-sm font-semibold">
          Class / drop-zone
          <input
            className="mt-1 w-full rounded-xl border border-foreground/15 bg-background px-3 py-2 font-normal"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
        </label>
        <label className="block text-sm font-semibold">
          Grade
          <input
            className="mt-1 w-full rounded-xl border border-foreground/15 bg-background px-3 py-2 font-normal"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </label>
        <p className="text-sm text-muted">
          Early-bird pilot: $5 credit on the first weekly package (shown in welcome copy only).
        </p>
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-accent py-3 text-sm font-bold text-white hover:bg-accent-dark disabled:opacity-60"
        >
          {busy
            ? "Confirming…"
            : `Subscribe · ${money(rate.perDay)}/day`}
        </button>
        <Link href="/menu" className="block text-center text-sm font-bold text-forest">
          Set this week&apos;s sandwiches first
        </Link>
      </form>
    </div>
  );
}
