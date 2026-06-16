import { PageTransition } from "@/widgets";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { GrantsHero } from "./hero-section";
import { GrantsSection } from "./grants-section";

function GrantsPage() {
  useLoadNamespace("grants-page", loadTranslations);

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <GrantsHero />
      <div className="pb-10 sm:pb-16 lg:pb-20">
        <GrantsSection />
      </div>
    </PageTransition>
  );
}

export const Component = GrantsPage;
