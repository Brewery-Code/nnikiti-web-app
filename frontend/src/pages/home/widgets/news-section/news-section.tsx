import { Title } from "@/shared/ui";
import NewsCard from "./news-card";

export default function NewsSection() {
  return (
    <div className="container-base m-section">
      <Title>News</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-8 h-[790px] md:h-[590px] mt-8">
        <NewsCard className="md:row-span-2" />
        <NewsCard />
        <NewsCard />
        <NewsCard className="hidden lg:flex" />
        <NewsCard className="hidden lg:flex" />
      </div>
    </div>
  );
}
