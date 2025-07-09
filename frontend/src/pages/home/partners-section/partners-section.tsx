import { Title } from "@/shared/ui";
import PartnerCard from "./partner-card";
import partnerImg from "./softserve-logo-big..png";
import partner1Img from "./gallaudet.png";
import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";

export default function PartnersSection({
  className = "",
}: {
  className?: string;
}) {
  const { t } = useTranslation("home");
  useLoadNamespace("home", loadTranslations);

  return (
    <section className={className}>
      <Title className="container-base">{t("partners.title")}</Title>
      <div className="overflow-x-scroll flex flex-col gap-4 px-8 scrollbar-hidden">
        <div className="flex gap-4">
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partner1Img}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partnerImg}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partner1Img}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partnerImg}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partner1Img}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partnerImg}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partner1Img}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partnerImg}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partner1Img}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partnerImg}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partner1Img}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partnerImg}
              alt=""
            />
          </PartnerCard>
        </div>
        <div className="flex gap-4">
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partnerImg}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partner1Img}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partnerImg}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partner1Img}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partnerImg}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partner1Img}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partnerImg}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partner1Img}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partnerImg}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partner1Img}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partnerImg}
              alt=""
            />
          </PartnerCard>
          <PartnerCard
            className="shrink-0"
            colSpan={Math.floor(Math.random() * 3)}
            rowSpan={Math.floor(Math.random() * 3)}
          >
            <img
              className="w-full h-full object-contain"
              src={partner1Img}
              alt=""
            />
          </PartnerCard>
        </div>
      </div>
    </section>
  );
}
