import "react-router-dom";
export const ROUTES = {
  HOME: "/",
  CONTACTS: "/contacts",
  NOT_FOUND: "*",
} as const;

export type PathParams = {};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
