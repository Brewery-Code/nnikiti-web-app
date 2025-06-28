import { useSelector } from "react-redux";
import type { RootState } from "./store";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";

export function ProtectedRoute() {
  const session = useSelector((state: RootState) => state.user.session);
  if (!session) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}
