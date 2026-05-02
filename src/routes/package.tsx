import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSiteData } from "@/hooks/useSiteData";
import { getFlagUrl } from "@/lib/countries";
import { BookingModal } from "@/components/BookingModal";
import { useState } from "react";
import {
  Clock, CheckCircle, XCircle, Calendar, Users, Globe,
  ArrowLeft, MapPin, Wallet, AlertCircle, Send, Sparkles,
  Plane, Hotel, Camera, Award,
} from "lucide-react";

const searchSchema = z.object({
  id: z.string().optional(),
});

export const Route = createFileRoute("/package")({
  validateSearch: zodValidator(searchSchema),
  head: ({ match }) => {
    const id = (match.search as { id?: string })?.id || "";
    const title = id
      ? "Tour Package — Eco Trippers"
      : "Tour Packages — Eco Trippers";
    return {
      meta: [
        { title },
        {
          name: "description",
          content:
            "Discover handpicked tour packages by Eco Trippers — full itinerary, inclusions, pricing and instant booking via WhatsApp.",
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: "Curated tour packages across Asia, Europe and the Middle East.",
        },
      ],
    };
  },
  component: PackageDetailPage,
});

function PackageDetailPage() {
  const { id } = Route.useSearch();
  const { packages: dbPackages, loading } = useSiteData();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPkg, setBookingPkg] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "inclusion" | "exclusion" | "cancellation">("overview");

  const pkg = useMemo(
    () => (id ? dbPackages.find((p: any) => p.id === id) : undefined),
    [dbPackages, id]
  );

  // No id, or invalid id → picker
  if (!id || (!loading && !pkg)) {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-7xl px-4 py-12">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Choose a tour package</h1>
          <p className="text-muted-foreground mb-8">
            {id && !pkg
              ? "We couldn't find that package. Browse our curated trips below."
              : "Pick a destination to view full itinerary, pricing and inclusions."}
          </p>
          {loading ? (
            <p className="text-muted-foreground">Loading packages…</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {dbPackages.map((p: any) => (
                <Link key={p.id} to="/package" search={{ id: p.id }}>
                  <Card className="overflow-hidden hover-lift border-border/50 group cursor-pointer h-full">
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={p.image_url || "/hero-banner.jpg"}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {p.type && (
                        <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-md">
                          {p.type}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-bold text-lg mb-2 flex items-center gap-2">
                        <img src={getFlagUrl(p.name)} alt="" className="w-6 h-4 rounded object-cover" />
                        {p.name}
                      </h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" /> {p.duration}
                        </span>
                        <span className="font-bold text-primary">৳{p.price}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }

  if (loading || !pkg) {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-7xl px-4 py-20 text-center text-muted-foreground">Loading package details…</main>
      </div>
    );
  }

  const itinerary: string[] = Array.isArray(pkg.itinerary) ? pkg.itinerary : [];
  const includes: string[] = Array.isArray(pkg.includes) ? pkg.includes : [];
  const excludes: string[] = Array.isArray(pkg.excludes) ? pkg.excludes : [];
  const overview: string =
    pkg.overview ||
    `Discover ${pkg.name} — a ${pkg.duration || ""} curated travel experience by Eco Trippers. Enjoy comfortable stays, expert guides and seamless support from start to finish.`;
  const cancellation: string =
    pkg.cancellation_policy ||
    "• Cancellation 30+ days before departure: 90% refund.\n• 15-29 days before: 50% refund.\n• 7-14 days before: 25% refund.\n• Less than 7 days: non-refundable.\n• Visa fees and air ticket charges are non-refundable once issued.";

  const openBooking = () => {
    setBookingPkg(pkg.name);
    setBookingOpen(true);
  };

  const tabs = [
    { key: "overview", label: "Overview", icon: Globe },
    { key: "itinerary", label: "Itinerary", icon: MapPin },
    { key: "inclusion", label: "Inclusion", icon: CheckCircle },
    { key: "exclusion", label: "Exclusion", icon: XCircle },
    { key: "cancellation", label: "Cancellation Policy", icon: AlertCircle },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        {/* ── HEADER CARD: Tour name + Country on left, Picture on right ── */}
        <Card className="overflow-hidden border-border/60 shadow-eco mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left side */}
            <div className="p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-primary/5 via-background to-eco-gold/5">
              <div>
                {pkg.type && (
                  <Badge className="bg-eco-gold text-eco-gold-foreground hover:bg-eco-gold mb-3 font-semibold">
                    <Sparkles className="h-3 w-3 mr-1" /> {pkg.type}
                  </Badge>
                )}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold leading-tight text-foreground">
                  {pkg.name}
                </h1>
                <div className="flex items-center gap-2 mt-3 text-muted-foreground">
                  <img
                    src={getFlagUrl(pkg.name, 80)}
                    alt=""
                    className="w-7 h-5 rounded object-cover ring-1 ring-border"
                  />
                  <span className="text-base md:text-lg font-medium">
                    {pkg.country || pkg.name}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-5 text-xs">
                  {pkg.duration && (
                    <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">
                      <Calendar className="h-3.5 w-3.5" /> {pkg.duration}
                    </span>
                  )}
                  {pkg.group_size && (
                    <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">
                      <Users className="h-3.5 w-3.5" /> {pkg.group_size}
                    </span>
                  )}
                  {pkg.departure && (
                    <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">
                      <Plane className="h-3.5 w-3.5" /> {pkg.departure}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-4 mt-6 pt-6 border-t border-border/60">
                {pkg.price && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Starting from</p>
                    <p className="text-2xl md:text-3xl font-heading font-bold text-primary">৳{pkg.price}</p>
                    <p className="text-xs text-muted-foreground">per person</p>
                  </div>
                )}
                <Button
                  onClick={openBooking}
                  className="bg-gradient-eco text-primary-foreground font-semibold gap-2 shadow-eco hover:opacity-90"
                >
                  <Send className="h-4 w-4" /> Book Now
                </Button>
              </div>
            </div>

            {/* Right side — Picture */}
            <div className="relative min-h-[260px] md:min-h-[360px]">
              <img
                src={pkg.image_url || "/hero-banner.jpg"}
                alt={pkg.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </Card>

        {/* ── TABS NAV ── */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-6 border-b border-border/60 pb-3">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`inline-flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-lg border text-sm font-semibold transition-all ${
                  active
                    ? "bg-gradient-eco text-primary-foreground border-transparent shadow-eco"
                    : "bg-card text-foreground border-border hover:border-primary/40 hover:text-primary"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* ── TAB CONTENT ── */}
        <Card className="border-border/60">
          <CardContent className="p-6 md:p-8">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-xl md:text-2xl font-heading font-bold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" /> Overview
                </h2>
                <p className="text-foreground/85 leading-relaxed whitespace-pre-line">{overview}</p>
                {pkg.deadline && (
                  <div className="mt-5 inline-flex items-center gap-2 bg-eco-gold/15 border border-eco-gold/30 rounded-lg px-3 py-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-eco-gold-foreground" />
                    <span><span className="font-semibold">Booking Deadline:</span> {pkg.deadline}</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === "itinerary" && (
              <div>
                {itinerary.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    A detailed day-wise itinerary will be shared once you start the booking. Contact us for the complete plan.
                  </p>
                ) : (
                  <Accordion type="single" collapsible defaultValue="itinerary-root">
                    <AccordionItem
                      value="itinerary-root"
                      className="border border-border/60 rounded-xl bg-card overflow-hidden data-[state=open]:shadow-eco data-[state=open]:border-primary/40 transition-all"
                    >
                      <AccordionTrigger className="px-4 md:px-5 py-4 hover:no-underline">
                        <div className="flex items-center gap-3 text-left flex-1">
                          <MapPin className="h-5 w-5 text-primary shrink-0" />
                          <span className="text-lg md:text-xl font-heading font-bold">
                            Itinerary
                          </span>
                          <span className="text-xs text-muted-foreground font-normal">
                            ({itinerary.length} {itinerary.length === 1 ? "day" : "days"})
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-3 md:px-4 pb-4 pt-0">
                        <Accordion type="single" collapsible defaultValue="day-0" className="space-y-2">
                          {itinerary.map((day, idx) => {
                      // Parse "Day 1: Title || Description" — `||` separates short title from full details
                      const headerMatch = day.match(/^(Day[\s-]*\d+)\s*[:\-]?\s*(.*)$/i);
                      const dayLabel = headerMatch ? headerMatch[1].replace(/\s+/g, " ").trim() : `Day ${idx + 1}`;
                      const rest = headerMatch ? headerMatch[2] : day;
                      const [titleRaw, ...descParts] = rest.split("||");
                      const title = (titleRaw || "").trim();
                      const description = descParts.join("||").trim();
                      return (
                        <AccordionItem
                          key={idx}
                          value={`day-${idx}`}
                          className="border border-border/60 rounded-lg bg-background overflow-hidden data-[state=open]:border-primary/40 transition-all"
                        >
                          <AccordionTrigger className="px-4 md:px-5 py-4 hover:no-underline group">
                            <div className="flex items-center gap-4 text-left flex-1">
                              <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-eco text-primary-foreground flex items-center justify-center font-bold text-sm shadow-eco">
                                {idx + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs uppercase tracking-wider text-primary font-semibold">
                                  {dayLabel}
                                </div>
                                {title && (
                                  <div className="font-heading font-bold text-foreground mt-0.5 truncate">
                                    {title}
                                  </div>
                                )}
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 md:px-5 pb-5 pt-0">
                            <div className="pl-14">
                              {description ? (
                                <p className="text-sm md:text-base text-foreground/85 leading-relaxed whitespace-pre-line">
                                  {description}
                                </p>
                              ) : (
                                <p className="text-sm text-muted-foreground italic">
                                  More details will be shared on booking.
                                </p>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                          })}
                        </Accordion>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
            )}

            {activeTab === "inclusion" && (
              <div>
                <h2 className="text-xl md:text-2xl font-heading font-bold mb-5 flex items-center gap-2 text-primary">
                  <CheckCircle className="h-5 w-5" /> Inclusions
                </h2>
                {includes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No inclusions listed.</p>
                ) : (
                  <ul className="space-y-3">
                    {includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm md:text-base">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {activeTab === "exclusion" && (
              <div>
                <h2 className="text-xl md:text-2xl font-heading font-bold mb-5 flex items-center gap-2 text-destructive">
                  <XCircle className="h-5 w-5" /> Exclusions
                </h2>
                {excludes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No exclusions listed.</p>
                ) : (
                  <ul className="space-y-3">
                    {excludes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm md:text-base">
                        <XCircle className="h-5 w-5 text-destructive/70 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {activeTab === "cancellation" && (
              <div>
                <h2 className="text-xl md:text-2xl font-heading font-bold mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" /> Cancellation Policy
                </h2>
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-line text-foreground/85">
                  {cancellation}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Bottom CTA ── */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl bg-gradient-to-r from-primary/10 via-background to-eco-gold/10 border border-border/60">
          <div>
            <h3 className="font-heading font-bold text-lg">Ready to explore {pkg.name}?</h3>
            <p className="text-sm text-muted-foreground">Free consultation • No upfront charge • Instant WhatsApp reply</p>
          </div>
          <Button
            onClick={openBooking}
            size="lg"
            className="bg-gradient-eco text-primary-foreground font-semibold gap-2 shadow-eco hover:opacity-90"
          >
            <Send className="h-4 w-4" /> Book This Package
          </Button>
        </div>
      </main>

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        defaultPackage={bookingPkg}
        mode="tour"
      />
    </div>
  );
}

function FactBox({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card p-4 text-center hover:border-primary/40 transition-colors">
      <Icon className="h-5 w-5 text-primary mx-auto mb-2" />
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold mt-0.5 truncate">{value}</p>
    </div>
  );
}