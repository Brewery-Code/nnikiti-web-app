import { ROUTES } from "@/shared/model/routes";

export type PartnersPageKind = "academic" | "business";

export type PartnerProposition = {
  id: number;
  partner: string;
  name: string;
  description: string;
  type: string;
  direction: string;
  format: string;
  deadline: string;
  skills: string[];
  link: string;
};

export type PartnersPageData = {
  title: string;
  gradientTitle: string;
  intro: string;
  heroImage: string;
  propositions: PartnerProposition[];
};

export type PartnersLabels = {
  instituteName: string;
  navAcademic: string;
  navBusiness: string;
  heroEyebrow: string;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionIntro: string;
  results: string;
  search: string;
  searchPlaceholder: string;
  direction: string;
  type: string;
  all: string;
  reset: string;
  neededSkills: string;
  deadline: string;
  moreInfo: string;
  noResultsTitle: string;
  noResultsText: string;
};

export type SelectOption = { value: string; label: string };

export const PAGE_HERO_IMAGE: Record<PartnersPageKind, string> = {
  academic: "/images/students-audience.jpg",
  business: "/images/noosphere-workshop.jpg",
};

export const PROPOSITIONS_META: Record<
  PartnersPageKind,
  Array<{ deadline: string; link: string }>
> = {
  academic: [
    { deadline: "2026-05-24", link: "https://www.gallaudet.edu/" },
    { deadline: "2026-06-12", link: "https://erasmus-plus.ec.europa.eu/" },
    { deadline: "2026-05-31", link: "https://education.ec.europa.eu/" },
    { deadline: "2026-06-20", link: "https://www.openaire.eu/" },
  ],
  business: [
    { deadline: "2026-05-18", link: "https://career.softserveinc.com/" },
    { deadline: "2026-06-02", link: "https://www.gen.tech/careers/" },
    { deadline: "2026-05-29", link: "https://www.epam.com/careers" },
    { deadline: "2026-06-15", link: "https://ajax.systems/careers/" },
  ],
};

export const NAV_ITEMS = [
  { kind: "academic", labelKey: "common.navAcademic", route: ROUTES.PARTNERS_ACADEMIC_MOBILITY },
  { kind: "business", labelKey: "common.navBusiness", route: ROUTES.PARTNERS_BUSINESS },
] satisfies Array<{ kind: PartnersPageKind; labelKey: string; route: string }>;
