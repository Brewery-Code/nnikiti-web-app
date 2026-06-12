import { PageTransition } from "@/widgets";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { HeroSection } from "./hero-section";
import { MembersSection } from "./members-section";

function TeamPage() {
  useLoadNamespace("team", loadTranslations);

  return (
    <PageTransition isPaddingOn={false} className="!pt-0 pb-0">
      <HeroSection />
      <MembersSection />
    </PageTransition>
  );
}

export const Component = TeamPage;
