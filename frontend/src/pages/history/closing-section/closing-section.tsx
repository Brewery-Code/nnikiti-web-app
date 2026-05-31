import { Link } from "react-router-dom";
import clsx from "clsx";
import { ROUTES } from "@/shared/model/routes";
import { DEPARTMENTS_DATA } from "@/shared/model/departments-data";
import { Reveal } from "@/shared/ui";

export default function ClosingSection({ className }: { className?: string }) {
  return (
    <section className={clsx("border-t border-white/[0.07]", className)}>
      <div className="container-v2 py-16 sm:py-24 lg:py-32">
        <div className="grid gap-fluid-2xl lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal mode="left" amount={0.2}>
            <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.22em] text-violet-400">
              — Долучайся
            </p>
            <h2
              className="font-display leading-[0.9] text-primary"
              style={{
                fontWeight: 900,
                fontSize: "clamp(2.2rem, 8vw, 8rem)",
                letterSpacing: "-0.05em",
              }}
            >
              Наступний
              <br />
              <span className="text-grad">розділ</span>
            </h2>
          </Reveal>

          <Reveal mode="right" amount={0.15} className="flex flex-col gap-10 lg:max-w-sm lg:pb-2">
            <div className="flex flex-col gap-4">
              <p className="text-[15px] leading-relaxed text-muted sm:text-[17px]">
                За 20 років ННІКІТІ створив середовище, де ідеї перетворюються
                на продукти, а студенти — на лідерів. Тут твоя історія тільки
                починається.
              </p>
              <blockquote className="border-l-2 border-violet-500/50 pl-4">
                <p className="text-[14px] italic leading-relaxed text-subtle">
                  «Ми не просто готуємо фахівців — ми виховуємо людей, які
                  змінюють технологічний ландшафт країни.»
                </p>
              </blockquote>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to={`/department/${DEPARTMENTS_DATA[0].id}`}
                className="inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3.5 text-[15px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(166,132,255,0.55)] active:scale-95"
              >
                Наші кафедри <span aria-hidden>→</span>
              </Link>
              <Link
                to={ROUTES.ALUMNI}
                className="inline-flex items-center gap-2 rounded-[14px] border border-white/15 bg-surface-md px-6 py-3.5 text-[15px] font-semibold text-primary backdrop-blur-md transition-all duration-200 hover:bg-surface-xl active:scale-95"
              >
                Випускники <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
