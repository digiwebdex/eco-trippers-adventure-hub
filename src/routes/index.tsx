import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SectionHeading } from "@/components/SectionHeading";
import { BookingModal } from "@/components/BookingModal";
import { FlightMap } from "@/components/FlightMap";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Plane, Hotel, FileCheck, Map, Star, Compass,
  Shield, Clock, HeadphonesIcon, Award,
  ChevronRight, Quote, ArrowRight, CheckCircle,
  XCircle, Calendar, Users, Send, MessageCircle,
  MapPin, Phone, Mail, Target, Eye, Heart, Globe,
  Search, FileText, User
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

/* ── Data ── */

const serviceCards = [
  { icon: FileCheck, title: "Visa Processing", desc: "Expert visa assistance for 21+ countries with complete documentation support.", color: "text-primary" },
  { icon: Plane, title: "Air Tickets", desc: "Best deals on domestic and international flights with trusted airlines.", color: "text-primary" },
  { icon: Hotel, title: "Hotel Booking", desc: "From budget stays to 5-star luxury hotels worldwide.", color: "text-primary" },
  { icon: Map, title: "Tour Packages", desc: "Customized group and individual tour packages tailored to your needs.", color: "text-primary" },
  { icon: Star, title: "Luxury Trips", desc: "Premium 5-star luxury travel experiences for the discerning traveler.", color: "text-eco-gold" },
  { icon: Compass, title: "Umrah Packages", desc: "Complete Umrah packages with guided support and premium accommodation.", color: "text-primary" },
];

const serviceDetails = [
  { icon: FileCheck, title: "Visa Processing", image: "/dest-london.jpg", desc: "Expert visa processing for 21+ countries. We handle complete documentation, application submission, and follow-up to ensure the highest approval rates.", features: ["Tourist, Business & Student visas", "Complete file preparation", "Embassy appointment booking", "Document verification & guidance", "Fast-track processing available"] },
  { icon: Plane, title: "Air Ticket Booking", image: "/dest-japan.jpg", desc: "Best deals on domestic and international flights with all major airlines. We find the most convenient routes at competitive prices.", features: ["All major airlines", "Best fare guarantee", "Group booking discounts", "Flexible date search", "24/7 booking support"] },
  { icon: Hotel, title: "Hotel Reservations", image: "/dest-maldives.jpg", desc: "From budget accommodations to 5-star luxury resorts, we book the perfect stay for every traveler and every budget.", features: ["Budget to luxury options", "Best rate guarantee", "Free cancellation options", "Verified reviews", "Special honeymoon packages"] },
  { icon: Map, title: "Tour Packages", image: "/dest-thailand.jpg", desc: "Customized group and individual tour packages tailored to your preferences, budget, and travel style.", features: ["Group & individual tours", "Customizable itineraries", "Local guide included", "All-inclusive options", "Family-friendly packages"] },
  { icon: Star, title: "5-Star Luxury Trips", image: "/dest-malaysia.jpg", desc: "Premium travel experiences featuring the finest hotels, exclusive transfers, and curated luxury itineraries.", features: ["Premium accommodations", "Private transfers", "VIP experiences", "Personal concierge", "Fine dining included"] },
  { icon: Compass, title: "Umrah Packages", image: "/dest-umrah.jpg", desc: "Complete Umrah packages with guided support, premium accommodation near Haram, and hassle-free visa processing.", features: ["Hotel near Haram", "Visa processing included", "Guided Ziyarah", "Group & family packages", "Year-round availability"] },
];

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

const visaSteps = [
  { icon: Search, title: "Consultation", desc: "Free consultation to understand your travel needs and visa requirements" },
  { icon: FileText, title: "Documentation", desc: "We prepare your complete visa file with all required documents" },
  { icon: Send, title: "Submission", desc: "Application submitted to the embassy with follow-up tracking" },
  { icon: CheckCircle, title: "Approval", desc: "Visa approved and passport returned. You're ready to travel!" },
];

