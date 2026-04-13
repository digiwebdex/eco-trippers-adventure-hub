import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCrudTable, type FieldDef } from "@/components/admin/AdminCrudTable";

export const Route = createFileRoute("/admin/services")({
  component: AdminServices,
});

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "icon", label: "Icon Name", type: "text", placeholder: "e.g. FileCheck, Plane, Hotel" },
  { name: "image_url", label: "Image", type: "image" },
  { name: "features", label: "Features (one per line)", type: "array" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_active", label: "Active", type: "switch" },
];

function AdminServices() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data: rows } = await supabase.from("services").select("*").order("sort_order");
    setData(rows || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading mb-6">Services</h2>
      <AdminCrudTable title="Services" table="services" fields={fields} data={data} loading={loading} onRefresh={fetch} displayFields={["title", "description"]} />
    </div>
  );
}
