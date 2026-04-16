import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, FileCheck } from "lucide-react";

type BookingMode = "tour" | "visa";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultPackage?: string;
  mode?: BookingMode;
}

export function BookingModal({ open, onOpenChange, defaultPackage = "", mode = "tour" }: BookingModalProps) {
  const isVisa = mode === "visa";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: defaultPackage,
    travelDate: "",
    message: "",
    // visa-only fields
    passportNumber: "",
    nationality: "Bangladeshi",
    visaType: "Tourist",
  });

  // Keep service field in sync when modal re-opens with a different package/country
  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, service: defaultPackage }));
    }
  }, [open, defaultPackage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let text = "";
    if (isVisa) {
      text =
        `*New Visa Application - Eco Trippers*%0A%0A` +
        `*Country:* ${encodeURIComponent(form.service.trim())}%0A` +
        `*Visa Type:* ${encodeURIComponent(form.visaType)}%0A` +
        `*Full Name:* ${encodeURIComponent(form.name.trim())}%0A` +
        `*Nationality:* ${encodeURIComponent(form.nationality.trim())}%0A` +
        `*Passport No:* ${encodeURIComponent(form.passportNumber.trim())}%0A` +
        `*Phone:* ${encodeURIComponent(form.phone.trim())}%0A` +
        `*Email:* ${encodeURIComponent(form.email.trim())}%0A` +
        `*Intended Travel Date:* ${encodeURIComponent(form.travelDate)}%0A` +
        `*Notes:* ${encodeURIComponent(form.message.trim())}`;
    } else {
      text =
        `*New Booking Request - Eco Trippers*%0A%0A` +
        `*Name:* ${encodeURIComponent(form.name.trim())}%0A` +
        `*Phone:* ${encodeURIComponent(form.phone.trim())}%0A` +
        `*Email:* ${encodeURIComponent(form.email.trim())}%0A` +
        `*Service/Package:* ${encodeURIComponent(form.service.trim())}%0A` +
        `*Travel Date:* ${encodeURIComponent(form.travelDate)}%0A` +
        `*Message:* ${encodeURIComponent(form.message.trim())}`;
    }

    window.open(`https://wa.me/8801886345126?text=${text}`, "_blank");
    onOpenChange(false);
    setForm({
      name: "",
      phone: "",
      email: "",
      service: "",
      travelDate: "",
      message: "",
      passportNumber: "",
      nationality: "Bangladeshi",
      visaType: "Tourist",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">
            {isVisa ? "Visa Application" : "Book Your Trip"}
          </DialogTitle>
          <DialogDescription>
            {isVisa
              ? "Fill in your details to start your visa application. Our team will contact you via WhatsApp."
              : "Fill in your details and we'll connect you via WhatsApp."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {isVisa ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    required
                    maxLength={100}
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    placeholder="e.g. Malaysia Visa"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="visaType">Visa Type *</Label>
                  <select
                    id="visaType"
                    required
                    value={form.visaType}
                    onChange={(e) => setForm({ ...form, visaType: e.target.value })}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm focus:outline-none focus:ring-1 focus:ring-ring md:text-sm"
                  >
                    <option value="Tourist">Tourist</option>
                    <option value="Business">Business</option>
                    <option value="Student">Student</option>
                    <option value="Work">Work</option>
                    <option value="Family Visit">Family Visit</option>
                    <option value="Medical">Medical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name (as per passport) *</Label>
                  <Input id="name" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="nationality">Nationality *</Label>
                  <Input id="nationality" required maxLength={50} value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} placeholder="e.g. Bangladeshi" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="passport">Passport Number *</Label>
                  <Input id="passport" required maxLength={20} value={form.passportNumber} onChange={(e) => setForm({ ...form, passportNumber: e.target.value })} placeholder="A01234567" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" type="tel" required maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+880 1XXX-XXXXXX" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="travelDate">Intended Travel Date</Label>
                  <Input id="travelDate" type="date" value={form.travelDate} onChange={(e) => setForm({ ...form, travelDate: e.target.value })} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Additional Notes</Label>
                <Textarea id="message" maxLength={1000} rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Trip purpose, duration, previous visa history..." />
              </div>

              <Button type="submit" className="w-full bg-gradient-eco text-primary-foreground font-semibold gap-2 shadow-eco">
                <FileCheck className="h-4 w-4" />
                Submit
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
