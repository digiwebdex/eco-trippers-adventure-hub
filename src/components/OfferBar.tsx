import { Megaphone, Sparkles } from "lucide-react";

const offers = [
  "🎉 Early Bird Discount: Save up to 15% on Umrah Packages — Book Before April 30!",
  "✈️ Special Thailand Tour: Starting from ৳45,000 — Limited Seats Available",
  "🕌 Hajj 2026 Registration Open — Reserve Your Spot Today",
  "🌴 Bali Honeymoon Package — Free Airport Transfer & Candle Light Dinner",
  "📞 Call +880 1894-071070 for Exclusive Group Discounts",
  "🛂 Visa Processing in 7 Days — 100% Success Rate",
];

export function OfferBar() {
  // Duplicate the list so the marquee loops seamlessly
  const items = [...offers, ...offers];

  return (
    <div className="marquee-container relative bg-gradient-to-r from-eco-dark via-primary to-eco-dark text-primary-foreground overflow-hidden border-b border-eco-gold/30">
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center gap-2 bg-eco-gold text-eco-gold-foreground px-3 sm:px-4 py-2 font-semibold text-xs sm:text-sm shadow-lg">
        <Megaphone className="h-4 w-4 animate-pulse" />
        <span className="hidden sm:inline">LATEST OFFERS</span>
        <span className="sm:hidden">OFFERS</span>
      </div>
      <div className="flex whitespace-nowrap py-2 pl-28 sm:pl-40">
        <div className="animate-marquee flex shrink-0 items-center gap-10">
          {items.map((offer, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-sm font-medium">
              <Sparkles className="h-3.5 w-3.5 text-eco-gold shrink-0" />
              {offer}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
