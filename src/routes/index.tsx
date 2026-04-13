import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SectionHeading } from "@/components/SectionHeading";
import { BookingModal } from "@/components/BookingModal";
import { FlightMap } from "@/components/FlightMap";
import {
  Plane, Hotel, FileCheck, Map, Star, Compass,
  Shield, Clock, HeadphonesIcon, Award,
  ChevronRight, Quote, ArrowRight
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eco Trippers — Travel More. Stress Less." },
      { name: "description", content: "Bangladesh's trusted travel partner. Visa processing, air tickets, hotel bookings, and customized tour packages for 21+ countries." },
      { property: "og:title", content: "Eco Trippers — Travel More. Stress Less." },
      { property: "og:description", content: "Your trusted travel partner from Bangladesh. Visa, flights, hotels & tours in one place." },
    ],
  }),
  component: Index,
});

const services = [
  { icon: FileCheck, title: "Visa Processing", desc: "Expert visa assistance for 21+ countries with complete documentation support.", color: "text-primary" },
  { icon: Plane, title: "Air Tickets", desc: "Best deals on domestic and international flights with trusted airlines.", color: "text-primary" },
  { icon: Hotel, title: "Hotel Booking", desc: "From budget stays to 5-star luxury hotels worldwide.", color: "text-primary" },
  { icon: Map, title: "Tour Packages", desc: "Customized group and individual tour packages tailored to your needs.", color: "text-primary" },
  { icon: Star, title: "Luxury Trips", desc: "Premium 5-star luxury travel experiences for the discerning traveler.", color: "text-eco-gold" },
  { icon: Compass, title: "Umrah Packages", desc: "Complete Umrah packages with guided support and premium accommodation.", color: "text-primary" },
];

const packages = [
  { name: "Japan & South Korea", flag: "🇯🇵🇰🇷", price: "209,900", duration: "7N/8D", image: "/dest-japan.jpg", highlights: ["Return air ticket", "3-star hotel", "Sightseeing", "Breakfast included"] },
  { name: "London, UK", flag: "🇬🇧", price: "220,000", duration: "6N/7D", image: "/dest-london.jpg", highlights: ["Hotel stay", "Airport transfer", "Sightseeing", "Visa assistance"] },
  { name: "Malaysia", flag: "🇲🇾", price: "45,000", duration: "4N/5D", image: "/dest-malaysia.jpg", highlights: ["Hotel + Breakfast", "City tour", "Airport transfer", "Sightseeing"] },
  { name: "Thailand", flag: "🇹🇭", price: "38,000", duration: "3N/4D", image: "/dest-thailand.jpg", highlights: ["Hotel stay", "Temple tours", "Shopping", "Airport transfer"] },
  { name: "Maldives", flag: "🇲🇻", price: "85,000", duration: "3N/4D", image: "/dest-maldives.jpg", highlights: ["Resort stay", "Speedboat transfer", "Water activities", "Full board"] },
  { name: "South Korea", flag: "🇰🇷", price: "150,000", duration: "5N/6D", image: "/dest-korea.jpg", highlights: ["Hotel stay", "K-culture tour", "Shopping", "Sightseeing"] },
];

const testimonials = [
  { name: "Rahman Ahmed", text: "Eco Trippers made our Japan trip absolutely seamless. From visa processing to hotel booking, everything was handled perfectly!", rating: 5 },
  { name: "Fatima Khan", text: "Best visa consultancy in Dhaka! Got my UK visa approved on the first attempt thanks to their expert guidance.", rating: 5 },
  { name: "Kamal Hossain", text: "Our family trip to Malaysia was unforgettable. Great packages at reasonable prices with excellent support.", rating: 5 },
];

const faqs = [
  { q: "How long does visa processing take?", a: "Processing times vary by country. Typically 5-15 working days for most Asian countries, and 15-30 days for European/North American visas. We provide estimated timelines during consultation." },
  { q: "What documents are needed for visa application?", a: "Required documents vary by destination. Generally you'll need a valid passport, passport-sized photos, bank statements, employment letter, and hotel bookings. We provide a complete checklist for each country." },
  { q: "Can I customize tour packages?", a: "Absolutely! All our packages can be customized based on your preferences, budget, and travel dates. Contact us to discuss your dream itinerary." },
  { q: "Do you offer travel insurance?", a: "Yes, we can arrange comprehensive travel insurance as part of your package. It covers medical emergencies, trip cancellation, lost baggage, and more." },
  { q: "What payment methods do you accept?", a: "We accept bank transfers, mobile banking (bKash, Nagad), and cash payments at our office. Installment options are available for premium packages." },
];

const galleryImages = ["/gallery-1.jpg", "/gallery-2.jpg", "/gallery-3.jpg", "/dest-japan.jpg", "/dest-london.jpg", "/dest-malaysia.jpg"];

const blogPosts = [
  { title: "Top 10 Visa-Free Countries for Bangladeshi Passport Holders", excerpt: "Discover amazing destinations you can visit without the hassle of visa processing...", image: "/dest-maldives.jpg", date: "March 15, 2026" },
  { title: "Complete Guide to Japan Tourist Visa from Bangladesh", excerpt: "Everything you need to know about applying for a Japan tourist visa...", image: "/dest-japan.jpg", date: "March 8, 2026" },
  { title: "Budget-Friendly Thailand Trip Planning", excerpt: "How to plan an amazing Thailand vacation without breaking the bank...", image: "/dest-thailand.jpg", date: "February 28, 2026" },
];

