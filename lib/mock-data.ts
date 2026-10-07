export type StageId = "ece" | "elementary" | "secondary";
export type CadenceId = "daily" | "weekly" | "monthly";
export type ExtraCategoryId =
  | "fruit"
  | "dessert"
  | "juice"
  | "salty"
  | "energy"
  | "frozen";

export type Sandwich = {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  nutFree: boolean;
};

export type ExtraOption = {
  id: string;
  name: string;
  description: string;
  image: string;
  nutFree: boolean;
};

export type ExtraCategory = {
  id: ExtraCategoryId;
  label: string;
  options: ExtraOption[];
};

export type Allergy = { id: string; label: string };

export type BoxPlan = {
  id: string;
  stage: StageId;
  name: string;
  blurb: string;
  sandwichCount: 1 | 2;
  includes: ExtraCategoryId[];
  features: string[];
  rates: Record<CadenceId, { perDay: number; periodTotal: number; periodLabel: string }>;
  badge?: string;
};

export type DayPick = {
  sandwichIds: string[];
  extras: Partial<Record<ExtraCategoryId, string>>;
};

export const brand = {
  name: "DeliClub",
  short: "DeliClub",
  tagline: "Healthy Labneh & Jebne at recess",
  cutoff: "Pre-order by 8:00 pm the day before",
  pauseRule: "Pause before 8:00 am on a school day to roll credits forward",
  delivery: "Named drop-box · under 8 minutes · zero queue",
};

export const stages: { id: StageId; name: string; ages: string; note: string }[] = [
  {
    id: "ece",
    name: "ECE / Kindergarten",
    ages: "Ages 3–6",
    note: "Mini portions, 100% nut-free, easy-open packaging.",
  },
  {
    id: "elementary",
    name: "Elementary",
    ages: "Primary",
    note: "Full-size sandwiches, pressed warm at the school kiosk.",
  },
  {
    id: "secondary",
    name: "Intermediate & Secondary",
    ages: "Middle / high school",
    note: "Full nutrition, optional double sandwich (Power Box).",
  },
];

export const cadences: {
  id: CadenceId;
  name: string;
  days: string;
  discount: string;
}[] = [
  { id: "daily", name: "A la carte", days: "Single school day", discount: "Base rate" },
  { id: "weekly", name: "Weekly", days: "5 school days", discount: "10% off daily" },
  {
    id: "monthly",
    name: "Monthly",
    days: "20 school days (18 for secondary)",
    discount: "~19% vs daily",
  },
];

const img = {
  saj: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=1200&q=80",
  pita: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=80",
  cheese:
    "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=1200&q=80",
  halloumi:
    "https://images.unsplash.com/photo-1619860860774-1e2e17343432?auto=format&fit=crop&w=1200&q=80",
  club: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80",
  apple:
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80",
  grapes:
    "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=600&q=80",
  berries:
    "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80",
  cookie:
    "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
  pudding:
    "https://images.unsplash.com/photo-1642423453088-69ad302f0d3c?auto=format&fit=crop&w=600&q=80",
  juice:
    "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80",
  laban:
    "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
  chips:
    "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80",
  nuts: "https://images.unsplash.com/photo-1599599810769-bcde5a160d25?auto=format&fit=crop&w=600&q=80",
  dates:
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
  yogurt:
    "https://images.unsplash.com/photo-1488477181946-6428a2929919?auto=format&fit=crop&w=600&q=80",
  kiosk:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80",
};

export const heroImage = img.cheese;

