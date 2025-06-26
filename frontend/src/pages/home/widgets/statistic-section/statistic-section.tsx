import { Title } from "@/shared/ui";
import { StatisticBlock } from "./ui";
import { gradientAnimation } from "./styles";
import clsx from "clsx";

const statisticData = [
  {
    id: 0,
    title: "3400+",
    subtitle: "Studying now",
    start_value: 0,
  },
  { id: 1, title: "Top 1 in Rivne" },
  { id: 2, title: "81", subtitle: "Teaching staff", start_value: 0 },
  {
    id: 3,
    title: "40+",
    subtitle: "Partners university and companies around the world",
    start_value: 0,
  },
  {
    id: 4,
    title: "29000+",
    subtitle: "Graduated",
    start_value: 0,
  },
  { id: 5, title: "12", subtitle: "Education programs", start_value: 0 },
  {
    id: 6,
    title: "Top 44 in Ukraine",
    start_value: 200,
  },
];

export default function StatisticSection() {
  return (
    <section className="container-base m-section">
      <Title title="By the numbers" />
      <div className="relative grid grid-cols-5 grid-rows-2 gap-4 h-[500px] mt-8">
        {statisticData.map((item) => (
          <StatisticBlock
            key={item.id}
            className={clsx(
              gradientAnimation.gradientAnimation,
              item.id === 1 || item.id === 6 ? "col-span-2" : "",
              item.id === 3 ? "row-span-2" : ""
            )}
            title={item.title}
            subtitle={item.subtitle}
            start_value={item.start_value}
          />
        ))}
      </div>
    </section>
  );
}
