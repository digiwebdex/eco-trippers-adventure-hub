import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Globe, Package, Image, BookOpen, MessageSquare, HelpCircle, Settings, Navigation, PanelBottom, Inbox } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const cards = [
    { to: "/admin/content", icon: FileText, label: "Site Content", desc: "Edit hero, about, contact info" },
    { to: "/admin/navigation", icon: Navigation, label: "Navigation", desc: "Manage header menu items" },
    { to: "/admin/footer", icon: PanelBottom, label: "Footer", desc: "Edit footer columns & links" },
    { to: "/admin/services", icon: Settings, label: "Services", desc: "Manage travel services" },
    { to: "/admin/visa", icon: Globe, label: "Visa Countries", desc: "Manage visa destinations" },
    { to: "/admin/packages", icon: Package, label: "Packages", desc: "Manage tour packages" },
    { to: "/admin/gallery", icon: Image, label: "Gallery", desc: "Manage photo gallery" },
    { to: "/admin/blog", icon: BookOpen, label: "Blog Posts", desc: "Manage blog articles" },
    { to: "/admin/testimonials", icon: MessageSquare, label: "Testimonials", desc: "Manage client reviews" },
    { to: "/admin/faqs", icon: HelpCircle, label: "FAQs", desc: "Manage FAQ items" },
    { to: "/admin/contact", icon: Inbox, label: "Contact Inbox", desc: "View form submissions" },
  ] as const;

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link key={c.to} to={c.to}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{c.label}</h3>
                  <p className="text-xs text-muted-foreground">{c.desc}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
