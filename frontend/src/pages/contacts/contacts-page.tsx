import { useTranslation } from "react-i18next";
import { PageTransition } from "@/widgets";
import { useLoadNamespace } from "@/shared/hooks";
import { SocialLinkButton, Title } from "@/shared/ui";
import { loadTranslations } from "./locales";
import type { Contacts } from "./types";
import ContactBlock from "./contacts-block";
import { CallIcon, MapIcon, ChatIcon } from "./icons";

export function ContactsPage() {
  const { t } = useTranslation("contacts");
  useLoadNamespace("contacts", loadTranslations);

  const contactsData: Contacts[] = [
    {
      icon: <ChatIcon className="w-8 h-8" />,
      title: t("administration.title"),
      description: t("administration.description"),
      links: [
        {
          position: t("administration.director"),
          name: t("administration.martyniukPetroMykolayovych"),
          email: "p.m.martyniuk@nuwm.edu.ua",
          audience: "124",
        },
        {
          position: t("administration.deputyDirectorForScientificWork"),
          name: t("administration.oksanaVolodymyrivnaPryshchepa"),
          email: "o.v.pryshchepa@nuwm.edu.ua",
          audience: "129",
        },
        {
          position: t(
            "administration.deputyDirectorForEducationalAndMethodologicalWork"
          ),
          name: t("administration.babychTetyanaYuriivna"),
          email: "t.iu.babych@nuwm.edu.ua",
          audience: "129",
        },
        {
          position: t("administration.deputyDirectorOfEducationalWork"),
          name: t("administration.gerusVolodymyrAndriyovych"),
          email: "v.a.gerus@nuwm.edu.ua",
          audience: "129",
        },
      ],
    },
    {
      icon: <CallIcon className="w-8 h-8" />,
      title: t("deanery.title"),
      description: t("deanery.description"),
      links: [
        {
          position: t("deanery.dailyEducation"),
          name: `${t("deanery.svitlanaPetrivnaKovalchuk")} & ${t("deanery.galinnaMykhailivnaSachuk")}`,
          email: "nni-akot@nuwm.edu.ua",
          audience: "129",
        },
        {
          position: t("deanery.distanceEducation"),
          name: t("deanery.natalyaAnatoliivnaKarpan"),
          email: "n.a.karpan@nuwm.edu.ua",
          audience: "129",
        },
      ],
    },
  ];

  const locationData: Contacts = {
    icon: <MapIcon className="w-8 h-8" />,
    title: t("location.title"),
    description: t("location.description"),
    links: [
      {
        title: t("address"),
        address: t("location.address"),
        addressLink:
          "https://www.google.com/maps?ll=50.617951,26.258657&z=15&t=m&hl=uk&gl=UA&mapclient=embed&cid=5577082536836661816",
      },
    ],
  };

  return (
    <PageTransition>
      <div className="container-base flex flex-col">
        <Title className="self-start">Contacts</Title>
        <div className="flex gap-4 w-full">
          <div className="grid grid-cols-1 gap-4">
            {contactsData.map((item, index) => (
              <ContactBlock
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                links={item.links}
              />
            ))}
          </div>
          <div className="row-span-2 flex flex-col">
            <iframe
              className="h-full rounded-t-xl"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2531.493185409262!2d26.253785593679517!3d50.617954402132256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472f13503e023a0b%3A0x4d65c704c32f0238!2z0J3QsNGG0ZbQvtC90LDQu9GM0L3QuNC5INGD0L3RltCy0LXRgNGB0LjRgtC10YIg0LLQvtC00L3QvtCz0L4g0LPQvtGB0L_QvtC00LDRgNGB0YLQstCwINGC0LAg0L_RgNC40YDQvtC00L7QutC-0YDQuNGB0YLRg9Cy0LDQvdC90Y8!5e0!3m2!1suk!2sua!4v1751898481338!5m2!1suk!2sua"
              loading="lazy"
            />
            <ContactBlock
              icon={<MapIcon className="w-8 h-8" />}
              className="rounded-t-none"
              title={locationData.title}
              description={locationData.description}
              links={locationData.links}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <SocialLinkButton type="facebook" />
          <SocialLinkButton type="instagram" />
          <SocialLinkButton type="telegram" />
          <SocialLinkButton type="tiktok" />
          <SocialLinkButton type="youtube" />
        </div>
      </div>
    </PageTransition>
  );
}

export const Component = ContactsPage;
