import { useTranslation } from "react-i18next";
import { Stagger, StaggerItem } from "@/shared/ui";
import { SectionHead } from "../../ui";

export function TracksSection() {
  const { t } = useTranslation("entrant");
  const rawTracks = t("master.tracks", { returnObjects: true });
  const tracks: { icon: string; title: string; text: string }[] = Array.isArray(rawTracks) ? rawTracks : [];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <SectionHead
          eyebrow={t("master.tracksEyebrow")}
          title={t("master.tracksTitle")}
          gradientTitle={t("master.tracksGradientTitle")}
          subtitle={t("master.tracksSubtitle")}
        />
        <Stagger className="grid gap-5 sm:grid-cols-2" stagger={0.12} amount={0.15}>
          {tracks.map((track, i) => (
            <StaggerItem
              key={i}
              mode="up"
              className="grad-border relative overflow-hidden rounded-[20px] bg-surface p-6 backdrop-blur-xl sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl"
                style={{
                  background:
                    i === 0
                      ? "radial-gradient(circle, rgba(166,132,255,0.20) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(81,162,255,0.20) 0%, transparent 70%)",
                }}
              />
              <span className="text-grad mb-5 block text-3xl">{track.icon}</span>
              <h3
                className="font-display mb-3 font-bold text-primary"
                style={{ fontSize: "1.2rem", letterSpacing: "-0.02em" }}
              >
                {track.title}
              </h3>
              <p className="text-[14px] leading-snug text-primary/60">{track.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
