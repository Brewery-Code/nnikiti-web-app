import { type DepartmentData, type SubjectType } from "@/shared/model/departments-data";
import { profilePlaceholder } from "@/shared/icons";
import { resolveMediaUrl } from "@/shared/model/config";
import type { components } from "@/shared/api/schema/generated";

type ApiDeptDetail = components["schemas"]["DepartmentDetail"];

const SUBJECT_TYPE_MAP: Record<"MN" | "EL", SubjectType> = {
  MN: "Нормативна",
  EL: "Вибіркова",
};

export function mapApiToDept(api: ApiDeptDetail): DepartmentData {
  const head = api.head_of_department?.[0];
  return {
    id: api.id ?? 0,
    name: api.name ?? "",
    description: api.description ?? "",
    email: api.email ?? "",
    address: api.address ?? "",
    imageUrl: resolveMediaUrl((api as Record<string, unknown>).image as string | null),
    historyImageUrl: resolveMediaUrl((api as Record<string, unknown>).history_image as string | null),
    head: {
      full_name: head?.full_name ?? "",
      regalia: head?.regalia ?? "",
      email: head?.email ?? undefined,
      audience: head?.audience ?? undefined,
      imageUrl: resolveMediaUrl((head as Record<string, unknown>)?.image as string | null),
    },
    programs: api.educational_program?.map((prog) => ({
      id: prog.id ?? 0,
      code: prog.code ?? "",
      name: prog.name ?? prog.degree ?? "",
      description: prog.description ?? "",
      degree: prog.degree ?? "",
      duration: prog.duration !== null && prog.duration !== undefined ? `${prog.duration} р.` : "",
      form: prog.form ?? "",
      totalCredits: prog.total_credits ?? 0,
      subjects: prog.subjects?.map((s) => {
        // API `ProgramSubject` only carries `{ id, name }`; credits/semester/type
        // are optional extras not present in the current schema — read defensively.
        const extra = s as { credits?: number; semester?: number; type?: "MN" | "EL" };
        return {
          name: s.name ?? "",
          credits: Number(extra.credits ?? 0),
          semester: extra.semester ?? 1,
          type: SUBJECT_TYPE_MAP[extra.type ?? "EL"],
        };
      }) ?? [],
      learnMoreUrl: (prog as { url?: string | null }).url || undefined,
    })) ?? [],
    team: [
      ...(head ? [{
        name: head.full_name ?? "",
        role: head.regalia ?? "",
        specialty: "",
        email: head.email ?? undefined,
        audience: head.audience ?? undefined,
        imageUrl: resolveMediaUrl((head as Record<string, unknown>).image as string | null),
        url: (head as { url?: string | null }).url || undefined,
      }] : []),
      ...(api.team?.map((m) => ({
        name: m.name ?? "",
        role: m.role ?? "",
        specialty: m.specialty ?? "",
        email: m.email ?? undefined,
        audience: m.audience ?? undefined,
        imageUrl: resolveMediaUrl(m.image),
        url: (m as { url?: string | null }).url || undefined,
      })) ?? []),
    ],
    history: api.history?.map((h) => ({
      year: h.year ?? "",
      text: h.text ?? "",
    })) ?? [],
  };
}

export function avatar(url?: string | null) {
  return url ?? profilePlaceholder;
}

const DEPT_PHOTOS = [
  "/images/students-stage.jpg",
  "/images/students-lecture.jpg",
  "/images/students-christmas.jpg",
  "/images/noosphere-workshop.jpg",
  "/images/students-event.jpg",
  "/images/students-tennis.jpg",
  "/images/vodnik-mascot.jpg",
  "/images/halloween-event.jpg",
  "/images/students-hall.jpg",
  "/images/students-audience.jpg",
  "/images/students-workshop.jpg",
  "/images/students-sport.jpg",
  "/images/students-guitar.jpg",
];

export function cover(url?: string | null, seed = 0) {
  return url ?? DEPT_PHOTOS[seed % DEPT_PHOTOS.length];
}
