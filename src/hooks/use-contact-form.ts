"use client"

import { create } from "zustand"

interface ContactFormStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useContactForm = create<ContactFormStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
