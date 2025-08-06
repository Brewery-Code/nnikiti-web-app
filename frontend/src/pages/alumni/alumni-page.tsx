import { PageTransition } from "@/widgets";
import { HeroSection } from "./hero-section";
import { AlumniListSection } from "./alumni-list-section";

function AlumniPage() {
  return (
    <PageTransition className="pb-24" isPaddingOn={false}>
      <HeroSection />
      <AlumniListSection />
    </PageTransition>
  );
}

export const Component = AlumniPage;
