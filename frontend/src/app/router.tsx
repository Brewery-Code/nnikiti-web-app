import { ROUTES } from "../shared/model/routes";
import { createBrowserRouter } from "react-router-dom";
import { Providers } from "./provider";
import App from "./App";

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        path: ROUTES.HOME,
        lazy: () => import("@/pages/home/home-page"),
      },
    ],
  },
]);
