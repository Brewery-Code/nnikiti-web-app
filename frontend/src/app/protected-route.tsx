import { Navigate, Outlet, redirect } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { getSession, refreshToken } from "@/shared/model/session";

export function ProtectedRoute() {
  const session = getSession();

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}

export async function protectedLoader() {
  const token = await refreshToken();

  if (!token) {
    return redirect(ROUTES.LOGIN);
  }

  return null;
}
