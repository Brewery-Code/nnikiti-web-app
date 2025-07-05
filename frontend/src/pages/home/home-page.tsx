import { HeroSection } from "./hero-section";
import { StatisticSection } from "./statistic-section";
import { SpecialtiesSection } from "./specialties-section";
import { EventsSection } from "./events-section";
import { PartnersSection } from "./partners-section";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StatisticSection />
      <SpecialtiesSection />
      <EventsSection />
      <PartnersSection />
    </>
  );
}

export const Component = HomePage;
