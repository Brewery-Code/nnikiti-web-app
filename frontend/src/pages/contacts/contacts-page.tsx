import { PageTransition, SocialMediaLinks } from "@/widgets";
import { ContactsSection } from "./contacts-section";

export function ContactsPage() {
  return (
    <PageTransition>
      <ContactsSection />
      <SocialMediaLinks className="container-base mt-8 flex-wrap justify-center sm:justify-start" />
    </PageTransition>
  );
}

export const Component = ContactsPage;
