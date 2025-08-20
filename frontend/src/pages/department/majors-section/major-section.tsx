import { SpecialtiesCard, Title } from "@/shared/ui";

export function MajorSection() {
  return (
    <div className="container-base m-section">
      <Title>Majors</Title>
      <div className="flex justify-start gap-16">
        <SpecialtiesCard />
        <SpecialtiesCard />
        <SpecialtiesCard />
      </div>
    </div>
  );
}
