export interface FooterLink {
  name: string;
  url: string;
  isExternal?: boolean;
}

export interface FooterGroup {
  title: string;
  links: FooterLink[];
}
