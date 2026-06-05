import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useContactsData, useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "../locales";

interface ContactsProps {
  className?: string;
}

export function Contacts({ className }: ContactsProps) {
  const { t } = useTranslation("footer");
  useLoadNamespace("footer", loadTranslations);

  const { deaneryData, locationData } = useContactsData();

  const items = [
    ...Object.values(deaneryData).map((item) => ({
      label: item.label,
      values: [item.email, ...(item.phone ? [item.phone] : [])],
    })),
    { label: locationData.label, values: [locationData.address] },
  ];

  return (
    <div className={clsx(className)}>
      <p className="mb-3 text-fluid-xs font-bold uppercase tracking-[0.32em] text-slate-500">
        {t("contacts")}
      </p>
      <ul className="flex flex-col gap-5">
        {items.map((item, index) => (
          <li key={index} className="flex flex-col gap-1.5">
            <span className="text-fluid-sm text-slate-500">{item.label}</span>
            <div className="flex flex-wrap gap-x-2 gap-y-0.5 leading-tight">
              {item.values.filter(Boolean).map((val, i) => {
                const isEmail = typeof val === "string" && val.includes("@");
                const isPhone = typeof val === "string" && /^[\d\s+()–-]{7,}$/.test(val.trim());
                const href = isEmail ? `mailto:${val}` : isPhone ? `tel:${val.replace(/\D/g, "")}` : undefined;
                return href ? (
                  <a
                    key={i}
                    href={href}
                    className="text-fluid-sm font-bold text-violet-400 transition-colors duration-200 hover:text-violet-300"
                  >
                    {val}
                  </a>
                ) : (
                  <span
                    key={i}
                    className="text-fluid-sm font-bold text-primary"
                  >
                    {val}
                  </span>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
