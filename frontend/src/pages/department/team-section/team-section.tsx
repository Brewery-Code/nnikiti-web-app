import { Title } from "@/shared/ui";
import { WorkerCard } from "./worker-card";

export function TeamSection() {
  return (
    <div className="container-base m-section">
      <Title>Team</Title>
      <div className="grid grid-cols-5 place-items-center gap-8 mt-16">
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
      </div>
    </div>
  );
}
