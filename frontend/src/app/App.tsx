import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useIsFetching } from "@tanstack/react-query";
import { Header, Footer, Preloader, GlobalBackground, SideOrbs } from "@/widgets";
import { useLenis } from "@/shared/hooks";

export function App() {
  useLenis();
  const location = useLocation();
  const element = useOutlet();

  const isFetching = useIsFetching({ predicate: (query) => query.state.status === "pending" });

  return (
    <div className="relative flex min-h-svh flex-col">
      <GlobalBackground />
      <SideOrbs />
      <Preloader forceVisible={isFetching > 0} />
      <Header />
      <AnimatePresence mode="wait">
        {element && React.cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
      <Footer className="" />
    </div>
  );
}
