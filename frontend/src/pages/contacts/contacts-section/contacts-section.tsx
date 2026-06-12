import { useTranslation } from "react-i18next";
import { useContactsData, useLoadNamespace } from "@/shared/hooks";
import { Stagger } from "@/shared/ui";
import { ContactsHero } from "./contacts-hero";
import { PhoneIcon, PinIcon } from "./icons";
import {
  LocationCard,
  PersonCard,
  QuickContactChip,
  SectionBlock,
  SocialCard,
  type QuickContact,
} from "./ui";
import { loadTranslations } from "./locales";

export function ContactsSection() {
  useLoadNamespace("contacts", loadTranslations);
  const { t } = useTranslation("contacts");
  const { administrationData, deaneryData, locationData } = useContactsData();

  const quickContacts: QuickContact[] = [
    {
      icon: "✉",
      label: t("quick.emailLabel"),
      value: deaneryData.dailyEducation.email,
      href: `mailto:${deaneryData.dailyEducation.email}`,
    },
    {
      icon: <PhoneIcon className="h-5 w-5" />,
      label: t("phone"),
      value: "+38 (063) 919-11-04",
      href: "tel:+380639191104",
    },
    {
      icon: <PinIcon className="h-5 w-5" />,
      label: t("address"),
      value: locationData.address,
      href: "#map",
    },
  ];

  return (
    <>
      <ContactsHero />
      <div className="pb-16 sm:pb-24 lg:pb-32">
        <div className="container-v2 flex flex-col gap-fluid-2xl pt-10">
          {/* Quick contact chips */}
          <Stagger className="grid gap-4 sm:grid-cols-3" stagger={0.1} inView={false}>
            {quickContacts.map((c) => (
              <QuickContactChip key={c.label} {...c} />
            ))}
          </Stagger>

          {/* Main content */}
          <div className="grid gap-fluid-xl lg:grid-cols-[1fr_400px] lg:items-start">
            <div className="flex flex-col gap-fluid-xl">
              <SectionBlock
                title={t("deanery.title")}
                description={t("deanery.description")}
                inView={false}
              >
                {Object.values(deaneryData).map((item, i) => (
                  <PersonCard key={i} item={item} />
                ))}
              </SectionBlock>

              <SectionBlock
                title={t("administration.title")}
                description={t("administration.description")}
              >
                {Object.values(administrationData).map((item, i) => (
                  <PersonCard key={i} item={item} />
                ))}
              </SectionBlock>

              <SocialCard />
            </div>

            <LocationCard locationData={locationData} />
          </div>
        </div>
      </div>
    </>
  );
}
