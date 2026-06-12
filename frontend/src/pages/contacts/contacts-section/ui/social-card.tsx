import { useTranslation } from "react-i18next";
import { SocialMediaLinks } from "@/widgets";

export function SocialCard() {
  const { t } = useTranslation("contacts");

  return (
    <div className="grad-border rounded-[20px] bg-surface p-6 backdrop-blur-xl">
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-400">
        {t("socials")}
      </p>
      <SocialMediaLinks className="flex-wrap gap-3" />
    </div>
  );
}
