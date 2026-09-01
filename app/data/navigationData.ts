import type { NavItem } from "../types/navigation";

export const dashboardNavItems: NavItem[] = [
  {
    id: 1,
    label: "Settings",
    link: "/dashboard/settings",
    icon: "⚙️",
    roles: ["admin", "user"],
  },

  //Admin
  {
    id: 2,
    label: "Dashboard",
    link: "/dashboard",
    icon: "🏠",
    roles: ["admin"],
  },
  {
    id: 3,
    label: "Car Rent",
    link: "/dashboard/rentals",
    icon: "🏎️",
    roles: ["admin"],
  },
  {
    id: 4,
    label: "Car Inventory",
    link: "/dashboard/inventory",
    icon: "🏎️",
    roles: ["admin"],
  },
  {
    id: 5,
    label: "Insight",
    link: "/dashboard/insight",
    icon: "📊",
    roles: ["admin"],
  },
  {
    id: 6,
    label: "Reimburse",
    link: "/dashboard/reimburse",
    icon: "📊",
    roles: ["admin"],
  },
  {
    id: 7,
    label: "Inbox",
    link: "/dashboard/inbox",
    icon: "📊",
    roles: ["admin"],
  },
  {
    id: 8,
    label: "Calendar",
    link: "/dashboard/calendar",
    icon: "📊",
    roles: ["admin"],
  },
  {
    id: 9,
    label: "Help & Center",
    link: "/dashboard/help",
    icon: "📊",
    roles: ["admin"],
  },

  //User
  {
    id: 9,
    label: "My Rentals",
    link: "/dashboard/myrentals",
    icon: "🔑",
    roles: ["user"],
  },
  {
    id: 10,
    label: "Payment Methods",
    link: "/dashboard/payments",
    icon: "💳",
    roles: ["user"],
  },
];
