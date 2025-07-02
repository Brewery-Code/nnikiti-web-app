import {
  HeroSection,
  StatisticSection,
  SpecialtiesSection,
  NewsSection,
  PartnersSection,
} from "./widgets";

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
