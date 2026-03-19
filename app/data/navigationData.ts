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
    label: "Car Inventory",
    link: "/dashboard/inventory",
    icon: "🏎️",
    roles: ["admin"],
  },
  {
    id: 4,
    label: "Insight",
    link: "/dashboard/insight",
    icon: "📊",
    roles: ["admin"],
  },

  //User
  {
    id: 5,
    label: "My Rentals",
    link: "/dashboard/my-rentals",
    icon: "🔑",
    roles: ["user"],
  },
  {
    id: 6,
    label: "Payment Methods",
    link: "/dashboard/payments",
    icon: "💳",
    roles: ["user"],
  },
  {
    id: 7,
    label: "Rent History",
    link: "/dashboard/history",
    icon: "📜",
    roles: ["user"],
  },
];
