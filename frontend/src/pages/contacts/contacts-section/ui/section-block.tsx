import { Reveal, Stagger } from "@/shared/ui";

interface SectionBlockProps {
  title: string;
  description: string;
  children: React.ReactNode;
  inView?: boolean;
}

export function SectionBlock({ title, description, children, inView = true }: SectionBlockProps) {
  return (
    <div className="flex flex-col gap-7">
      <Reveal mode="up" inView={inView}>
        <h2
          className="font-display font-black text-primary"
          style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)", letterSpacing: "-0.03em" }}
        >
          {title}
        </h2>
        <p className="mt-2 text-[14px] text-primary/50">{description}</p>
      </Reveal>
      <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.08} inView={inView}>
        {children}
      </Stagger>
    </div>
  );
}
