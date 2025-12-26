"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";

export function TargetAudience() {
  const { t } = useTranslation();

    const audiences = t.targetAudience.list.map((item, index) => {
      const images = [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
      ];
      return {
        ...item,
        image: images[index]
      };
    });

    return (
      <section id="built-for" className="py-24 overflow-hidden bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight text-slate-900"
            >
              {t.targetAudience.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">{t.targetAudience.highlight}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-slate-600 max-w-2xl mx-auto"
            >
              {t.targetAudience.satisfaction}: <span className="font-bold text-indigo-600">98%</span>
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((item, index) => (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 text-center"
            >
              <div className="mb-6 relative h-48 w-full overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.type}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4 text-slate-900">{item.type}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.benefit}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
  }
