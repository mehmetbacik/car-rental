import type { UserRole } from "./users";

export interface NavItem {
  id: number;
  label: string;
  link: string;
  icon: string;
  roles: UserRole[];
}
