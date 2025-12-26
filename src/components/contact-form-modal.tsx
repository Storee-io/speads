"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { MessageCircle, Send, X } from "lucide-react"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { Button } from "@/src/components/ui/button"

const contactSchema = z.object({
  name: z.string()
    .min(1, "Nama wajib diisi")
    .regex(/^[a-zA-Z\s]+$/, "Nama hanya boleh berisi huruf"),
  whatsapp: z.string()
    .min(8, "Minimal 8 digit")
    .max(15, "Maksimal 15 digit")
    .regex(/^\d+$/, "Nomor WhatsApp hanya boleh berisi angka"),
  requirement: z.string({
    required_error: "Silakan pilih kebutuhan Anda",
  }).min(1, "Silakan pilih kebutuhan Anda"),
})

type ContactFormValues = z.infer<typeof contactSchema>

interface ContactFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactFormModal({ open, onOpenChange }: ContactFormModalProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      requirement: "",
    },
  })

  function onSubmit(data: ContactFormValues) {
    // In a real app, you might send this to an API or redirect to WhatsApp
    console.log(data)
    toast.success("Pesan terkirim! Kami akan segera menghubungi Anda.")
    form.reset()
    onOpenChange(false)
    
    // Optional: Redirect to WhatsApp
    // const message = `Halo, saya ${data.name}. Saya tertarik dengan layanan ${data.requirement}.`
    // const whatsappUrl = `https://wa.me/YOUR_NUMBER?text=${encodeURIComponent(message)}`
    // window.open(whatsappUrl, '_blank')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-none bg-[#f0f2f5] dark:bg-[#111b21]">
        <div className="bg-[#075e54] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <MessageCircle className="w-6 h-6 fill-white" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-white">Contact Us</DialogTitle>
              <p className="text-xs text-white/80">Typical reply time: within minutes</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#075e54] dark:text-[#00a884]">Nama</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Contoh: John Doe" 
                        {...field} 
                        className="bg-white dark:bg-[#2a3942] border-none shadow-sm focus-visible:ring-1 focus-visible:ring-[#075e54]"
                      />
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
                    <FormLabel className="text-[#075e54] dark:text-[#00a884]">No. Whatsapp</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Contoh: 08123456789" 
                        {...field} 
                        className="bg-white dark:bg-[#2a3942] border-none shadow-sm focus-visible:ring-1 focus-visible:ring-[#075e54]"
                      />
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
                    <FormLabel className="text-[#075e54] dark:text-[#00a884]">Kebutuhan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white dark:bg-[#2a3942] border-none shadow-sm focus-visible:ring-1 focus-visible:ring-[#075e54]">
                          <SelectValue placeholder="Pilih Kebutuhan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white dark:bg-[#2a3942] border-none">
                        <SelectItem value="Web Development">Web Development</SelectItem>
                        <SelectItem value="Mobile Apps">Mobile Apps</SelectItem>
                        <SelectItem value="Enterprise Systems">Enterprise Systems</SelectItem>
                        <SelectItem value="Custom Software">Custom Software</SelectItem>
                        <SelectItem value="Saas Platforms">Saas Platforms</SelectItem>
                        <SelectItem value="AI Integration">AI Integration</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4 flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-[#25d366] hover:bg-[#20bd5c] text-white rounded-full px-6 py-6 shadow-lg transition-all active:scale-95"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Kirim Pesan
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
