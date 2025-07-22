import { useLoadNamespace } from "@/shared/hooks";
import { PersonCard, Title } from "@/shared/ui";
import { PageTransition } from "@/widgets";
import { useTranslation } from "react-i18next";
import { loadTranslations } from "./locales";
import { GraduateCard } from "./graduate-card";

function GraduatesPage() {
  useLoadNamespace("graduates", loadTranslations);
  const { t } = useTranslation("graduates");

  return (
    <PageTransition>
      <div className="container-base">
        <Title>{t("title")}</Title>
        <div className="flex flex-col gap-4 justify-between">
          <GraduateCard />
          <GraduateCard />
          <GraduateCard />
          <GraduateCard />
          <GraduateCard />
        </div>
        <div className="flex justify-between">
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
          {/* <PersonCard /> */}
        </div>
        <div className="flex justify-around">
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
        </div>
        <div className="flex justify-between">
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
          {/* <PersonCard /> */}
        </div>
        <div className="flex justify-around">
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
        </div>
        <div className="flex justify-between">
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
          {/* <PersonCard /> */}
        </div>
        <div className="flex justify-around">
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
        </div>
        <div className="flex justify-between">
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
          {/* <PersonCard /> */}
        </div>
        <div className="flex justify-around">
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
        </div>
        <div className="flex justify-between">
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
          {/* <PersonCard /> */}
        </div>
        <div className="flex justify-around">
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
        </div>
        <div className="flex justify-between">
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
          {/* <PersonCard /> */}
        </div>
        <div className="flex justify-around">
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
        </div>
      </div>
    </PageTransition>
  );
}

export const Component = GraduatesPage;
