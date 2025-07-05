import { HeroSection } from "./hero-section";
import { StatisticSection } from "./statistic-section";
import { SpecialtiesSection } from "./specialties-section";
import { EventsSection } from "./events-section";
import { PartnersSection } from "./partners-section";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StatisticSection className="m-section" />
      <SpecialtiesSection className="m-section" />
      <EventsSection className="m-section" />
      <PartnersSection className="m-section" />
    </>
  );
}

export const Component = HomePage;
