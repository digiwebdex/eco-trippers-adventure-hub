import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCrudTable, type FieldDef } from "@/components/admin/AdminCrudTable";

export const Route = createFileRoute("/admin/navigation")({
  component: AdminNavigation,
});

const fields: FieldDef[] = [
  { name: "label", label: "Label", type: "text", required: true, placeholder: "e.g. About Us" },
  { name: "url", label: "URL / Anchor", type: "text", required: true, placeholder: "e.g. #about or /about" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "open_in_new_tab", label: "Open in new tab", type: "switch" },
  { name: "is_active", label: "Active", type: "switch" },
];

function AdminNavigation() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data: rows } = await supabase.from("navigation_items").select("*").order("sort_order");
    setData(rows || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading mb-6">Navigation Menu</h2>
      <p className="text-sm text-muted-foreground mb-4">Manage menu items shown in the website header. Use anchors like <code>#services</code> for sections on the homepage, or full paths like <code>/about</code> for routes.</p>
      <AdminCrudTable title="Menu Items" table="navigation_items" fields={fields} data={data} loading={loading} onRefresh={fetch} displayFields={["label", "url"]} />
    </div>
  );
}
