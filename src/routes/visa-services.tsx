import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";
import { CheckCircle, Clock, FileText, Search, Send } from "lucide-react";

export const Route = createFileRoute("/visa-services")({
  head: () => ({
    meta: [
      { title: "Visa Services — Eco Trippers" },
      { name: "description", content: "Expert visa processing for 21+ countries. Malaysia, Japan, Thailand, South Korea, UK, USA, Canada, and more." },
      { property: "og:title", content: "Visa Services — Eco Trippers" },
      { property: "og:description", content: "Tourist visa processing for 21+ countries with expert documentation support." },
    ],
  }),
  component: VisaServicesPage,
});

const visaCountries = [
  { name: "Malaysia", flag: "🇲🇾", price: "5,500", processing: "5-7 days" },
  { name: "Thailand", flag: "🇹🇭", price: "6,500", processing: "5-7 days" },
  { name: "Japan", flag: "🇯🇵", price: "9,500", processing: "7-10 days" },
  { name: "South Korea", flag: "🇰🇷", price: "10,000", processing: "10-15 days" },
  { name: "China", flag: "🇨🇳", price: "12,500", processing: "10-15 days" },
  { name: "Singapore", flag: "🇸🇬", price: "5,500", processing: "3-5 days" },
  { name: "Indonesia", flag: "🇮🇩", price: "4,500", processing: "3-5 days" },
  { name: "Turkey", flag: "🇹🇷", price: "8,000", processing: "10-15 days" },
  { name: "United Kingdom", flag: "🇬🇧", price: "18,000", processing: "15-21 days" },
  { name: "Canada", flag: "🇨🇦", price: "20,000", processing: "20-30 days" },
  { name: "USA", flag: "🇺🇸", price: "22,000", processing: "Interview based" },
  { name: "Germany", flag: "🇩🇪", price: "15,000", processing: "15-21 days" },
  { name: "Spain", flag: "🇪🇸", price: "14,000", processing: "15-21 days" },
  { name: "Netherlands", flag: "🇳🇱", price: "15,000", processing: "15-21 days" },
  { name: "Hong Kong", flag: "🇭🇰", price: "6,000", processing: "5-7 days" },
  { name: "Nepal", flag: "🇳🇵", price: "3,500", processing: "3-5 days" },
  { name: "Sri Lanka", flag: "🇱🇰", price: "4,000", processing: "3-5 days" },
  { name: "Maldives", flag: "🇲🇻", price: "0", processing: "On arrival" },
  { name: "UAE", flag: "🇦🇪", price: "8,000", processing: "5-7 days" },
  { name: "Saudi Arabia", flag: "🇸🇦", price: "12,000", processing: "7-10 days" },
  { name: "Australia", flag: "🇦🇺", price: "25,000", processing: "20-30 days" },
];

const steps = [
  { icon: Search, title: "Consultation", desc: "Free consultation to understand your travel needs and visa requirements" },
  { icon: FileText, title: "Documentation", desc: "We prepare your complete visa file with all required documents" },
  { icon: Send, title: "Submission", desc: "Application submitted to the embassy with follow-up tracking" },
  { icon: CheckCircle, title: "Approval", desc: "Visa approved and passport returned. You're ready to travel!" },
];

function VisaServicesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState("");

  return (
    <>
      <section className="relative py-20 bg-gradient-eco text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-heading">Visa Services</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Expert visa processing for 21+ countries with complete documentation support and high approval rates.</p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-card border-b border-border/50">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading title="How It Works" subtitle="Our simple 4-step visa process" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center relative">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-3 text-xl font-bold">{i + 1}</div>
                <h3 className="font-heading font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Visa Processing Countries" subtitle="Starting visa fees for popular destinations" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {visaCountries.map((c) => (
              <Card key={c.name} className="hover-lift border-border/50 group cursor-pointer" onClick={() => { setSelectedVisa(`${c.name} Visa`); setBookingOpen(true); }}>
                <CardContent className="p-5 flex items-center gap-4">
                  <span className="text-3xl">{c.flag}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">{c.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {c.processing}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">From</div>
                    <div className="font-bold text-primary font-heading">{c.price === "0" ? "Free" : `৳${c.price}`}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">* Prices are starting fees and may vary based on visa type and requirements. Contact us for exact pricing.</p>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} defaultPackage={selectedVisa} />
    </>
  );
}
