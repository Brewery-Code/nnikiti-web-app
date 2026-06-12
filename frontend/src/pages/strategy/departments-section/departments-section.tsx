import { useTranslation } from "react-i18next";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { type DeptItem } from "../model";
import { DeptCard } from "./ui";

export function Departments() {
  const { t } = useTranslation("strategy");
  const items = t("depts.items", { returnObjects: true }) as DeptItem[];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <Reveal mode="up" className="mb-4 text-center">
          <h2
            className="font-display font-black text-primary"
            style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
          >
            {t("depts.title")} <span className="text-grad">{t("depts.titleAccent")}</span>
          </h2>
        </Reveal>
        <Reveal mode="up" className="mb-10 text-center lg:mb-14">
          <p className="mx-auto text-[15px] leading-relaxed text-muted sm:text-[17px]" style={{ maxWidth: 560 }}>
            {t("depts.description")}
          </p>
        </Reveal>

        <Stagger className="grid gap-5 lg:grid-cols-2" stagger={0.1} amount={0.05}>
          {Array.isArray(items) && items.map((dept, i) => (
            <StaggerItem key={i} mode="up">
              <DeptCard dept={dept} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
