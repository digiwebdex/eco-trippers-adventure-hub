import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";
import { CheckCircle, XCircle, Calendar, Users } from "lucide-react";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Tour Packages — Eco Trippers" },
      { name: "description", content: "Explore our handpicked tour packages to Japan, South Korea, London, Malaysia, Thailand, Maldives, and more." },
      { property: "og:title", content: "Tour Packages — Eco Trippers" },
      { property: "og:description", content: "Affordable tour packages from Bangladesh to the world's best destinations." },
    ],
  }),
  component: PackagesPage,
});

const allPackages = [
  {
    name: "Japan & South Korea Group Tour", flag: "🇯🇵🇰🇷", price: "209,900", duration: "7N/8D", image: "/dest-japan.jpg", type: "Featured",
    departure: "1 June 2026", deadline: "20 May 2026", groupSize: "10-15 persons",
    includes: ["Return air ticket", "3-star hotel", "Airport pick & drop", "Sightseeing", "Breakfast"],
    excludes: ["Visa fee", "Lunch/dinner", "Personal expenses", "Travel insurance"],
  },
  {
    name: "London, United Kingdom", flag: "🇬🇧", price: "220,000", duration: "6N/7D", image: "/dest-london.jpg", type: "Featured",
    departure: "Flexible", deadline: "2 weeks before", groupSize: "Individual/Group",
    includes: ["Hotel stay", "Airport transfer", "City sightseeing", "Visa assistance", "Breakfast"],
    excludes: ["Visa fee", "Lunch/dinner", "Personal expenses", "Attraction entry fees"],
  },
  {
    name: "Explore Malaysia", flag: "🇲🇾", price: "45,000", duration: "4N/5D", image: "/dest-malaysia.jpg", type: "Popular",
    departure: "Weekly", deadline: "1 week before", groupSize: "2+ persons",
    includes: ["Hotel + Breakfast", "KL city tour", "Genting Highlands", "Airport transfer"],
    excludes: ["Visa fee", "Lunch/dinner", "Personal expenses"],
  },
  {
    name: "Amazing Thailand", flag: "🇹🇭", price: "38,000", duration: "3N/4D", image: "/dest-thailand.jpg", type: "Popular",
    departure: "Daily", deadline: "5 days before", groupSize: "2+ persons",
    includes: ["Hotel stay", "Bangkok temple tour", "Pattaya day trip", "Airport transfer"],
    excludes: ["Visa fee", "Meals", "Shopping"],
  },
  {
    name: "Maldives Paradise", flag: "🇲🇻", price: "85,000", duration: "3N/4D", image: "/dest-maldives.jpg", type: "Luxury",
    departure: "Daily", deadline: "1 week before", groupSize: "2+ persons",
    includes: ["Resort stay", "Speedboat transfer", "Water activities", "Full board meals"],
    excludes: ["International flights", "Spa treatments", "Excursions"],
  },
  {
    name: "Seoul, South Korea", flag: "🇰🇷", price: "150,000", duration: "5N/6D", image: "/dest-korea.jpg", type: "Popular",
    departure: "Bi-weekly", deadline: "2 weeks before", groupSize: "4+ persons",
    includes: ["Hotel stay", "K-culture tour", "Gyeongbokgung Palace", "Shopping tour", "Breakfast"],
    excludes: ["Visa fee", "Lunch/dinner", "Personal expenses"],
  },
  {
    name: "Umrah Package", flag: "🕋", price: "180,000", duration: "10N/11D", image: "/dest-umrah.jpg", type: "Special",
    departure: "Monthly", deadline: "3 weeks before", groupSize: "Group",
    includes: ["Hotel near Haram", "Visa processing", "Guided Ziyarah", "Meals", "Air ticket"],
    excludes: ["Personal expenses", "Shopping", "Extra stays"],
  },
];

function PackagesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState("");

  return (
    <>
      <section className="relative py-20 bg-gradient-eco text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-heading">Tour Packages</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Handpicked tour packages with the best value for your travel dreams.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 space-y-8">
          {allPackages.map((pkg) => (
            <Card key={pkg.name} className="overflow-hidden hover-lift border-border/50">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="relative h-64 lg:h-auto">
                  <img src={pkg.image} alt={pkg.name} loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">{pkg.type}</div>
                </div>
                <CardContent className="p-6 lg:col-span-2">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-xl font-bold font-heading">{pkg.flag} {pkg.name}</h2>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{pkg.duration}</span>
                        <span className="flex items-center gap-1"><Users className="h-4 w-4" />{pkg.groupSize}</span>
                        <span>Departure: {pkg.departure}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">Starting from</span>
                      <div className="text-2xl font-bold text-primary font-heading">৳{pkg.price}</div>
                      <span className="text-xs text-muted-foreground">per person</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-primary">Includes</h4>
                      <ul className="space-y-1">
                        {pkg.includes.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm"><CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-destructive">Excludes</h4>
                      <ul className="space-y-1">
                        {pkg.excludes.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground"><XCircle className="h-3.5 w-3.5 text-destructive/50 shrink-0" />{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {pkg.deadline && <p className="text-xs text-muted-foreground mb-4">Booking deadline: {pkg.deadline}</p>}
                  <Button onClick={() => { setSelectedPkg(pkg.name); setBookingOpen(true); }} className="bg-gradient-eco text-primary-foreground font-semibold shadow-eco hover:opacity-90">
                    Book This Package
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} defaultPackage={selectedPkg} />
    </>
  );
}
