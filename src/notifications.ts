import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

async function ensureAndroidChannel(): Promise<void> {
  if (Platform.OS !== "android") return;
  await Notifications.setNotificationChannelAsync("default", {
    name: "Default",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#6366F1"
  });
}

export async function ensureNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === "web") return false;
  await ensureAndroidChannel();
  const existing = await Notifications.getPermissionsAsync();
  if (existing.status === "granted") return true;
  const req = await Notifications.requestPermissionsAsync();
  return req.status === "granted";
}

export async function scheduleLearningReminder(params: {
  itemId: string;
  when: Date;
  title: string;
  body: string;
}): Promise<string | undefined> {
  const ok = await ensureNotificationPermissions();
  if (!ok) return undefined;

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: params.title,
      body: params.body,
      data: { itemId: params.itemId }
    },
    trigger: {
      date: params.when,
      channelId: "default"
    }
  });
  return id;
}

export async function cancelReminder(notificationId?: string): Promise<void> {
  if (!notificationId) return;
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch {
    // ignore
  }
}

export function onNotificationOpen(cb: (itemId: string) => void): () => void {
  const sub = Notifications.addNotificationResponseReceivedListener((resp) => {
    const itemId = (resp.notification.request.content.data as any)?.itemId;
    if (typeof itemId === "string" && itemId) cb(itemId);
  });
  return () => sub.remove();
}

