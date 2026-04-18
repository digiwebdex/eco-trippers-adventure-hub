import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, FileText, Globe, Package,
  Image, BookOpen, MessageSquare, HelpCircle, Inbox,
  LogOut, Menu, X, Settings, Navigation, PanelBottom
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/content", icon: FileText, label: "Site Content" },
  { to: "/admin/navigation", icon: Navigation, label: "Navigation" },
  { to: "/admin/footer", icon: PanelBottom, label: "Footer" },
  { to: "/admin/services", icon: Settings, label: "Services" },
  { to: "/admin/visa", icon: Globe, label: "Visa Countries" },
  { to: "/admin/packages", icon: Package, label: "Packages" },
  { to: "/admin/gallery", icon: Image, label: "Gallery" },
  { to: "/admin/blog", icon: BookOpen, label: "Blog Posts" },
  { to: "/admin/testimonials", icon: MessageSquare, label: "Testimonials" },
  { to: "/admin/faqs", icon: HelpCircle, label: "FAQs" },
  { to: "/admin/contact", icon: Inbox, label: "Contact Inbox" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Skip auth check for login page
  const isLoginPage = location.pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    navigate({ to: "/admin/login" });
    return null;
  }

  return (
    <div className="min-h-screen flex bg-muted">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Eco Trippers" className="h-8 w-auto" />
            <span className="font-heading font-bold text-sm">Admin</span>
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border">
          <div className="text-xs text-muted-foreground truncate mb-2 px-3">{user.email}</div>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-heading font-bold text-lg">Eco Trippers Admin</h1>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
