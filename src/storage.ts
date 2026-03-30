import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState, LearningItem } from "./types";

const STORAGE_KEY = "smartLearner.v1";

const EMPTY_STATE: AppState = { items: [] };

export async function loadState(): Promise<AppState> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return EMPTY_STATE;
  try {
    const parsed = JSON.parse(raw) as AppState;
    if (!parsed?.items) return EMPTY_STATE;
    return parsed;
  } catch {
    return EMPTY_STATE;
  }
}

export async function saveState(state: AppState): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function upsertItem(items: LearningItem[], item: LearningItem): LearningItem[] {
  const idx = items.findIndex((x) => x.id === item.id);
  if (idx === -1) return [item, ...items];
  const next = items.slice();
  next[idx] = item;
  return next;
}

export function removeItem(items: LearningItem[], id: string): LearningItem[] {
  return items.filter((x) => x.id !== id);
}

