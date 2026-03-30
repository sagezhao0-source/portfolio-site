export type ItemStatus =
  | "scheduled"
  | "reminded"
  | "started"
  | "snoozed"
  | "abandoned";

export type LearningItem = {
  id: string;
  url: string;
  title: string;
  site: string;
  image?: string;
  status: ItemStatus;
  createdAt: number;
  updatedAt: number;
  scheduledAt: number;
  notificationId?: string;
  hooks: [string, string, string];
  nextStep: string;
  lastActionAt?: number;
};

export type AppState = {
  items: LearningItem[];
};

