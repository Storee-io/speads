"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { t, locale, setLocale } = useTranslation();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4"
    >
      <nav className="flex items-center justify-between w-full max-w-7xl px-6 py-3 bg-white/70 dark:bg-black/70 backdrop-blur-xl rounded-full border border-border/50 shadow-sm">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Cpu className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight">Speads</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#services" className="hover:text-foreground transition-colors">{t.navbar.services}</Link>
          <Link href="#how-it-works" className="hover:text-foreground transition-colors">{t.navbar.howItWorks}</Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">{t.navbar.pricing}</Link>
          <Link href="#faq" className="hover:text-foreground transition-colors">{t.navbar.faq}</Link>
        </div>

        <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full px-2 font-bold text-xs">
                  {locale.toUpperCase()}
                  <span className="sr-only">Toggle language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLocale('en')} className={locale === 'en' ? 'bg-primary/10' : ''}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocale('id')} className={locale === 'id' ? 'bg-primary/10' : ''}>
                Indonesia
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="sm" className="hidden sm:flex rounded-full">{t.navbar.login}</Button>
          <Button size="sm" className="rounded-full px-6">{t.navbar.getStarted}</Button>
        </div>
      </nav>
    </motion.header>
  );
}
