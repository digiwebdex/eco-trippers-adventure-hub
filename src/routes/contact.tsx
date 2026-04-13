import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Eco Trippers" },
      { name: "description", content: "Get in touch with Eco Trippers. Visit our office in Banani, Dhaka or contact us via phone, email, or WhatsApp." },
      { property: "og:title", content: "Contact Us — Eco Trippers" },
      { property: "og:description", content: "Reach out for visa assistance, tour bookings, and travel consultations." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Contact Inquiry - Eco Trippers*%0A%0A` +
      `*Name:* ${encodeURIComponent(form.name.trim())}%0A` +
      `*Email:* ${encodeURIComponent(form.email.trim())}%0A` +
      `*Phone:* ${encodeURIComponent(form.phone.trim())}%0A` +
      `*Subject:* ${encodeURIComponent(form.subject.trim())}%0A` +
      `*Message:* ${encodeURIComponent(form.message.trim())}`;
    window.open(`https://wa.me/8801886345126?text=${text}`, "_blank");
  };

  return (
    <>
      <section className="relative py-20 bg-gradient-eco text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-heading">Contact Us</h1>
          <p className="mt-4 text-lg text-primary-foreground/80">We'd love to hear from you. Reach out for any travel inquiry.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <SectionHeading title="Send Us a Message" centered={false} />
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+880 1XXX-XXXXXX" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" maxLength={200} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="e.g. Visa inquiry" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea id="message" required maxLength={1000} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your inquiry..." />
                    </div>
                    <Button type="submit" className="bg-gradient-eco text-primary-foreground font-semibold gap-2 shadow-eco hover:opacity-90">
                      <Send className="h-4 w-4" /> Send via WhatsApp
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <SectionHeading title="Get in Touch" centered={false} />
              {[
                { icon: MapPin, title: "Office Address", text: "Suite #4-D, House #120, Road #1, Block #F, Banani, Dhaka-1213, Bangladesh" },
                { icon: Phone, title: "Phone", text: "+880 1894-071070", href: "tel:+8801894071070" },
                { icon: Mail, title: "Email", text: "ecotrippersbd@gmail.com", href: "mailto:ecotrippersbd@gmail.com" },
                { icon: Clock, title: "Office Hours", text: "Sat - Thu: 10:00 AM - 7:00 PM" },
              ].map((item) => (
                <Card key={item.title} className="border-border/50">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{item.text}</a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{item.text}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              <a href="https://wa.me/8801886345126" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-[oklch(0.62_0.19_145)] hover:bg-[oklch(0.55_0.2_145)] text-primary-foreground gap-2 font-semibold">
                  <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-xl overflow-hidden shadow-lg border border-border/50">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0!2d90.4!3d23.794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Eco Trippers Office"
            />
          </div>
        </div>
      </section>
    </>
  );
}
