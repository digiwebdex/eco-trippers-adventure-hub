import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCrudTable, type FieldDef } from "@/components/admin/AdminCrudTable";

export const Route = createFileRoute("/admin/packages")({
  component: AdminPackages,
});

const fields: FieldDef[] = [
  { name: "name", label: "Package Name", type: "text", required: true },
  { name: "flag", label: "Flag Emoji", type: "text", placeholder: "e.g. 🇯🇵🇰🇷" },
  { name: "price", label: "Price (BDT)", type: "text" },
  { name: "duration", label: "Duration", type: "text", placeholder: "e.g. 7N/8D" },
  { name: "image_url", label: "Image", type: "image" },
  { name: "type", label: "Type", type: "select", options: ["Featured", "Popular", "Luxury", "Special"] },
  { name: "departure", label: "Departure", type: "text" },
  { name: "deadline", label: "Booking Deadline", type: "text" },
  { name: "group_size", label: "Group Size", type: "text" },
  { name: "includes", label: "Includes (one per line)", type: "array" },
  { name: "excludes", label: "Excludes (one per line)", type: "array" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_active", label: "Active", type: "switch" },
];

function AdminPackages() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data: rows } = await supabase.from("packages").select("*").order("sort_order");
    setData(rows || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading mb-6">Tour Packages</h2>
      <AdminCrudTable title="Packages" table="packages" fields={fields} data={data} loading={loading} onRefresh={fetch} displayFields={["name", "price"]} />
    </div>
  );
}
