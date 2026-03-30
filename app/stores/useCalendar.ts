import { defineStore } from "pinia";

export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // YYYY-MM-DD
  type: "delivery" | "return" | "maintenance";
  carName: string;
  customer?: string;
}

export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    events: [
      {
        id: "1",
        title: "Delivery",
        start: "2026-03-20",
        type: "delivery",
        carName: "Tesla Model 3",
        customer: "John D.",
      },
      {
        id: "2",
        title: "Return",
        start: "2026-03-22",
        type: "return",
        carName: "BMW M4",
        customer: "Emily J.",
      },
      {
        id: "3",
        title: "Maintenance",
        start: "2026-03-25",
        type: "maintenance",
        carName: "Nissan GT-R",
      },
    ] as CalendarEvent[],
  }),
});
