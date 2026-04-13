import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Eye, Heart, Award, Globe } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Eco Trippers" },
      { name: "description", content: "Learn about Eco Trippers, a Bangladesh-based travel agency founded in 2019, specializing in visa processing, tours, and travel services." },
      { property: "og:title", content: "About Us — Eco Trippers" },
      { property: "og:description", content: "Your trusted travel partner since 2019. Founded by Monabbir Ahammed Khan and Bidarul Islam." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-eco text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">About Eco Trippers</h1>
            <p className="mt-4 text-lg text-primary-foreground/80">Your trusted travel and visa consultancy from Banani, Dhaka — helping clients plan international journeys since 2019.</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading title="Our Story" subtitle="" centered={false} />
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
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
                  <Target className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide reliable, stress-free travel solutions that empower every Bangladeshi traveler to explore the world confidently. We believe everyone deserves a seamless travel experience.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-lift border-border/50">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-full bg-eco-gold text-eco-gold-foreground flex items-center justify-center mb-4">
                  <Eye className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become Bangladesh's leading travel and visa consultancy, known for exceptional service, transparency, and a commitment to making travel dreams come true.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Our Values" subtitle="The principles that guide everything we do" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Customer First", desc: "Every decision we make is centered around our customers' happiness and satisfaction." },
              { icon: Award, title: "Excellence", desc: "We maintain the highest standards in every service we provide." },
              { icon: Users, title: "Trust", desc: "Built on transparency, honesty, and reliable service delivery." },
              { icon: Globe, title: "Global Reach", desc: "Connecting Bangladesh to the world with our extensive network." },
            ].map((v) => (
              <div key={v.title} className="text-center p-6 rounded-xl bg-card border border-border/50 hover-lift">
                <div className="w-12 h-12 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-eco-light">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Meet Our Founders" subtitle="The passionate leaders behind Eco Trippers" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              { name: "Monabbir Ahammed Khan", role: "Co-Founder & CEO", desc: "With a deep passion for travel and years of experience in the tourism industry, Monabbir leads Eco Trippers' vision of making travel accessible to all." },
              { name: "Bidarul Islam", role: "Co-Founder & COO", desc: "Bidarul brings operational excellence and customer-first thinking to ensure every traveler receives world-class service and support." },
            ].map((member) => (
              <Card key={member.name} className="hover-lift border-border/50 text-center">
                <CardContent className="p-8">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold font-heading mb-4">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <h3 className="font-heading text-lg font-bold">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
