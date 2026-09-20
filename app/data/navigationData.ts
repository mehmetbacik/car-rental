import type { NavItem } from "../types/navigation";

export const dashboardNavItems: NavItem[] = [
  // Admin
  {
    id: 2,
    label: "Dashboard",
    link: "/dashboard",
    icon: "mdi:view-dashboard-outline",
    roles: ["admin"],
  },
  {
    id: 3,
    label: "Car Rent",
    link: "/dashboard/rentals",
    icon: "mdi:car-outline",
    roles: ["admin"],
  },
  {
    id: 4,
    label: "Car Inventory",
    link: "/dashboard/inventory",
    icon: "mdi:garage-variant",
    roles: ["admin"],
  },
  {
    id: 5,
    label: "Insight",
    link: "/dashboard/insight",
    icon: "mdi:chart-bar",
    roles: ["admin"],
  },
  {
    id: 6,
    label: "Reimburse",
    link: "/dashboard/reimburse",
    icon: "mdi:cash-refund",
    roles: ["admin"],
  },
  {
    id: 7,
    label: "Inbox",
    link: "/dashboard/inbox",
    icon: "mdi:inbox-outline",
    roles: ["admin"],
  },
  {
    id: 8,
    label: "Calendar",
    link: "/dashboard/calendar",
    icon: "mdi:calendar-month-outline",
    roles: ["admin"],
  },
  {
    id: 9,
    label: "Help & Center",
    link: "/dashboard/help",
    icon: "mdi:help-circle-outline",
    roles: ["admin", "user"],
  },

  // User
  {
    id: 10,
    label: "My Rentals",
    link: "/dashboard/myrentals",
    icon: "mdi:key-variant",
    roles: ["user"],
  },
  {
    id: 11,
    label: "Payment Methods",
    link: "/dashboard/payments",
    icon: "mdi:credit-card-outline",
    roles: ["user"],
  },
];
