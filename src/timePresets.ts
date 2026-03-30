export type TimePreset =
  | { id: "plus2h"; label: string; compute: () => Date }
  | { id: "today21"; label: string; compute: () => Date }
  | { id: "tomorrowSame"; label: string; compute: (base?: Date) => Date };

export function computePlusHours(h: number): Date {
  return new Date(Date.now() + h * 60 * 60 * 1000);
}

export function computeTodayAt(hours: number, minutes: number): Date {
  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  if (d.getTime() <= Date.now()) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}

export function computeTomorrowSameTime(base: Date = new Date()): Date {
  const d = new Date(base.getTime());
  d.setDate(d.getDate() + 1);
  return d;
}

export const DEFAULT_PRESETS: TimePreset[] = [
  { id: "plus2h", label: "2 小时后", compute: () => computePlusHours(2) },
  { id: "today21", label: "今天 21:00（若已过则明天）", compute: () => computeTodayAt(21, 0) },
  {
    id: "tomorrowSame",
    label: "明天同一时间",
    compute: (base?: Date) => computeTomorrowSameTime(base ?? new Date())
  }
];

