import { lazy, Suspense } from "react";
import { PageTransition } from "@/widgets";
import { useServerLogin } from "@/features/auth";
import { HeroSection } from "./hero-section";

// Below-the-fold sections are code-split so their JS (incl. Swiper) stays off
// the initial critical path — the hero can render and fetch sooner.
const StatisticSection = lazy(() => import("./statistic-section").then((m) => ({ default: m.StatisticSection })));
const SpecialtiesSection = lazy(() => import("./specialties-section").then((m) => ({ default: m.SpecialtiesSection })));
const EventsSection = lazy(() => import("./events-section").then((m) => ({ default: m.EventsSection })));
const PartnersSection = lazy(() => import("./partners-section").then((m) => ({ default: m.PartnersSection })));
const SocialSection = lazy(() => import("./social-section").then((m) => ({ default: m.SocialSection })));
const WhySection = lazy(() => import("./why-section/why-section"));
const EntrantCtaSection = lazy(() => import("./entrant-cta-section/entrant-cta-section"));

export function HomePage() {
  useServerLogin();
  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <HeroSection />
      <div className="home-content-wrapper relative z-[1] bg-base">
        <Suspense fallback={null}>
          <StatisticSection />
          <SpecialtiesSection />
          <WhySection />
          <EventsSection />
          <PartnersSection />
          <EntrantCtaSection />
          <SocialSection />
        </Suspense>
      </div>
    </PageTransition>
  );
}

export const Component = HomePage;
