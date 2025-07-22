import "react-router-dom";
export const ROUTES = {
  HOME: "/",
  GRADUATES: "/graduates",
  CONTACTS: "/contacts",
  FAQ: "/faq",
  ASK_QUESTION: "/ask-question",
  NOT_FOUND: "*",
} as const;

export type PathParams = {};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
