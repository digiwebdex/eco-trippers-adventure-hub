import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCrudTable, type FieldDef } from "@/components/admin/AdminCrudTable";

export const Route = createFileRoute("/admin/hero-slides")({
  component: AdminHeroSlides,
});

const fields: FieldDef[] = [
  { name: "image_url", label: "Background Image", type: "image", required: true },
  { name: "badge", label: "Badge Text (top pill)", type: "text", placeholder: "e.g. 🏝️ Tropical Paradise Awaits" },
  { name: "title_line1", label: "Title — Line 1", type: "text", placeholder: "e.g. Escape to" },
  { name: "title_line2", label: "Title — Line 2 (gradient)", type: "text", placeholder: "e.g. Paradise." },
  { name: "subtitle", label: "Subtitle", type: "textarea" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_active", label: "Active", type: "switch" },
];

function AdminHeroSlides() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data: rows } = await supabase.from("hero_slides").select("*").order("sort_order");
    setData(rows || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading mb-6">Hero Slider</h2>
      <AdminCrudTable
        title="Hero Slides"
        table="hero_slides"
        fields={fields}
        data={data}
        loading={loading}
        onRefresh={fetch}
        displayFields={["title_line1", "title_line2", "badge"]}
      />
    </div>
  );
}