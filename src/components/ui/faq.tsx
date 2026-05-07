"use client";

import { Accordion } from "@base-ui/react/accordion";
import { PiChevronDownStroke } from "@/components/icons/pikaicons";
import faqsData from "@/data/faqs.json";
import posthog from "posthog-js";

export function Faq() {
  return (
    <Accordion.Root className="w-full">
      {faqsData.faqs.map((faq, i) => (
        <Accordion.Item
          key={faq.q}
          value={i}
          className="border-b border-border last:border-b-0"
        >
          <Accordion.Header className="m-0">
            <Accordion.Trigger
              className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-bold text-foreground outline-none transition-colors sm:text-xl"
              onClick={() => posthog.capture("faq_item_opened", { question: faq.q, index: i })}
            >
              <span>{faq.q}</span>
              <PiChevronDownStroke
                aria-hidden
                className="h-6 w-6 shrink-0 text-foreground transition-transform duration-200 group-data-[panel-open]:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="overflow-hidden text-base leading-7 text-muted transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0 h-[var(--accordion-panel-height)]">
            <div className="pb-6 pr-12">{faq.a}</div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
