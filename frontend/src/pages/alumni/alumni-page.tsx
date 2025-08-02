import { useLoadNamespace } from "@/shared/hooks";
import { Title } from "@/shared/ui";
import { PageTransition } from "@/widgets";
import { useTranslation } from "react-i18next";
import { loadTranslations } from "./locales";
import { AlumniCard } from "./alumni-card";
import clsx from "clsx";

function AlumniPage() {
  useLoadNamespace("graduates", loadTranslations);
  const { t } = useTranslation("graduates");

  return (
    <PageTransition>
      <div className="container-base">
        <Title>{t("title")}</Title>
        <div className="flex gap-8 items-center mt-8">
          <p className="text-xl font-semibold">
            Випускник? Хочеш розповісти про себе? Заповнюй форму і ми додамо
            тебе до сторінки!
          </p>
          <button
            className={clsx(
              "px-3 py-2 bg-white rounded-2xl text-black font-bold cursor-pointer outline-2 outline-transparent",
              "transition-[background-color,color,outline] duration-300 hover:bg-black hover:text-white hover:outline-white"
            )}
          >
            Заповнити форму
          </button>
        </div>
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
          <AlumniCard />
          <AlumniCard />
          <AlumniCard />
          <AlumniCard />
          <AlumniCard />
          <AlumniCard />
          <AlumniCard />
          <AlumniCard />
          <AlumniCard />
        </div>
      </div>
    </PageTransition>
  );
}

export const Component = AlumniPage;
