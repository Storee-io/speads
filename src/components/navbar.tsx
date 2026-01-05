"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";
import { i18n } from "@/i18n-config";
import { useContactModal } from "./contact-modal-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { t, locale, settings } = useTranslation();
  const pathname = usePathname();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const { openContactModal } = useContactModal();

    useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLocalizedLink = (path: string) => {
    if (locale === i18n.defaultLocale) return path === "" ? "/" : path;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `/${locale}${cleanPath === "/" ? "" : cleanPath}` || `/${locale}`;
  };

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

  // Helper to handle smooth scroll for hash links
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    // Only handle if it's a hash link on the current page
    const isCurrentPage = pathname === getLocalizedLink("/") || pathname === getLocalizedLink("");
    
    if (hash.startsWith("#") && isCurrentPage) {
      e.preventDefault();
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        const offset = 80; // Account for navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        
        // Update URL hash without jumping
        window.history.pushState(null, "", hash);
      }
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4"
    >
      <nav className={`flex items-center justify-between w-full max-w-7xl px-6 py-3 rounded-full border shadow-[0_8px_32px_rgba(0,0,0,0.5)] ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-xl border-slate-200 shadow-slate-200/50" 
          : "bg-slate-900/80 backdrop-blur-xl border-slate-800 shadow-black/50"
      }`}>
        <Link href={getLocalizedLink("/")} className="flex items-center gap-2 group">
            <img 
              src={isScrolled 
                ? "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/07499db0-1c82-4b25-9a10-20f14972a9a0/Logo-Speads-Black-1767432999669.png?width=8000&height=8000&resize=contain"
                : "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/07499db0-1c82-4b25-9a10-20f14972a9a0/Logo-Speads-White-1767432999440.png?width=8000&height=8000&resize=contain"
              }
              alt="Speads"
              className="h-6 w-auto"
            />
          </Link>
        
        <div className={`hidden md:flex items-center gap-8 text-sm font-semibold ${
          isScrolled ? "text-slate-900" : "text-white"
        }`}>
          <a 
            href="#services" 
            onClick={(e) => handleScrollTo(e, "#services")}
            className={`relative group cursor-pointer ${isScrolled ? "hover:text-indigo-600" : "hover:text-cyan-400"}`}
          >
            {t.navbar.services}
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? "bg-indigo-600" : "bg-cyan-400"}`} />
          </a>
            <a 
              href="#our-process" 
              onClick={(e) => handleScrollTo(e, "#our-process")}
              className={`relative group cursor-pointer ${isScrolled ? "hover:text-indigo-600" : "hover:text-cyan-400"}`}
            >
              {t.navbar.howItWorks}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? "bg-indigo-600" : "bg-cyan-400"}`} />
            </a>
            <a 
              href="#built-for" 
              onClick={(e) => handleScrollTo(e, "#built-for")}
              className={`relative group cursor-pointer ${isScrolled ? "hover:text-indigo-600" : "hover:text-cyan-400"}`}
            >
              {t.navbar.pricing}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? "bg-indigo-600" : "bg-cyan-400"}`} />
            </a>
          <a 
            href="#faq" 
            onClick={(e) => handleScrollTo(e, "#faq")}
            className={`relative group cursor-pointer ${isScrolled ? "hover:text-indigo-600" : "hover:text-cyan-400"}`}
          >
            {t.navbar.faq}
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? "bg-indigo-600" : "bg-cyan-400"}`} />
          </a>
        </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className={`rounded-full px-3 font-bold text-xs uppercase border ${
                  isScrolled 
                    ? "border-slate-300 text-slate-900 hover:bg-slate-100" 
                    : "border-white/20 text-white hover:bg-white/10"
                }`}>
                  {locale}
                  <span className="sr-only">Select language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={`min-w-[8rem] rounded-xl p-1 shadow-2xl backdrop-blur-lg border ${
                isScrolled 
                  ? "bg-white/95 border-slate-200 shadow-slate-200/50" 
                  : "bg-slate-900/95 border-slate-800"
              }`}>
                {i18n.locales.map((loc) => (
                  <DropdownMenuItem 
                    key={loc}
                    onClick={() => handleLanguageChange(loc)} 
                    className={`rounded-lg cursor-pointer transition-colors ${
                      locale === loc 
                        ? (isScrolled ? "bg-indigo-50 text-indigo-600 font-bold" : "bg-indigo-500/20 text-indigo-400 font-bold") 
                        : (isScrolled ? "text-slate-700 hover:bg-slate-50 hover:text-indigo-600" : "text-white/70 hover:bg-white/5 hover:text-white")
                    }`}
                  >
                    <span className="flex items-center justify-between w-full">
                      {loc === 'en' ? 'EN' : 'ID'}
                      {locale === loc && <span className={`w-1.5 h-1.5 rounded-full ${isScrolled ? "bg-indigo-600" : "bg-indigo-400"}`} />}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

              <Button 
                onClick={openContactModal}
                size="sm" 
                className="rounded-full px-6 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 text-white border-0 shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
              >
                {t.navbar.getStarted}
              </Button>

          </div>
      </nav>
    </motion.header>
  );
}
