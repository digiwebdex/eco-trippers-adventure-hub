import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCrudTable, type FieldDef } from "@/components/admin/AdminCrudTable";

export const Route = createFileRoute("/admin/visa-steps")({
  component: AdminVisaSteps,
});

const fields: FieldDef[] = [
  { name: "icon", label: "Icon", type: "select", options: ["Search", "FileText", "Send", "CheckCircle"] },
  { name: "title", label: "Step Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_active", label: "Active", type: "switch" },
];

function AdminVisaSteps() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data: rows } = await supabase.from("visa_steps").select("*").order("sort_order");
    setData(rows || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading mb-6">Visa Process Steps</h2>
      <AdminCrudTable
        title="Visa Steps"
        table="visa_steps"
        fields={fields}
        data={data}
        loading={loading}
        onRefresh={fetch}
        displayFields={["title", "description"]}
      />
    </div>
  );
}