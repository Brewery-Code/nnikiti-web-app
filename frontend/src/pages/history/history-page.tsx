import { PageTransition } from "@/widgets";
import { HeroSection } from "./hero-section";
import { TimelineSection } from "./timeline-section";
import AboutSection from "./about-section/about-section";
import ClosingSection from "./closing-section/closing-section";

function HistoryPage() {
  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <HeroSection />
      <div className="bg-base">
        <AboutSection />
        <TimelineSection />
        <ClosingSection />
      </div>
    </PageTransition>
  );
}

export const Component = HistoryPage;
