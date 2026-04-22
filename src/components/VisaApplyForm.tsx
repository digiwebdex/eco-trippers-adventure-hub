import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileCheck } from "lucide-react";

interface VisaApplyFormProps {
  countryName: string;
  defaultVisaType?: string;
}

export function VisaApplyForm({ countryName, defaultVisaType = "Tourist" }: VisaApplyFormProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    travelDate: "",
    message: "",
    passportNumber: "",
    nationality: "Bangladeshi",
    visaType: defaultVisaType,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `*New Visa Application - Eco Trippers*%0A%0A` +
      `*Country:* ${encodeURIComponent(countryName)}%0A` +
      `*Visa Type:* ${encodeURIComponent(form.visaType)}%0A` +
      `*Full Name:* ${encodeURIComponent(form.name.trim())}%0A` +
      `*Nationality:* ${encodeURIComponent(form.nationality.trim())}%0A` +
      `*Passport No:* ${encodeURIComponent(form.passportNumber.trim())}%0A` +
      `*Phone:* ${encodeURIComponent(form.phone.trim())}%0A` +
      `*Email:* ${encodeURIComponent(form.email.trim())}%0A` +
      `*Intended Travel Date:* ${encodeURIComponent(form.travelDate)}%0A` +
      `*Notes:* ${encodeURIComponent(form.message.trim())}`;
    window.open(`https://wa.me/8801632164405?text=${text}`, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="visaType">Visa Type *</Label>
        <select
          id="visaType"
          required
          value={form.visaType}
          onChange={(e) => setForm({ ...form, visaType: e.target.value })}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
        >
          <option value="Tourist">Tourist</option>
          <option value="Business">Business</option>
          <option value="Student">Student</option>
          <option value="Work">Work</option>
          <option value="Family Visit">Family Visit</option>
          <option value="Medical">Medical</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="name">Full Name (as per passport) *</Label>
        <Input id="name" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="nationality">Nationality *</Label>
          <Input id="nationality" required maxLength={50} value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="passport">Passport No. *</Label>
          <Input id="passport" required maxLength={20} value={form.passportNumber} onChange={(e) => setForm({ ...form, passportNumber: e.target.value })} placeholder="A01234567" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone *</Label>
        <Input id="phone" type="tel" required maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+880 1XXX-XXXXXX" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="travelDate">Intended Travel Date</Label>
        <Input id="travelDate" type="date" value={form.travelDate} onChange={(e) => setForm({ ...form, travelDate: e.target.value })} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Additional Notes</Label>
        <Textarea id="message" maxLength={1000} rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Trip purpose, duration, previous visa history..." />
      </div>

      <Button type="submit" className="w-full bg-gradient-eco text-primary-foreground font-semibold gap-2 shadow-eco h-11">
        <FileCheck className="h-4 w-4" />
        Apply Now via WhatsApp
      </Button>
      <p className="text-[11px] text-muted-foreground text-center">
        Our visa expert will contact you within 1 business hour.
      </p>
    </form>
  );
}