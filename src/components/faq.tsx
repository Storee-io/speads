"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "@/lib/i18n";

export function FAQ() {
  const { t } = useTranslation();

    return (
      <section id="faq" className="py-24 bg-slate-950">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 text-white">{t.faq.title}</h2>
            <p className="text-lg text-zinc-400">
              {t.faq.subtitle}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {t.faq.list.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl px-6"
              >
                <AccordionTrigger className="font-heading text-left font-bold text-lg hover:no-underline py-6 text-white hover:text-indigo-400 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    );
  }
