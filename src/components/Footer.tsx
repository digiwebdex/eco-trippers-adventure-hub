import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteData } from "@/hooks/useSiteData";

interface FooterData {
  tagline: string;
  copyright: string;
  tagline_right: string;
  services_list: string[];
  quick_links: { label: string; href: string }[];
}

const fallback: FooterData = {
  tagline: "Your trusted travel partner since 2019. We specialize in visa processing, air tickets, hotel bookings, and customized tour packages from Bangladesh.",
  copyright: "© Eco Trippers. All rights reserved.",
  tagline_right: "Designed with ❤️ for travelers worldwide",
  services_list: ["Visa Processing", "Air Ticket Booking", "Hotel Reservations", "Tour Packages", "5-Star Luxury Trips", "Umrah Packages"],
  quick_links: [
    { label: "Services", href: "#services" },
    { label: "Tour Packages", href: "#packages" },
    { label: "Visa Services", href: "#visa" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact Us", href: "#contact" },
  ],
};

const handleClick = (href: string) => {
  if (href.startsWith("#")) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = href;
  }
};

export function Footer() {
  const [data, setData] = useState<FooterData>(fallback);
  const { contact_info } = useSiteData();

  useEffect(() => {
    supabase.from("footer_content").select("content").eq("section_key", "main").maybeSingle()
      .then(({ data: row }) => { if (row?.content) setData({ ...fallback, ...(row.content as any) }); });
  }, []);

  const year = new Date().getFullYear();
  const copyright = data.copyright.replace("©", `© ${year}`);

  return (
    <footer className="bg-eco-dark text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src="/logo.png" alt="Eco Trippers" className="h-12 w-auto mb-4 brightness-200" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">{data.tagline}</p>
            <div className="flex gap-3 mt-5">
              {contact_info.facebook && <a href={contact_info.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary flex items-center justify-center transition-colors"><Facebook className="h-4 w-4" /></a>}
              {contact_info.instagram && <a href={contact_info.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary flex items-center justify-center transition-colors"><Instagram className="h-4 w-4" /></a>}
              {contact_info.youtube && <a href={contact_info.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary flex items-center justify-center transition-colors"><Youtube className="h-4 w-4" /></a>}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2.5">
              {data.quick_links.map((link, i) => (
                <button key={i} onClick={() => handleClick(link.href)} className="block text-sm text-primary-foreground/70 hover:text-primary transition-colors">
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm text-primary-foreground/70">
              {data.services_list.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3.5">
              <div className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>{contact_info.address}</span>
              </div>
              <a href={`tel:${contact_info.phone}`} className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary shrink-0" /><span>{contact_info.phone}</span>
              </a>
              <a href={`mailto:${contact_info.email}`} className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary shrink-0" /><span>{contact_info.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
          <p>{copyright}</p>
          <p>{data.tagline_right}</p>
        </div>
      </div>
    </footer>
  );
}
