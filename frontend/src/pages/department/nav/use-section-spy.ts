import { useEffect, useState } from "react";
import { SECTION_IDS } from "./section-ids";

export function useSectionSpy() {
  const [active, setActive] = useState("overview");
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) { return; }
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) { setActive(id); }
        },
        { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);
  return active;
}
