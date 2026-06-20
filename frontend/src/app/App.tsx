import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header, Footer, Preloader, GlobalBackground, SideOrbs, AiChat } from "@/widgets";
import { useLenis } from "@/shared/hooks";
import { Seo } from "@/shared/ui";

export function App() {
  useLenis();
  const location = useLocation();
  const element = useOutlet();

  return (
    <div className="relative flex min-h-svh flex-col">
      <Seo />
      <GlobalBackground />
      <SideOrbs />
      <Preloader />
      <Header />
      <AnimatePresence mode="wait">
        {element && React.cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
      <Footer className="" />
      <AiChat />
    </div>
  );
}
