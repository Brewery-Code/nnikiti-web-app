import { useTranslation } from "react-i18next";
import { PhoneIcon, PinIcon } from "../icons";

export interface PersonItem {
  label: string;
  worker: string;
  email: string;
  phone?: string | null;
  audience: string;
}

export function PersonCard({ item }: { item: PersonItem }) {
  const { t } = useTranslation("contacts");

  return (
    <div className="grad-border rounded-[18px] bg-surface p-5 backdrop-blur-xl">
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
          className="group flex items-center gap-2.5 text-[12px] text-violet-400 transition-colors hover:text-white"
        >
          <span aria-hidden className="text-violet-400 transition-colors group-hover:text-white">✉</span>
          <span className="underline-offset-2 group-hover:underline">{item.email}</span>
        </a>
        {item.phone && (
          <a
            href={`tel:${item.phone.replace(/\D/g, "")}`}
            className="group flex items-center gap-2.5 text-[12px] text-violet-400 transition-colors hover:text-white"
          >
            <PhoneIcon aria-hidden className="h-3.5 w-3.5 text-blue-400 transition-colors group-hover:text-white" />
            <span className="underline-offset-2 group-hover:underline">{item.phone}</span>
          </a>
        )}
        <div className="flex items-center gap-2.5 text-[12px] text-subtle">
          <PinIcon aria-hidden className="h-3.5 w-3.5 flex-shrink-0 text-subtle" />
          {t("audience")} {item.audience}
        </div>
      </div>
    </div>
  );
}
