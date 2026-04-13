import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCrudTable, type FieldDef } from "@/components/admin/AdminCrudTable";

export const Route = createFileRoute("/admin/testimonials")({
  component: AdminTestimonials,
});

const fields: FieldDef[] = [
  { name: "name", label: "Client Name", type: "text", required: true },
  { name: "text", label: "Testimonial Text", type: "textarea" },
  { name: "rating", label: "Rating (1-5)", type: "number" },
  { name: "is_active", label: "Active", type: "switch" },
  { name: "sort_order", label: "Sort Order", type: "number" },
];

function AdminTestimonials() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data: rows } = await supabase.from("testimonials").select("*").order("sort_order");
    setData(rows || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading mb-6">Testimonials</h2>
      <AdminCrudTable title="Testimonials" table="testimonials" fields={fields} data={data} loading={loading} onRefresh={fetch} displayFields={["name", "text"]} />
    </div>
  );
}
