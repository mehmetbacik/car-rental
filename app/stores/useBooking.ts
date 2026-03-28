import { defineStore } from "pinia";

interface Booking {
  id: string;
  carId: string;
  customerName: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  email: string;
  rentDate: string;
  returnDate: string;
  totalPrice: number;
  status: "Completed" | "Active" | "Pending" | "Cancelled";
  method: string;
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
        email: 'John@mail.com',
        rentDate: '2026-03-20', 
        returnDate: '2026-03-24', 
        totalPrice: 320,
        status: 'Completed', 
        method: 'Credit Card'
      },
      {
        id: "102",
        carId: "2",
        customerName: "Jane Doe",
        startDate: "2026-03-22",
        endDate: "2026-03-26",
        email: 'Jane@mail.com',
        rentDate: '2026-03-25', 
        returnDate: '2026-03-28', 
        totalPrice: 240,
        status: 'Active',
        method: 'PayPal'
      },
      {
        id: "103",
        carId: "3",
        customerName: "Alex White",
        startDate: "2026-03-21",
        endDate: "2026-03-23",
        email: 'John@mail.com',
        rentDate: '2026-03-20', 
        returnDate: '2026-03-24', 
        totalPrice: 320,
        status: 'Completed', 
        method: 'Credit Card'
      },
    ] as Booking[],
  }),
});
