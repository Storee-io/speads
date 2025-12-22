"use client";

import { motion } from "framer-motion";
import { MessageSquare, Zap, Rocket, CheckCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function Process() {
  const { t } = useTranslation();

  const steps = t.process.steps.map((step, index) => {
    const icons = [MessageSquare, Zap, CheckCircle, Rocket];
    const colors = ["bg-blue-500", "bg-primary", "bg-green-500", "bg-indigo-500"];
    
    return {
      ...step,
      icon: icons[index],
      color: colors[index],
    };
  });

  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">{t.process.title}</h2>
          <p className="text-lg text-muted-foreground">
            {t.process.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-border -z-10" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className={`w-24 h-24 rounded-full ${step.color} text-white flex items-center justify-center mb-6 shadow-xl relative`}>
                <step.icon className="w-10 h-10" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border border-border flex items-center justify-center text-sm font-bold text-foreground">
                  {index + 1}
                </div>
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed italic">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
