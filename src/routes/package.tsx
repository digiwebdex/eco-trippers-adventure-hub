import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

  return (
    <div className="min-h-screen bg-background">
      {/* ── HERO with image background + overlay ── */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img
          src={pkg.image_url || "/hero-banner.jpg"}
          alt={pkg.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 h-full flex flex-col justify-end pb-10 md:pb-14 text-white">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white mb-6 self-start">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="min-w-0">
              {pkg.type && (
                <Badge className="bg-eco-gold text-eco-gold-foreground hover:bg-eco-gold mb-3 font-semibold">
                  <Sparkles className="h-3 w-3 mr-1" /> {pkg.type}
                </Badge>
              )}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight flex items-center gap-3 flex-wrap">
                <img
                  src={getFlagUrl(pkg.name, 160)}
                  alt=""
                  className="w-12 h-9 md:w-16 md:h-11 rounded-md object-cover shadow-xl ring-2 ring-white/40"
                />
                {pkg.name}
              </h1>
              <div className="flex flex-wrap gap-2.5 mt-5 text-sm">
                {pkg.duration && (
                  <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <Calendar className="h-3.5 w-3.5" /> {pkg.duration}
                  </span>
                )}
                {pkg.group_size && (
                  <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <Users className="h-3.5 w-3.5" /> {pkg.group_size}
                  </span>
                )}
                {pkg.departure && (
                  <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <Plane className="h-3.5 w-3.5" /> Departure: {pkg.departure}
                  </span>
                )}
              </div>
            </div>
            {pkg.price && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-5 py-4 border border-white/20">
                <p className="text-xs uppercase tracking-wider text-white/70">Starting from</p>
                <p className="text-3xl md:text-4xl font-heading font-bold">৳{pkg.price}</p>
                <p className="text-xs text-white/80">per person</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── MAIN GRID ── */}
      <main className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT — package info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick facts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <FactBox icon={Calendar} label="Duration" value={pkg.duration || "—"} />
              <FactBox icon={Users} label="Group Size" value={pkg.group_size || "Flexible"} />
              <FactBox icon={Plane} label="Departure" value={pkg.departure || "On request"} />
              <FactBox icon={Award} label="Type" value={pkg.type || "Standard"} />
            </div>

            {/* Overview */}
            <Card className="border-border/60">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-heading font-bold mb-3 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" /> Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{overview}</p>
                {pkg.deadline && (
                  <div className="mt-5 inline-flex items-center gap-2 bg-eco-gold/15 border border-eco-gold/30 rounded-lg px-3 py-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-eco-gold-foreground" />
                    <span><span className="font-semibold">Booking Deadline:</span> {pkg.deadline}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card className="border-border/60">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-heading font-bold mb-5 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> Day-by-Day Itinerary
                </h2>
                {itinerary.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    A detailed day-wise itinerary will be shared once you start the booking. Contact us for the complete plan.
                  </p>
                ) : (
                  <ol className="space-y-4">
                    {itinerary.map((day, idx) => {
                      const match = day.match(/^(Day[\s-]*\d+)\s*[:\-]?\s*(.*)$/i);
                      const label = match ? match[1] : `Day ${idx + 1}`;
                      const text = match ? match[2] : day;
                      return (
                        <li key={idx} className="relative pl-12">
                          <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-gradient-eco text-primary-foreground flex items-center justify-center font-bold text-sm shadow-eco">
                            {idx + 1}
                          </div>
                          {idx < itinerary.length - 1 && (
                            <div className="absolute left-[17px] top-9 bottom-[-1rem] w-px bg-border" />
                          )}
                          <h3 className="font-heading font-bold text-primary mb-1">{label}</h3>
                          <p className="text-sm text-foreground/85 leading-relaxed">{text}</p>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </CardContent>
            </Card>

            {/* Inclusions / Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2 text-primary">
                    <CheckCircle className="h-5 w-5" /> Inclusions
                  </h3>
                  {includes.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No inclusions listed.</p>
                  ) : (
                    <ul className="space-y-2.5">
                      {includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-6">
                  <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2 text-destructive">
                    <XCircle className="h-5 w-5" /> Exclusions
                  </h3>
                  {excludes.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No exclusions listed.</p>
                  ) : (
                    <ul className="space-y-2.5">
                      {excludes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <XCircle className="h-4 w-4 text-destructive/70 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Cancellation Policy */}
            <Card className="border-border/60">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-heading font-bold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" /> Cancellation Policy
                </h2>
                <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">{cancellation}</p>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT — sticky booking card */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-5">
              <Card className="border-border/60 shadow-eco overflow-hidden">
                <div className="bg-gradient-eco text-primary-foreground p-5">
                  <Badge className="bg-white/20 text-white hover:bg-white/30 mb-2">Book This Package</Badge>
                  <h3 className="font-heading text-xl font-bold">{pkg.name}</h3>
                  {pkg.price && (
                    <p className="mt-2 text-sm opacity-90">
                      Starting from <span className="text-2xl font-bold font-heading">৳{pkg.price}</span>
                      <span className="text-xs opacity-80"> /person</span>
                    </p>
                  )}
                </div>
                <CardContent className="p-5 space-y-4">
                  <div className="space-y-2.5 text-sm">
                    {pkg.duration && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4" /> Duration</span>
                        <span className="font-medium">{pkg.duration}</span>
                      </div>
                    )}
                    {pkg.group_size && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2"><Users className="h-4 w-4" /> Group</span>
                        <span className="font-medium">{pkg.group_size}</span>
                      </div>
                    )}
                    {pkg.departure && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2"><Plane className="h-4 w-4" /> Departure</span>
                        <span className="font-medium">{pkg.departure}</span>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={openBooking}
                    className="w-full bg-gradient-eco text-primary-foreground font-semibold gap-2 shadow-eco hover:opacity-90"
                  >
                    <Send className="h-4 w-4" /> Book Now via WhatsApp
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Free consultation • No upfront charge
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-muted/30">
                <CardContent className="p-5 text-sm space-y-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <Hotel className="h-4 w-4 text-primary" /> Need a custom itinerary?
                  </div>
                  <p className="text-muted-foreground text-xs">
                    We can tailor this package — extra days, premium hotels, private transfers and more.
                  </p>
                </CardContent>
              </Card>
            </div>
          </aside>
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