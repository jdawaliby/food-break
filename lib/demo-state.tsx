"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  defaultBoxId,
  defaultExtras,
  defaultFamily,
  getBox,
  sampleWeekPicks,
  schoolDays,
  type CadenceId,
  type DayPick,
  type StageId,
} from "./mock-data";

export type DemoMode = "logged-out" | "subscribed";

export type ParentState = {
  mode: DemoMode;
  stage: StageId;
  boxId: string;
  cadence: CadenceId;
  parentName: string;
  childName: string;
  schoolName: string;
  className: string;
  grade: string;
  picks: Record<string, DayPick>;
  allergyIds: string[];
  cutoffPassed: boolean;
  pausedTomorrow: boolean;
};

const STORAGE_KEY = "food-break-station-v1";

export const defaultState: ParentState = {
  mode: "logged-out",
  stage: "ece",
  boxId: defaultBoxId("ece"),
  cadence: "weekly",
  parentName: "",
  childName: "",
  schoolName: "",
  className: "",
  grade: "",
  picks: {},
  allergyIds: [],
  cutoffPassed: false,
  pausedTomorrow: false,
};

const listeners = new Set<() => void>();
let memory: ParentState = defaultState;
let loaded = false;

function emit() {
  listeners.forEach((l) => l());
}

function load(): ParentState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ParentState>;
      return { ...defaultState, ...parsed, picks: parsed.picks ?? {} };
    }
  } catch {
    /* ignore */
  }
  return defaultState;
}

function persist(next: ParentState) {
  memory = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  emit();
}

function subscribe(cb: () => void) {
  if (!loaded && typeof window !== "undefined") {
    loaded = true;
    memory = load();
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function snap() {
  if (!loaded && typeof window !== "undefined") {
    loaded = true;
    memory = load();
  }
  return memory;
}

type Ctx = {
  state: ParentState;
  setState: (patch: Partial<ParentState>) => void;
  setDayPick: (dayId: string, patch: Partial<DayPick>) => void;
  applyMode: (mode: DemoMode) => void;
  completeCheckout: (input: {
    stage: StageId;
    boxId: string;
    cadence: CadenceId;
    parentName: string;
    childName: string;
    schoolName: string;
    className: string;
    grade: string;
  }) => void;
  reset: () => void;
};

const DemoContext = createContext<Ctx | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(subscribe, snap, () => defaultState);

  const setState = useCallback((patch: Partial<ParentState>) => {
    persist({ ...memory, ...patch });
  }, []);

  const setDayPick = useCallback((dayId: string, patch: Partial<DayPick>) => {
    const box = getBox(memory.boxId);
    const prev = memory.picks[dayId] ?? {
      sandwichIds: [],
      extras: box ? defaultExtras(box, memory.stage) : {},
    };
    persist({
      ...memory,
      picks: {
        ...memory.picks,
        [dayId]: {
          sandwichIds: patch.sandwichIds ?? prev.sandwichIds,
          extras: patch.extras ?? prev.extras,
        },
      },
    });
  }, []);

  const applyMode = useCallback((mode: DemoMode) => {
    if (mode === "logged-out") {
      persist({
        ...defaultState,
        cutoffPassed: memory.cutoffPassed,
        pausedTomorrow: memory.pausedTomorrow,
      });
      return;
    }
    const stage: StageId = "elementary";
    const boxId = defaultBoxId(stage);
    const box = getBox(boxId)!;
    persist({
      ...memory,
      mode: "subscribed",
      stage,
      boxId,
      cadence: "monthly",
      parentName: defaultFamily.parentName,
      childName: defaultFamily.childName,
      schoolName: defaultFamily.schoolName,
      className: defaultFamily.className,
      grade: defaultFamily.grade,
      picks:
        Object.keys(memory.picks).length === schoolDays.length
          ? memory.picks
          : sampleWeekPicks(box, stage),
    });
  }, []);

  const completeCheckout = useCallback(
    (input: {
      stage: StageId;
      boxId: string;
      cadence: CadenceId;
      parentName: string;
      childName: string;
      schoolName: string;
      className: string;
      grade: string;
    }) => {
      const box = getBox(input.boxId);
      const picks =
        Object.keys(memory.picks).length === schoolDays.length
          ? memory.picks
          : {
              ...(box ? sampleWeekPicks(box, input.stage) : {}),
              ...memory.picks,
            };
      persist({
        ...memory,
        ...input,
        picks,
        mode: "subscribed",
      });
    },
    [],
  );

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    persist(defaultState);
  }, []);

  const value = useMemo(
    () => ({ state, setState, setDayPick, applyMode, completeCheckout, reset }),
    [state, setState, setDayPick, applyMode, completeCheckout, reset],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
