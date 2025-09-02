import { PageTransition } from "@/widgets";
import { HeroSection } from "./hero-section";
import { MajorSection } from "./majors-section";
import { TeamSection } from "./team-section";
import { AboutUs } from "./about-us";
import { useSearchParams } from "react-router-dom";

function DepartmentPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sectionParams = {
    param: "section",
    main: "main",
    history: "history",
    team: "team",
  };

  function setSection(section: string) {
    searchParams.set(sectionParams.param, section);
    setSearchParams(searchParams);
  }

  return (
    <PageTransition isPaddingOn={false} className="mt-0 pb-32">
      <HeroSection sectionParams={sectionParams} setSection={setSection} />
      {searchParams.get(sectionParams.param) === sectionParams.main && (
        <>
          <AboutUs />
          <MajorSection />
        </>
      )}
      {searchParams.get(sectionParams.param) === sectionParams.team && <TeamSection />}
      {searchParams.get(sectionParams.param) === sectionParams.history && <div>History</div>}
    </PageTransition>
  );
}

export const Component = DepartmentPage;
