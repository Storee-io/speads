import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { TargetAudience } from "@/components/target-audience";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans text-foreground">
      <Navbar />
      <main>
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
