import {
  HeroSection,
  StatisticSection,
  SpecialtiesSection,
  NewsSection,
} from "./widgets";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StatisticSection />
      <SpecialtiesSection />
      <NewsSection />
    </>
  );
}

export const Component = HomePage;
