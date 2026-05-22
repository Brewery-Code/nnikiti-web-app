import { Title } from "@/shared/ui";
import { WorkerCard } from "./worker-card";

export function TeamSection() {
  return (
    <div className="m-section container-base">
      <Title>Team</Title>
      <div className="mt-content-title grid grid-cols-3 place-items-center gap-8">
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
      </div>
    </div>
  );
}
