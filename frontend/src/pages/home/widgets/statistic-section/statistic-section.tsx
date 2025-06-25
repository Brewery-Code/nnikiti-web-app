import { Title } from "@/shared/ui";
import { StatisticBlock } from "./ui";

const statisticData = [
  { title: "3.4K+", subtitle: "Studying now" },
  { title: "Top 1 in Rivne", col: 2 },
  { title: "81", subtitle: "Teaching staff" },
  { title: "29K+", subtitle: "Graduated", row: 2 },
  { title: "12", subtitle: "Education programs" },
  {
    title: "40+",
    subtitle: "Partners university and companies around the world",
  },
  { title: "Top 44 in Ukraine", col: 2 },
];

export default function StatisticSection() {
  return (
    <section className="container-base m-section">
      <Title title="By the numbers" />
      <div className="relative grid grid-cols-5 grid-rows-2 gap-4 h-[500px] mt-8">
        {statisticData.map((item, index) => (
          <StatisticBlock
            className="bg-[linear-gradient(135deg,_#ffdd55,_#ff55cc,_#88f,_#55ffff)]"
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            col={item.col}
            row={item.row}
          />
        ))}
      </div>
    </section>
  );
}
