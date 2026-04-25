import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/content")({
  component: AdminContent,
});

interface SectionData {
  [key: string]: string;
}

const sections = [
  {
    key: "hero",
    title: "Hero Section",
    fields: [
      { name: "badge", label: "Badge Text", type: "text" },
      { name: "title_line1", label: "Title Line 1", type: "text" },
      { name: "title_line2", label: "Title Line 2 (gradient)", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      { name: "image_url", label: "Background Image URL", type: "text" },
    ],
  },
  {
    key: "why_eco",
    title: "Why Eco Trippers Section",
    fields: [
      { name: "heading", label: "Section Heading", type: "text" },
      { name: "subtitle", label: "Section Subtitle", type: "textarea" },
      { name: "item1_title", label: "Reason 1 — Title", type: "text" },
      { name: "item1_desc", label: "Reason 1 — Description", type: "textarea" },
      { name: "item2_title", label: "Reason 2 — Title", type: "text" },
      { name: "item2_desc", label: "Reason 2 — Description", type: "textarea" },
      { name: "item3_title", label: "Reason 3 — Title", type: "text" },
      { name: "item3_desc", label: "Reason 3 — Description", type: "textarea" },
      { name: "item4_title", label: "Reason 4 — Title", type: "text" },
      { name: "item4_desc", label: "Reason 4 — Description", type: "textarea" },
      { name: "item5_title", label: "Reason 5 — Title", type: "text" },
      { name: "item5_desc", label: "Reason 5 — Description", type: "textarea" },
      { name: "item6_title", label: "Reason 6 — Title", type: "text" },
      { name: "item6_desc", label: "Reason 6 — Description", type: "textarea" },
    ],
  },
  {
    key: "stats",
    title: "Statistics",
    fields: [
      { name: "customers", label: "Happy Customers", type: "text" },
      { name: "tours", label: "Tour Success", type: "text" },
      { name: "reviews", label: "Positive Reviews %", type: "text" },
      { name: "visa", label: "Visa Success", type: "text" },
    ],
  },
  {
    key: "contact_info",
    title: "Contact Information",
    fields: [
      { name: "address", label: "Office Address", type: "textarea" },
      { name: "phone", label: "Phone Number", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "whatsapp", label: "WhatsApp Number", type: "text" },
      { name: "office_hours", label: "Office Hours", type: "text" },
      { name: "facebook", label: "Facebook URL", type: "text" },
      { name: "instagram", label: "Instagram URL", type: "text" },
      { name: "youtube", label: "YouTube URL", type: "text" },
    ],
  },
  {
    key: "cta",
    title: "Call to Action Section",
    fields: [
      { name: "title", label: "CTA Title", type: "text" },
      { name: "subtitle", label: "CTA Subtitle", type: "textarea" },
    ],
  },
];

function AdminContent() {
  const [data, setData] = useState<Record<string, SectionData>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const fetchData = async () => {
    const { data: rows } = await supabase.from("site_content").select("*");
    const mapped: Record<string, SectionData> = {};
    rows?.forEach((r: any) => { mapped[r.section_key] = r.content as SectionData; });
    setData(mapped);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (sectionKey: string) => {
    setSaving(sectionKey);
    try {
      const content = data[sectionKey] || {};
      const { error } = await supabase
        .from("site_content")
        .upsert({ section_key: sectionKey, content }, { onConflict: "section_key" });
      if (error) throw error;
      toast.success(`${sectionKey} saved successfully`);
    } catch (err: any) {
      toast.error(err.message || "Save failed");
    } finally {
      setSaving(null);
    }
  };

  const updateField = (sectionKey: string, fieldName: string, value: string) => {
    setData(prev => ({
      ...prev,
      [sectionKey]: { ...(prev[sectionKey] || {}), [fieldName]: value },
    }));
  };

  if (loading) return <div className="text-center py-8 text-muted-foreground">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading mb-6">Site Content</h2>
      <div className="space-y-6">
        {sections.map((section) => (
          <Card key={section.key}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{section.title}</CardTitle>
              <Button size="sm" onClick={() => handleSave(section.key)} disabled={saving === section.key} className="gap-1">
                <Save className="h-4 w-4" />
                {saving === section.key ? "Saving..." : "Save"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.fields.map((field) => (
                <div key={field.name} className="space-y-1.5">
                  <Label>{field.label}</Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      value={(data[section.key]?.[field.name]) || ""}
                      onChange={(e) => updateField(section.key, field.name, e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <Input
                      value={(data[section.key]?.[field.name]) || ""}
                      onChange={(e) => updateField(section.key, field.name, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
