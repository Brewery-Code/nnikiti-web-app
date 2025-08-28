import { Title } from "@/shared/ui";
import EventCard from "./event-card";
import { useTranslation } from "react-i18next";
import { useLoadNamespace, useScrollDownAnimation } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import clsx from "clsx";
import { useRef } from "react";

export default function NewsSection({ className = "" }: { className?: string }) {
  useLoadNamespace("home", loadTranslations);
  const { t } = useTranslation("home");

  const blockRef = useRef<HTMLDivElement>(null);
  useScrollDownAnimation({ elementRef: blockRef });

  return (
    <section className={clsx("container-base", className)} ref={blockRef}>
      <Title>{t("events.title")}</Title>
      <div className="grid h-[790px] grid-cols-1 grid-rows-3 gap-8 md:h-[590px] md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3">
        <EventCard className="md:row-span-2" />
        <EventCard />
        <EventCard />
        <EventCard className="hidden lg:flex" />
        <EventCard className="hidden lg:flex" />
      </div>
    </section>
  );
}
