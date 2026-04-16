import type { FooterLink, FooterGroup } from "../types/footer";

export const footerGroups: FooterGroup[] = [
  {
    title: "About",
    links: [
      { name: "How it works", url: "/#" },
      { name: "Featured", url: "/#" },
      { name: "Partnership", url: "/#" },
      { name: "Business Relation", url: "/#" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Events", url: "/#" },
      { name: "Blog", url: "/#" },
      { name: "Podcast", url: "/#" },
      { name: "Invite a friend", url: "/#" },
    ],
  },
  {
    title: "Socials",
    links: [
      { name: "Discord", url: "https://discord.com", isExternal: true },
      { name: "Instagram", url: "https://instagram.com", isExternal: true },
      { name: "Twitter", url: "https://twitter.com", isExternal: true },
      { name: "Facebook", url: "https://facebook.com", isExternal: true },
    ],
  },
];

export const legalLinks: FooterLink[] = [
  { name: "Privacy & Policy", url: "/#" },
  { name: "Terms & Condition", url: "/#" },
];