const allPackages = [
  { name: "Japan & South Korea Group Tour", flag: "🇯🇵🇰🇷", price: "209,900", duration: "7N/8D", image: "/dest-japan.jpg", type: "Featured", departure: "1 June 2026", deadline: "20 May 2026", groupSize: "10-15 persons", includes: ["Return air ticket", "3-star hotel", "Airport pick & drop", "Sightseeing", "Breakfast"], excludes: ["Visa fee", "Lunch/dinner", "Personal expenses", "Travel insurance"] },
  { name: "London, United Kingdom", flag: "🇬🇧", price: "220,000", duration: "6N/7D", image: "/dest-london.jpg", type: "Featured", departure: "Flexible", deadline: "2 weeks before", groupSize: "Individual/Group", includes: ["Hotel stay", "Airport transfer", "City sightseeing", "Visa assistance", "Breakfast"], excludes: ["Visa fee", "Lunch/dinner", "Personal expenses", "Attraction entry fees"] },
  { name: "Explore Malaysia", flag: "🇲🇾", price: "45,000", duration: "4N/5D", image: "/dest-malaysia.jpg", type: "Popular", departure: "Weekly", deadline: "1 week before", groupSize: "2+ persons", includes: ["Hotel + Breakfast", "KL city tour", "Genting Highlands", "Airport transfer"], excludes: ["Visa fee", "Lunch/dinner", "Personal expenses"] },
  { name: "Amazing Thailand", flag: "🇹🇭", price: "38,000", duration: "3N/4D", image: "/dest-thailand.jpg", type: "Popular", departure: "Daily", deadline: "5 days before", groupSize: "2+ persons", includes: ["Hotel stay", "Bangkok temple tour", "Pattaya day trip", "Airport transfer"], excludes: ["Visa fee", "Meals", "Shopping"] },
  { name: "Maldives Paradise", flag: "🇲🇻", price: "85,000", duration: "3N/4D", image: "/dest-maldives.jpg", type: "Luxury", departure: "Daily", deadline: "1 week before", groupSize: "2+ persons", includes: ["Resort stay", "Speedboat transfer", "Water activities", "Full board meals"], excludes: ["International flights", "Spa treatments", "Excursions"] },
  { name: "Seoul, South Korea", flag: "🇰🇷", price: "150,000", duration: "5N/6D", image: "/dest-korea.jpg", type: "Popular", departure: "Bi-weekly", deadline: "2 weeks before", groupSize: "4+ persons", includes: ["Hotel stay", "K-culture tour", "Gyeongbokgung Palace", "Shopping tour", "Breakfast"], excludes: ["Visa fee", "Lunch/dinner", "Personal expenses"] },
  { name: "Umrah Package", flag: "🕋", price: "180,000", duration: "10N/11D", image: "/dest-umrah.jpg", type: "Special", departure: "Monthly", deadline: "3 weeks before", groupSize: "Group", includes: ["Hotel near Haram", "Visa processing", "Guided Ziyarah", "Meals", "Air ticket"], excludes: ["Personal expenses", "Shopping", "Extra stays"] },
];

const galleryImages = [
  { src: "/gallery-1.jpg", alt: "Travel success story", category: "Success" },
  { src: "/gallery-2.jpg", alt: "Happy travelers", category: "Travelers" },
  { src: "/gallery-3.jpg", alt: "Visa success", category: "Visa" },
  { src: "/dest-japan.jpg", alt: "Japan destination", category: "Destinations" },
  { src: "/dest-london.jpg", alt: "London destination", category: "Destinations" },
  { src: "/dest-malaysia.jpg", alt: "Malaysia destination", category: "Destinations" },
  { src: "/dest-thailand.jpg", alt: "Thailand destination", category: "Destinations" },
  { src: "/dest-maldives.jpg", alt: "Maldives destination", category: "Destinations" },
  { src: "/dest-korea.jpg", alt: "South Korea destination", category: "Destinations" },
  { src: "/dest-umrah.jpg", alt: "Umrah pilgrimage", category: "Umrah" },
  { src: "/hero-banner.jpg", alt: "Paradise island", category: "Destinations" },
];

