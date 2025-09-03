import { PageTransition } from "@/widgets";
import { HeroSection } from "./hero-section";
import { MajorSection } from "./majors-section";
import { TeamSection } from "./team-section";
import { AboutUs } from "./about-us";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { sectionParams } from "./section-params";

function DepartmentPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentSection = searchParams.get(sectionParams.paramName) || "";

    const isValidSection = Object.values(sectionParams).includes(currentSection);

    if (isValidSection) {
      setSection(currentSection!);
    } else {
      setSection(sectionParams.main);
    }
  }, [searchParams]);

  function setSection(section: string) {
    searchParams.set(sectionParams.paramName, section);
    setSearchParams(searchParams);
  }

  return (
    <PageTransition isPaddingOn={false} className="mt-0 pb-32">
      <HeroSection setSection={setSection} />
      {searchParams.get(sectionParams.paramName) === sectionParams.main && (
        <>
          <AboutUs />
          <MajorSection />
        </>
      )}
      {searchParams.get(sectionParams.paramName) === sectionParams.team && <TeamSection />}
      {searchParams.get(sectionParams.paramName) === sectionParams.history && <div>History</div>}
    </PageTransition>
  );
}

export const Component = DepartmentPage;
