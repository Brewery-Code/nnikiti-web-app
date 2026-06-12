import { PageTransition } from "@/widgets";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { HeroSection } from "./hero-section";
import { FormSection } from "./form-section";
import { ContactInfoSection } from "./contact-info-section";

export function AskQuestionPage() {
  useLoadNamespace("ask-question", loadTranslations);

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <HeroSection />
      <div>
        <FormSection />
        <ContactInfoSection />
      </div>
    </PageTransition>
  );
}

export const Component = AskQuestionPage;
