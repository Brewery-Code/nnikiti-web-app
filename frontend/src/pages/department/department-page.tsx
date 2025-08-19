import { PageTransition } from "@/widgets";
import { HeroSection } from "./hero-section";

function DepartmentPage() {
  return (
    <PageTransition isPaddingOn={false} className="mt-0">
      <HeroSection />
    </PageTransition>
  );
}

export const Component = DepartmentPage;
