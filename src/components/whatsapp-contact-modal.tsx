"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Phone, User, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Nama wajib diisi")
    .regex(/^[a-zA-Z\s]+$/, "Nama hanya boleh berisi alfabet"),
  whatsapp: z
    .string()
    .min(8, "Minimal 8 digit")
    .max(15, "Maksimal 15 digit")
    .regex(/^\d+$/, "Nomor Whatsapp hanya boleh berisi angka"),
  requirement: z.string().min(1, "Silakan pilih kebutuhan Anda"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface WhatsappContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WhatsappContactModal({
  isOpen,
  onClose,
}: WhatsappContactModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      requirement: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    const message = `Halo Speads, saya ${data.name}. Saya tertarik dengan layanan ${data.requirement}. Nomor Whatsapp saya ${data.whatsapp}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=6289611117575&text=${encodedMessage}`;
    
    window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: whatsappUrl } }, "*");
    onClose();
    form.reset();
  };

  if (!mounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="p-0 overflow-hidden border-none max-w-[400px] rounded-2xl shadow-2xl">
        {/* WhatsApp Style Header */}
        <div className="bg-[#075e54] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-white text-base font-bold">Speads Support</DialogTitle>
              <p className="text-[10px] text-emerald-100 opacity-90">Online • Usually replies in minutes</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat-like Form Container */}
        <div className="bg-[#e5ddd5] p-4 min-h-[400px] relative">
          {/* Background pattern if needed, but keeping it clean for now */}
          
          <div className="bg-white rounded-xl p-6 shadow-sm mb-4 border border-emerald-100/50">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-medium">Nama</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                            <Input 
                              placeholder="Masukkan nama lengkap" 
                              className="pl-10 border-slate-200 focus:border-[#25d366] focus:ring-[#25d366] text-slate-900" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-medium">No. Whatsapp</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                            <Input 
                              placeholder="Contoh: 08123456789" 
                              className="pl-10 border-slate-200 focus:border-[#25d366] focus:ring-[#25d366] text-slate-900" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requirement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-medium">Kebutuhan</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full border-slate-200 focus:border-[#25d366] focus:ring-[#25d366] text-slate-900">
                              <SelectValue placeholder="Pilih kebutuhan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            <SelectItem value="Web Development" className="text-slate-900 focus:bg-emerald-50 focus:text-emerald-900">Web Development</SelectItem>
                            <SelectItem value="Mobile Apps" className="text-slate-900 focus:bg-emerald-50 focus:text-emerald-900">Mobile Apps</SelectItem>
                            <SelectItem value="Enterprise Systems" className="text-slate-900 focus:bg-emerald-50 focus:text-emerald-900">Enterprise Systems</SelectItem>
                            <SelectItem value="Custom Software" className="text-slate-900 focus:bg-emerald-50 focus:text-emerald-900">Custom Software</SelectItem>
                            <SelectItem value="Saas Platforms" className="text-slate-900 focus:bg-emerald-50 focus:text-emerald-900">Saas Platforms</SelectItem>
                            <SelectItem value="AI Integration" className="text-slate-900 focus:bg-emerald-50 focus:text-emerald-900">AI Integration</SelectItem>
                          </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-[#25d366] hover:bg-[#128c7e] text-white font-bold py-6 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
                >
                  <Send className="w-5 h-5" />
                  Kirim Pesan
                </Button>
              </form>
            </Form>
          </div>
          
          <p className="text-[10px] text-slate-500 text-center italic mt-2">
            Klik tombol di atas untuk memulai percakapan di WhatsApp
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
