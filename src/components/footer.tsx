"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cpu, Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useContactModal } from "./contact-modal-context";

export function Footer() {
  const { t } = useTranslation();
  const { openContactModal } = useContactModal();

  return (
      <footer className="bg-slate-950 text-zinc-400 py-20">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 md:p-16 mb-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0,transparent_70%)] pointer-events-none" />
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">
              {t.footer.ctaTitle} <span className="text-indigo-500">{t.footer.ctaHighlight}</span>
            </h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto text-zinc-400">{t.footer.ctaSubtitle}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="https://api.whatsapp.com/send?phone=6289611117575&text=Halo%20Speads%2C%20saya%20ingin%20konsultasi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 border-0 shadow-lg shadow-indigo-500/25 transition-all active:scale-95 text-white">
                    {t.footer.ctaPrimary}
                  </Button>
                </a>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6 group">
                <div className="bg-gradient-to-br from-indigo-500 to-cyan-400 p-1.5 rounded-lg">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading text-xl font-bold tracking-tight text-white">Speads</span>
              </Link>
              <p className="text-sm leading-relaxed mb-6 text-zinc-400">
                {t.footer.description}
              </p>
              <div className="flex items-center gap-4">
                <Link href="#" className="hover:text-indigo-400 transition-colors"><Twitter className="w-5 h-5" /></Link>
                <Link href="#" className="hover:text-indigo-400 transition-colors"><Linkedin className="w-5 h-5" /></Link>
                <Link href="#" className="hover:text-indigo-400 transition-colors"><Github className="w-5 h-5" /></Link>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-sm">{t.navbar.services}</h3>
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

            <div className="pt-8 border-t border-slate-800 text-xs flex flex-col md:flex-row justify-between gap-4 text-zinc-500">
              <p>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> Speads AI Agency. {t.footer.rights}</p>
              <p>{t.footer.builtWith}</p>
            </div>
        </div>
      </footer>
    );
  }
