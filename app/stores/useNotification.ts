import { defineStore } from "pinia";

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "info" | "success" | "warning";
  isRead: boolean;
}

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notifications: [
      {
        id: 1,
        title: "Trip Reminder",
        message: "Your Nissan GT-R rental starts tomorrow.",
        time: "2 hours ago",
        type: "info",
        isRead: false,
      },
      {
        id: 2,
        title: "Payment Successful",
        message: "Your reimbursement has been approved.",
        time: "5 hours ago",
        type: "success",
        isRead: false,
      },
      {
        id: 3,
        title: "Promotion",
        message: "20% discount on SUV vehicles this weekend!",
        time: "1 day ago",
        type: "info",
        isRead: true,
      },
    ] as Notification[],
    isDropdownOpen: false,
  }),
  getters: {
    unreadCount: (state) => state.notifications.filter((n) => !n.isRead).length,
    recentNotifications: (state) => state.notifications.slice(0, 4),
  },
  actions: {
    markAsRead(id: number) {
      const notification = this.notifications.find((n) => n.id === id);
      if (notification) notification.isRead = true;
    },
    markAllAsRead() {
      this.notifications.forEach((n) => (n.isRead = true));
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
});
