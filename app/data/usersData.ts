import type { userType } from "../types/users";

export const usersData: userType[] = [
  {
    id: "1",
    email: "admin@morent.com",
    password: "123",
    name: "John Doe",
    role: "admin",
    avatar: "/icons/profile.svg",
  },
  {
    id: "2",
    email: "user@morent.com",
    password: "123",
    name: "Jane Doe",
    role: "user",
    avatar: "/icons/profile.svg",
  },
];