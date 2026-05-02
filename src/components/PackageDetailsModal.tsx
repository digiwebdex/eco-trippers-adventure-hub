import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Calendar, Users, MapPin, Send } from "lucide-react";

interface PackageDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pkg: any | null;
  onBook: (name: string) => void;
}

export function PackageDetailsModal({ open, onOpenChange, pkg, onBook }: PackageDetailsModalProps) {
  if (!pkg) return null;

  const itinerary: string[] = Array.isArray(pkg.itinerary) ? pkg.itinerary : [];
  const includes: string[] = Array.isArray(pkg.includes) ? pkg.includes : [];
  const excludes: string[] = Array.isArray(pkg.excludes) ? pkg.excludes : [];
  const overview: string =
    pkg.overview ||
    `Discover ${pkg.name} — a ${pkg.duration || ""} curated travel experience by Eco Trippers. Enjoy comfortable stays, guided sightseeing, and seamless support from start to finish.`;
  const cancellation: string =
    pkg.cancellation_policy ||
    "• Cancellation 30+ days before departure: 90% refund.\n• 15-29 days before: 50% refund.\n• 7-14 days before: 25% refund.\n• Less than 7 days: non-refundable.\n• Visa fees and air ticket charges are non-refundable once issued.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto p-0">
        {/* ── Header: Tour Name / Country / Picture ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b">
          <div className="p-6 flex flex-col justify-center">
            <DialogTitle className="font-heading text-2xl md:text-3xl mb-2">
              {pkg.name}
            </DialogTitle>
            <DialogDescription className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">
                {pkg.country || pkg.name}
              </span>
            </DialogDescription>
            <div className="flex flex-wrap gap-3 mt-4 text-sm text-muted-foreground">
              {pkg.duration && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {pkg.duration}
                </span>
              )}
              {pkg.group_size && (
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {pkg.group_size}
                </span>
              )}
            </div>
            {pkg.price && (
              <div className="mt-4">
                <span className="text-xs text-muted-foreground">Starting from</span>
                <div className="text-2xl font-bold text-primary font-heading">
                  ৳{pkg.price}
                  <span className="text-xs text-muted-foreground font-normal ml-1">
                    per person
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="relative h-56 md:h-auto min-h-[220px] bg-muted">
            <img
              src={pkg.image_url || "/hero-banner.jpg"}
              alt={pkg.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {pkg.type && (
              <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                {pkg.type}
              </div>
            )}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="flex flex-wrap h-auto justify-start gap-2 bg-transparent p-0">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Overview</TabsTrigger>
              <TabsTrigger value="itinerary" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Itinerary</TabsTrigger>
              <TabsTrigger value="inclusion" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Inclusion</TabsTrigger>
              <TabsTrigger value="exclusion" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Exclusion</TabsTrigger>
              <TabsTrigger value="cancellation" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Cancellation Policy</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <p className="text-sm leading-relaxed whitespace-pre-line text-foreground/90">
                {overview}
              </p>
              {pkg.departure && (
                <p className="mt-4 text-sm"><span className="font-semibold">Departure:</span> {pkg.departure}</p>
              )}
              {pkg.deadline && (
                <p className="text-sm"><span className="font-semibold">Booking Deadline:</span> {pkg.deadline}</p>
              )}
            </TabsContent>

            <TabsContent value="itinerary" className="mt-6">
              {itinerary.length === 0 ? (
                <p className="text-sm text-muted-foreground">Detailed itinerary will be shared upon booking. Contact us for the day-wise plan.</p>
              ) : (
                <ol className="space-y-3">
                  {itinerary.map((day, idx) => {
                    const match = day.match(/^(Day[\s-]*\d+)\s*[:\-]?\s*(.*)$/i);
                    const label = match ? match[1] : `Day ${idx + 1}`;
                    const text = match ? match[2] : day;
                    return (
                      <li key={idx} className="flex gap-3 items-start border-l-2 border-primary pl-3">
                        <span className="font-semibold text-primary min-w-[60px]">{label}</span>
                        <span className="text-sm text-foreground/90">{text}</span>
                      </li>
                    );
                  })}
                </ol>
              )}
            </TabsContent>

            <TabsContent value="inclusion" className="mt-6">
              {includes.length === 0 ? (
                <p className="text-sm text-muted-foreground">No inclusion details listed.</p>
              ) : (
                <ul className="space-y-2">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>

            <TabsContent value="exclusion" className="mt-6">
              {excludes.length === 0 ? (
                <p className="text-sm text-muted-foreground">No exclusion details listed.</p>
              ) : (
                <ul className="space-y-2">
                  {excludes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <XCircle className="h-4 w-4 text-destructive/70 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>

            <TabsContent value="cancellation" className="mt-6">
              <p className="text-sm leading-relaxed whitespace-pre-line text-foreground/90">
                {cancellation}
              </p>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-end gap-3 border-t pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
            <Button
              onClick={() => {
                onOpenChange(false);
                onBook(pkg.name);
              }}
              className="bg-gradient-eco text-primary-foreground font-semibold gap-2 shadow-eco"
            >
              <Send className="h-4 w-4" />
              Book This Package
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}