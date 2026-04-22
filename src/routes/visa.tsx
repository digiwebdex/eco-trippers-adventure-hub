import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSiteData } from "@/hooks/useSiteData";
import { findCountryByCode, getFlagUrl } from "@/lib/countries";
import { VisaApplyForm } from "@/components/VisaApplyForm";
import { fallbackVisaCountries } from "@/lib/visaFallback";
import {
  Clock, CheckCircle, FileText, Calendar, Globe, Shield,
  ArrowLeft, MapPin, Stamp, Wallet, AlertCircle,
} from "lucide-react";

const searchSchema = z.object({
  country: z.string().optional(),
});

export const Route = createFileRoute("/visa")({
  validateSearch: zodValidator(searchSchema),
  head: ({ match }) => {
    const code = (match.search as { country?: string })?.country?.toUpperCase() || "";
    const title = code
      ? `${code} Visa Application — Eco Trippers`
      : "Visa Services — Eco Trippers";
    return {
      meta: [
        { title },
        {
          name: "description",
          content:
            "Apply for your visa with Eco Trippers. Expert processing, document support and high approval rates from Bangladesh.",
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: "Expert visa processing with high approval rates from Bangladesh.",
        },
      ],
    };
  },
  component: VisaDetailPage,
});

function splitLines(value?: string): string[] {
  return (value || "")
    .split(/\r?\n|•|\u2022/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function VisaDetailPage() {
  const { country: code } = Route.useSearch();
  const { visaCountries: dbVisaCountries, loading } = useSiteData();
  // Always have something to render even when DB is empty.
  const visaCountries = dbVisaCountries.length ? dbVisaCountries : fallbackVisaCountries;

  const country = useMemo(
    () => findCountryByCode(visaCountries, code || ""),
    [visaCountries, code]
  );

  // Empty / not-selected state — show country picker
  if (!code || (!loading && !country)) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Select your destination</h1>
          <p className="text-muted-foreground mb-8">
            {code && !country
              ? `We couldn't find visa info for "${code}". Pick a country below.`
              : "Choose a country to view visa details, requirements and pricing."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {visaCountries.map((c: any) => (
              <Link
                key={c.id || c.name}
                to="/visa"
                search={{ country: (c.country_code || "").toUpperCase() || c.name.toLowerCase().slice(0, 2).toUpperCase() }}
              >
                <Card className="hover-lift border-border/50 group cursor-pointer">
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
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  if (loading || !country) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-20 text-center text-muted-foreground">Loading visa details…</main>
        <Footer />
      </div>
    );
  }

  const requirements = splitLines(country.requirements);
  const documents = splitLines(country.documents);
  const description =
    country.description ||
    `Get your ${country.name} visa processed end-to-end by Eco Trippers — Bangladesh's trusted travel partner since 2019. Our experts handle complete documentation, embassy bookings, and follow-up to maximise your approval chances.`;

  // Sensible defaults so the page always looks complete
  const defaultDocs = [
    "Valid passport (min 6 months validity, 2 blank pages)",
    "Recent passport-size photographs (white background)",
    "Bank statement (last 6 months)",
    "NID / birth certificate copy",
    "Trade license / job letter / student ID",
    "Hotel booking & return air ticket",
  ];
  const defaultReqs = [
    "Bangladeshi passport holder",
    "Sufficient funds for the duration of stay",
    "Confirmed travel itinerary",
    "No prior visa rejections (preferred)",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero strip */}
      <section className="relative bg-gradient-eco text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <div className="flex flex-wrap items-center gap-5">
            <img
              src={getFlagUrl(country.name, 160)}
              alt={`${country.name} flag`}
              className="w-20 h-14 md:w-24 md:h-16 rounded-md object-cover shadow-lg ring-2 ring-white/30"
            />
            <div className="min-w-0">
              <p className="text-sm uppercase tracking-wider opacity-80">Visa Application</p>
              <h1 className="text-3xl md:text-5xl font-heading font-bold">{country.name}</h1>
              <div className="flex flex-wrap gap-3 mt-3 text-sm">
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur px-3 py-1 rounded-full">
                  <Clock className="h-3.5 w-3.5" /> {country.processing_time || "5–7 days"}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur px-3 py-1 rounded-full">
                  <Wallet className="h-3.5 w-3.5" /> From {country.price === "0" ? "Free" : `৳${country.price}`}
                </span>
                {country.visa_type && (
                  <span className="inline-flex items-center gap-1.5 bg-eco-gold text-eco-gold-foreground px-3 py-1 rounded-full font-semibold">
                    <Stamp className="h-3.5 w-3.5" /> {country.visa_type}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two-column layout */}
      <main className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT — visa info */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-border/60">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-heading font-bold mb-3 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" /> About {country.name} Visa
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{description}</p>
              </CardContent>
            </Card>

            {/* Quick facts grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <FactBox icon={Clock} label="Processing" value={country.processing_time || "5–7 days"} />
              <FactBox icon={Calendar} label="Validity" value={country.validity || "90 days"} />
              <FactBox icon={MapPin} label="Max Stay" value={country.stay_duration || "30 days"} />
              <FactBox icon={Stamp} label="Entry" value={country.entry_type || "Single"} />
            </div>

            <Card className="border-border/60">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" /> Required Documents
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                  {(documents.length ? documents : defaultDocs).map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> Eligibility & Requirements
                </h2>
                <ul className="space-y-3">
                  {(requirements.length ? requirements : defaultReqs).map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-eco-gold/40 bg-eco-gold/10">
              <CardContent className="p-6 flex gap-3">
                <AlertCircle className="h-5 w-5 text-eco-gold-foreground shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold mb-1">Important Notes</p>
                  <p className="text-muted-foreground">
                    Visa fees are starting prices and may vary based on visa type and embassy charges.
                    Final approval is at the discretion of the issuing embassy. Eco Trippers ensures
                    expert document preparation but cannot guarantee approval.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT — sticky apply form */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <Card className="border-border/60 shadow-eco">
                <CardContent className="p-6">
                  <div className="mb-5 pb-5 border-b border-border/60">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-2">Apply Now</Badge>
                    <h3 className="font-heading text-xl font-bold">{country.name} Visa Application</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Starting from <span className="font-bold text-primary">{country.price === "0" ? "Free" : `৳${country.price}`}</span>
                    </p>
                  </div>
                  <VisaApplyForm
                    countryName={`${country.name} Visa`}
                    defaultVisaType={country.visa_type || "Tourist"}
                  />
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function FactBox({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card p-4 text-center">
      <Icon className="h-5 w-5 text-primary mx-auto mb-2" />
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold mt-0.5">{value}</p>
    </div>
  );
}