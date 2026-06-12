import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useTranslation } from "react-i18next";
import { type DepartmentData } from "@/shared/model/departments-data";
import { Stagger, StaggerItem } from "@/shared/ui";
import { SectionTitle } from "../ui";
import { TeamMemberCard } from "./ui";

export function TeamSection({ dept }: { dept: DepartmentData }) {
  const { t } = useTranslation("department");
  return (
    <section id="team" className="mt-24 sm:mt-32 lg:m-section">
      <SectionTitle title={t("team.section_title")} highlight={t("team.section_highlight")} />

      {/* Mobile swiper */}
      <div className="-mx-4 sm:hidden">
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={12}
          centeredSlides
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          speed={600}
        >
          {dept.team.map((member, i) => (
            <SwiperSlide key={i} style={{ width: "84%" }}>
              <TeamMemberCard member={member} large />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Tablet+ grid */}
      <Stagger className="hidden sm:grid sm:grid-cols-3 sm:gap-4 lg:grid-cols-4" stagger={0.05} amount={0.05}>
        {dept.team.map((member, i) => (
          <StaggerItem key={i} mode="up">
            <TeamMemberCard member={member} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