const galleryCategories = ["All", ...Array.from(new Set(galleryImages.map(i => i.category)))];

const testimonials = [
  { name: "Rahman Ahmed", text: "Eco Trippers made our Japan trip absolutely seamless. From visa processing to hotel booking, everything was handled perfectly!", rating: 5 },
  { name: "Fatima Khan", text: "Best visa consultancy in Dhaka! Got my UK visa approved on the first attempt thanks to their expert guidance.", rating: 5 },
  { name: "Kamal Hossain", text: "Our family trip to Malaysia was unforgettable. Great packages at reasonable prices with excellent support.", rating: 5 },
];

const blogPosts = [
  { title: "Top 10 Visa-Free Countries for Bangladeshi Passport Holders", excerpt: "Discover amazing destinations you can visit without the hassle of visa processing. From the Maldives to Nepal, these countries welcome Bangladeshi travelers with open arms.", image: "/dest-maldives.jpg", date: "March 15, 2026", author: "Eco Trippers", category: "Visa Guide" },
  { title: "Complete Guide to Japan Tourist Visa from Bangladesh", excerpt: "Everything you need to know about applying for a Japan tourist visa, including required documents, processing time, fees, and tips for a successful application.", image: "/dest-japan.jpg", date: "March 8, 2026", author: "Eco Trippers", category: "Visa Guide" },
  { title: "Budget-Friendly Thailand Trip Planning", excerpt: "How to plan an amazing Thailand vacation without breaking the bank. From affordable hotels to street food and free attractions, here's your complete budget guide.", image: "/dest-thailand.jpg", date: "February 28, 2026", author: "Eco Trippers", category: "Travel Tips" },
  { title: "Malaysia: The Perfect First International Trip", excerpt: "Why Malaysia should be your first international destination. Easy visa process, affordable prices, diverse culture, and stunning natural beauty.", image: "/dest-malaysia.jpg", date: "February 20, 2026", author: "Eco Trippers", category: "Destination" },
  { title: "5 Things to Know Before Your First Umrah", excerpt: "Essential tips for first-time Umrah pilgrims. From packing essentials to rituals, here's everything you need to prepare for a meaningful spiritual journey.", image: "/dest-umrah.jpg", date: "February 12, 2026", author: "Eco Trippers", category: "Umrah" },
  { title: "London on a Budget: A Bangladeshi Traveler's Guide", excerpt: "Explore London without spending a fortune. Free museums, affordable transport, and budget-friendly dining options for the smart Bangladeshi traveler.", image: "/dest-london.jpg", date: "February 5, 2026", author: "Eco Trippers", category: "Travel Tips" },
];

const faqs = [
  { q: "How long does visa processing take?", a: "Processing times vary by country. Typically 5-15 working days for most Asian countries, and 15-30 days for European/North American visas. We provide estimated timelines during consultation." },
  { q: "What documents are needed for visa application?", a: "Required documents vary by destination. Generally you'll need a valid passport, passport-sized photos, bank statements, employment letter, and hotel bookings. We provide a complete checklist for each country." },
  { q: "Can I customize tour packages?", a: "Absolutely! All our packages can be customized based on your preferences, budget, and travel dates. Contact us to discuss your dream itinerary." },
  { q: "Do you offer travel insurance?", a: "Yes, we can arrange comprehensive travel insurance as part of your package. It covers medical emergencies, trip cancellation, lost baggage, and more." },
  { q: "What payment methods do you accept?", a: "We accept bank transfers, mobile banking (bKash, Nagad), and cash payments at our office. Installment options are available for premium packages." },
];

