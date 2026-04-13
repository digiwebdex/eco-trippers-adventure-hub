import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Hotel, FileCheck, Map, Star, Compass, ArrowRight, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — Eco Trippers" },
      { name: "description", content: "Comprehensive travel services including visa processing, air tickets, hotel bookings, tour packages, luxury trips, and Umrah packages." },
      { property: "og:title", content: "Our Services — Eco Trippers" },
      { property: "og:description", content: "End-to-end travel solutions from Bangladesh. Visa, flights, hotels, tours and more." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: FileCheck, title: "Visa Processing", image: "/dest-london.jpg",
    desc: "Expert visa processing for 21+ countries. We handle complete documentation, application submission, and follow-up to ensure the highest approval rates.",
    features: ["Tourist, Business & Student visas", "Complete file preparation", "Embassy appointment booking", "Document verification & guidance", "Fast-track processing available"],
  },
  {
    icon: Plane, title: "Air Ticket Booking", image: "/dest-japan.jpg",
    desc: "Best deals on domestic and international flights with all major airlines. We find the most convenient routes at competitive prices.",
    features: ["All major airlines", "Best fare guarantee", "Group booking discounts", "Flexible date search", "24/7 booking support"],
  },
  {
    icon: Hotel, title: "Hotel Reservations", image: "/dest-maldives.jpg",
    desc: "From budget accommodations to 5-star luxury resorts, we book the perfect stay for every traveler and every budget.",
    features: ["Budget to luxury options", "Best rate guarantee", "Free cancellation options", "Verified reviews", "Special honeymoon packages"],
  },
  {
    icon: Map, title: "Tour Packages", image: "/dest-thailand.jpg",
    desc: "Customized group and individual tour packages tailored to your preferences, budget, and travel style.",
    features: ["Group & individual tours", "Customizable itineraries", "Local guide included", "All-inclusive options", "Family-friendly packages"],
  },
  {
    icon: Star, title: "5-Star Luxury Trips", image: "/dest-malaysia.jpg",
    desc: "Premium travel experiences featuring the finest hotels, exclusive transfers, and curated luxury itineraries.",
    features: ["Premium accommodations", "Private transfers", "VIP experiences", "Personal concierge", "Fine dining included"],
  },
  {
    icon: Compass, title: "Umrah Packages", image: "/dest-umrah.jpg",
    desc: "Complete Umrah packages with guided support, premium accommodation near Haram, and hassle-free visa processing.",
    features: ["Hotel near Haram", "Visa processing included", "Guided Ziyarah", "Group & family packages", "Year-round availability"],
  },
];

function ServicesPage() {
  return (
    <>
      <section className="relative py-20 bg-gradient-eco text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-heading">Our Services</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Comprehensive travel solutions designed to make your journey seamless from start to finish.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 space-y-16">
          {services.map((svc, i) => (
            <div key={svc.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                    <svc.icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold font-heading">{svc.title}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-5">{svc.desc}</p>
                <ul className="space-y-2.5 mb-6">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <Button className="bg-gradient-eco text-primary-foreground gap-2 shadow-eco hover:opacity-90">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <img src={svc.image} alt={svc.title} loading="lazy" width={800} height={600} className="rounded-xl w-full h-80 object-cover shadow-lg" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
