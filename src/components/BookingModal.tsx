import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultPackage?: string;
}

export function BookingModal({ open, onOpenChange, defaultPackage = "" }: BookingModalProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: defaultPackage,
    travelDate: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Booking Request - Eco Trippers*%0A%0A` +
      `*Name:* ${encodeURIComponent(form.name.trim())}%0A` +
      `*Phone:* ${encodeURIComponent(form.phone.trim())}%0A` +
      `*Email:* ${encodeURIComponent(form.email.trim())}%0A` +
      `*Service/Package:* ${encodeURIComponent(form.service.trim())}%0A` +
      `*Travel Date:* ${encodeURIComponent(form.travelDate)}%0A` +
      `*Message:* ${encodeURIComponent(form.message.trim())}`;
    window.open(`https://wa.me/8801886345126?text=${text}`, "_blank");
    onOpenChange(false);
    setForm({ name: "", phone: "", email: "", service: "", travelDate: "", message: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Book Your Trip</DialogTitle>
          <DialogDescription>Fill in your details and we'll connect you via WhatsApp.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" type="tel" required maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+880 1XXX-XXXXXX" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="service">Service / Package</Label>
              <Input id="service" maxLength={200} value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} placeholder="e.g. Japan Tour" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="travelDate">Travel Date</Label>
              <Input id="travelDate" type="date" value={form.travelDate} onChange={(e) => setForm({ ...form, travelDate: e.target.value })} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" maxLength={1000} rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your travel plans..." />
          </div>
          <Button type="submit" className="w-full bg-gradient-eco text-primary-foreground font-semibold gap-2 shadow-eco">
            <Send className="h-4 w-4" />
            Send via WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
