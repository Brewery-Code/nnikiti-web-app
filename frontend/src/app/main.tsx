import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";

async function enableMocking() {
  if (import.meta.env.PROD || import.meta.env.VITE_API_MOCKING !== "true") {
    return;
  }

  const { worker } = await import("@/shared/api/mocks/browser.ts");
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
});
