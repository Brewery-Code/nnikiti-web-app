import { Reveal } from "@/shared/ui";
import { publicRqClient } from "@/shared/api/instance";
import { resolveMediaUrl } from "@/shared/model/config";
import { PersonCard, SectionHeading } from "../ui";

export function LeadershipSection() {
  const leadershipQuery = publicRqClient.useQuery(
    "get",
    "/departments/institute-leaders/",
    {},
    { retry: false },
  );

  const groups = leadershipQuery.data ?? [];
  const members = groups.flatMap((group) => group.members ?? []);
  const groupPhoto = resolveMediaUrl(groups.find((g) => g.image)?.image);

  if (members.length === 0 && !groupPhoto) return null;

  return (
    <div className="py-12 sm:py-16 lg:py-24">
      <div className="container-v2 flex flex-col gap-10 lg:gap-14">
        <SectionHeading sectionKey="leadership" />

        {/* Shared group photo */}
        {groupPhoto && (
          <Reveal mode="up" amount={0.15} className="mx-auto w-full max-w-[1040px]">
            <figure className="group relative overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#0a0b12] shadow-[0_8px_40px_rgba(0,0,0,0.55)]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[1] rounded-[20px] ring-1 ring-inset ring-white/[0.06]"
              />
              <img
                src={groupPhoto}
                alt=""
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ aspectRatio: "16 / 9" }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#08090f]/70 to-transparent" />
            </figure>
          </Reveal>
        )}
        {/* Members grid */}
        {members.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {members.map((m, i) => (
              <Reveal
                key={m.id ?? i}
                mode="up"
                amount={0.1}
                delay={(i % 4) * 0.08}
              >
                <PersonCard
                  name={m.full_name ?? ""}
                  role={m.position ?? ""}
                  email={m.email ?? undefined}
                  imgUrl={resolveMediaUrl(m.image)}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
