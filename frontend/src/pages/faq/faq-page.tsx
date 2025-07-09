import { Accordion, Title } from "@/shared/ui";
import { PageTransition } from "@/widgets";
import { useState } from "react";

export function FAQPage() {
  const [whichAccordionIsOpen, setWhichAccordionIsOpen] = useState(-1);
  const accordionHandler = (id: number) => {
    if (id === whichAccordionIsOpen) {
      setWhichAccordionIsOpen(-1);
    } else {
      setWhichAccordionIsOpen(id);
    }
  };
  return (
    <PageTransition>
      <section className="container-base grow flex flex-col">
        <Title className="">FAQ</Title>
        <div className="flex flex-col gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Accordion
              isAccordionOpen={i === whichAccordionIsOpen}
              onClick={() => accordionHandler(i)}
              key={i}
              title={
                "What should I do if I don’t receive a confirmation email after signing up?"
              }
              description={
                "If you don’t receive a confirmation email within a few minutes of signing up, there are a few things you can try. First, check your spam or junk folder, as sometimes automated emails are mistakenly filtered out by email providers. If it’s not there, make sure you entered your email address correctly during the registration process. A small typo can prevent the confirmation email from reaching you. If everything seems fine and you still haven't received the email, we recommend requesting a new confirmation email by going to the login page and clicking on “Resend Confirmation Email.” If the problem persists, feel free to contact our support team directly — we’ll be happy to assist you."
              }
            />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}

export const Component = FAQPage;
