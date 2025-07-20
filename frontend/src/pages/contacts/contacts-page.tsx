import { useTranslation } from "react-i18next";
import { PageTransition } from "@/widgets";
import { useLoadNamespace } from "@/shared/hooks";
import { Title } from "@/shared/ui";
import { loadTranslations } from "./locales";
import { useContactsData } from "./hooks";
import { SocialMediaLinks, ContactBlock } from "./ui";
import { CallIcon, MapIcon, ChatIcon } from "./icons";

export function ContactsPage() {
  useLoadNamespace("contacts", loadTranslations);
  const { t } = useTranslation("contacts");
  const { administrationData, deaneryData, locationData } = useContactsData();

  return (
    <PageTransition>
      <div className="container-base flex flex-col w-full">
        <Title className="self-start">Contacts</Title>
        <div className="flex gap-4">
          <div className="grow grid grid-cols-1 gap-4">
            <ContactBlock
              icon={<CallIcon className="w-8 h-8" />}
              label={t("deanery.title")}
              description={t("deanery.description")}
            >
              {Object.values(deaneryData).map((item, index) => (
                <ContactBlock.Item
                  contactClassName="min-w-64"
                  key={index}
                  label={`${item.label} - ${item.worker}:`}
                  contact={item.email}
                />
              ))}
            </ContactBlock>
            <ContactBlock
              icon={<ChatIcon className="w-8 h-8" />}
              label={t("administration.title")}
              description={t("administration.description")}
            >
              {Object.values(administrationData).map((item, index) => (
                <ContactBlock.Item
                  contactClassName="min-w-64"
                  key={index}
                  label={`${item.label} - ${item.worker}:`}
                  contact={item.email}
                />
              ))}
            </ContactBlock>
          </div>
          <div className="row-span-2 flex flex-col">
            <iframe
              className="h-full rounded-t-xl"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2531.493185409262!2d26.253785593679517!3d50.617954402132256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472f13503e023a0b%3A0x4d65c704c32f0238!2z0J3QsNGG0ZbQvtC90LDQu9GM0L3QuNC5INGD0L3RltCy0LXRgNGB0LjRgtC10YIg0LLQvtC00L3QvtCz0L4g0LPQvtGB0L_QvtC00LDRgNGB0YLQstCwINGC0LAg0L_RgNC40YDQvtC00L7QutC-0YDQuNGB0YLRg9Cy0LDQvdC90Y8!5e0!3m2!1suk!2sua!4v1751898481338!5m2!1suk!2sua"
              loading="lazy"
            />
            <ContactBlock
              icon={<MapIcon className="w-8 h-8" />}
              label={t("location.title")}
              description={t("location.description")}
            >
              <ContactBlock.Item
                contactClassName="min-w-64"
                label={`${locationData.label}: `}
                contact={locationData.address}
              />
            </ContactBlock>
          </div>
        </div>
        <SocialMediaLinks />
      </div>
    </PageTransition>
  );
}

export const Component = ContactsPage;
