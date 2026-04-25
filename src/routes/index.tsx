import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
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
import { useSiteData } from "@/hooks/useSiteData";
import { getCountryCode } from "@/lib/countries";
import { fallbackVisaCountries } from "@/lib/visaFallback";
import {
  Plane, Hotel, FileCheck, Map, Star, Compass, Briefcase,
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
import foundersImage from "@/assets/founders.jpg";

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

/* ── Icon map for DB services ── */
const iconMap: Record<string, any> = { FileCheck, Plane, Hotel, Map, Star, Compass, Briefcase };

/* ── Fallback data (used when DB is empty) ── */
const fallbackServices = [
  { id: "1", title: "Visa Processing", description: "Expert visa processing for 21+ countries. We handle complete documentation, application submission, and follow-up to ensure the highest approval rates.", icon: "FileCheck", image_url: "/dest-london.jpg", features: ["Tourist, Business & Student visas", "Complete file preparation", "Embassy appointment booking", "Document verification & guidance", "Fast-track processing available"], sort_order: 0 },
  { id: "2", title: "Air Ticket", description: "Best deals on domestic and international flights with all major airlines. We find the most convenient routes at competitive prices.", icon: "Plane", image_url: "/dest-japan.jpg", features: ["All major airlines", "Best fare guarantee", "Group booking discounts", "Flexible date search", "24/7 booking support"], sort_order: 1 },
  { id: "3", title: "Package Tour", description: "Customized group and individual tour packages tailored to your preferences, budget, and travel style.", icon: "Map", image_url: "/dest-thailand.jpg", features: ["Group & individual tours", "Customizable itineraries", "Local guide included", "All-inclusive options", "Family-friendly packages"], sort_order: 2 },
  { id: "4", title: "Hotel Booking", description: "From budget accommodations to 5-star luxury resorts, we book the perfect stay for every traveler and every budget.", icon: "Hotel", image_url: "/dest-maldives.jpg", features: ["Budget to luxury options", "Best rate guarantee", "Free cancellation options", "Verified reviews", "Special honeymoon packages"], sort_order: 3 },
  { id: "5", title: "Corporate Event", description: "End-to-end planning and execution of corporate retreats, conferences, MICE trips and team-building events at home and abroad.", icon: "Briefcase", image_url: "/dest-malaysia.jpg", features: ["Conferences & retreats", "Team-building activities", "Group flight & hotel bookings", "Custom itinerary planning", "On-site coordination"], sort_order: 4 },
];

const countryCodeMap: Record<string, string> = {
  "Malaysia": "my", "Thailand": "th", "Japan": "jp", "South Korea": "kr",
  "China": "cn", "Singapore": "sg", "Indonesia": "id", "Turkey": "tr",
  "United Kingdom": "gb", "Canada": "ca", "USA": "us", "Germany": "de",
  "Spain": "es", "Netherlands": "nl", "Hong Kong": "hk", "Nepal": "np",
  "India": "in", "Australia": "au", "France": "fr", "Italy": "it",
  "Maldives": "mv", "Vietnam": "vn", "Philippines": "ph", "UAE": "ae",
  "Saudi Arabia": "sa", "Qatar": "qa", "Oman": "om", "Bahrain": "bh",
  "Egypt": "eg", "Sri Lanka": "lk", "Myanmar": "mm", "Cambodia": "kh",
  "Bhutan": "bt", "Switzerland": "ch", "Sweden": "se", "Norway": "no",
};

function getFlagUrl(name: string) {
  const code = countryCodeMap[name] || name.toLowerCase().slice(0, 2);
  return `https://flagcdn.com/w80/${code}.png`;
}

const fallbackPackages = [
  { id: "1", name: "Japan & South Korea Group Tour", flag: "🇯🇵🇰🇷", price: "209,900", duration: "7N/8D", image_url: "/dest-japan.jpg", type: "Featured", departure: "1 June 2026", deadline: "20 May 2026", group_size: "10-15 persons", includes: ["Return air ticket", "3-star hotel", "Airport pick & drop", "Sightseeing", "Breakfast"], excludes: ["Visa fee", "Lunch/dinner", "Personal expenses", "Travel insurance"] },
  { id: "2", name: "London, United Kingdom", flag: "🇬🇧", price: "220,000", duration: "6N/7D", image_url: "/dest-london.jpg", type: "Featured", departure: "Flexible", deadline: "2 weeks before", group_size: "Individual/Group", includes: ["Hotel stay", "Airport transfer", "City sightseeing", "Visa assistance", "Breakfast"], excludes: ["Visa fee", "Lunch/dinner", "Personal expenses", "Attraction entry fees"] },
  { id: "3", name: "Explore Malaysia", flag: "🇲🇾", price: "45,000", duration: "4N/5D", image_url: "/dest-malaysia.jpg", type: "Popular", departure: "Weekly", deadline: "1 week before", group_size: "2+ persons", includes: ["Hotel + Breakfast", "KL city tour", "Genting Highlands", "Airport transfer"], excludes: ["Visa fee", "Lunch/dinner", "Personal expenses"] },
  { id: "4", name: "Amazing Thailand", flag: "🇹🇭", price: "38,000", duration: "3N/4D", image_url: "/dest-thailand.jpg", type: "Popular", departure: "Daily", deadline: "5 days before", group_size: "2+ persons", includes: ["Hotel stay", "Bangkok temple tour", "Pattaya day trip", "Airport transfer"], excludes: ["Visa fee", "Meals", "Shopping"] },
  { id: "5", name: "Maldives Paradise", flag: "🇲🇻", price: "85,000", duration: "3N/4D", image_url: "/dest-maldives.jpg", type: "Luxury", departure: "Daily", deadline: "1 week before", group_size: "2+ persons", includes: ["Resort stay", "Speedboat transfer", "Water activities", "Full board meals"], excludes: ["International flights", "Spa treatments", "Excursions"] },
  { id: "6", name: "Seoul, South Korea", flag: "🇰🇷", price: "150,000", duration: "5N/6D", image_url: "/dest-korea.jpg", type: "Popular", departure: "Bi-weekly", deadline: "2 weeks before", group_size: "4+ persons", includes: ["Hotel stay", "K-culture tour", "Gyeongbokgung Palace", "Shopping tour", "Breakfast"], excludes: ["Visa fee", "Lunch/dinner", "Personal expenses"] },
  { id: "7", name: "Umrah Package", flag: "🕋", price: "180,000", duration: "10N/11D", image_url: "/dest-umrah.jpg", type: "Special", departure: "Monthly", deadline: "3 weeks before", group_size: "Group", includes: ["Hotel near Haram", "Visa processing", "Guided Ziyarah", "Meals", "Air ticket"], excludes: ["Personal expenses", "Shopping", "Extra stays"] },
];

const fallbackGallery = [
  { image_url: "/gallery-3.jpg", alt_text: "Visa approval success", category: "Visa Success" },
  { image_url: "/gallery-1.jpg", alt_text: "Approved visa documents", category: "Visa Success" },
  { image_url: "/dest-japan.jpg", alt_text: "Japan visa approved", category: "Visa Success" },
  { image_url: "/dest-korea.jpg", alt_text: "South Korea visa approved", category: "Visa Success" },
  { image_url: "/gallery-2.jpg", alt_text: "Happy travelers exploring", category: "Visa Travelers" },
  { image_url: "/dest-thailand.jpg", alt_text: "Travelers in Thailand", category: "Visa Travelers" },
  { image_url: "/dest-maldives.jpg", alt_text: "Travelers in Maldives", category: "Visa Travelers" },
  { image_url: "/dest-malaysia.jpg", alt_text: "Travelers in Malaysia", category: "Visa Travelers" },
];

const fallbackTestimonials = [
  { name: "Rahman Ahmed", text: "Eco Trippers made our Japan trip absolutely seamless. From visa processing to hotel booking, everything was handled perfectly!", rating: 5 },
  { name: "Fatima Khan", text: "Best visa consultancy in Dhaka! Got my UK visa approved on the first attempt thanks to their expert guidance.", rating: 5 },
  { name: "Kamal Hossain", text: "Our family trip to Malaysia was unforgettable. Great packages at reasonable prices with excellent support.", rating: 5 },
];

const fallbackBlogPosts = [
  { title: "Top 10 Visa-Free Countries for Bangladeshi Passport Holders", excerpt: "Discover amazing destinations you can visit without the hassle of visa processing.", image_url: "/dest-maldives.jpg", published_date: "2026-03-15", author: "Eco Trippers", category: "Visa Guide" },
  { title: "Complete Guide to Japan Tourist Visa from Bangladesh", excerpt: "Everything you need to know about applying for a Japan tourist visa.", image_url: "/dest-japan.jpg", published_date: "2026-03-08", author: "Eco Trippers", category: "Visa Guide" },
  { title: "Budget-Friendly Thailand Trip Planning", excerpt: "How to plan an amazing Thailand vacation without breaking the bank.", image_url: "/dest-thailand.jpg", published_date: "2026-02-28", author: "Eco Trippers", category: "Travel Tips" },
  { title: "Malaysia: The Perfect First International Trip", excerpt: "Why Malaysia should be your first international destination.", image_url: "/dest-malaysia.jpg", published_date: "2026-02-20", author: "Eco Trippers", category: "Destination" },
  { title: "5 Things to Know Before Your First Umrah", excerpt: "Essential tips for first-time Umrah pilgrims.", image_url: "/dest-umrah.jpg", published_date: "2026-02-12", author: "Eco Trippers", category: "Umrah" },
  { title: "London on a Budget: A Bangladeshi Traveler's Guide", excerpt: "Explore London without spending a fortune.", image_url: "/dest-london.jpg", published_date: "2026-02-05", author: "Eco Trippers", category: "Travel Tips" },
];

const fallbackFaqs = [
  { question: "How long does visa processing take?", answer: "Processing times vary by country. Typically 5-15 working days for most Asian countries, and 15-30 days for European/North American visas." },
  { question: "What documents are needed for visa application?", answer: "Required documents vary by destination. Generally you'll need a valid passport, passport-sized photos, bank statements, employment letter, and hotel bookings." },
  { question: "Can I customize tour packages?", answer: "Absolutely! All our packages can be customized based on your preferences, budget, and travel dates." },
  { question: "Do you offer travel insurance?", answer: "Yes, we can arrange comprehensive travel insurance as part of your package." },
  { question: "What payment methods do you accept?", answer: "We accept bank transfers, mobile banking (bKash, Nagad), and cash payments at our office." },
];

const visaSteps = [
  { icon: Search, title: "Consultation", desc: "Free consultation to understand your travel needs and visa requirements" },
  { icon: FileText, title: "Documentation", desc: "We prepare your complete visa file with all required documents" },
  { icon: Send, title: "Submission", desc: "Application submitted to the embassy with follow-up tracking" },
  { icon: CheckCircle, title: "Approval", desc: "Visa approved and passport returned. You're ready to travel!" },
];

/* ── Component ── */

const heroSlides = [
  {
    image: "/hero-1.jpg",
    badge: "🏝️ Tropical Paradise Awaits",
    title1: "Escape to",
    title2: "Paradise.",
    subtitle: "Discover pristine beaches, luxury resorts, and unforgettable island getaways with Eco Trippers.",
  },
  {
    image: "/hero-2.jpg",
    badge: "🌸 Explore the Land of the Rising Sun",
    title1: "Discover",
    title2: "Japan & Beyond.",
    subtitle: "Cherry blossoms, ancient temples, and breathtaking culture. Experience Asia's finest with expert-curated tours.",
  },
  {
    image: "/hero-3.jpg",
    badge: "🇬🇧 European Adventures Await",
    title1: "Explore",
    title2: "Europe in Style.",
    subtitle: "From London's iconic landmarks to European capitals. Premium visa processing & luxury travel packages.",
  },
];

function Index() {
  const site = useSiteData();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState("");
  const [bookingMode, setBookingMode] = useState<"tour" | "visa">("tour");
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const openBooking = (pkg?: string, mode: "tour" | "visa" = "tour") => {
    setSelectedPkg(pkg || "");
    setBookingMode(mode);
    setBookingOpen(true);
  };

  // Use DB data with fallbacks
  const services = site.services.length ? site.services : fallbackServices;
  const visaCountries = site.visaCountries.length ? site.visaCountries : fallbackVisaCountries;
  const packages = site.packages.length ? site.packages : fallbackPackages;
  const gallery = site.galleryImages.length ? site.galleryImages : fallbackGallery;
  const testimonials = site.testimonials.length ? site.testimonials : fallbackTestimonials;
  const blogPosts = site.blogPosts.length ? site.blogPosts : fallbackBlogPosts;
  const faqs = site.faqs.length ? site.faqs : fallbackFaqs;

  const galleryCategories = ["All", ...Array.from(new Set(gallery.map((i: any) => i.category)))];
  const filteredGallery = galleryFilter === "All" ? gallery : gallery.filter((i: any) => i.category === galleryFilter);

  const ci = site.contact_info;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Contact Inquiry - Eco Trippers*%0A%0A*Name:* ${encodeURIComponent(contactForm.name.trim())}%0A*Email:* ${encodeURIComponent(contactForm.email.trim())}%0A*Phone:* ${encodeURIComponent(contactForm.phone.trim())}%0A*Subject:* ${encodeURIComponent(contactForm.subject.trim())}%0A*Message:* ${encodeURIComponent(contactForm.message.trim())}`;
    window.open(`https://wa.me/${ci.whatsapp}?text=${text}`, "_blank");
  };

  const slide = heroSlides[currentSlide];

  return (
    <>
      {/* ═══════ HERO SLIDER ═══════ */}
      <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background images with crossfade */}
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === currentSlide ? 1 : 0 }}
          >
            <img
              src={s.image}
              alt={s.title1 + " " + s.title2}
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-eco-dark/85 via-eco-dark/60 to-eco-dark/20" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 w-full">
          <div className="max-w-2xl" key={currentSlide} style={{ animation: "float-up 0.7s ease-out both" }}>
            <span className="inline-block bg-primary/20 text-primary-foreground border border-primary/30 px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              {slide.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-heading text-primary-foreground leading-tight">
              {slide.title1}<br /><span className="text-gradient-eco">{slide.title2}</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/85 max-w-xl leading-relaxed">
              {slide.subtitle}
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

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all duration-500 ${i === currentSlide ? "w-10 bg-primary" : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ABOUT US (after hero) ═══════ */}
      <section id="about-us" className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-eco opacity-20 blur-2xl rounded-3xl" aria-hidden />
              <img
                src={foundersImage}
                alt="Monabbir Ahammed Khan and Bidarul Islam — Co-founders of Eco Trippers"
                loading="lazy"
                width={1200}
                height={800}
                className="relative rounded-2xl shadow-eco w-full h-auto object-cover"
              />
            </div>
            <div>
              <span className="inline-block bg-primary/15 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-4">
                About Us
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Two Travelers. <span className="text-gradient-eco">One Mission.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Eco Trippers was founded by <strong className="text-foreground">Monabbir Ahammed Khan</strong> and <strong className="text-foreground">Bidarul Islam</strong> — two lifelong travelers from Bangladesh who believe every journey should be effortless, memorable, and within reach. From visa paperwork to airport boarding, we handle the details so you can focus on the experience.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Since 2019, we've helped <strong className="text-foreground">3,500+ travelers</strong> explore <strong className="text-foreground">21+ countries</strong> with hand-crafted tour packages, stress-free visa processing, and the best deals on flights and hotels. Headquartered in Banani, Dhaka, our team blends local expertise with global partnerships to give every customer a world-class travel experience.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 rounded-xl bg-muted/50 border border-border/50">
                  <div className="text-2xl font-bold text-primary font-heading">3,500+</div>
                  <div className="text-xs text-muted-foreground mt-1">Happy Travelers</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/50 border border-border/50">
                  <div className="text-2xl font-bold text-primary font-heading">21+</div>
                  <div className="text-xs text-muted-foreground mt-1">Countries Served</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/50 border border-border/50">
                  <div className="text-2xl font-bold text-primary font-heading">7+</div>
                  <div className="text-xs text-muted-foreground mt-1">Years of Trust</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-gradient-eco text-primary-foreground font-semibold gap-2 shadow-eco hover:opacity-90"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="py-16 bg-card border-y border-border/50">
        <div className="mx-auto max-w-5xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedCounter end={Number(site.stats.customers) || 3500} suffix="+" label="Happy Customers" />
          <AnimatedCounter end={Number(site.stats.tours) || 110} suffix="+" label="Tour Success" />
          <AnimatedCounter end={Number(site.stats.reviews) || 97.5} suffix="%" label="Positive Reviews" decimals={1} />
          <AnimatedCounter end={Number(site.stats.visa) || 564} suffix="+" label="Visa Success" />
        </div>
      </section>

      {/* ═══════ ABOUT ═══════ */}
      <section id="about" className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading title="About Eco Trippers" centered={false} />
              <p className="text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: site.about.paragraph1 }} />
              <p className="text-muted-foreground leading-relaxed mb-4">{site.about.paragraph2}</p>
              <p className="text-muted-foreground leading-relaxed">{site.about.paragraph3}</p>
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
                <p className="text-muted-foreground leading-relaxed">{site.mission.mission}</p>
              </CardContent>
            </Card>
            <Card className="hover-lift border-border/50">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-full bg-eco-gold text-eco-gold-foreground flex items-center justify-center mb-4"><Eye className="h-7 w-7" /></div>
                <h3 className="font-heading text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">{site.mission.vision}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section id="services" className="py-20 bg-eco-light">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Our Services" subtitle="Comprehensive travel solutions designed to make your journey seamless" />
          <div className="space-y-16">
            {services.map((svc: any, i: number) => {
              const IconComp = iconMap[svc.icon] || FileCheck;
              return (
                <div key={svc.id || svc.title} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"><IconComp className="h-5 w-5" /></div>
                      <h3 className="text-2xl font-bold font-heading">{svc.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-5">{svc.description}</p>
                    <ul className="space-y-2.5 mb-6">
                      {(svc.features || []).map((f: string) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm"><CheckCircle className="h-4 w-4 text-primary shrink-0" /><span>{f}</span></li>
                      ))}
                    </ul>
                    <Button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })} className="bg-gradient-eco text-primary-foreground gap-2 shadow-eco hover:opacity-90">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <img src={svc.image_url || "/hero-banner.jpg"} alt={svc.title} loading="lazy" width={800} height={600} className="rounded-xl w-full h-80 object-cover shadow-lg" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ VISA SERVICES ═══════ */}
      <section id="visa" className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Visa Services" subtitle="Expert visa processing for 21+ countries with high approval rates" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {visaSteps.map((step, i) => (
              <div key={step.title} className="text-center relative">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-3 text-xl font-bold">{i + 1}</div>
                <h3 className="font-heading font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {visaCountries.map((c: any) => (
              <Link
                key={c.name}
                to="/visa"
                search={{ country: ((c.country_code as string) || getCountryCode(c.name)).toUpperCase() }}
                className="block"
              >
                <Card className="hover-lift border-border/50 group cursor-pointer h-full">
                  <CardContent className="p-5 flex items-center gap-4">
                    <img src={getFlagUrl(c.name)} alt={`${c.name} flag`} className="w-10 h-7 rounded object-cover shadow-sm" loading="lazy" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{c.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {c.processing_time}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">From</div>
                      <div className="font-bold text-primary font-heading">{c.price === "0" ? "Free" : `৳${c.price}`}</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
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
            {packages.map((pkg: any) => (
              <Card key={pkg.id || pkg.name} className="overflow-hidden hover-lift border-border/50">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  <div className="relative h-64 lg:h-auto">
                    <img src={pkg.image_url || "/hero-banner.jpg"} alt={pkg.name} loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">{pkg.type}</div>
                  </div>
                  <CardContent className="p-6 lg:col-span-2">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold font-heading flex items-center gap-2"><img src={getFlagUrl(pkg.name)} alt={`${pkg.name} flag`} className="w-8 h-6 rounded object-cover shadow-sm" loading="lazy" /> {pkg.name}</h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{pkg.duration}</span>
                          <span className="flex items-center gap-1"><Users className="h-4 w-4" />{pkg.group_size}</span>
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
                        <ul className="space-y-1">{(pkg.includes || []).map((item: string) => (<li key={item} className="flex items-center gap-2 text-sm"><CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />{item}</li>))}</ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-destructive">Excludes</h4>
                        <ul className="space-y-1">{(pkg.excludes || []).map((item: string) => (<li key={item} className="flex items-center gap-2 text-sm text-muted-foreground"><XCircle className="h-3.5 w-3.5 text-destructive/50 shrink-0" />{item}</li>))}</ul>
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
            {galleryCategories.map((cat: string) => (
              <button key={cat} onClick={() => setGalleryFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${galleryFilter === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"}`}>{cat}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map((img: any, i: number) => (
              <div key={i} className={`overflow-hidden rounded-xl cursor-pointer group ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`} onClick={() => setSelectedImage(img.image_url)}>
                <img src={img.image_url} alt={img.alt_text} loading="lazy" width={800} height={600} className="w-full h-full min-h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
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
            {testimonials.map((t: any) => (
              <Card key={t.name} className="hover-lift border-border/50">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary/30 mb-3" />
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{t.text}</p>
                  <div className="flex items-center gap-3">
                    {t.image_url ? (
                      <img
                        src={t.image_url}
                        alt={t.name}
                        loading="lazy"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">{t.name[0]}</div>
                    )}
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
            {blogPosts.map((post: any) => (
              <Card key={post.title} className="overflow-hidden hover-lift border-border/50 group">
                <div className="relative h-52 overflow-hidden">
                  <img src={post.image_url} alt={post.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">{post.category}</span>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.published_date}</span>
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
            {faqs.map((faq: any, i: number) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-5 bg-card">
                <AccordionTrigger className="text-left font-medium hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</AccordionContent>
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
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">{site.cta.title}</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">{site.cta.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => openBooking()} className="bg-primary-foreground text-primary font-semibold text-base px-8 py-6 hover:bg-primary-foreground/90">Book a Consultation</Button>
            <a href={`https://wa.me/${ci.whatsapp}`} target="_blank" rel="noopener noreferrer">
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
                { icon: MapPin, title: "Office Address", text: ci.address },
                { icon: Phone, title: "Phone", text: ci.phone, href: `tel:${ci.phone.replace(/[\s-]/g, "")}` },
                { icon: Mail, title: "Email", text: ci.email, href: `mailto:${ci.email}` },
                { icon: Clock, title: "Office Hours", text: ci.office_hours },
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
              <a href={`https://wa.me/${ci.whatsapp}`} target="_blank" rel="noopener noreferrer">
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
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} defaultPackage={selectedPkg} mode={bookingMode} />
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none shadow-none">
          {selectedImage && <img src={selectedImage} alt="Gallery fullscreen" className="w-full h-auto rounded-xl" />}
        </DialogContent>
      </Dialog>
    </>
  );
}