export const sandwiches: Sandwich[] = [
  {
    id: "labneh-classic",
    name: "Signature Labneh Classic",
    description: "Cucumber, fresh mint, and extra-virgin olive oil in saj bread.",
    highlights: ["Vegetarian", "Saj bread"],
    image: img.saj,
    imageAlt: "Labneh sandwich",
    nutFree: true,
  },
  {
    id: "labneh-crunch",
    name: "Herbed Labneh Crunch",
    description: "Walnuts, wild thyme, and labneh in whole-wheat pita.",
    highlights: ["Vegetarian", "Contains walnuts"],
    image: img.pita,
    imageAlt: "Herbed labneh pita",
    nutFree: false,
  },
  {
    id: "jebne",
    name: "Traditional White Cheese / Jebne",
    description: "Desalted Akkawi and Kashkaval, pressed.",
    highlights: ["Vegetarian", "High protein"],
    image: img.cheese,
    imageAlt: "Jebne sandwich",
    nutFree: true,
  },
  {
    id: "halloumi",
    name: "Warm Halloumi & Mint Press",
    description: "Grilled halloumi and mint pesto in markook. Pressed warm at the kiosk.",
    highlights: ["Vegetarian", "Warm press"],
    image: img.halloumi,
    imageAlt: "Warm pressed sandwich with grill marks",
    nutFree: true,
  },
  {
    id: "club",
    name: "Healthy Club Sandwich",
    description: "Whole-grain bread, sliced turkey or chicken, and greens.",
    highlights: ["High protein", "Whole grain"],
    image: img.club,
    imageAlt: "Club sandwich",
    nutFree: true,
  },
];

export const extraCategories: ExtraCategory[] = [
  {
    id: "fruit",
    label: "Fruit snack",
    options: [
      { id: "apple", name: "Sliced organic apple", description: "Bite / portion cup", image: img.apple, nutFree: true },
      { id: "grapes", name: "Grape cup", description: "Washed and ready", image: img.grapes, nutFree: true },
      { id: "berry-banana", name: "Berry & banana cup", description: "Portion cup", image: img.berries, nutFree: true },
    ],
  },
  {
    id: "dessert",
    label: "Dessert",
    options: [
      { id: "date-bar", name: "House-made date bar", description: "Naturally sweet", image: img.dates, nutFree: true },
      { id: "oat-cookie", name: "Oat cookie / artisan cookie", description: "Baked in-house", image: img.cookie, nutFree: true },
      { id: "chia-pudding", name: "Honey chia pudding cup", description: "Mini dessert", image: img.pudding, nutFree: true },
    ],
  },
  {
    id: "juice",
    label: "Juice / drink",
    options: [
      { id: "fruit-juice", name: "100% pure fruit juice", description: "200ml / kid juice", image: img.juice, nutFree: true },
      { id: "laban", name: "Fresh drinkable laban", description: "Cool, protein-rich", image: img.laban, nutFree: true },
    ],
  },
  {
    id: "salty",
    label: "Salty snack",
    options: [
      { id: "zaatar-chips", name: "Baked za'atar pita chips", description: "Whole-wheat", image: img.chips, nutFree: true },
      { id: "air-popped", name: "Air-popped chips / salty puffs", description: "Light crunch", image: img.chips, nutFree: true },
    ],
  },
  {
    id: "energy",
    label: "Energy box",
    options: [
      { id: "trail-mix", name: "Nuts, seeds & dried fruit mix", description: "Not for ECE", image: img.nuts, nutFree: false },
      { id: "date-balls", name: "Peanut butter date balls (2 pcs)", description: "Contains peanut", image: img.dates, nutFree: false },
      { id: "nut-free-bite", name: "Nut-free energy bite", description: "ECE-safe", image: img.dates, nutFree: true },
    ],
  },
  {
    id: "frozen",
    label: "Frozen yoghurt",
    options: [
      { id: "froyo", name: "Probiotic frozen yoghurt", description: "100g / mini cup", image: img.yogurt, nutFree: true },
    ],
  },
];

export const allergies: Allergy[] = [
  { id: "gluten", label: "Gluten" },
  { id: "dairy", label: "Dairy" },
  { id: "nuts", label: "Nuts" },
  { id: "peanuts", label: "Peanuts" },
  { id: "eggs", label: "Eggs" },
  { id: "sesame", label: "Sesame" },
];

