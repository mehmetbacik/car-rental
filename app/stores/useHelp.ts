import { defineStore } from "pinia";

export const useHelpStore = defineStore("help", {
  state: () => ({
    categories: [
      { id: "1", title: "Booking Guide", icon: "🚗", count: 12 },
      { id: "2", title: "Payments & Refund", icon: "💳", count: 8 },
      { id: "3", title: "Technical Support", icon: "🛠️", count: 5 },
      { id: "4", title: "Security", icon: "🛡️", count: 4 },
    ],
    faqs: [
      {
        question: "How can I extend a rental period?",
        answer:
          'You can extend your rental through the "Car Rent" page by clicking on the active booking and selecting "Extend". Additional charges will apply.',
        isOpen: false,
      },
      {
        question: "What is the policy for fuel reimbursement?",
        answer:
          "Fuel costs are reimbursed if the vehicle is returned with a full tank or according to the specific contract terms. Please upload your receipt to the Reimburse page.",
        isOpen: false,
      },
    ],
  }),
});
