import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";
import { supabase } from "@/integrations/supabase/client";

interface NavItem {
  id: string;
  label: string;
  url: string;
  open_in_new_tab: boolean;
}

const fallbackNav: NavItem[] = [
  { id: "1", label: "Services", url: "#services", open_in_new_tab: false },
  { id: "2", label: "Visa Services", url: "#visa", open_in_new_tab: false },
  { id: "3", label: "Tour Packages", url: "#packages", open_in_new_tab: false },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<NavItem[]>(fallbackNav);

  useEffect(() => {
    supabase.from("navigation_items").select("id,label,url,open_in_new_tab").eq("is_active", true).order("sort_order")
      .then(({ data }) => { if (data && data.length) setNavLinks(data); });
  }, []);

  const handleClick = (link: NavItem) => {
    setMobileOpen(false);
    if (link.url.startsWith("#")) {
      const el = document.querySelector(link.url);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      if (link.open_in_new_tab) window.open(link.url, "_blank");
      else window.location.href = link.url;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
          <a href="#home" onClick={(e) => { e.preventDefault(); document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" }); }} className="flex items-center gap-2">
            <img src="/logo.png" alt="Eco Trippers" className="h-10 md:h-12 w-auto" />
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleClick(link)}
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
                key={link.id}
                onClick={() => handleClick(link)}
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
