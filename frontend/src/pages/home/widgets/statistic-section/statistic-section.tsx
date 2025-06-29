import { Title } from "@/shared/ui";
import { StatisticBlock } from "./ui";
import { gradientAnimation } from "./styles";
import clsx from "clsx";
import { publicRqClient } from "@/shared/api/instance";

export default function StatisticSection() {
  const statisticData = publicRqClient.useQuery(
    "get",
    "/core/statistic-block/"
  ).data;

  return (
    <section className="container-base m-section">
      <Title>By the numbers</Title>
      <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 grid-rows-6 sm:grid-rows-4 md:grid-rows-2 gap-4 h-[632px] sm:h-[390px] md:h-[360px] xl:h-[480px] mt-8">
        {statisticData?.map((item) => (
          <StatisticBlock
            key={item.id}
            className={clsx(
              gradientAnimation.gradientAnimation,
              item.order === 1 &&
                "order-0 md:order-none row-span-2 md:row-span-1",
              item.order === 2 &&
                "order-4 sm:order-1 md:order-none col-span-2 md:row-span-1",
              item.order === 3 &&
                "order-3 sm:order-6 md:order-none md:col-span-1 md:row-span-1",
              item.order === 4 &&
                "order-2 sm:order-3 md:order-none row-span-2 md:col-span-1 md:row-span-2",
              item.order === 5 &&
                "order-2 md:order-none row-span-2 md:col-span-1 md:row-span-1",
              item.order === 6 &&
                "order-1 sm:order-4 md:order-none md:col-span-1 md:row-span-1",
              item.order === 7 && "order-5 sm:order-5 md:order-none col-span-2"
            )}
            title={item.title}
            subtitle={item.description}
            start_value={item.start_value}
          />
        ))}
      </div>
    </section>
  );
}
