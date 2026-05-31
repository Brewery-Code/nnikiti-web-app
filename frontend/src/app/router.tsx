import { ROUTES } from "../shared/model/routes";
import { createBrowserRouter } from "react-router-dom";
import { Providers } from "./provider";
import { App } from "./App";
import { ProtectedRoute } from "./protected-route";

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        Component: ProtectedRoute,
        children: [],
      },
      {
        path: ROUTES.HOME,
        lazy: () => import("@/pages/home/home-page"),
      },
      {
        path: ROUTES.HISTORY,
        lazy: () => import("@/pages/history/history-page"),
      },
      {
        path: ROUTES.STRATEGY,
        lazy: () => import("@/pages/strategy/strategy-page"),
      },
      {
        path: ROUTES.EVENTS,
        lazy: () => import("@/pages/events/events-page"),
      },
      {
        path: ROUTES.NEWS_ITEM,
        lazy: () => import("@/pages/events/news-item-page"),
      },
      {
        path: ROUTES.SCIENCE_PUBLICATIONS,
        lazy: () => import("@/pages/science/publications-page"),
      },
      {
        path: ROUTES.SCIENCE_RESEARCH,
        lazy: () => import("@/pages/science/research-page"),
      },
      {
        path: ROUTES.SCIENCE_CONFERENCES,
        lazy: () => import("@/pages/science/conferences-page"),
      },
      {
        path: ROUTES.SCIENCE_GRANTS,
        lazy: () => import("@/pages/science/grants-page"),
      },
      {
        path: ROUTES.PARTNERS_ACADEMIC_MOBILITY,
        lazy: () => import("@/pages/partners/academic-mobility-page"),
      },
      {
        path: ROUTES.PARTNERS_BUSINESS,
        lazy: () => import("@/pages/partners/business-partners-page"),
      },
      {
        path: ROUTES.UNDERGRADUATE,
        lazy: () => import("@/pages/entrant/undergraduate-page"),
      },
      {
        path: ROUTES.BACHELOR,
        lazy: () => import("@/pages/entrant/bachelor-page"),
      },
      {
        path: ROUTES.MASTER,
        lazy: () => import("@/pages/entrant/master-page"),
      },
      {
        path: ROUTES.POSTGRADUATE,
        lazy: () => import("@/pages/entrant/postgraduate-page"),
      },
      {
        path: ROUTES.ALUMNI,
        lazy: () => import("@/pages/alumni/alumni-page"),
      },
      {
        path: ROUTES.DEPARTMENT,
        lazy: () => import("@/pages/department/department-page"),
      },
      {
        path: ROUTES.TEAM,
        lazy: () => import("@/pages/team/team-page"),
      },
      {
        path: ROUTES.GALLERY,
        lazy: () => import("@/pages/gallery/gallery-page"),
      },
      {
        path: ROUTES.GALLERY_ALL,
        lazy: () => import("@/pages/gallery/gallery-all-page"),
      },
      {
        path: ROUTES.GALLERY_YEAR,
        lazy: () => import("@/pages/gallery/gallery-year-page"),
      },
      {
        path: ROUTES.GALLERY_EVENT,
        lazy: () => import("@/pages/gallery/gallery-event-page"),
      },
      {
        path: ROUTES.CONTACTS,
        lazy: () => import("@/pages/contacts/contacts-page"),
      },
      {
        path: ROUTES.FAQ,
        lazy: () => import("@/pages/faq/faq-page"),
      },
      {
        path: ROUTES.ASK_QUESTION,
        lazy: () => import("@/pages/ask-question/ask-question-page"),
      },
      {
        path: ROUTES.SEARCH,
        lazy: () => import("@/pages/search/search-page"),
      },
      {
        path: ROUTES.ERROR,
        lazy: () => import("@/pages/error/error-page"),
      },
      {
        path: ROUTES.NOT_FOUND,
        lazy: () => import("@/pages/not-found/not-found-page"),
      },
    ],
  },
]);
