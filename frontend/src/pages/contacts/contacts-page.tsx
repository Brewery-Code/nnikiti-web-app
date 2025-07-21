import { PageTransition, SocialMediaLinks } from "@/widgets";
import { ContactsSection } from "./contacts-section";

export function ContactsPage() {
  return (
    <PageTransition>
      <ContactsSection />
      <SocialMediaLinks className="container-base" />
    </PageTransition>
  );
}

export const Component = ContactsPage;
