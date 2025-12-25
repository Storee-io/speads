import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import dynamic from "next/dynamic";
import { Footer } from "@/components/footer";

const Services = dynamic(() => import("@/components/services").then((mod) => mod.Services), {
  loading: () => <div className="h-96 animate-pulse bg-slate-50" />,
});
const Process = dynamic(() => import("@/components/process").then((mod) => mod.Process), {
  loading: () => <div className="h-96 animate-pulse bg-slate-50" />,
});
const TargetAudience = dynamic(() => import("@/components/target-audience").then((mod) => mod.TargetAudience), {
  loading: () => <div className="h-96 animate-pulse bg-slate-50" />,
});
const FAQ = dynamic(() => import("@/components/faq").then((mod) => mod.FAQ), {
  loading: () => <div className="h-96 animate-pulse bg-slate-50" />,
});

export default function Home() {
    return (
      <div className="min-h-screen font-sans relative selection:bg-indigo-500/30 bg-white">
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <Services />
          <Process />
          <TargetAudience />
          <FAQ />
        </main>
        <Footer />
      </div>
    );
}
