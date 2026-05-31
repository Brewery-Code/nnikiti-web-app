import "react-router-dom";
export const ROUTES = {
  HOME: "/",
  HISTORY: "/history",
  STRATEGY: "/strategy",
  EVENTS: "/events",
  NEWS_ITEM: "/news/:id",
  SCIENCE_PUBLICATIONS: "/science/publications",
  SCIENCE_RESEARCH: "/science/research",
  SCIENCE_CONFERENCES: "/science/conferences",
  SCIENCE_GRANTS: "/science/grants",
  PARTNERS_ACADEMIC_MOBILITY: "/partners/academic-mobility",
  PARTNERS_BUSINESS: "/partners/business",
  UNDERGRADUATE: "/entrant/undergraduate",
  BACHELOR: "/entrant/bachelor",
  MASTER: "/entrant/master",
  POSTGRADUATE: "/entrant/postgraduate",
  ALUMNI: "/alumni",
  DEPARTMENT: "/department/:departmentId",
  TEAM: "/team",
  GALLERY: "/gallery",
  GALLERY_ALL: "/gallery/all",
  GALLERY_YEAR: "/gallery/year/:year",
  GALLERY_EVENT: "/gallery/event/:eventId",
  CONTACTS: "/contacts",
  FAQ: "/faq",
  ASK_QUESTION: "/ask-question",
  SEARCH: "/search",
  ERROR: "/error",
  NOT_FOUND: "*",
} as const;

export type PathParams = {
  [ROUTES.DEPARTMENT]: { departmentId: string };
  [ROUTES.NEWS_ITEM]:  { id: string };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
