"use client";

import { motion } from "framer-motion";
import { MessageSquare, Zap, Rocket, CheckCircle } from "lucide-react";

const steps = [
  {
    title: "Discovery & Strategy",
    description: "We dive deep into your business needs, goals, and target audience to define a precise roadmap.",
    icon: MessageSquare,
    color: "bg-blue-500",
  },
  {
    title: "AI-Assisted Development",
    description: "Our engineers use advanced AI tools to write, test, and optimize code at lightning speed.",
    icon: Zap,
    color: "bg-primary",
  },
  {
    title: "Quality Assurance",
    description: "Rigorous testing and refinement ensure your software is robust, secure, and ready for scale.",
    icon: CheckCircle,
    color: "bg-green-500",
  },
  {
    title: "Deployment & Growth",
    description: "We launch your product and provide ongoing support to ensure long-term success.",
    icon: Rocket,
    color: "bg-indigo-500",
  },
];

export function Process() {
  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">Our Process</h2>
          <p className="text-lg text-muted-foreground">
            How we deliver high-quality software faster and more affordably than traditional agencies.
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
