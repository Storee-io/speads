"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, Database, Code, Laptop, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";

export function Services() {
  const { t } = useTranslation();

    const services = [
      {
        title: t.services.list.web.title,
        description: t.services.list.web.description,
        icon: Globe,
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
      },
      {
        title: t.services.list.mobile.title,
        description: t.services.list.mobile.description,
        icon: Smartphone,
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
      },
      {
        title: t.services.list.enterprise.title,
        description: t.services.list.enterprise.description,
        icon: Database,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
      },
      {
        title: t.services.list.custom.title,
        description: t.services.list.custom.description,
        icon: Code,
        color: "text-amber-400",
        bg: "bg-amber-400/10",
      },
      {
        title: t.services.list.saas.title,
        description: t.services.list.saas.description,
        icon: Laptop,
        color: "text-rose-400",
        bg: "bg-rose-400/10",
      },
      {
        title: t.services.list.ai.title,
        description: t.services.list.ai.description,
        icon: Cpu,
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
      },
    ];

      return (
        <section id="services" className="py-24 relative overflow-hidden bg-white">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
                {t.services.title}
              </h2>
              <p className="text-lg text-slate-600">
                {t.services.subtitle}
              </p>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border border-slate-200 bg-white hover:bg-zinc-50 hover:border-indigo-500/50 transition-all duration-500 group shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <CardHeader className="relative">
                      <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}>
                        <service.icon className={`w-7 h-7 ${service.color}`} />
                      </div>
                      <CardTitle className="font-heading text-2xl text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                      <CardDescription className="text-base leading-relaxed text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );
  }
