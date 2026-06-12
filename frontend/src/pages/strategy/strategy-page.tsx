import { PageTransition } from "@/widgets";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { Hero } from "./hero-section";
import { CrossThemes } from "./themes-section";
import { Departments } from "./departments-section";
import { Cta } from "./cta-section";

function StrategyPage() {
  useLoadNamespace("strategy", loadTranslations);

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <Hero />
      <div>
        <CrossThemes />
        <Departments />
        <Cta />
      </div>
    </PageTransition>
  );
}

export const Component = StrategyPage;
