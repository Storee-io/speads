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
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop"
    ];
    return {
      ...item,
      image: images[index]
    };
  });

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8 leading-tight">
              {t.targetAudience.title} <span className="text-primary">{t.targetAudience.highlight}</span>
            </h2>
            <div className="space-y-8">
              {audiences.map((item, index) => (
                <motion.div
                  key={item.type}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold mb-2">{item.type}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.benefit}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4 pt-12">
                <Image
                  src={audiences[0].image}
                  alt="Corporate Office"
                  width={400}
                  height={600}
                  className="rounded-2xl object-cover h-64 w-full shadow-lg"
                />
                <Image
                  src={audiences[2].image}
                  alt="Individual working"
                  width={400}
                  height={600}
                  className="rounded-2xl object-cover h-80 w-full shadow-lg"
                />
              </div>
              <div className="space-y-4">
                <Image
                  src={audiences[1].image}
                  alt="Startup meeting"
                  width={400}
                  height={600}
                  className="rounded-2xl object-cover h-96 w-full shadow-lg"
                />
                <div className="bg-primary p-8 rounded-2xl text-primary-foreground flex flex-col justify-end h-48">
                  <p className="text-4xl font-bold font-heading mb-2">98%</p>
                  <p className="text-sm font-medium uppercase tracking-wider opacity-80">{t.targetAudience.satisfaction}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
