import { PageTransition } from "@/widgets";
import { useServerLogin } from "@/features/auth";
import { HeroSection } from "./hero-section";
import { StatisticSection } from "./statistic-section";
import { SpecialtiesSection } from "./specialties-section";
import { EventsSection } from "./events-section";
import { PartnersSection } from "./partners-section";

export function HomePage() {
  useServerLogin();
  return (
    <PageTransition className="!pt-0">
      <HeroSection />
      <StatisticSection className="m-section " />
      <SpecialtiesSection className="m-section " />
      <EventsSection className="m-section fade-animation" />
      <PartnersSection className="m-section" />
    </PageTransition>
  );
}

export const Component = HomePage;
