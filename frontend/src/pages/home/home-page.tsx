import { HeroSection } from "./hero-section";
import { StatisticSection } from "./statistic-section";
import { SpecialtiesSection } from "./specialties-section";
import { EventsSection } from "./events-section";
import { PartnersSection } from "./partners-section";
import { PageTransition } from "@/widgets";
export function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <StatisticSection className="m-section" />
      <SpecialtiesSection className="m-section" />
      <EventsSection className="m-section" />
      <PartnersSection className="m-section" />
    </PageTransition>
  );
}

export const Component = HomePage;
