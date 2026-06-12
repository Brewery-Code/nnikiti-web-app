import { useTranslation } from "react-i18next";
import { Reveal } from "@/shared/ui";

export function SectionHeading({ sectionKey }: { sectionKey: "deptHeads" | "staff" }) {
  const { t } = useTranslation("team");
  return (
    <Reveal mode="up" className="mb-8 lg:mb-10">
      <h2
        className="font-display font-black leading-tight text-primary"
        style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
      >
        {t(`sections.${sectionKey}.title`)}{" "}
        <span className="text-grad">{t(`sections.${sectionKey}.accent`)}</span>
      </h2>
    </Reveal>
  );
}
