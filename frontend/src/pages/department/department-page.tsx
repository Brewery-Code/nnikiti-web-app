import { PageTransition } from "@/widgets";
import { HeroSection } from "./hero-section";
import { MajorSection } from "./majors-section";
import { TeamSection } from "./team-section";

function DepartmentPage() {
  return (
    <PageTransition isPaddingOn={false} className="mt-0 pb-32">
      <HeroSection />
      <MajorSection />
      <TeamSection />
    </PageTransition>
  );
}

export const Component = DepartmentPage;
