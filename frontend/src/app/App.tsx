import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header, Footer } from "@/widgets";

function App() {
  const location = useLocation();
  const element = useOutlet();

  return (
    <div className="relative flex min-h-dvh flex-col bg-[#000000] bg-[linear-gradient(135deg,_rgba(30,39,255,0.08)_0%,_rgba(246,0,255,0.08)_50%,_rgba(255,141,0,0.08)_100%)] before:absolute before:top-[64px] before:h-4 before:w-full before:bg-[linear-gradient(180deg,_rgba(0,0,0,0.5)_0%,_rgba(0,0,0,0)_100%)]">
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        {element && React.cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
      <Footer className="" />
    </div>
  );
}

export default App;
