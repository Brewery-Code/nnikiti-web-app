import { useParams, Navigate } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { PageTransition } from "@/widgets";
import { publicRqClient } from "@/shared/api/instance";
import { useLoadNamespace } from "@/shared/hooks";
import { useSeo } from "@/shared/ui";
import { SITE_NAME, clampText, stripMarkup } from "@/shared/model/seo";
import { loadTranslations } from "./locales";
import { mapApiToDept } from "./lib";
import { HeroSection } from "./hero-section";
import { Sidebar, MobileDeptSelector } from "./nav";
import { ProgramsSection } from "./programs-section";
import { TeamSection } from "./team-section";
import { ContactsSection } from "./contacts-section";
import { HistorySection } from "./history-section";

type DeptListItem = { id?: number; name?: string; slug?: string };

function DepartmentPage() {
  useLoadNamespace("department", loadTranslations);
  const { departmentSlug } = useParams<{ departmentSlug: string }>();

  const deptListQuery = publicRqClient.useQuery("get", "/departments/", {}, { retry: false });
  const deptEntry = (deptListQuery.data as DeptListItem[] ?? []).find(d => d.slug === departmentSlug);
  const numId = deptEntry?.id ?? 0;

  const deptDetailQuery = publicRqClient.useQuery(
    "get",
    "/departments/{id}/",
    { params: { path: { id: numId } } },
    { retry: false, enabled: numId > 0 },
  );

  const deptName = deptDetailQuery.data?.name;
  useSeo(
    deptName
      ? {
          title: `${deptName} — ${SITE_NAME}`,
          description: clampText(
            stripMarkup(deptDetailQuery.data?.description || "") ||
              `Кафедра «${deptName}» ННІ комп'ютерних та інноваційних технологій НУВГП: освітні програми, команда та контакти.`,
          ),
        }
      : null,
  );

  if (deptDetailQuery.isError) {
    return <Navigate to={ROUTES.ERROR} replace />;
  }

  if (deptDetailQuery.isPending) { return null; }

  const dept = mapApiToDept(deptDetailQuery.data);
  const deptList = (deptListQuery.data as DeptListItem[] ?? []).map((d) => ({
    id: d.id ?? 0,
    slug: d.slug ?? "",
    name: d.name ?? "",
  }));

  return (
    <PageTransition isPaddingOn={false} className="!pt-0 pb-0">
      <HeroSection dept={dept} />

      <div className="pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pb-20">
        <div className="container-v2">
          <MobileDeptSelector deptList={deptList} departmentSlug={departmentSlug ?? ""} />

          <div className="flex gap-fluid-sm">
            <Sidebar />
            <main className="min-w-0 flex-1">
              <ProgramsSection dept={dept} />
              <TeamSection dept={dept} />
              <HistorySection dept={dept} />
              <ContactsSection dept={dept} />
            </main>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export const Component = DepartmentPage;
