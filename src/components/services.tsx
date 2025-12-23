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
      <section id="services" className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 text-white">{t.services.title}</h2>
            <p className="text-lg text-zinc-400">
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
                <Card className="h-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-900 transition-all duration-300 group shadow-2xl">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <CardTitle className="font-heading text-xl text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed text-zinc-400">
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
