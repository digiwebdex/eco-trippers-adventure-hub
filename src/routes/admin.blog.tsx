import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCrudTable, type FieldDef } from "@/components/admin/AdminCrudTable";

export const Route = createFileRoute("/admin/blog")({
  component: AdminBlog,
});

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "excerpt", label: "Excerpt", type: "textarea" },
  { name: "content", label: "Full Content", type: "textarea" },
  { name: "image_url", label: "Image", type: "image" },
  { name: "category", label: "Category", type: "select", options: ["Visa Guide", "Travel Tips", "Destination", "Umrah", "General"] },
  { name: "author", label: "Author", type: "text" },
  { name: "published_date", label: "Published Date", type: "date" },
  { name: "is_published", label: "Published", type: "switch" },
  { name: "sort_order", label: "Sort Order", type: "number" },
];

function AdminBlog() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data: rows } = await supabase.from("blog_posts").select("*").order("sort_order");
    setData(rows || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading mb-6">Blog Posts</h2>
      <AdminCrudTable title="Blog Posts" table="blog_posts" fields={fields} data={data} loading={loading} onRefresh={fetch} displayFields={["title", "category"]} />
    </div>
  );
}
