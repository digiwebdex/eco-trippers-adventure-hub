import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCrudTable, type FieldDef } from "@/components/admin/AdminCrudTable";

export const Route = createFileRoute("/admin/visa")({
  component: AdminVisa,
});

const fields: FieldDef[] = [
  { name: "name", label: "Country Name", type: "text", required: true },
  { name: "flag", label: "Flag Emoji", type: "text", placeholder: "e.g. 🇯🇵" },
  { name: "price", label: "Starting Price (BDT)", type: "text" },
  { name: "processing_time", label: "Processing Time", type: "text", placeholder: "e.g. 5-7 days" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_active", label: "Active", type: "switch" },
];

function AdminVisa() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data: rows } = await supabase.from("visa_countries").select("*").order("sort_order");
    setData(rows || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading mb-6">Visa Countries</h2>
      <AdminCrudTable title="Visa Countries" table="visa_countries" fields={fields} data={data} loading={loading} onRefresh={fetch} displayFields={["name", "price"]} />
    </div>
  );
}
