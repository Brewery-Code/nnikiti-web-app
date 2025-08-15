import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useContactsData, useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "../locales";

interface ContactsProps {
  className?: string;
}

interface ListItemRenderProps {
  label: string;
  contacts: string[];
}

function ListItems({ label, contacts }: ListItemRenderProps) {
  return (
    <li className="flex flex-wrap md:flex-nowrap gap-1">
      <span className="text-nowrap">{label}:</span>
      <ul className="flex gap-1">
        {contacts.map((item, subIndex) => (
          <li key={subIndex}>{item}</li>
        ))}
      </ul>
    </li>
  );
}

export function Contacts({ className }: ContactsProps) {
  const { t } = useTranslation("footer");
  useLoadNamespace("footer", loadTranslations);

  const { deaneryData, locationData } = useContactsData();

  return (
    <div className={clsx(className)}>
      <div className="text-base xl:text-xl font-bold">{t("contacts")}</div>
      <ul className={clsx("flex flex-col gap-1 mt-2 text-xs font-medium")}>
        {Object.values(deaneryData).map((item, index) => (
          <ListItems
            key={index}
            label={item.label}
            contacts={[item.email, item.phone]}
          />
        ))}
        <ListItems
          label={locationData.label}
          contacts={[locationData.address]}
        />
      </ul>
    </div>
  );
}
