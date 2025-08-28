import { Title } from "@/shared/ui";
import { StatisticBlock } from "./ui";
import clsx from "clsx";
import { publicRqClient } from "@/shared/api/instance";
import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { QueryHandler } from "@/widgets";

export default function StatisticSection({ className = "" }: { className?: string }) {
  const { t } = useTranslation("home");
  useLoadNamespace("home", loadTranslations);

  const {
    data: statisticData,
    isLoading,
    isError,
  } = publicRqClient.useQuery("get", "/core/statistic-block/");

  return (
    <section className={clsx("container-base", className)}>
      <Title>{t("statistic.title")}</Title>
      <QueryHandler isLoading={isLoading} isError={isError}>
        <div className="relative grid h-[524px] grid-cols-2 grid-rows-[1fr_1fr_1fr_1fr_1fr] gap-4 sm:h-[390px] sm:grid-cols-3 sm:grid-rows-[1fr_1fr_1fr_fr] md:h-[300px] md:grid-cols-5 md:grid-rows-2 xl:h-[480px]">
          {statisticData?.map((item) => (
            <StatisticBlock
              key={item.id}
              className={clsx(
                "gradient-animation bg-[linear-gradient(135deg,_rgba(255,221,85,0.95)_0%,_rgba(255,85,204,0.95)_33%,_rgba(136,136,255,0.95)_66%,_rgba(85,255,255,0.95)_100%)]",
                item.order === 1 && "order-4 sm:row-span-2 md:order-none md:row-span-1",
                item.order === 2 && "order-6 col-span-2 sm:order-1 md:order-none",
                item.order === 3 && "order-1 sm:order-4 md:order-none md:col-span-1",
                item.order === 4 && "order-2 sm:order-3 sm:row-span-2 md:order-none md:col-span-1",
                item.order === 5 &&
                  "order-3 col-span-2 sm:col-span-1 sm:row-span-2 md:order-none md:row-span-1",
                item.order === 6 && "order-4 sm:order-5 md:order-none md:col-span-1",
                item.order === 7 && "order-0 col-span-2 sm:order-6 md:order-none"
              )}
              title={item.title}
              subtitle={item.description}
              start_value={item.start_value}
            />
          ))}
        </div>
      </QueryHandler>
    </section>
  );
}
