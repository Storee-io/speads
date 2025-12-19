"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Rocket } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-8">
            <Zap className="w-3 h-3 fill-current" />
            <span>AI-Powered Software Development</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Build Software <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600">10x Faster</span> with Speads
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            From startups to corporates, we help you build high-quality websites, apps, and custom systems at a fraction of the cost using AI-assisted engineering.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto shadow-lg shadow-primary/25">
              Start Building Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto bg-white/50 backdrop-blur-sm">
              View Case Studies
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 grayscale opacity-50">
            {/* Mock logos */}
            <div className="flex items-center justify-center font-heading font-bold text-xl tracking-tighter">TECHCORP</div>
            <div className="flex items-center justify-center font-heading font-bold text-xl tracking-tighter">SOFTLY</div>
            <div className="flex items-center justify-center font-heading font-bold text-xl tracking-tighter">NEXUS</div>
            <div className="flex items-center justify-center font-heading font-bold text-xl tracking-tighter">QUANTUM</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-blue-500/5 pointer-events-none" />
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
              alt="Speads Dashboard"
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
          
          {/* Floating stats card */}
          <div className="absolute -bottom-6 -right-6 md:right-12 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-border shadow-xl hidden sm:block">
            <div className="flex items-center gap-4">
              <div className="bg-green-500/10 p-2 rounded-xl">
                <Rocket className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Efficiency boost</p>
                <p className="text-2xl font-bold font-heading">+400%</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
