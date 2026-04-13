import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, User } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Travel Blog — Eco Trippers" },
      { name: "description", content: "Travel tips, visa guides, and destination spotlights from Eco Trippers." },
      { property: "og:title", content: "Travel Blog — Eco Trippers" },
      { property: "og:description", content: "Expert travel tips, visa guides, and inspiration for your next adventure." },
    ],
  }),
  component: BlogPage,
});

const posts = [
  { title: "Top 10 Visa-Free Countries for Bangladeshi Passport Holders", excerpt: "Discover amazing destinations you can visit without the hassle of visa processing. From the Maldives to Nepal, these countries welcome Bangladeshi travelers with open arms.", image: "/dest-maldives.jpg", date: "March 15, 2026", author: "Eco Trippers", category: "Visa Guide" },
  { title: "Complete Guide to Japan Tourist Visa from Bangladesh", excerpt: "Everything you need to know about applying for a Japan tourist visa, including required documents, processing time, fees, and tips for a successful application.", image: "/dest-japan.jpg", date: "March 8, 2026", author: "Eco Trippers", category: "Visa Guide" },
  { title: "Budget-Friendly Thailand Trip Planning", excerpt: "How to plan an amazing Thailand vacation without breaking the bank. From affordable hotels to street food and free attractions, here's your complete budget guide.", image: "/dest-thailand.jpg", date: "February 28, 2026", author: "Eco Trippers", category: "Travel Tips" },
  { title: "Malaysia: The Perfect First International Trip", excerpt: "Why Malaysia should be your first international destination. Easy visa process, affordable prices, diverse culture, and stunning natural beauty.", image: "/dest-malaysia.jpg", date: "February 20, 2026", author: "Eco Trippers", category: "Destination" },
  { title: "5 Things to Know Before Your First Umrah", excerpt: "Essential tips for first-time Umrah pilgrims. From packing essentials to rituals, here's everything you need to prepare for a meaningful spiritual journey.", image: "/dest-umrah.jpg", date: "February 12, 2026", author: "Eco Trippers", category: "Umrah" },
  { title: "London on a Budget: A Bangladeshi Traveler's Guide", excerpt: "Explore London without spending a fortune. Free museums, affordable transport, and budget-friendly dining options for the smart Bangladeshi traveler.", image: "/dest-london.jpg", date: "February 5, 2026", author: "Eco Trippers", category: "Travel Tips" },
];

function BlogPage() {
  return (
    <>
      <section className="relative py-20 bg-gradient-eco text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-heading">Travel Blog</h1>
          <p className="mt-4 text-lg text-primary-foreground/80">Tips, guides, and inspiration for your next adventure.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
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
                  <h2 className="font-heading font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                  <span className="inline-flex items-center text-sm text-primary font-medium gap-1 cursor-pointer hover:underline">
                    Read More <ArrowRight className="h-3 w-3" />
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
