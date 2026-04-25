import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCrudTable, type FieldDef } from "@/components/admin/AdminCrudTable";

export const Route = createFileRoute("/admin/offers")({
  component: AdminOffers,
});

const fields: FieldDef[] = [
  { name: "message", label: "Offer Message", type: "textarea", required: true },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_active", label: "Active", type: "switch" },
];

function AdminOffers() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data: rows } = await supabase
      .from("offers")
      .select("*")
      .order("sort_order");
    setData(rows || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading mb-6">Latest Offers</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Manage the scrolling offers shown in the top bar across the site. Use emojis to make them stand out.
      </p>
      <AdminCrudTable
        title="Offers"
        table="offers"
        fields={fields}
        data={data}
        loading={loading}
        onRefresh={fetch}
        displayFields={["message"]}
      />
    </div>
  );
}
