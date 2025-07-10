import { Title } from "@/shared/ui";
import { PageTransition, QueryHandler } from "@/widgets";
import { useState } from "react";
import Accordion from "./accordion";
import { publicRqClient } from "@/shared/api/instance";

export function FAQPage() {
  const { data, isLoading, isError } = publicRqClient.useQuery(
    "get",
    "/core/faq/"
  );

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
        <QueryHandler isLoading={isLoading} isError={isError}>
          <div className="flex flex-col gap-2">
            {data?.map((item, i) => (
              <Accordion
                isAccordionOpen={i === whichAccordionIsOpen}
                onClick={() => accordionHandler(i)}
                key={item.id}
                title={item.question}
                description={item.answer}
              />
            ))}
          </div>
        </QueryHandler>
      </section>
    </PageTransition>
  );
}

export const Component = FAQPage;
