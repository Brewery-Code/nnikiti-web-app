import { PageTransition } from "@/widgets";
import { ContactsSection } from "./contacts-section";

export function ContactsPage() {
  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <ContactsSection />
    </PageTransition>
  );
}

export const Component = ContactsPage;
