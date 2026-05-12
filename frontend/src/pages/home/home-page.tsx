import { PageTransition } from "@/widgets";
import { useServerLogin } from "@/features/auth";
import { HeroSection } from "./hero-section";
import { StatisticSection } from "./statistic-section";
import { SpecialtiesSection } from "./specialties-section";
import { EventsSection } from "./events-section";
import { PartnersSection } from "./partners-section";
import { SocialSection } from "./social-section";
import WhySection from "./why-section/why-section";
import EntrantCtaSection from "./entrant-cta-section/entrant-cta-section";

export function HomePage() {
  useServerLogin();
  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <HeroSection />
      <div className="relative z-[1] rounded-t-[40px] bg-[#08090f] shadow-[0_-30px_80px_rgba(0,0,0,0.55)]">
        <StatisticSection />
        <SpecialtiesSection />
        <WhySection />
        <EventsSection />
        <PartnersSection />
        <EntrantCtaSection />
        <SocialSection />
      </div>
    </PageTransition>
  );
}

export const Component = HomePage;
