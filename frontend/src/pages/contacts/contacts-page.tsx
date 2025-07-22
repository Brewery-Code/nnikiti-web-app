import { PageTransition, SocialMediaLinks } from "@/widgets";
import { ContactsSection } from "./contacts-section";

export function ContactsPage() {
  return (
    <PageTransition>
      <ContactsSection />
      <SocialMediaLinks className="container-base flex-wrap justify-center sm:justify-start mt-8" />
    </PageTransition>
  );
}

export const Component = ContactsPage;
