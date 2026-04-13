import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Eco Trippers" },
      { name: "description", content: "Browse travel photos and visa success stories from Eco Trippers' happy clients." },
      { property: "og:title", content: "Gallery — Eco Trippers" },
      { property: "og:description", content: "Moments from our travelers' journeys around the world." },
    ],
  }),
  component: GalleryPage,
});

const images = [
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

const categories = ["All", ...Array.from(new Set(images.map(i => i.category)))];

function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? images : images.filter(i => i.category === activeCategory);

  return (
    <>
      <section className="relative py-20 bg-gradient-eco text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-heading">Gallery</h1>
          <p className="mt-4 text-lg text-primary-foreground/80">Moments captured from our travelers' journeys around the world.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-xl cursor-pointer group ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
                onClick={() => setSelectedImage(img.src)}
              >
                <img src={img.src} alt={img.alt} loading="lazy" width={800} height={600} className="w-full h-full min-h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none shadow-none">
          {selectedImage && (
            <img src={selectedImage} alt="Gallery fullscreen" className="w-full h-auto rounded-xl" />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
