import { useTranslation } from "react-i18next";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";

export function ContactInfoSection() {
  const { t } = useTranslation("ask-question");

  const contacts = [
    {
      title: "Email",
      value: "info@nuvhp.edu.ua",
      href: "mailto:info@nuvhp.edu.ua",
      icon: "✉",
    },
    {
      title: "Телефон",
      value: "+38 (360) 41-32-11",
      href: "tel:+380364132111",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
    },
    {
      title: "Адреса",
      value: "м. Рівне, вул. О. Новака, 75",
      href: "#",
      icon: "◎",
    },
  ];

  return (
    <section className="pb-16 sm:pb-24 lg:pb-32">
      <div className="container-v2">
        <Reveal mode="up" className="mb-10 text-center lg:mb-14">
          <h2
            className="font-display font-black"
            style={{
              fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
              letterSpacing: "-0.04em",
            }}
          >
            {t("contactsHeading")} <span className="text-grad-animated">{t("contactsHeadingAccent")}</span>
          </h2>
        </Reveal>

        <Stagger className="grid gap-4 py-3 sm:grid-cols-3" stagger={0.12}>
          {contacts.map((c) => (
            <StaggerItem
              as="a"
              key={c.title}
              mode="scale"
              href={c.href}
              className="sheen grad-border card-hover block rounded-[20px] bg-surface p-6 backdrop-blur-xl"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[12px] bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-lg text-violet-300">
                {c.icon}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-subtle">
                {c.title}
              </p>
              <p className="mt-1 text-[15px] font-semibold text-primary">{c.value}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
