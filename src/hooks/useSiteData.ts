import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Fallback data used when database is empty
const defaultHero = {
  badge: "✈️ Your Trusted Travel Partner Since 2019",
  title_line1: "Travel More.",
  title_line2: "Stress Less.",
  subtitle: "Visa, tours, flights and hotels in one place. Eco Trippers helps travelers with visa processing, air tickets, hotel bookings, and customized tour packages from Banani, Dhaka.",
  image_url: "/hero-banner.jpg",
};

const defaultStats = { customers: "3500", tours: "110", reviews: "97.5", visa: "564" };

const defaultAbout = {
  paragraph1: 'Founded in 2019 by <strong>Monabbir Ahammed Khan</strong> and <strong>Bidarul Islam</strong>, Eco Trippers started with a simple mission: to make international travel accessible and stress-free for Bangladeshi travelers.',
  paragraph2: "What began as a small visa consultancy in Banani has grown into a full-service travel agency, helping thousands of travelers explore the world with confidence. We specialize in visa processing for 21+ countries, air ticketing, hotel bookings, and customized tour packages.",
  paragraph3: "Today, with over 3,500 happy customers and a 97.5% positive review rate, we continue to be Dhaka's most trusted travel partner for leisure, business, group, and special-purpose travel.",
};

const defaultMission = {
  mission: "To provide reliable, stress-free travel solutions that empower every Bangladeshi traveler to explore the world confidently.",
  vision: "To become Bangladesh's leading travel and visa consultancy, known for exceptional service, transparency, and commitment.",
};

const defaultWhyEco = {
  heading: "Why Eco Trippers",
  subtitle: "Six reasons thousands of Bangladeshi travelers trust us with their journeys.",
  item1_title: "97.5% Visa Success Rate",
  item1_desc: "Proven track record across 21+ countries with expert documentation and embassy follow-up.",
  item2_title: "Transparent Pricing",
  item2_desc: "No hidden fees, no surprises. Clear quotes upfront so you always know what you're paying for.",
  item3_title: "End-to-End Support",
  item3_desc: "From visa filing to airport boarding — we handle the details so you can focus on the trip.",
  item4_title: "24/7 Travel Assistance",
  item4_desc: "Real humans on WhatsApp and phone whenever you need help, even while you're abroad.",
  item5_title: "Trusted Since 2019",
  item5_desc: "3,500+ happy customers, 110+ tours completed, and a 97.5% positive review rate.",
  item6_title: "Local Experts, Global Reach",
  item6_desc: "Based in Banani, Dhaka with partnerships across Asia, Europe, and the Middle East.",
};

const defaultAirTicketing = {
  badge: "Air Ticketing",
  heading: "Best Fares. Trusted Airlines.",
  subtitle: "Domestic and international flight bookings with the best available fares from 50+ airlines. We handle reschedules, refunds, and group bookings end-to-end.",
  image_url: "/dest-japan.jpg",
  feature1: "Domestic & International tickets",
  feature2: "Group & corporate bookings",
  feature3: "24/7 reschedule & refund support",
  feature4: "Best fare guarantee from 50+ airlines",
  cta_text: "Book a Flight",
  cta_link: "#contact",
};

const defaultContactInfo = {
  address: "Suite #4-D, House #120, Road #1, Block #F, Banani, Dhaka-1213, Bangladesh",
  phone: "+880 1894-071070",
  email: "ecotrippersbd@gmail.com",
  whatsapp: "8801632164405",
  office_hours: "Sat - Thu: 10:00 AM - 7:00 PM",
  facebook: "https://facebook.com/ecotrippers",
  instagram: "https://instagram.com/ecotrippers",
  youtube: "https://youtube.com/@ecotrippers",
};

const defaultCta = {
  title: "Ready to Start Your Journey?",
  subtitle: "Let us handle the details while you enjoy the adventure. Book your consultation today and travel stress-free!",
};

export interface SiteData {
  hero: typeof defaultHero;
  stats: typeof defaultStats;
  about: typeof defaultAbout;
  mission: typeof defaultMission;
  why_eco: typeof defaultWhyEco;
  air_ticketing: typeof defaultAirTicketing;
  contact_info: typeof defaultContactInfo;
  cta: typeof defaultCta;
  services: any[];
  visaCountries: any[];
  packages: any[];
  galleryImages: any[];
  blogPosts: any[];
  testimonials: any[];
  faqs: any[];
  loading: boolean;
}

export function useSiteData(): SiteData {
  const [content, setContent] = useState<Record<string, any>>({});
  const [services, setServices] = useState<any[]>([]);
  const [visaCountries, setVisaCountries] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const [
        { data: contentRows },
        { data: svcRows },
        { data: visaRows },
        { data: pkgRows },
        { data: galRows },
        { data: blogRows },
        { data: testRows },
        { data: faqRows },
      ] = await Promise.all([
        supabase.from("site_content").select("*"),
        supabase.from("services").select("*").eq("is_active", true).order("sort_order"),
        supabase.from("visa_countries").select("*").eq("is_active", true).order("sort_order"),
        supabase.from("packages").select("*").eq("is_active", true).order("sort_order"),
        supabase.from("gallery_images").select("*").eq("is_active", true).order("sort_order"),
        supabase.from("blog_posts").select("*").eq("is_published", true).order("sort_order"),
        supabase.from("testimonials").select("*").eq("is_active", true).order("sort_order"),
        supabase.from("faqs").select("*").eq("is_active", true).order("sort_order"),
      ]);

      const mapped: Record<string, any> = {};
      contentRows?.forEach((r) => { mapped[r.section_key] = r.content; });
      setContent(mapped);
      if (svcRows?.length) setServices(svcRows);
      if (visaRows?.length) setVisaCountries(visaRows);
      if (pkgRows?.length) setPackages(pkgRows);
      if (galRows?.length) setGalleryImages(galRows);
      if (blogRows?.length) setBlogPosts(blogRows);
      if (testRows?.length) setTestimonials(testRows);
      if (faqRows?.length) setFaqs(faqRows);
      setLoading(false);
    };
    fetchAll();
  }, []);

  return {
    hero: { ...defaultHero, ...(content.hero || {}) },
    stats: { ...defaultStats, ...(content.stats || {}) },
    about: { ...defaultAbout, ...(content.about || {}) },
    mission: { ...defaultMission, ...(content.mission || {}) },
    why_eco: { ...defaultWhyEco, ...(content.why_eco || {}) },
    air_ticketing: { ...defaultAirTicketing, ...(content.air_ticketing || {}) },
    contact_info: { ...defaultContactInfo, ...(content.contact_info || {}) },
    cta: { ...defaultCta, ...(content.cta || {}) },
    services,
    visaCountries,
    packages,
    galleryImages,
    blogPosts,
    testimonials,
    faqs,
    loading,
  };
}
