"use client";

import React, { useEffect, useState, useMemo } from "react";
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
import { useTranslation } from "@/lib/i18n";

interface WhatsappContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WhatsappContactModal({
  isOpen,
  onClose,
}: WhatsappContactModalProps) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const contactSchema = useMemo(() => z.object({
    name: z
      .string()
      .min(1, t.contactModal.validation.nameRequired)
      .regex(/^[a-zA-Z\s]+$/, t.contactModal.validation.nameAlpha),
    whatsapp: z
      .string()
      .min(8, t.contactModal.validation.whatsappMin)
      .max(15, t.contactModal.validation.whatsappMax)
      .regex(/^\d+$/, t.contactModal.validation.whatsappNumeric),
    requirement: z.string().min(1, t.contactModal.validation.requirementRequired),
  }), [t]);

  type ContactFormValues = z.infer<typeof contactSchema>;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      requirement: "",
    },
  });

  // Re-validate when locale changes to update error messages
  useEffect(() => {
    if (form.formState.isSubmitted) {
      form.trigger();
    }
  }, [t, form]);

  const onSubmit = (data: ContactFormValues) => {
    const message = t.contactModal.whatsappMessage
      .replace("{name}", data.name)
      .replace("{requirement}", data.requirement)
      .replace("{whatsapp}", data.whatsapp);
      
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
              <DialogTitle className="text-white text-base font-bold">{t.contactModal.support}</DialogTitle>
              <p className="text-[10px] text-emerald-100 opacity-90">{t.contactModal.online}</p>
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
          <div className="bg-white rounded-xl p-6 shadow-sm mb-4 border border-emerald-100/50">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-medium">{t.contactModal.form.name}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input 
                            placeholder={t.contactModal.form.namePlaceholder} 
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
                      <FormLabel className="text-slate-600 font-medium">{t.contactModal.form.whatsapp}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input 
                            placeholder={t.contactModal.form.whatsappPlaceholder} 
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
                      <FormLabel className="text-slate-600 font-medium">{t.contactModal.form.requirement}</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full border-slate-200 focus:border-[#25d366] focus:ring-[#25d366] text-slate-900">
                            <SelectValue placeholder={t.contactModal.form.requirementPlaceholder} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white">
                          <SelectItem value={t.services.list.web.title} className="text-slate-900 focus:bg-emerald-50 focus:text-emerald-900">{t.services.list.web.title}</SelectItem>
                          <SelectItem value={t.services.list.mobile.title} className="text-slate-900 focus:bg-emerald-50 focus:text-emerald-900">{t.services.list.mobile.title}</SelectItem>
                          <SelectItem value={t.services.list.enterprise.title} className="text-slate-900 focus:bg-emerald-50 focus:text-emerald-900">{t.services.list.enterprise.title}</SelectItem>
                          <SelectItem value={t.services.list.custom.title} className="text-slate-900 focus:bg-emerald-50 focus:text-emerald-900">{t.services.list.custom.title}</SelectItem>
                          <SelectItem value={t.services.list.saas.title} className="text-slate-900 focus:bg-emerald-50 focus:text-emerald-900">{t.services.list.saas.title}</SelectItem>
                          <SelectItem value={t.services.list.ai.title} className="text-slate-900 focus:bg-emerald-50 focus:text-emerald-900">{t.services.list.ai.title}</SelectItem>
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
                  {t.contactModal.form.submit}
                </Button>
              </form>
            </Form>
          </div>
          
          <p className="text-[10px] text-slate-500 text-center italic mt-2">
            {t.contactModal.form.footerNote}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
