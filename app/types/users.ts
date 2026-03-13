export type UserRole = "admin" | "user";

export interface userType {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: UserRole;
  avatar: string;
}
