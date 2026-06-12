import { PageTransition } from "@/widgets";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { Hero } from "./hero-section";
import { CalendarSection } from "./calendar-section";
import { NewsSection } from "./news-section";

function EventsPage() {
  useLoadNamespace("events-page", loadTranslations);

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <Hero />
      <div className="pb-10 sm:pb-16 lg:pb-20">
        <CalendarSection />
        <NewsSection />
      </div>
    </PageTransition>
  );
}

export const Component = EventsPage;
