"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";
import { i18n } from "@/i18n-config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { t, locale } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    if (!pathname) return;
    
    // Set cookie for middleware persistence
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    // Calculate new path based on "Default No Slug" rule
    let newPath = pathname;

    // Current is non-default (starts with /en)
    if (pathname.startsWith('/en')) {
      if (newLocale === i18n.defaultLocale) {
        // Switching to default: remove /en prefix
        newPath = pathname.replace(/^\/en/, '') || '/';
      } else {
        // Staying in non-default (not applicable with 2 langs but good for scaling)
        newPath = pathname.replace(/^\/[^/]+/, `/${newLocale}`);
      }
    } else {
      // Current is default (no slug)
      if (newLocale !== i18n.defaultLocale) {
        // Switching to non-default: add prefix
        newPath = `/${newLocale}${pathname === '/' ? '' : pathname}`;
      }
      // Staying in default: do nothing
    }
    
    router.push(newPath);
  };

  // Helper to get localized link
  const getLocalizedLink = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    
    // If locale is default, no prefix
    if (locale === i18n.defaultLocale) {
      return cleanPath;
    }
    
    // Otherwise, add prefix
    return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4"
    >
      <nav className="flex items-center justify-between w-full max-w-7xl px-6 py-3 bg-slate-900/50 backdrop-blur-xl rounded-full border border-slate-800 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <Link href={getLocalizedLink("/")} className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-400 p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-indigo-500/20">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Speads</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href={getLocalizedLink("#services")} className="hover:text-cyan-400 transition-colors relative group">
            {t.navbar.services}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
          </Link>
          <Link href={getLocalizedLink("#how-it-works")} className="hover:text-cyan-400 transition-colors relative group">
            {t.navbar.howItWorks}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
          </Link>
          <Link href={getLocalizedLink("#pricing")} className="hover:text-cyan-400 transition-colors relative group">
            {t.navbar.pricing}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
          </Link>
          <Link href={getLocalizedLink("#faq")} className="hover:text-cyan-400 transition-colors relative group">
            {t.navbar.faq}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
          </Link>
        </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full px-3 font-bold text-xs uppercase hover:bg-white/5 border border-slate-800 text-zinc-300">
                  {locale}
                  <span className="sr-only">Select language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[8rem] rounded-xl p-1 shadow-2xl border-slate-800 bg-slate-900/90 backdrop-blur-lg">
                {i18n.locales.map((loc) => (
                  <DropdownMenuItem 
                    key={loc}
                    onClick={() => handleLanguageChange(loc)} 
                    className={`rounded-lg cursor-pointer ${locale === loc ? 'bg-indigo-500/20 text-indigo-400 font-bold' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'}`}
                  >
                    <span className="flex items-center justify-between w-full">
                      {loc === 'en' ? 'EN' : 'ID'}
                      {locale === loc && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="sm" className="hidden sm:flex rounded-full text-zinc-300 hover:text-white hover:bg-white/5">{t.navbar.login}</Button>
            <Button size="sm" className="rounded-full px-6 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 text-white border-0 shadow-lg shadow-indigo-500/25 transition-all active:scale-95">{t.navbar.getStarted}</Button>
          </div>
      </nav>
    </motion.header>
  );
}
