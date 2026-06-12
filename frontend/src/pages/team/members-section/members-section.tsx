import { Reveal } from "@/shared/ui";
import { publicRqClient } from "@/shared/api/instance";
import { resolveMediaUrl } from "@/shared/model/config";
import { AlternatingGrid, PersonCard, SectionHeading } from "../ui";

export function MembersSection() {
  const staffQuery = publicRqClient.useQuery("get", "/departments/staff/", {}, { retry: false });
  const staffData = staffQuery.data ?? [];
  const heads = staffData.filter((m) => m.type === "head");
  const faculty = staffData.filter((m) => m.type === "faculty");

  return (
    <div className="py-12 sm:py-16 lg:py-24">
      <div className="container-v2 flex flex-col gap-16 lg:gap-24">

        {/* Dept heads */}
        {heads.length > 0 && (
          <div>
            <SectionHeading sectionKey="deptHeads" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {heads.map((p, i) => (
                <Reveal key={p.id ?? i} mode="up" amount={0.1} delay={i * 0.08}>
                  <PersonCard
                    name={p.full_name ?? ""}
                    role={p.regalia ?? ""}
                    email={p.email ?? undefined}
                    imgUrl={resolveMediaUrl(p.image)}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Staff */}
        {faculty.length > 0 && (
          <div>
            <SectionHeading sectionKey="staff" />

            {/* Mobile: regular 2-col */}
            <div className="grid grid-cols-2 gap-3 sm:hidden">
              {faculty.map((m, i) => (
                <Reveal key={m.id ?? i} mode="up" amount={0.1} delay={(i % 2) * 0.07}>
                  <PersonCard
                    name={m.name ?? ""}
                    role={m.role ?? ""}
                    sub={m.specialty ?? undefined}
                    email={m.email ?? undefined}
                    imgUrl={resolveMediaUrl(m.image)}
                  />
                </Reveal>
              ))}
            </div>

            {/* sm+: alternating 4 → 5 → 4 … */}
            <AlternatingGrid
              className="hidden sm:flex"
              items={faculty}
              firstRowSize={4}
              secondRowSize={5}
              renderItem={(m) => (
                <PersonCard
                  name={m.name ?? ""}
                  role={m.role ?? ""}
                  sub={m.specialty ?? undefined}
                  email={m.email ?? undefined}
                  imgUrl={resolveMediaUrl(m.image)}
                />
              )}
            />
          </div>
        )}

      </div>
    </div>
  );
}
