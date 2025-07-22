import { useContactsData, useLoadNamespace } from "@/shared/hooks";
import { CallIcon, ChatIcon, MapIcon } from "./icons";
import { ContactBlock } from "./ui";
import { useTranslation } from "react-i18next";
import { loadTranslations } from "./locales";
import { Title } from "@/shared/ui";

export function ContactsSection() {
  useLoadNamespace("contacts", loadTranslations);
  const { t } = useTranslation("contacts");
  const { administrationData, deaneryData, locationData } = useContactsData();

  function formatContacts(item: {
    email: string;
    phone?: string | null;
    audience: string;
  }) {
    return [
      item.email,
      ...(item.phone ? [item.phone] : []),
      `${t("audience")}: ${item.audience}`,
    ];
  }

  return (
    <div className="container-base flex flex-col">
      <Title className="self-start">{t("title")}</Title>
      <section className="flex flex-col w-full md:flex-row gap-4">
        <div className="grow flex flex-col gap-4">
          <ContactBlock
            icon={<CallIcon className="w-8 h-8" />}
            label={t("deanery.title")}
            description={t("deanery.description")}
          >
            {Object.values(deaneryData).map((item, index) => (
              <ContactBlock.List
                key={index}
                label={`${item.label} - ${item.worker}:`}
              >
                <ContactBlock.Contacts contacts={formatContacts(item)} />
              </ContactBlock.List>
            ))}
          </ContactBlock>
          <ContactBlock
            icon={<ChatIcon className="w-8 h-8" />}
            label={t("administration.title")}
            description={t("administration.description")}
          >
            {Object.values(administrationData).map((item, index) => (
              <ContactBlock.List
                key={index}
                label={`${item.label} - ${item.worker}:`}
              >
                <ContactBlock.Contacts contacts={formatContacts(item)} />
              </ContactBlock.List>
            ))}
          </ContactBlock>
        </div>
        <div className="flex flex-col sm:flex-row-reverse md:flex-col">
          <iframe
            className="grow md:h-full rounded-t-xl sm:rounded-r-xl md:rounded-b-none md:rounded-t-xl"
            src={locationData.googleMapsEmbedAPI}
            loading="lazy"
          />
          <ContactBlock
            className="grow rounded-t-none sm:rounded-l-xl sm:rounded-r-none md:rounded-b-xl md:rounded-t-none"
            icon={<MapIcon className="w-8 h-8" />}
            label={t("location.title")}
            description={t("location.description")}
          >
            <ContactBlock.List
              className="flex-row gap-2"
              label={`${locationData.label}: `}
            >
              <ContactBlock.Contacts contacts={[locationData.address]} />
            </ContactBlock.List>
          </ContactBlock>
        </div>
      </section>
    </div>
  );
}
