import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useLoadNamespace } from "@/shared/hooks";
import { Reveal } from "@/shared/ui";
import { loadTranslations } from "./locales";

const STATS = [
  { id: 1, prefix: "Top ", value: 1,     suffix: "",  description: "у Рівному",        big: true,  from: 100 },
  { id: 2, prefix: "Top ", value: 44,    suffix: "",  description: "в Україні",        big: true,  from: 100 },
  { id: 3, prefix: "",     value: 3400,  suffix: "+", description: "Студентів",        big: false, from: 0   },
  { id: 4, prefix: "",     value: 29000, suffix: "+", description: "Випускників",      big: false, from: 0   },
  { id: 5, prefix: "",     value: 40,    suffix: "+", description: "Міжн. партнерів",  big: false, from: 0   },
  { id: 6, prefix: "",     value: 81,    suffix: "",  description: "Викладачів",       big: false, from: 0   },
  { id: 7, prefix: "",     value: 12,    suffix: "",  description: "Освітніх програм", big: false, from: 0   },
];

type StatItem = (typeof STATS)[number];

function fmt(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function useCountUp(from: number, to: number, duration = 1600) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          observer.disconnect();
          const t0 = performance.now();
          function tick(now: number) {
            const p = Math.min((now - t0) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setCount(from + (to - from) * ease);
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { count, ref };
}

function StatCard({ stat, tall }: { stat: StatItem; tall?: boolean }) {
  const { count, ref } = useCountUp(stat.from, stat.value);

  return (
    <div
      ref={ref}
      className={clsx(
        "grad-border card-hover flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#0a0b14] px-4 py-5 text-center sm:bg-transparent sm:px-5 sm:py-7 sm:rounded-[20px] sm:backdrop-blur-xl",
        stat.big
          ? "bg-gradient-to-br from-violet-500/[0.12] to-blue-500/[0.12]"
          : "bg-white/[0.03]"
      )}
    >
      <div
        className="font-display font-black"
        style={{
          fontSize: tall ? "clamp(2.4rem, 5vw, 3rem)" : "clamp(1.4rem, 2.5vw, 2.2rem)",
          letterSpacing: "-0.04em",
          marginBottom: 8,
        }}
      >
        {stat.big ? (
          <span className="text-grad">
            {stat.prefix}{fmt(count)}{stat.suffix}
          </span>
        ) : (
          <>{stat.prefix}{fmt(count)}{stat.suffix}</>
        )}
      </div>
      {stat.description && (
        <div className="text-[12px] text-white/35">{stat.description}</div>
      )}
    </div>
  );
}

export default function StatisticSection({ className = "" }: { className?: string }) {
  useLoadNamespace("home", loadTranslations);

  return (
    <section
      className={clsx(
        "relative overflow-hidden border-y border-violet-500/[0.10] bg-gradient-to-br from-violet-500/[0.06] to-blue-500/[0.06] py-14 lg:py-20",
        className
      )}
    >
      {/* Soft glow — desktop only */}
      <div aria-hidden className="pointer-events-none absolute hidden md:block"
        style={{ top: "-50%", left: "30%", width: 600, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(166,132,255,0.07) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="container-v2 relative">
        <Reveal mode="up" className="mb-10 text-center lg:mb-14">
          <h2
            className="font-display font-black"
            style={{
              fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Ми в <span className="text-grad">цифрах</span>
          </h2>
        </Reveal>

        {/*
          Desktop bento (5 cols):
          [3400+]  [Top 1 ─ col 2-3 ─]  [81]   [40+ ↕ row 1-2]
          [29000+] [12]  [Top 44 ─ col 3-4 ─]  [40+ continues]
        */}
        <div
          className="hidden lg:grid gap-4"
          style={{ gridTemplateColumns: "repeat(5, 1fr)", gridAutoRows: "1fr" }}
        >
          <Reveal mode="scale" delay={0}    amount={0.15} className="h-full" style={{ gridArea: "1 / 1 / 2 / 2" }}><StatCard stat={STATS[2]} /></Reveal>
          <Reveal mode="scale" delay={0.06} amount={0.15} className="h-full" style={{ gridArea: "1 / 2 / 2 / 4" }}><StatCard stat={STATS[0]} /></Reveal>
          <Reveal mode="scale" delay={0.12} amount={0.15} className="h-full" style={{ gridArea: "1 / 4 / 2 / 5" }}><StatCard stat={STATS[5]} /></Reveal>
          <Reveal mode="scale" delay={0.18} amount={0.15} className="h-full" style={{ gridArea: "1 / 5 / 3 / 6" }}><StatCard stat={STATS[4]} /></Reveal>
          <Reveal mode="scale" delay={0.06} amount={0.15} className="h-full" style={{ gridArea: "2 / 1 / 3 / 2" }}><StatCard stat={STATS[3]} /></Reveal>
          <Reveal mode="scale" delay={0.12} amount={0.15} className="h-full" style={{ gridArea: "2 / 2 / 3 / 3" }}><StatCard stat={STATS[6]} /></Reveal>
          <Reveal mode="scale" delay={0.18} amount={0.15} className="h-full" style={{ gridArea: "2 / 3 / 3 / 5" }}><StatCard stat={STATS[1]} /></Reveal>
        </div>

        {/*
          Mobile bento (2 cols):
          [3 400+] [29 000+         ]
          [Top 1 ─── full width ────]
          [81    ] [40+ ↕ rows 3–4  ]
          [12    ] [40+ continues   ]
          [Top 44 ── full width ────]
        */}
        <div
          className="grid gap-3 sm:gap-4 lg:hidden"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <Reveal mode="scale" delay={0}    amount={0.15} className="h-full" style={{ gridArea: "1/1/2/2" }}><StatCard stat={STATS[2]} /></Reveal>
          <Reveal mode="scale" delay={0.06} amount={0.15} className="h-full" style={{ gridArea: "1/2/2/3" }}><StatCard stat={STATS[3]} /></Reveal>
          <Reveal mode="scale" delay={0.08} amount={0.15} className="h-full" style={{ gridArea: "2/1/3/3" }}><StatCard stat={STATS[0]} /></Reveal>
          <Reveal mode="scale" delay={0.06} amount={0.15} className="h-full" style={{ gridArea: "3/1/4/2" }}><StatCard stat={STATS[5]} /></Reveal>
          <Reveal mode="scale" delay={0.1}  amount={0.15} className="h-full" style={{ gridArea: "3/2/5/3" }}><StatCard stat={STATS[4]} tall /></Reveal>
          <Reveal mode="scale" delay={0.06} amount={0.15} className="h-full" style={{ gridArea: "4/1/5/2" }}><StatCard stat={STATS[6]} /></Reveal>
          <Reveal mode="scale" delay={0.1}  amount={0.15} className="h-full" style={{ gridArea: "5/1/6/3" }}><StatCard stat={STATS[1]} /></Reveal>
        </div>
      </div>
    </section>
  );
}
