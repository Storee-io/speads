"use client";

import { motion } from "framer-motion";
import { MessageSquare, Zap, Rocket, CheckCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function Process() {
  const { t } = useTranslation();

    const steps = t.process.steps.map((step, index) => {
      const icons = [MessageSquare, Zap, CheckCircle, Rocket];
      const colors = ["bg-indigo-500", "bg-purple-500", "bg-emerald-500", "bg-cyan-500"];
      
      return {
        ...step,
        icon: icons[index],
        color: colors[index],
      };
    });

      return (
        <section id="how-it-works" className="py-24 bg-zinc-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 text-slate-900">{t.process.title}</h2>
              <p className="text-lg text-slate-600">
                {t.process.subtitle}
              </p>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-zinc-200 -z-10" />
              
              {steps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="flex flex-col items-center text-center group"
                    >
                  <div className={`w-24 h-24 rounded-full ${step.color} text-white flex items-center justify-center mb-6 shadow-xl relative shadow-indigo-500/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <div className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-[2px]" />
                      <step.icon className="w-10 h-10 relative z-10" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border border-zinc-100 flex items-center justify-center text-sm font-bold text-slate-900 z-20 shadow-sm">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed italic px-4 group-hover:text-slate-700 transition-colors">
                      {step.description}
                    </p>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>
      );
  }
