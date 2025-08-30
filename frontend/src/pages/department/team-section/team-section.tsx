import { Title } from "@/shared/ui";
import { WorkerCard } from "./worker-card";

export function TeamSection() {
  return (
    <div className="container-base m-section">
      <Title>Team</Title>
      <div className="mt-16 grid grid-cols-3 place-items-center gap-8">
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
      </div>
    </div>
  );
}
