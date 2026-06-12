import { ROUTES } from "@/shared/model/routes";

export type SciencePageKind =
  | "publications"
  | "research"
  | "conferences"
  | "grants";

export type ActivityStatusKey = "open" | "upcoming" | "completed";

export type ScienceActivity = {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  theme: string;
  location: string;
  status: ActivityStatusKey;
  statusLabel: string;
  organizer: string;
  tags: string[];
};

export type SciencePageData = {
  eyebrow: string;
  title: string;
  gradientTitle: string;
  intro: string;
  heroImage: string;
  activitiesTitle: string;
  activitiesIntro: string;
  activities: ScienceActivity[];
};

export type ScienceLabels = {
  navPublications: string;
  navResearch: string;
  navConferences: string;
  navGrants: string;
  activities: string;
  results: string;
  search: string;
  searchPlaceholder: string;
  date: string;
  theme: string;
  status: string;
  all: string;
  reset: string;
  location: string;
  organizer: string;
  noResultsTitle: string;
  noResultsText: string;
};

export type SelectOption = { value: string; label: string };

export const PAGE_HERO_IMAGE: Record<SciencePageKind, string> = {
  publications: "/images/students-event.jpg",
  research: "/images/noosphere-workshop.jpg",
  conferences: "/images/students-stage.jpg",
  grants: "/images/students-workshop.jpg",
};

export const ACTIVITY_META: Record<
  SciencePageKind,
  Array<{ date: string; status: ActivityStatusKey }>
> = {
  publications: [
    { date: "2026-05-12", status: "open" },
    { date: "2026-06-03", status: "upcoming" },
    { date: "2026-04-18", status: "completed" },
    { date: "2026-05-28", status: "open" },
  ],
  research: [
    { date: "2026-05-07", status: "open" },
    { date: "2026-05-21", status: "upcoming" },
    { date: "2026-04-09", status: "completed" },
    { date: "2026-06-10", status: "upcoming" },
  ],
  conferences: [
    { date: "2026-05-15", status: "open" },
    { date: "2026-05-30", status: "upcoming" },
    { date: "2026-04-16", status: "completed" },
    { date: "2026-06-18", status: "open" },
  ],
  grants: [
    { date: "2026-05-05", status: "open" },
    { date: "2026-05-23", status: "upcoming" },
    { date: "2026-04-12", status: "completed" },
    { date: "2026-06-07", status: "open" },
  ],
};

export const NAV_ITEMS = [
  { kind: "publications", route: ROUTES.SCIENCE_PUBLICATIONS, labelKey: "common.navPublications" },
  { kind: "research", route: ROUTES.SCIENCE_RESEARCH, labelKey: "common.navResearch" },
  { kind: "conferences", route: ROUTES.SCIENCE_CONFERENCES, labelKey: "common.navConferences" },
  { kind: "grants", route: ROUTES.SCIENCE_GRANTS, labelKey: "common.navGrants" },
] satisfies Array<{ kind: SciencePageKind; route: string; labelKey: string }>;

export const STATUS_KEYS = ["open", "upcoming", "completed"];

export const MONTH_UA = ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"];
export const DAY_UA = ["Нд","Пн","Вт","Ср","Чт","Пт","Сб"];

export function labelsByStatus(status: string, activities: ScienceActivity[]) {
  return (
    activities.find((activity) => activity.status === status)?.statusLabel ??
    status
  );
}
