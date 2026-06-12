import { useTranslation } from "react-i18next";
import { type DepartmentData } from "@/shared/model/departments-data";
import { Reveal } from "@/shared/ui";
import { SectionTitle } from "../ui";
import { avatar } from "../lib";

export function ContactsSection({ dept }: { dept: DepartmentData }) {
  const { t } = useTranslation("department");
  const { head } = dept;
  return (
    <section id="contacts" className="mt-24 sm:mt-32 lg:m-section">
      <SectionTitle title={t("contacts.section_title")} highlight={t("contacts.section_highlight")} />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:grid-rows-[230px]">
        <Reveal mode="left" delay={0.05} className="lg:col-span-2">
          <a
            href={head.email ? `mailto:${head.email}` : undefined}
            className="group flex h-full overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#0c0d18] transition-colors hover:border-white/[0.18] sm:rounded-[22px]"
          >
            <div className="relative w-[100px] flex-shrink-0 overflow-hidden sm:w-[160px] lg:w-[200px]">
              <img
                src={avatar(head.imageUrl)}
                alt={head.full_name}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-y-0 right-0 w-px bg-white/[0.08]" />
            </div>

            <div className="flex flex-1 flex-col justify-between p-4 sm:p-6 lg:p-8">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-violet-400">
                  {t("contacts.head_label")}
                </p>
                <p className="mt-1.5 font-display text-[15px] font-bold leading-[1.15] text-primary sm:mt-2 sm:text-[20px] lg:text-[26px]">
                  {head.full_name}
                </p>
                {head.regalia && (
                  <p className="mt-1 text-[11px] leading-snug text-subtle sm:text-[13px]">
                    {head.regalia}
                  </p>
                )}
                {head.audience && (
                  <p className="mt-1 text-[11px] text-subtle sm:text-[13px]">
                    {t("contacts.audience_prefix")} {head.audience}
                  </p>
                )}
              </div>

              {head.email && (
                <span className="relative mt-3 inline-block max-w-full self-start overflow-hidden text-ellipsis text-[10px] text-violet-300 sm:text-[13px]">
                  {head.email}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-violet-300 transition-[width] duration-300 ease-out group-hover:w-full" />
                </span>
              )}
            </div>
          </a>
        </Reveal>

        <div className="flex flex-col gap-3">
          <Reveal mode="right" delay={0.12} className="flex flex-1">
            <a
              href={`mailto:${dept.email}`}
              className="group flex flex-1 items-center gap-4 rounded-[18px] border border-white/[0.08] bg-[#0c0d18] p-5 transition-colors hover:border-white/[0.18]"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] border border-white/[0.07]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-subtle">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-subtle">{t("contacts.email_label")}</p>
                <span className="relative mt-0.5 inline-block text-[13px] font-semibold text-primary/80">
                  {dept.email}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-white/50 transition-[width] duration-300 ease-out group-hover:w-full" />
                </span>
              </div>
            </a>
          </Reveal>

          <Reveal mode="right" delay={0.2} className="flex flex-1">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dept.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 items-center gap-4 rounded-[18px] border border-white/[0.08] bg-[#0c0d18] p-5 transition-colors hover:border-white/[0.18]"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] border border-white/[0.07]">
                <svg width="13" height="15" viewBox="0 0 14 18" fill="none" className="text-subtle">
                  <path d="M7 0C3.13 0 0 3.13 0 7c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 7 4.5a2.5 2.5 0 0 1 0 5z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-subtle">{t("contacts.address_label")}</p>
                <span className="relative mt-0.5 inline-block text-[13px] font-semibold text-primary/80">
                  {dept.address}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-white/50 transition-[width] duration-300 ease-out group-hover:w-full" />
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
