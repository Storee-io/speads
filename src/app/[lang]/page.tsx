import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { TargetAudience } from "@/components/target-audience";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-zinc-100 bg-slate-950 relative selection:bg-indigo-500/30">
      {/* Global Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

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
