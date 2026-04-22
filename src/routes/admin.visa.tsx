import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCrudTable, type FieldDef } from "@/components/admin/AdminCrudTable";

export const Route = createFileRoute("/admin/visa")({
  component: AdminVisa,
});

const fields: FieldDef[] = [
  { name: "name", label: "Country Name", type: "text", required: true },
  { name: "country_code", label: "Country Code (ISO-2, lowercase)", type: "text", placeholder: "e.g. kr, jp, my" },
  { name: "flag", label: "Flag Emoji (optional)", type: "text", placeholder: "e.g. 🇯🇵" },
  { name: "price", label: "Starting Price (BDT)", type: "text" },
  { name: "processing_time", label: "Processing Time", type: "text", placeholder: "e.g. 5-7 days" },
  { name: "visa_type", label: "Visa Type", type: "text", placeholder: "Tourist / Business / Student" },
  { name: "validity", label: "Visa Validity", type: "text", placeholder: "e.g. 90 days" },
  { name: "stay_duration", label: "Max Stay", type: "text", placeholder: "e.g. 30 days" },
  { name: "entry_type", label: "Entry Type", type: "text", placeholder: "Single / Multiple" },
  { name: "description", label: "Description / About", type: "textarea", placeholder: "Overview shown on detail page" },
  { name: "requirements", label: "Eligibility (one per line)", type: "textarea", placeholder: "Bangladeshi passport holder\nSufficient funds..." },
  { name: "documents", label: "Required Documents (one per line)", type: "textarea", placeholder: "Valid passport\nBank statement..." },
  { name: "hero_image", label: "Hero Image URL (optional)", type: "text" },
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
