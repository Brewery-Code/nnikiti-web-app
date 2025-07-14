import { Navigate, Outlet, redirect } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { getSession, refreshToken } from "@/shared/model/session";

export function ProtectedRoute() {
  const token = refreshToken();

  if (!token) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return <Outlet />;
}

export async function protectedLoader() {
  const token = await refreshToken();

  if (!token) {
    return redirect(ROUTES.HOME);
  }

  return null;
}
