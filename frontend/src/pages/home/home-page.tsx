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
      <div className="home-content-wrapper relative z-[1] rounded-t-[40px] bg-base">
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
