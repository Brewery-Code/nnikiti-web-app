import { HeroSection } from "./hero-section";
import { StatisticSection } from "./statistic-section";
import { SpecialtiesSection } from "./specialties-section";
import { NewsSection } from "./news-section";
import { PartnersSection } from "./partners-section";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StatisticSection />
      <SpecialtiesSection />
      <NewsSection />
      <PartnersSection />
    </>
  );
}

export const Component = HomePage;
