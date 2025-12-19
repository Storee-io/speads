"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cpu, Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-20">
      <div className="container mx-auto px-6">
        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-8 md:p-16 mb-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1)_0,transparent_70%)] pointer-events-none" />
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">Ready to accelerate your <span className="text-primary">Software Journey?</span></h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto">Join hundreds of businesses that have transformed their ideas into reality with Speads.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto">Book a Discovery Call</Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto text-white border-white/20 hover:bg-white/10">
              Get an Estimate <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="bg-primary p-1.5 rounded-lg">
                <Cpu className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-white">Speads</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              The AI-powered software agency building the future of business applications. Faster, cheaper, and more reliable.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Github className="w-5 h-5" /></Link>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-sm">Services</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Web Development</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Mobile Applications</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Enterprise Systems</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">AI Integration</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-sm">Company</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-sm">Legal</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-xs flex flex-col md:flex-row justify-between gap-4">
          <p>© {new Date().getFullYear()} Speads AI Agency. All rights reserved.</p>
          <p>Built with AI-Assisted Engineering</p>
        </div>
      </div>
    </footer>
  );
}
