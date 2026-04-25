import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCrudTable, type FieldDef } from "@/components/admin/AdminCrudTable";

export const Route = createFileRoute("/admin/videos")({
  component: AdminVideos,
});

const fields: FieldDef[] = [
  { name: "video_id", label: "YouTube Video ID (e.g. rrGiK4XT54Y)", type: "text", required: true },
  { name: "title", label: "Title", type: "text" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_active", label: "Active", type: "switch" },
];

function AdminVideos() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data: rows } = await supabase
      .from("youtube_videos")
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
      <h2 className="text-2xl font-bold font-heading mb-6">YouTube Videos</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Manage the videos shown in the "Watch Our Latest Videos" section. Paste only the
        video ID from the YouTube URL (the part after <code>v=</code> or <code>/embed/</code>).
      </p>
      <AdminCrudTable
        title="Videos"
        table="youtube_videos"
        fields={fields}
        data={data}
        loading={loading}
        onRefresh={fetch}
        displayFields={["title", "video_id"]}
      />
    </div>
  );
}