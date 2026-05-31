import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContactsData, useLoadNamespace } from "@/shared/hooks";
import { SocialMediaLinks } from "@/widgets";
import { ROUTES } from "@/shared/model/routes";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { loadTranslations } from "./locales";

interface PersonItem {
  label: string;
  worker: string;
  email: string;
  phone?: string | null;
  audience: string;
}

function PersonCard({ item }: { item: PersonItem }) {
  return (
    <div className="grad-border card-hover sheen rounded-[18px] bg-surface p-5 backdrop-blur-xl">
      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-400">
        {item.label}
      </p>
      <p className="font-display text-[17px] font-bold leading-snug text-primary">
        {item.worker}
      </p>

      <div className="mt-4 h-px w-full bg-gradient-to-r from-violet-500/40 via-blue-500/20 to-transparent" />

      <div className="mt-4 flex flex-col gap-2">
        <a
          href={`mailto:${item.email}`}
          className="flex items-center gap-2.5 text-[12px] text-muted transition-colors hover:text-primary"
        >
          <span aria-hidden className="text-violet-400">✉</span>
          {item.email}
        </a>
        {item.phone && (
          <a
            href={`tel:${item.phone.replace(/\D/g, "")}`}
            className="flex items-center gap-2.5 text-[12px] text-muted transition-colors hover:text-primary"
          >
            <span aria-hidden className="text-blue-400">☎</span>
            {item.phone}
          </a>
        )}
        <div className="flex items-center gap-2.5 text-[12px] text-subtle">
          <span aria-hidden className="text-subtle">◎</span>
          Аудиторія {item.audience}
        </div>
      </div>
    </div>
  );
}

