"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Rocket } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { useContactModal } from "./contact-modal-context";

function SpeedLines() {
  const [mounted, setMounted] = useState(false);
  const [dots, setDots] = useState<any[]>([]);
  const [mediumLines, setMediumLines] = useState<any[]>([]);
  const [fastLines, setFastLines] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    setDots([...Array(50)].map((_, i) => ({
      top: `${Math.random() * 100}%`,
      opacity: 0.1 + Math.random() * 0.4,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * -20,
    })));

    setMediumLines([...Array(40)].map((_, i) => ({
      top: `${Math.random() * 100}%`,
      opacity: 0.3 + Math.random() * 0.4,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * -5,
    })));

    setFastLines([...Array(25)].map((_, i) => ({
      top: `${Math.random() * 100}%`,
      duration: 0.8 + Math.random() * 1.5,
      delay: Math.random() * -3,
    })));
  }, []);

  if (!mounted) return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-[0.3]">
        {/* Distant slow stars/dots */}
        {dots.map((dot, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-[2px] h-[2px] rounded-full bg-white"
            style={{
              left: "-10%",
              top: dot.top,
              opacity: dot.opacity,
            }}
            animate={{
              left: ["-10%", "110%"],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              ease: "linear",
              delay: dot.delay,
            }}
          />
        ))}

        {/* Medium speed lines */}
        {mediumLines.map((line, i) => (
          <motion.div
            key={`medium-${i}`}
            className="absolute h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
            style={{
              left: "-20%",
              width: "50%",
              top: line.top,
              opacity: line.opacity,
            }}
            animate={{
              left: ["-20%", "120%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: line.duration,
              repeat: Infinity,
              ease: "linear",
              delay: line.delay,
            }}
          />
        ))}

        {/* Warp speed / highlight lines */}
        {fastLines.map((line, i) => (
          <motion.div
            key={`fast-${i}`}
            className="absolute h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_10px_rgba(79,70,229,0.5)]"
            style={{
              left: "-100%",
              width: "80%",
              top: line.top,
            }}
            animate={{
              left: ["-100%", "200%"],
            }}
            transition={{
              duration: line.duration,
              repeat: Infinity,
              ease: "circIn",
              delay: line.delay,
            }}
          />
        ))}
      </div>
      {/* Light streaks and depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.05),transparent_40%)]" />
    </div>
  );
}

function BottomTransition() {
  const [mounted, setMounted] = useState(false);
  const [lines, setLines] = useState<any[]>([]);
  const [bursts, setBursts] = useState<any[]>([]);
  const [whiteLines, setWhiteLines] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    setLines([...Array(60)].map((_, i) => ({
      top: `${50 + Math.pow(Math.random(), 0.5) * 50}%`,
      width: `${100 + Math.random() * 400}px`,
      opacity: 0.1 + Math.random() * 0.7,
      duration: 0.2 + Math.random() * 0.4,
      delay: Math.random() * -3,
    })));

    setBursts([...Array(25)].map((_, i) => ({
      top: `${70 + Math.pow(Math.random(), 0.3) * 30}%`,
      width: `${400 + Math.random() * 600}px`,
      duration: 0.15 + Math.random() * 0.25,
      delay: Math.random() * -2,
    })));

    setWhiteLines([...Array(40)].map((_, i) => ({
      top: `${80 + Math.random() * 20}%`,
      width: `${200 + Math.random() * 500}px`,
      opacity: 0.4 + Math.random() * 0.6,
      duration: 0.1 + Math.random() * 0.3,
      delay: Math.random() * -2,
    })));
  }, []);

  if (!mounted) return <div className="absolute bottom-0 left-0 right-0 h-[300px] overflow-hidden pointer-events-none" />;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[300px] overflow-hidden pointer-events-none">
      {/* White gradient to bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-t from-white to-transparent z-10" />
      {/* Dense Horizontal Speed Lines - more at the bottom */}
      {lines.map((line, i) => (
        <motion.div
          key={`bottom-fast-${i}`}
          className="absolute h-[1px] md:h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/40 to-white/60 shadow-[0_0_8px_rgba(255,255,255,0.3)]"
          style={{
            top: line.top,
            left: "-20%",
            width: line.width,
            opacity: line.opacity,
          }}
          animate={{
            left: ["-20%", "120%"],
            opacity: [0, 1, 0.8, 0],
            scaleX: [1, 4, 1],
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            ease: "circIn",
            delay: line.delay,
          }}
        />
      ))}

      {/* Frequent Extreme Horizontal Speed Bursts at the very bottom */}
      {bursts.map((burst, i) => (
        <motion.div
          key={`bottom-burst-${i}`}
          className="absolute h-[2px] md:h-[3px] bg-gradient-to-r from-transparent via-indigo-500/50 to-white shadow-[0_0_15px_rgba(255,255,255,0.6)]"
          style={{
            top: burst.top,
            left: "-50%",
            width: burst.width,
          }}
          animate={{
            left: ["-50%", "150%"],
            opacity: [0, 0.8, 0],
            scaleX: [1, 6, 1],
          }}
          transition={{
            duration: burst.duration,
            repeat: Infinity,
            ease: "circIn",
            delay: burst.delay,
          }}
        />
      ))}

      {/* NEW: Dense White Speed Animation at the bottom 60px */}
      {whiteLines.map((line, i) => (
        <motion.div
          key={`bottom-white-speed-${i}`}
          className="absolute h-[2px] bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
          style={{
            top: line.top,
            left: "-30%",
            width: line.width,
            opacity: line.opacity,
          }}
          animate={{
            left: ["-30%", "130%"],
            opacity: [0, 1, 1, 0],
            scaleX: [1, 5, 1],
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            ease: "linear",
            delay: line.delay,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative pt-32 pb-48 lg:pt-48 lg:pb-64 overflow-hidden bg-slate-950 group transform-gpu z-10">
      {/* Layer 1: Speed Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SpeedLines />
        <BottomTransition />
      </div>

      {/* Layer 2: Background Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-cyan-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="container relative z-20 mx-auto px-6 text-center">
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
              <a 
                href="https://api.whatsapp.com/send?phone=6289611117575&text=Halo%20Speads%2C%20saya%20ingin%20konsultasi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 border-0 shadow-lg shadow-indigo-500/25 transition-all active:scale-95 text-white">
                  {t.hero.ctaPrimary} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
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
