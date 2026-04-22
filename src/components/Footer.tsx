import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export function Footer() {
  return (
    <footer className="bg-eco-dark text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src="/logo.png" alt="Eco Trippers" className="h-12 w-auto mb-4 brightness-200" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Your trusted travel partner since 2019. We specialize in visa processing, air tickets, hotel bookings, and customized tour packages from Bangladesh.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://facebook.com/ecotrippers" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary flex items-center justify-center transition-colors"><Facebook className="h-4 w-4" /></a>
              <a href="https://instagram.com/ecotrippers" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary flex items-center justify-center transition-colors"><Instagram className="h-4 w-4" /></a>
              <a href="https://youtube.com/@ecotrippers" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary flex items-center justify-center transition-colors"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2.5">
              {[
                { href: "#about", label: "About Us" },
                { href: "#services", label: "Our Services" },
                { href: "#packages", label: "Tour Packages" },
                { href: "#visa", label: "Visa Services" },
                { href: "#gallery", label: "Gallery" },
                { href: "#blog", label: "Travel Blog" },
                { href: "#contact", label: "Contact Us" },
              ].map((link) => (
                <button key={link.href} onClick={() => scrollTo(link.href)} className="block text-sm text-primary-foreground/70 hover:text-primary transition-colors">
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm text-primary-foreground/70">
              <li>Visa Processing</li>
              <li>Air Ticket Booking</li>
              <li>Hotel Reservations</li>
              <li>Tour Packages</li>
              <li>5-Star Luxury Trips</li>
              <li>Umrah Packages</li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3.5">
              <div className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>Suite #4-D, House #120, Road #1, Block #F, Banani, Dhaka-1213, Bangladesh</span>
              </div>
              <a href="tel:+8801894071070" className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary shrink-0" /><span>+880 1894-071070</span>
              </a>
              <a href="mailto:ecotrippersbd@gmail.com" className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary shrink-0" /><span>ecotrippersbd@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} Eco Trippers. All rights reserved.</p>
          <p>
            Design &amp; Development by{" "}
            <a
              href="https://digiwebdex.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              DigiWebDex
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
