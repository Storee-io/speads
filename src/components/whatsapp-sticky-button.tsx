"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useContactModal } from "./contact-modal-context";
import { cn } from "@/lib/utils";

export function WhatsappStickyButton() {
  const { openContactModal } = useContactModal();

  return (
    <button
      onClick={openContactModal}
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "flex h-14 w-14 items-center justify-center rounded-full",
        "bg-[#25d366] text-white shadow-lg transition-all duration-300",
        "hover:scale-110 hover:bg-[#128c7e] active:scale-95",
        "animate-in fade-in slide-in-from-bottom-10"
      )}
      aria-label="Contact on WhatsApp"
    >
      <FaWhatsapp className="h-8 w-8" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-white/20"></span>
      </span>
    </button>
  );
}