function SectionBlock({
  eyebrow,
  title,
  description,
  children,
  inView = true,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  inView?: boolean;
}) {
  return (
    <div className="flex flex-col gap-7">
      <Reveal mode="up" inView={inView}>
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-500">
          {eyebrow}
        </div>
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

function HeroSection() {
  const { deaneryData } = useContactsData();
  return (
    <section className="relative overflow-hidden bg-base pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[10%] -right-[10%] h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(81,162,255,0.16) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container-v2 relative z-[1]">
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <Stagger stagger={0.1} delay={0.35} inView={false}>
            <StaggerItem mode="scale">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
                <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-primary">
                  ННІКІТІ
                </span>
                <span className="text-[12px] text-primary/70">Зв'яжіться з нами</span>
              </div>
            </StaggerItem>

            <StaggerItem
              as="h1"
              mode="up"
              className="font-display font-black text-primary"
              style={{
                fontSize: "clamp(2rem, 6.5vw, 5.5rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.95,
              }}
            >
              Зв'яжіться <span className="text-grad-animated">з нами</span>
            </StaggerItem>

            <StaggerItem
              as="p"
              mode="up"
              className="mt-6 max-w-xl text-[15px] text-muted sm:text-[17px]"
              style={{ lineHeight: 1.7 }}
            >
              Маєте питання? Деканат, адміністрація та ми — готові вам допомогти.
            </StaggerItem>
          </Stagger>

          <Reveal mode="right" delay={0.65} inView={false} className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href={`mailto:${deaneryData.dailyEducation.email}`}
              className="inline-flex items-center gap-2 rounded-[14px] border border-white/15 bg-surface-md px-6 py-3.5 text-[15px] font-semibold text-primary backdrop-blur-md transition-all duration-200 hover:bg-surface-xl active:scale-95"
            >
              <span aria-hidden>✉</span> Написати листа
            </a>
            <Link
              to={ROUTES.ASK_QUESTION}
              className="sheen inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3.5 text-[15px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(166,132,255,0.55)] active:scale-95"
            >
              Задати питання <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#08090f]" />
    </section>
  );
}

export function ContactsSection() {
  useLoadNamespace("contacts", loadTranslations);
  const { t } = useTranslation("contacts");
  const { administrationData, deaneryData, locationData } = useContactsData();

  const quickContacts = [
    {
      icon: "✉",
      label: "Email деканату",
      value: deaneryData.dailyEducation.email,
      href: `mailto:${deaneryData.dailyEducation.email}`,
    },
    {
      icon: "☎",
      label: "Телефон",
      value: "+38 (063) 919-11-04",
      href: "tel:+380639191104",
    },
    {
      icon: "◎",
      label: "Адреса",
      value: locationData.address,
      href: "#map",
    },
  ];

  return (
    <>
      <HeroSection />
      <div className="bg-base pb-16 sm:pb-24 lg:pb-32">
        <div className="container-v2 flex flex-col gap-fluid-2xl pt-10">
          {/* Quick contact chips */}
          <Stagger className="grid gap-4 sm:grid-cols-3" stagger={0.1} inView={false}>
            {quickContacts.map((c) => (
              <StaggerItem
                as="a"
                mode="up"
                key={c.label}
                href={c.href}
                className="sheen grad-border card-hover flex items-center gap-4 rounded-[18px] bg-surface p-5 backdrop-blur-xl"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-lg text-violet-300">
                  {c.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-subtle">
                    {c.label}
                  </p>
                  <p className="mt-1 truncate text-[15px] font-semibold text-primary">
                    {c.value}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Main content */}
          <div className="grid gap-fluid-xl lg:grid-cols-[1fr_400px] lg:items-start">
            <div className="flex flex-col gap-fluid-xl">
              <SectionBlock
                eyebrow="— Деканат"
                title={t("deanery.title")}
                description={t("deanery.description")}
                inView={false}
              >
                {Object.values(deaneryData).map((item, i) => (
                  <PersonCard key={i} item={item} />
                ))}
              </SectionBlock>

              <SectionBlock
                eyebrow="— Адміністрація"
                title={t("administration.title")}
                description={t("administration.description")}
              >
                {Object.values(administrationData).map((item, i) => (
                  <PersonCard key={i} item={item} />
                ))}
              </SectionBlock>

              <div className="grad-border rounded-[20px] bg-surface p-6 backdrop-blur-xl">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-400">
                  Ми в соцмережах
                </p>
                <SocialMediaLinks className="flex-wrap gap-3" />
              </div>
            </div>

            <div id="map" className="flex flex-col gap-4 lg:sticky lg:top-24">
              <Reveal mode="scale" inView={false} className="grad-border overflow-hidden rounded-[20px]">
                <iframe
                  className="h-[240px] w-full sm:h-[300px] lg:h-[360px]"
                  src={locationData.googleMapsEmbedAPI}
                  loading="lazy"
                  style={{
                    filter:
                      "invert(92%) hue-rotate(180deg) saturate(0.9) brightness(0.85)",
                  }}
                />
              </Reveal>

              <Reveal mode="up" delay={0.1} inView={false} className="grad-border-animated relative overflow-hidden rounded-[20px] bg-gradient-to-br from-violet-500/[0.08] to-blue-500/[0.04] p-6 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-violet-500/30 to-blue-500/30 text-lg text-violet-200">
                    ◎
                  </div>
                  <div>
                    <h3
                      className="font-display font-bold text-primary"
                      style={{ fontSize: "1.05rem", letterSpacing: "-0.02em" }}
                    >
                      {t("location.title")}
                    </h3>
                    <p className="mt-0.5 text-[12px] text-subtle">
                      {t("location.description")}
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-px w-full bg-gradient-to-r from-violet-500/40 via-blue-500/20 to-transparent" />

                <div className="mt-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-subtle">
                    Адреса
                  </p>
                  <p className="mt-1 text-[15px] font-semibold text-primary">
                    {locationData.address}
                  </p>
                </div>

                <a
                  href={locationData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-[12px] border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-[12px] font-semibold text-violet-200 transition-all duration-200 hover:bg-violet-500/20 hover:text-primary active:scale-95"
                >
                  Відкрити в Google Maps <span aria-hidden>→</span>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
