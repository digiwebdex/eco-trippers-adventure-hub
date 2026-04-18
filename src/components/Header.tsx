import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#visa", label: "Visa Services" },
  { href: "#packages", label: "Tour Packages" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
          <a href="#home" onClick={() => scrollTo("#home")} className="flex items-center gap-2">
            <img src="/logo.png" alt="Eco Trippers" className="h-10 md:h-12 w-auto" />
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-secondary hover:text-primary text-foreground/70"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+8801894071070" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-primary">
              <Phone className="h-4 w-4" />
              <span>+880 1894-071070</span>
            </a>
            <Button onClick={() => setBookingOpen(true)} className="bg-gradient-eco text-primary-foreground font-semibold shadow-eco hover:opacity-90 transition-opacity">
              Book Now
            </Button>
            <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t bg-background px-4 py-4 space-y-1 animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-foreground/70 hover:bg-muted"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}
