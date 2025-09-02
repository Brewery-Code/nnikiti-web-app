import "react-router-dom";
export const ROUTES = {
  HOME: "/",
  ALUMNI: "/alumni",
  DEPARTMENT: "/department/:departmentId/:section",
  DEPARTMENT_HISTORY: "/department/:departmentId/history",
  DEPARTMENT_TEAM: "/department/:departmentId/team",
  CONTACTS: "/contacts",
  FAQ: "/faq",
  ASK_QUESTION: "/ask-question",
  NOT_FOUND: "*",
} as const;

export type PathParams = {
  [ROUTES.DEPARTMENT]: {
    departmentId: string;
    section: "main" | "history" | "team";
  };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
