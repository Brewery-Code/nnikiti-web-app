import { useTranslation } from "react-i18next";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { SectionHead } from "./section-head";

type Phone = { number: string; href: string; note?: string };

const labelClass = "mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-violet-400";
const linkClass = "text-[14px] text-primary/80 transition-colors hover:text-violet-300";
const cardClass = "grad-border h-full rounded-[18px] bg-surface p-6 backdrop-blur-xl";

export function AdmissionContacts({ docsHref }: { docsHref: string }) {
  const { t } = useTranslation("entrant");

  const rawAddress = t("contacts.address", { returnObjects: true });
  const address: string[] = Array.isArray(rawAddress) ? rawAddress : [];

  const rawPhones = t("contacts.phones", { returnObjects: true });
  const phones: Phone[] = Array.isArray(rawPhones) ? rawPhones : [];

  const email = t("contacts.email");

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <SectionHead
          eyebrow={t("contacts.eyebrow")}
          title={t("contacts.title")}
          gradientTitle={t("contacts.gradientTitle")}
          subtitle={t("contacts.subtitle")}
        />

        {/* Documents — compact full-width banner */}
        <Reveal mode="up" amount={0.1}>
          <div className="grad-border relative flex flex-col gap-6 overflow-hidden rounded-[20px] bg-surface p-6 backdrop-blur-xl sm:flex-row sm:items-center sm:gap-8 sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(166,132,255,0.16) 0%, transparent 70%)",
              }}
            />

            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-violet-500 to-blue-500 text-primary shadow-[0_4px_16px_rgba(166,132,255,0.4)]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M9 13h6M9 17h6" />
              </svg>
            </span>

            <div className="relative min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-400">
                {t("contacts.docsEyebrow")}
              </p>
              <h3
                className="font-display font-bold text-primary"
                style={{ fontSize: "1.25rem", letterSpacing: "-0.01em" }}
              >
                {t("contacts.docsTitle")}
              </h3>
              <p className="mt-2 max-w-2xl text-[14px] leading-snug text-muted">
                {t("contacts.docsText")}
              </p>
            </div>

            <a
              href={docsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex w-fit flex-shrink-0 items-center gap-2 rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-7 py-3.5 text-[15px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(166,132,255,0.55)] active:scale-95"
            >
              {t("contacts.docsLinkLabel")} <span aria-hidden>{t("ui.arrow")}</span>
            </a>
          </div>
        </Reveal>

        {/* Contacts — responsive grid of info cards */}
        <Stagger className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08} amount={0.1}>
          <StaggerItem mode="up">
            <div className={cardClass}>
              <p className={labelClass}>{t("contacts.addressLabel")}</p>
              {address.map((line, i) => (
                <p key={i} className="text-[14px] text-primary/80">
                  {line}
                </p>
              ))}
            </div>
          </StaggerItem>

          <StaggerItem mode="up">
            <div className={cardClass}>
              <p className={labelClass}>{t("contacts.phoneLabel")}</p>
              <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-x-5 gap-y-2">
                {phones.map((phone, i) => (
                  <p key={i} className="text-[14px] leading-relaxed">
                    <a href={phone.href} className={linkClass}>
                      {phone.number}
                    </a>
                    {phone.note && (
                      <span className="block text-[12px] leading-snug text-subtle">{phone.note}</span>
                    )}
                  </p>
                ))}
              </div>
            </div>
          </StaggerItem>

          <StaggerItem mode="up">
            <div className={cardClass}>
              <p className={labelClass}>{t("contacts.emailLabel")}</p>
              <a href={`mailto:${email}`} className={linkClass}>
                {email}
              </a>
            </div>
          </StaggerItem>

          <StaggerItem mode="up">
            <div className={cardClass}>
              <p className={labelClass}>{t("contacts.scheduleLabel")}</p>
              <p className="text-[14px] text-primary/80">{t("contacts.workDays")}</p>
              <p className="text-[14px] text-primary/80">{t("contacts.workHours")}</p>
            </div>
          </StaggerItem>

          <StaggerItem mode="up" className="sm:col-span-2">
            <div className={cardClass}>
              <p className={labelClass}>{t("contacts.instituteLabel")}</p>
              <p className="text-[14px] text-primary/80">{t("contacts.instituteName")}</p>
              <div className="mt-1 flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-5">
                <a href={t("contacts.institutePhoneHref")} className={linkClass}>
                  {t("contacts.institutePhone")}
                </a>
                <a href={`mailto:${t("contacts.instituteEmail")}`} className={linkClass}>
                  {t("contacts.instituteEmail")}
                </a>
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
