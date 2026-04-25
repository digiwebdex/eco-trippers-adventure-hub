import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCrudTable, type FieldDef } from "@/components/admin/AdminCrudTable";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGallery,
});

const fields: FieldDef[] = [
  { name: "image_url", label: "Image", type: "image", required: true },
  { name: "alt_text", label: "Alt Text", type: "text" },
  { name: "category", label: "Category", type: "select", options: ["Visa Success", "Visa Travelers"] },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_active", label: "Active", type: "switch" },
];

function AdminGallery() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data: rows } = await supabase.from("gallery_images").select("*").order("sort_order");
    setData(rows || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading mb-6">Gallery</h2>
      <AdminCrudTable title="Gallery Images" table="gallery_images" fields={fields} data={data} loading={loading} onRefresh={fetch} displayFields={["alt_text", "category"]} />
    </div>
  );
}
