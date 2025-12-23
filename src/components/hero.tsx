"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Rocket } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-950">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-cyan-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-8">
            <Zap className="w-3 h-3 fill-current" />
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-white">
            {t.hero.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400">{t.hero.highlight}</span> {t.hero.subtitle}
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 border-0 shadow-lg shadow-indigo-500/25 transition-all active:scale-95 text-white">
              {t.hero.ctaPrimary} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto bg-white/5 backdrop-blur-sm border-slate-800 text-zinc-300 hover:bg-white/10 hover:text-white">
              {t.hero.ctaSecondary}
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 grayscale opacity-30 contrast-125">
            {/* Mock logos */}
            <div className="flex items-center justify-center font-heading font-bold text-xl tracking-tighter text-zinc-400">TECHCORP</div>
            <div className="flex items-center justify-center font-heading font-bold text-xl tracking-tighter text-zinc-400">SOFTLY</div>
            <div className="flex items-center justify-center font-heading font-bold text-xl tracking-tighter text-zinc-400">NEXUS</div>
            <div className="flex items-center justify-center font-heading font-bold text-xl tracking-tighter text-zinc-400">QUANTUM</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
              alt="Speads Dashboard"
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
          
          {/* Floating stats card */}
          <div className="absolute -bottom-6 -right-6 md:right-12 bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-2xl hidden sm:block">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-500/10 p-2 rounded-xl">
                <Rocket className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="text-left">
                <p className="text-sm text-zinc-400 font-medium uppercase tracking-wider">{t.hero.efficiency}</p>
                <p className="text-2xl font-bold font-heading text-white">+400%</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