/* ── Component ── */

function Index() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState("");
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const openBooking = (pkg?: string) => { setSelectedPkg(pkg || ""); setBookingOpen(true); };

  const filteredGallery = galleryFilter === "All" ? galleryImages : galleryImages.filter(i => i.category === galleryFilter);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Contact Inquiry - Eco Trippers*%0A%0A*Name:* ${encodeURIComponent(contactForm.name.trim())}%0A*Email:* ${encodeURIComponent(contactForm.email.trim())}%0A*Phone:* ${encodeURIComponent(contactForm.phone.trim())}%0A*Subject:* ${encodeURIComponent(contactForm.subject.trim())}%0A*Message:* ${encodeURIComponent(contactForm.message.trim())}`;
    window.open(`https://wa.me/8801886345126?text=${text}`, "_blank");
  };

  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
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
              Travel More.<br /><span className="text-gradient-eco">Stress Less.</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
              Visa, tours, flights and hotels in one place. Eco Trippers helps travelers with visa processing, air tickets, hotel bookings, and customized tour packages from Banani, Dhaka.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" onClick={() => openBooking()} className="bg-gradient-eco text-primary-foreground font-semibold shadow-eco text-base px-8 py-6 hover:opacity-90 transition-opacity">
                Book a Consultation
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.querySelector("#packages")?.scrollIntoView({ behavior: "smooth" })} className="border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 text-base px-8 py-6">
                Explore Packages <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="py-16 bg-card border-y border-border/50">
        <div className="mx-auto max-w-5xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedCounter end={3500} suffix="+" label="Happy Customers" />
          <AnimatedCounter end={110} suffix="+" label="Tour Success" />
          <AnimatedCounter end={97.5} suffix="%" label="Positive Reviews" decimals={1} />
          <AnimatedCounter end={564} suffix="+" label="Visa Success" />
        </div>
      </section>

      {/* ═══════ ABOUT ═══════ */}
      <section id="about" className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading title="About Eco Trippers" centered={false} />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2019 by <strong>Monabbir Ahammed Khan</strong> and <strong>Bidarul Islam</strong>, Eco Trippers started with a simple mission: to make international travel accessible and stress-free for Bangladeshi travelers.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                What began as a small visa consultancy in Banani has grown into a full-service travel agency, helping thousands of travelers explore the world with confidence. We specialize in visa processing for 21+ countries, air ticketing, hotel bookings, and customized tour packages.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, with over 3,500 happy customers and a 97.5% positive review rate, we continue to be Dhaka's most trusted travel partner for leisure, business, group, and special-purpose travel.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="/gallery-1.jpg" alt="Eco Trippers team" loading="lazy" width={400} height={300} className="rounded-xl object-cover w-full h-48" />
              <img src="/gallery-2.jpg" alt="Travel success" loading="lazy" width={400} height={300} className="rounded-xl object-cover w-full h-48 mt-8" />
              <img src="/gallery-3.jpg" alt="Happy travelers" loading="lazy" width={400} height={300} className="rounded-xl object-cover w-full h-48" />
              <img src="/dest-japan.jpg" alt="Destination" loading="lazy" width={400} height={300} className="rounded-xl object-cover w-full h-48 mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-eco-light">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover-lift border-border/50">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4"><Target className="h-7 w-7" /></div>
                <h3 className="font-heading text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">To provide reliable, stress-free travel solutions that empower every Bangladeshi traveler to explore the world confidently.</p>
              </CardContent>
            </Card>
            <Card className="hover-lift border-border/50">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-full bg-eco-gold text-eco-gold-foreground flex items-center justify-center mb-4"><Eye className="h-7 w-7" /></div>
                <h3 className="font-heading text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">To become Bangladesh's leading travel and visa consultancy, known for exceptional service, transparency, and commitment.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Meet Our Founders" subtitle="The passionate leaders behind Eco Trippers" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              { name: "Monabbir Ahammed Khan", role: "Co-Founder & CEO", desc: "With a deep passion for travel and years of experience in the tourism industry, Monabbir leads Eco Trippers' vision of making travel accessible to all." },
              { name: "Bidarul Islam", role: "Co-Founder & COO", desc: "Bidarul brings operational excellence and customer-first thinking to ensure every traveler receives world-class service and support." },
            ].map((m) => (
              <Card key={m.name} className="hover-lift border-border/50 text-center">
                <CardContent className="p-8">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold font-heading mb-4">{m.name.split(" ").map(n => n[0]).join("")}</div>
                  <h3 className="font-heading text-lg font-bold">{m.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{m.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section id="services" className="py-20 bg-eco-light">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Our Services" subtitle="Comprehensive travel solutions designed to make your journey seamless" />
          <div className="space-y-16">
            {serviceDetails.map((svc, i) => (
              <div key={svc.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"><svc.icon className="h-5 w-5" /></div>
                    <h3 className="text-2xl font-bold font-heading">{svc.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-5">{svc.desc}</p>
                  <ul className="space-y-2.5 mb-6">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm"><CheckCircle className="h-4 w-4 text-primary shrink-0" /><span>{f}</span></li>
                    ))}
                  </ul>
                  <Button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })} className="bg-gradient-eco text-primary-foreground gap-2 shadow-eco hover:opacity-90">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <img src={svc.image} alt={svc.title} loading="lazy" width={800} height={600} className="rounded-xl w-full h-80 object-cover shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ VISA SERVICES ═══════ */}
      <section id="visa" className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Visa Services" subtitle="Expert visa processing for 21+ countries with high approval rates" />

          {/* Visa Process Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {visaSteps.map((step, i) => (
              <div key={step.title} className="text-center relative">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-3 text-xl font-bold">{i + 1}</div>
                <h3 className="font-heading font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Visa Countries Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {visaCountries.map((c) => (
              <Card key={c.name} className="hover-lift border-border/50 group cursor-pointer" onClick={() => { openBooking(`${c.name} Visa`); }}>
                <CardContent className="p-5 flex items-center gap-4">
                  <span className="text-3xl">{c.flag}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">{c.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {c.processing}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">From</div>
                    <div className="font-bold text-primary font-heading">{c.price === "0" ? "Free" : `৳${c.price}`}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">* Prices are starting fees and may vary. Contact us for exact pricing.</p>
        </div>
      </section>

      {/* ═══════ PACKAGES ═══════ */}
      <section id="packages" className="py-20 bg-eco-light">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Tour Packages" subtitle="Handpicked tour packages with the best value for your travel dreams" />
          <div className="space-y-8">
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
                        <h3 className="text-xl font-bold font-heading">{pkg.flag} {pkg.name}</h3>
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
                        <ul className="space-y-1">{pkg.includes.map((item) => (<li key={item} className="flex items-center gap-2 text-sm"><CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />{item}</li>))}</ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-destructive">Excludes</h4>
                        <ul className="space-y-1">{pkg.excludes.map((item) => (<li key={item} className="flex items-center gap-2 text-sm text-muted-foreground"><XCircle className="h-3.5 w-3.5 text-destructive/50 shrink-0" />{item}</li>))}</ul>
                      </div>
                    </div>
                    {pkg.deadline && <p className="text-xs text-muted-foreground mb-4">Booking deadline: {pkg.deadline}</p>}
                    <Button onClick={() => openBooking(pkg.name)} className="bg-gradient-eco text-primary-foreground font-semibold shadow-eco hover:opacity-90">Book This Package</Button>
                  </CardContent>
                </div>
              </Card>
            ))}
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
                <div className="w-14 h-14 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4"><item.icon className="h-7 w-7 text-primary" /></div>
                <h3 className="font-heading font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ GALLERY ═══════ */}
      <section id="gallery" className="py-20 bg-eco-light">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Travel Gallery" subtitle="Moments captured from our travelers' journeys around the world" />
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {galleryCategories.map((cat) => (
              <button key={cat} onClick={() => setGalleryFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${galleryFilter === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"}`}>{cat}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map((img, i) => (
              <div key={i} className={`overflow-hidden rounded-xl cursor-pointer group ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`} onClick={() => setSelectedImage(img.src)}>
                <img src={img.src} alt={img.alt} loading="lazy" width={800} height={600} className="w-full h-full min-h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
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
                    <div><div className="font-semibold text-sm">{t.name}</div><div className="text-xs text-eco-gold">{"★".repeat(t.rating)}</div></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ BLOG ═══════ */}
      <section id="blog" className="py-20 bg-eco-light">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Travel Blog" subtitle="Tips, guides, and inspiration for your next adventure" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.title} className="overflow-hidden hover-lift border-border/50 group">
                <div className="relative h-52 overflow-hidden">
                  <img src={post.image} alt={post.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">{post.category}</span>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                    <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
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

      {/* ═══════ FLIGHT MAP ═══════ */}
      <FlightMap />

      {/* ═══════ CTA ═══════ */}
      <section className="py-20 bg-gradient-eco text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Ready to Start Your Journey?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">Let us handle the details while you enjoy the adventure. Book your consultation today and travel stress-free!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => openBooking()} className="bg-primary-foreground text-primary font-semibold text-base px-8 py-6 hover:bg-primary-foreground/90">Book a Consultation</Button>
            <a href="https://wa.me/8801886345126" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 text-base px-8 py-6">Chat on WhatsApp</Button>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <SectionHeading title="Contact Us" subtitle="We'd love to hear from you" centered={false} />
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5"><Label htmlFor="c-name">Full Name *</Label><Input id="c-name" required maxLength={100} value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} placeholder="Your full name" /></div>
                      <div className="space-y-1.5"><Label htmlFor="c-email">Email *</Label><Input id="c-email" type="email" required maxLength={255} value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} placeholder="your@email.com" /></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5"><Label htmlFor="c-phone">Phone</Label><Input id="c-phone" type="tel" maxLength={20} value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} placeholder="+880 1XXX-XXXXXX" /></div>
                      <div className="space-y-1.5"><Label htmlFor="c-subject">Subject</Label><Input id="c-subject" maxLength={200} value={contactForm.subject} onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })} placeholder="e.g. Visa inquiry" /></div>
                    </div>
                    <div className="space-y-1.5"><Label htmlFor="c-message">Message *</Label><Textarea id="c-message" required maxLength={1000} rows={5} value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} placeholder="Tell us about your inquiry..." /></div>
                    <Button type="submit" className="bg-gradient-eco text-primary-foreground font-semibold gap-2 shadow-eco hover:opacity-90"><Send className="h-4 w-4" /> Send via WhatsApp</Button>
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
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0"><item.icon className="h-5 w-5 text-primary" /></div>
                    <div>
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      {item.href ? <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{item.text}</a> : <p className="text-sm text-muted-foreground">{item.text}</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
              <a href="https://wa.me/8801886345126" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-[oklch(0.62_0.19_145)] hover:bg-[oklch(0.55_0.2_145)] text-primary-foreground gap-2 font-semibold"><MessageCircle className="h-5 w-5" /> Chat on WhatsApp</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="pb-16 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-xl overflow-hidden shadow-lg border border-border/50">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0!2d90.4!3d23.794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1" width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Eco Trippers Office" />
          </div>
        </div>
      </section>

      {/* Modals */}
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} defaultPackage={selectedPkg} />
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none shadow-none">
          {selectedImage && <img src={selectedImage} alt="Gallery fullscreen" className="w-full h-auto rounded-xl" />}
        </DialogContent>
      </Dialog>
    </>
  );
}