export const schoolDays = [
  { id: "mon", label: "Monday", short: "Mon", date: "5 Oct" },
  { id: "tue", label: "Tuesday", short: "Tue", date: "6 Oct" },
  { id: "wed", label: "Wednesday", short: "Wed", date: "7 Oct" },
  { id: "thu", label: "Thursday", short: "Thu", date: "8 Oct" },
  { id: "fri", label: "Friday", short: "Fri", date: "9 Oct" },
];

function rate(perDay: number, periodTotal: number, periodLabel: string) {
  return { perDay, periodTotal, periodLabel };
}

export const boxes: BoxPlan[] = [
  {
    id: "ece-essential",
    stage: "ece",
    name: "ECE Essential Box",
    blurb: "1 mini sandwich + bite fruit + mini dessert + kid juice + packaging. 100% nut-free.",
    sandwichCount: 1,
    includes: ["fruit", "dessert", "juice"],
    features: ["Mini sandwich", "Bite fruit", "Mini dessert", "Kid juice", "Easy-open packaging"],
    badge: "Nut-free",
    rates: {
      daily: rate(4.12, 4.12, "today"),
      weekly: rate(3.71, 18.54, "5 days"),
      monthly: rate(3.34, 66.74, "20 days"),
    },
  },
  {
    id: "ece-expanded",
    stage: "ece",
    name: "ECE Expanded Box",
    blurb: "Adds salty puffs and a nut-free energy bite.",
    sandwichCount: 1,
    includes: ["fruit", "dessert", "juice", "salty", "energy"],
    features: ["Mini sandwich", "Bite fruit + mini dessert + kid juice", "Salty puffs", "Nut-free energy bite"],
    rates: {
      daily: rate(4.93, 4.93, "today"),
      weekly: rate(4.44, 22.19, "5 days"),
      monthly: rate(3.99, 79.87, "20 days"),
    },
  },
  {
    id: "ece-deluxe",
    stage: "ece",
    name: "ECE Deluxe Box",
    blurb: "Full ECE box including mini frozen yoghurt.",
    sandwichCount: 1,
    includes: ["fruit", "dessert", "juice", "salty", "energy", "frozen"],
    features: ["Mini sandwich", "Fruit, dessert, juice", "Salty puffs + energy bite", "Mini frozen yoghurt"],
    badge: "Most complete",
    rates: {
      daily: rate(5.54, 5.54, "today"),
      weekly: rate(4.99, 24.93, "5 days"),
      monthly: rate(4.49, 89.75, "20 days"),
    },
  },
  {
    id: "el-essential",
    stage: "elementary",
    name: "Elementary Essential Box",
    blurb: "Full warm-pressed sandwich + fresh fruit cup + baked snack + fresh juice.",
    sandwichCount: 1,
    includes: ["fruit", "salty", "juice"],
    features: ["Full warm-pressed sandwich", "Fresh fruit cup", "Baked snack", "Fresh juice"],
    rates: {
      daily: rate(7.5, 7.5, "today"),
      weekly: rate(6.75, 33.75, "5 days"),
      monthly: rate(6.08, 121.5, "20 days"),
    },
  },
  {
    id: "el-expanded",
    stage: "elementary",
    name: "Elementary Expanded Box",
    blurb: "Adds artisan cookie and salty puffs.",
    sandwichCount: 1,
    includes: ["fruit", "salty", "dessert", "juice"],
    features: ["Full sandwich", "Fresh fruit + baked snack", "Artisan cookie", "Fresh juice + salty puffs"],
    rates: {
      daily: rate(8.5, 8.5, "today"),
      weekly: rate(7.65, 38.25, "5 days"),
      monthly: rate(6.88, 137.7, "20 days"),
    },
  },
  {
    id: "el-deluxe",
    stage: "elementary",
    name: "Elementary Deluxe Box",
    blurb: "Cookie, salty puffs, and probiotic frozen yoghurt.",
    sandwichCount: 1,
    includes: ["fruit", "dessert", "juice", "salty", "frozen"],
    features: ["Full sandwich", "Fresh fruit + artisan cookie", "Fresh juice + salty puffs", "Probiotic frozen yoghurt"],
    badge: "Most complete",
    rates: {
      daily: rate(9.5, 9.5, "today"),
      weekly: rate(8.55, 42.75, "5 days"),
      monthly: rate(7.69, 153.9, "20 days"),
    },
  },
  {
    id: "sec-essential",
    stage: "secondary",
    name: "Essential Box",
    blurb: "1 healthy sandwich + fruit + dessert + juice + packaging.",
    sandwichCount: 1,
    includes: ["fruit", "dessert", "juice"],
    features: ["1 healthy sandwich", "Fruit + dessert + juice", "Eco-bento packaging"],
    rates: {
      daily: rate(5.2, 5.2, "today"),
      weekly: rate(4.68, 23.4, "5 days"),
      monthly: rate(4.21, 84.24, "18 days"),
    },
  },
  {
    id: "sec-power",
    stage: "secondary",
    name: "Power Box",
    blurb: "Two sandwiches for growing students, plus fruit, dessert, juice, and packaging.",
    sandwichCount: 2,
    includes: ["fruit", "dessert", "juice"],
    features: ["2 healthy sandwiches", "Fruit + dessert + juice", "Eco-bento packaging"],
    badge: "Double sandwich",
    rates: {
      daily: rate(6.11, 6.11, "today"),
      weekly: rate(5.5, 27.5, "5 days"),
      monthly: rate(4.95, 98.98, "18 days"),
    },
  },
  {
    id: "sec-expanded",
    stage: "secondary",
    name: "Custom Expanded Box",
    blurb: "Adds salty chips and an energy box.",
    sandwichCount: 1,
    includes: ["fruit", "dessert", "juice", "salty", "energy"],
    features: ["1 sandwich", "Fruit + dessert + juice", "Salty chips", "Energy box"],
    rates: {
      daily: rate(6.96, 6.96, "today"),
      weekly: rate(6.26, 31.32, "5 days"),
      monthly: rate(5.64, 112.75, "18 days"),
    },
  },
  {
    id: "sec-deluxe",
    stage: "secondary",
    name: "Deluxe Box",
    blurb: "Fruit, juice, energy box, and frozen yoghurt.",
    sandwichCount: 1,
    includes: ["fruit", "juice", "energy", "frozen"],
    features: ["1 sandwich", "Fruit + juice", "Energy box", "Frozen yoghurt"],
    rates: {
      daily: rate(6.76, 6.76, "today"),
      weekly: rate(6.08, 30.42, "5 days"),
      monthly: rate(5.48, 109.51, "18 days"),
    },
  },
  {
    id: "sec-protein",
    stage: "secondary",
    name: "Ultimate Protein Healthy Box",
    blurb: "Sandwich, fruit, juice, chips, energy box, and frozen yoghurt.",
    sandwichCount: 1,
    includes: ["fruit", "juice", "salty", "energy", "frozen"],
    features: ["1 sandwich", "Fruit + juice", "Salty chips + energy box", "Frozen yoghurt"],
    badge: "Most filling",
    rates: {
      daily: rate(8.71, 8.71, "today"),
      weekly: rate(7.84, 39.2, "5 days"),
      monthly: rate(7.06, 141.1, "18 days"),
    },
  },
];

