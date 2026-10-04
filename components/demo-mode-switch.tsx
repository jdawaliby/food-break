"use client";

import { useDemo, type DemoMode } from "@/lib/demo-state";

const modes: { id: DemoMode; label: string }[] = [
  { id: "logged-out", label: "Guest" },
  { id: "subscribed", label: "Parent" },
];

export function DemoModeSwitch() {
  const { state, applyMode, setState, reset } = useDemo();

  return (
    <div className="flex max-w-full flex-wrap items-center gap-2 rounded-2xl border border-foreground/10 bg-card/80 px-2 py-1 text-xs shadow-sm">
      <span className="pl-1 font-semibold uppercase tracking-wide text-muted">
        Demo
      </span>
      {modes.map((mode) => (
        <button
          key={mode.id}
          type="button"
          onClick={() => applyMode(mode.id)}
          className={`rounded-full px-2.5 py-1 font-semibold transition ${
            state.mode === mode.id
              ? "bg-forest text-white"
              : "text-foreground/70 hover:bg-foreground/5"
          }`}
        >
          {mode.label}
        </button>
      ))}
      <button
        type="button"
        onClick={() => setState({ cutoffPassed: !state.cutoffPassed })}
        className={`rounded-full px-2.5 py-1 font-semibold ${
          state.cutoffPassed ? "bg-citrus text-forest" : "text-foreground/70"
        }`}
      >
        {state.cutoffPassed ? "8pm cutoff on" : "8pm cutoff off"}
      </button>
      <button
        type="button"
        onClick={reset}
        className="rounded-full px-2.5 py-1 text-muted hover:bg-foreground/5"
      >
        Reset
      </button>
    </div>
  );
}
