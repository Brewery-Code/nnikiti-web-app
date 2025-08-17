import { PageTransition } from "@/widgets";
import { HeroSection } from "./hero-section";

function DepartmentPage() {
  return (
    <PageTransition>
      <HeroSection />
    </PageTransition>
  );
}

export const Component = DepartmentPage;
