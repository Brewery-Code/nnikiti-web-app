import "react-router-dom";
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  NOT_FOUND: "*",
} as const;

export type PathParams = {};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
