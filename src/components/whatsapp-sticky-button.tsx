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
      <FaWhatsapp className="h-8 w-8 z-10" />
      <span className="absolute inset-0 rounded-full animate-ping bg-[#25d366] opacity-40"></span>
    </button>
  );
}
