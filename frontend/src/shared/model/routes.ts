import "react-router-dom";
export const ROUTES = {
  HOME: "/",
  ALUMNI: "/alumni",
  DEPARTMENT: "/department/:departmentId",
  CONTACTS: "/contacts",
  FAQ: "/faq",
  ASK_QUESTION: "/ask-question",
  NOT_FOUND: "*",
} as const;

export type PathParams = {
  [ROUTES.DEPARTMENT]: {
    departmentId: string;
  };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
