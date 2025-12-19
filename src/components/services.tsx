"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, Database, Code, Laptop, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const services = [
  {
    title: "Web Development",
    description: "High-performance marketing sites, e-commerce platforms, and complex web applications built with Next.js.",
    icon: Globe,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Mobile Apps",
    description: "Native-feeling iOS and Android applications developed using cross-platform technologies and AI optimization.",
    icon: Smartphone,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Enterprise Systems",
    description: "Robust internal tools, ERPs, and CRMs designed to streamline operations and scale with your business.",
    icon: Database,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Custom Software",
    description: "Unique software solutions tailored to solve your specific business challenges and competitive needs.",
    icon: Code,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "SaaS Platforms",
    description: "End-to-end multi-tenant platform development including subscription management and user analytics.",
    icon: Laptop,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    title: "AI Integration",
    description: "Powering your existing tools with LLMs, computer vision, and predictive analytics for a smarter future.",
    icon: Cpu,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">What We Build</h2>
          <p className="text-lg text-muted-foreground">
            Leveraging cutting-edge AI technology, we deliver complex software solutions in weeks, not months.
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
              <Card className="h-full border-none shadow-none bg-white dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center mb-4`}>
                    <service.icon className={`w-6 h-6 ${service.color}`} />
                  </div>
                  <CardTitle className="font-heading text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
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
