import { create } from "zustand";

interface NotificationState {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  markAllRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  unreadCount: 3,
  setUnreadCount: (count) => set({ unreadCount: count }),
  markAllRead: () => set({ unreadCount: 0 }),
}));