export const defaultFamily = {
  parentName: "Lara Haddad",
  childName: "Maya Haddad",
  schoolName: "School A",
  className: "Grade 2 · Drop-box Maya Haddad",
  grade: "Grade 2",
};

export function money(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function boxesForStage(stage: StageId): BoxPlan[] {
  return boxes.filter((b) => b.stage === stage);
}

export function getBox(id: string | null): BoxPlan | undefined {
  if (!id) return undefined;
  return boxes.find((b) => b.id === id);
}

export function getSandwich(id: string): Sandwich | undefined {
  return sandwiches.find((s) => s.id === id);
}

export function sandwichesForStage(stage: StageId): Sandwich[] {
  if (stage === "ece") return sandwiches.filter((s) => s.nutFree);
  return sandwiches;
}

export function optionsFor(
  categoryId: ExtraCategoryId,
  stage: StageId,
): ExtraOption[] {
  const cat = extraCategories.find((c) => c.id === categoryId);
  if (!cat) return [];
  if (stage === "ece") return cat.options.filter((o) => o.nutFree);
  return cat.options;
}

export function getExtra(categoryId: ExtraCategoryId, optionId: string) {
  return extraCategories
    .find((c) => c.id === categoryId)
    ?.options.find((o) => o.id === optionId);
}

export function defaultExtras(box: BoxPlan, stage: StageId) {
  const extras: Partial<Record<ExtraCategoryId, string>> = {};
  for (const catId of box.includes) {
    const first = optionsFor(catId, stage)[0];
    if (first) extras[catId] = first.id;
  }
  return extras;
}

export function defaultBoxId(stage: StageId): string {
  return boxesForStage(stage)[0].id;
}

export function sampleWeekPicks(box: BoxPlan, stage: StageId): Record<string, DayPick> {
  const extras = defaultExtras(box, stage);
  const menu = sandwichesForStage(stage);
  const picks: Record<string, DayPick> = {};
  schoolDays.forEach((day, i) => {
    const a = menu[i % menu.length].id;
    const b = menu[(i + 1) % menu.length].id;
    picks[day.id] = {
      sandwichIds: box.sandwichCount === 2 ? [a, b] : [a],
      extras: { ...extras },
    };
  });
  return picks;
}

export function pickedCount(picks: Record<string, DayPick>): number {
  return schoolDays.filter((d) => (picks[d.id]?.sandwichIds.length ?? 0) > 0).length;
}

export function nextOpenDay(
  picks: Record<string, DayPick>,
  afterId?: string,
  cutoffPassed = false,
): string | null {
  const start = afterId ? schoolDays.findIndex((d) => d.id === afterId) + 1 : 0;
  for (let i = 0; i < schoolDays.length; i++) {
    const day = schoolDays[(start + i) % schoolDays.length];
    if (isDayLocked(day.id, cutoffPassed)) continue;
    if (!(picks[day.id]?.sandwichIds.length > 0)) return day.id;
  }
  return null;
}

function startOfDay(d: Date): Date {
  const next = new Date(d);
  next.setHours(0, 0, 0, 0);
  return next;
}

function schoolDayDate(dateLabel: string, now: Date): Date {
  return startOfDay(new Date(`${dateLabel} ${now.getFullYear()}`));
}

export type DayLockReason = "past" | "cutoff";

/** Past school days are always locked. After 8pm, only the next school day locks. */
export function dayLockReason(
  dayId: string,
  cutoffPassed: boolean,
  now = new Date(),
): DayLockReason | null {
  const day = schoolDays.find((d) => d.id === dayId);
  if (!day) return "past";
  const dayDate = schoolDayDate(day.date, now);
  const today = startOfDay(now);
  if (dayDate.getTime() < today.getTime()) return "past";
  // Recess is over for today — treat it as passed.
  if (dayDate.getTime() === today.getTime() && now.getHours() >= 15) return "past";
  if (!cutoffPassed) return null;
  const next = schoolDays.find((d) => schoolDayDate(d.date, now).getTime() > today.getTime());
  if (next?.id === dayId) return "cutoff";
  return null;
}

export function isDayLocked(
  dayId: string,
  cutoffPassed: boolean,
  now = new Date(),
): boolean {
  return dayLockReason(dayId, cutoffPassed, now) !== null;
}
