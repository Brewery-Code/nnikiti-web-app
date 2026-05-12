import { SpecialtiesCard, Title } from "@/shared/ui";

export function MajorSection() {
  return (
    <div className="m-section container-base m-section">
      <Title>Majors</Title>
      <div className="mt-content-title flex justify-start gap-16">
        <SpecialtiesCard />
        <SpecialtiesCard />
        <SpecialtiesCard />
      </div>
    </div>
  );
}