function Index() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState("");

  const openBooking = (pkg?: string) => {
    setSelectedPkg(pkg || "");
    setBookingOpen(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero-banner.jpg" alt="Travel paradise" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-eco-dark/80 via-eco-dark/50 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20">
          <div className="max-w-2xl" style={{ animation: "float-up 0.8s ease-out both" }}>
            <span className="inline-block bg-primary/20 text-primary-foreground border border-primary/30 px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              ✈️ Your Trusted Travel Partner Since 2019
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-primary-foreground leading-tight">
              Travel More.<br />
              <span className="text-gradient-eco">Stress Less.</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
              Visa, tours, flights and hotels in one place. Eco Trippers helps travelers with visa processing, air tickets, hotel bookings, and customized tour packages from Banani, Dhaka.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" onClick={() => openBooking()} className="bg-gradient-eco text-primary-foreground font-semibold shadow-eco text-base px-8 py-6 hover:opacity-90 transition-opacity">
                Book a Consultation
              </Button>
              <Link to="/packages">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 text-base px-8 py-6">
                  Explore Packages <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card border-y border-border/50">
        <div className="mx-auto max-w-5xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedCounter end={3500} suffix="+" label="Happy Customers" />
          <AnimatedCounter end={110} suffix="+" label="Tour Success" />
          <AnimatedCounter end={97.5} suffix="%" label="Positive Reviews" decimals={1} />
          <AnimatedCounter end={564} suffix="+" label="Visa Success" />
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Our Services" subtitle="End-to-end travel solutions for hassle-free journeys worldwide" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <Card key={svc.title} className="hover-lift border-border/50 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <svc.icon className={`h-6 w-6 ${svc.color} group-hover:text-primary-foreground transition-colors`} />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{svc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services">
              <Button variant="outline" className="gap-2">View All Services <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-eco-light">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Featured Packages" subtitle="Handpicked tour packages with the best value for your travel dreams" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.name} className="overflow-hidden hover-lift border-border/50 group">
                <div className="relative h-48 overflow-hidden">
                  <img src={pkg.image} alt={pkg.name} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-eco-dark/80 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {pkg.flag} {pkg.name}
                  </div>
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                    {pkg.duration}
                  </div>
                </div>
                <CardContent className="p-5">
                  <ul className="space-y-1.5 mb-4">
                    {pkg.highlights.map((h) => (
                      <li key={h} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground">Starting from</span>
                      <div className="text-xl font-bold font-heading text-primary">৳{pkg.price}</div>
                      <span className="text-xs text-muted-foreground">per person</span>
                    </div>
                    <Button size="sm" onClick={() => openBooking(pkg.name)} className="bg-gradient-eco text-primary-foreground font-semibold shadow-eco hover:opacity-90">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/packages">
              <Button variant="outline" className="gap-2">View All Packages <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Why Choose Eco Trippers?" subtitle="We make your travel planning smooth, reliable, and enjoyable" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Trusted & Reliable", desc: "Established in 2019 with 3500+ happy travelers" },
              { icon: Clock, title: "Fast Processing", desc: "Quick visa processing and instant ticket confirmations" },
              { icon: HeadphonesIcon, title: "24/7 Support", desc: "Round-the-clock assistance via phone and WhatsApp" },
              { icon: Award, title: "Best Prices", desc: "Competitive pricing with no hidden charges" },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-xl bg-card border border-border/50 hover-lift">
                <div className="w-14 h-14 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-eco-light">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Travel Gallery" subtitle="Moments captured from our travelers' journeys around the world" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className={`overflow-hidden rounded-xl ${i === 0 ? "md:row-span-2" : ""}`}>
                <img src={img} alt={`Travel gallery ${i + 1}`} loading="lazy" width={800} height={600} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/gallery"><Button variant="outline" className="gap-2">View Full Gallery <ArrowRight className="h-4 w-4" /></Button></Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="What Our Travelers Say" subtitle="Real stories from real travelers who trusted Eco Trippers" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="hover-lift border-border/50">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary/30 mb-3" />
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">{t.name[0]}</div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-eco-gold">{"★".repeat(t.rating)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 bg-eco-light">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Travel Blog" subtitle="Tips, guides, and inspiration for your next adventure" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.title} className="overflow-hidden hover-lift border-border/50 group">
                <div className="h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <CardContent className="p-5">
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <h3 className="font-heading font-semibold mt-1 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <Link to="/blog" className="inline-flex items-center text-sm text-primary font-medium mt-3 gap-1 hover:underline">
                    Read More <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading title="Frequently Asked Questions" subtitle="Quick answers to common travel and visa questions" />
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-5 bg-card">
                <AccordionTrigger className="text-left font-medium hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Flight Map */}
      <FlightMap />

      {/* CTA */}
      <section className="py-20 bg-gradient-eco text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Ready to Start Your Journey?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Let us handle the details while you enjoy the adventure. Book your consultation today and travel stress-free!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => openBooking()} className="bg-primary-foreground text-primary font-semibold text-base px-8 py-6 hover:bg-primary-foreground/90">
              Book a Consultation
            </Button>
            <a href="https://wa.me/8801886345126" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 text-base px-8 py-6">
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Find Us" subtitle="Visit our office in Banani, Dhaka" />
          <div className="rounded-xl overflow-hidden shadow-lg border border-border/50">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0!2d90.4!3d23.794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Eco Trippers Office Location"
            />
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} defaultPackage={selectedPkg} />
    </>
  );
}
