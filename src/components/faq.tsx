"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does Speads use AI in development?",
    answer: "We use AI at every stage: from requirements analysis and architecture planning to code generation, automated testing, and documentation. This allows our senior engineers to focus on logic and quality rather than repetitive tasks, resulting in 10x faster delivery.",
  },
  {
    question: "Is AI-generated code secure?",
    answer: "Absolutely. All AI-assisted code is thoroughly reviewed, refactored, and tested by our experienced human engineers. We use AI as a powerful tool, but the final responsibility and quality control always lie with our engineering team.",
  },
  {
    question: "How much cheaper is Speads compared to traditional agencies?",
    answer: "Because we can deliver projects significantly faster, we typically reduce costs by 40-60% compared to traditional development agencies while maintaining or exceeding their quality standards.",
  },
  {
    question: "Do you work with startups and individuals?",
    answer: "Yes, we specialize in helping startups go from MVP to market quickly. We also offer accessible packages for individuals with big ideas who need high-end technical execution.",
  },
  {
    question: "What technologies do you use?",
    answer: "We primarily work with modern, scalable stacks like Next.js, React, Node.js, Python, and cloud-native architectures (AWS/Supabase). We choose the best tech for your specific needs.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our AI-powered approach.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white dark:bg-zinc-900 border border-border rounded-2xl px-6"
            >
              <AccordionTrigger className="font-heading text-left font-bold text-lg hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
