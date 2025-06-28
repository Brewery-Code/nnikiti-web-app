import { SpecialtiesCard, Title } from "@/shared/ui";

export default function SpecialtiesSection() {
  return (
    <div className="m-section">
      <Title className="container-base">Specialties</Title>
      <div>
        <SpecialtiesCard />
      </div>
    </div>
  );
}
