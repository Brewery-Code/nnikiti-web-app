import { BackButton } from "@/shared/ui";

export function InnerPageLayout({
  backTo,
  backLabel,
  title,
  subtitle,
  count,
  children,
}: {
  backTo: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  count: number;
  accentColor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <section className="relative pt-32 pb-12 sm:pt-40">
        <div className="container-v2 relative z-[1]">
          <BackButton to={backTo} label={backLabel} className="mb-8" />

          <div>
            <h1
              className="font-display font-black text-primary"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.95,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-[17px]">
                {subtitle}
              </p>
            )}
            <div className="mt-6">
              <span className="font-display rounded-full border border-violet-500/25 bg-violet-500/10 px-3.5 py-1.5 text-[11px] font-bold text-violet-200">
                {count} фото
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-v2 pb-24">{children}</div>
    </div>
  );
}
