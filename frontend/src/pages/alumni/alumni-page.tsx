import { PageTransition } from "@/widgets";
import { HeroSection } from "./hero-section";
import { AlumniListSection } from "./alumni-list-section";

function AlumniPage() {
  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <HeroSection />
      <div>
        <AlumniListSection />
      </div>
    </PageTransition>
  );
}

export const Component = AlumniPage;
