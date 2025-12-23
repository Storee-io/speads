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
    
    // Split the pathname to replace the locale segment
    const segments = pathname.split("/");
    // segments[0] is empty because pathname starts with /
    // segments[1] is the current locale
    segments[1] = newLocale;
    
    const newPath = segments.join("/");
    
    // Set cookie for middleware persistence
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    
    router.push(newPath);
  };

  // Helper to get localized link
  const getLocalizedLink = (path: string) => {
    return `/${locale}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4"
    >
      <nav className="flex items-center justify-between w-full max-w-7xl px-6 py-3 bg-white/70 dark:bg-black/70 backdrop-blur-xl rounded-full border border-border/50 shadow-sm">
        <Link href={getLocalizedLink("/")} className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Cpu className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight">Speads</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href={getLocalizedLink("#services")} className="hover:text-foreground transition-colors">{t.navbar.services}</Link>
          <Link href={getLocalizedLink("#how-it-works")} className="hover:text-foreground transition-colors">{t.navbar.howItWorks}</Link>
          <Link href={getLocalizedLink("#pricing")} className="hover:text-foreground transition-colors">{t.navbar.pricing}</Link>
          <Link href={getLocalizedLink("#faq")} className="hover:text-foreground transition-colors">{t.navbar.faq}</Link>
        </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full px-3 font-bold text-xs uppercase hover:bg-primary/5 border border-border/50">
                  {locale}
                  <span className="sr-only">Select language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[8rem] rounded-xl p-1 shadow-lg border-border/50">
                {i18n.locales.map((loc) => (
                  <DropdownMenuItem 
                    key={loc}
                    onClick={() => handleLanguageChange(loc)} 
                    className={`rounded-lg cursor-pointer ${locale === loc ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-muted'}`}
                  >
                    <span className="flex items-center justify-between w-full">
                      {loc === 'en' ? 'EN' : 'ID'}
                      {locale === loc && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="sm" className="hidden sm:flex rounded-full">{t.navbar.login}</Button>
            <Button size="sm" className="rounded-full px-6">{t.navbar.getStarted}</Button>
          </div>
      </nav>
    </motion.header>
  );
}
