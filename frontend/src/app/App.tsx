import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header, Footer, Preloader } from "@/widgets";
import { useLenis } from "@/shared/hooks";

export function App() {
  useLenis();
  const location = useLocation();
  const element = useOutlet();

  return (
    <div className="relative flex min-h-dvh flex-col bg-base">
      <Preloader />
      <Header />
      <AnimatePresence mode="wait">
        {element && React.cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
      <Footer className="" />
    </div>
  );
}
