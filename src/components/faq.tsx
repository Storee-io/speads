"use client";

import { motion } from "framer-motion";
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
        <section id="faq" className="py-24 bg-zinc-50">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6 max-w-4xl"
          >
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 text-slate-900">{t.faq.title}</h2>
              <p className="text-lg text-slate-600">
                {t.faq.subtitle}
              </p>
            </div>
  
            <Accordion type="single" collapsible className="w-full space-y-4">
              {t.faq.list.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white border border-slate-200 rounded-2xl px-6 shadow-sm"
                >
                  <AccordionTrigger className="font-heading text-left font-bold text-lg hover:no-underline py-6 text-slate-900 hover:text-indigo-600 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </section>
      );
  }
