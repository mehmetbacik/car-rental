import { defineStore } from "pinia";

interface Booking {
  id: string;
  carId: string;
  customerName: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  status: "confirmed" | "pending";
}

export const useBookingStore = defineStore("bookings", {
  state: () => ({
    bookings: [
      {
        id: "101",
        carId: "1",
        customerName: "John Doe",
        startDate: "2026-03-20",
        endDate: "2026-03-24",
        status: "confirmed",
      },
      {
        id: "102",
        carId: "2",
        customerName: "Jane Doe",
        startDate: "2026-03-22",
        endDate: "2026-03-26",
        status: "confirmed",
      },
      {
        id: "103",
        carId: "4",
        customerName: "Alex White",
        startDate: "2026-03-21",
        endDate: "2026-03-23",
        status: "pending",
      },
    ] as Booking[],
  }),
});
