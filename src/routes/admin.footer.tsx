import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/footer")({
  component: AdminFooter,
});

interface FooterData {
  tagline: string;
  copyright: string;
  tagline_right: string;
  services_list: string[];
  quick_links: { label: string; href: string }[];
}

const defaultData: FooterData = {
  tagline: "",
  copyright: "",
  tagline_right: "",
  services_list: [],
  quick_links: [],
};

function AdminFooter() {
  const [data, setData] = useState<FooterData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    const { data: row } = await supabase.from("footer_content").select("*").eq("section_key", "main").maybeSingle();
    if (row?.content) setData({ ...defaultData, ...(row.content as any) });
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const save = async () => {
    setSaving(true);
    try {
      const { data: existing } = await supabase.from("footer_content").select("id").eq("section_key", "main").maybeSingle();
      if (existing) {
        const { error } = await supabase.from("footer_content").update({ content: data as any }).eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("footer_content").insert({ section_key: "main", content: data as any });
        if (error) throw error;
      }
      toast.success("Footer saved");
    } catch (e: any) {
      toast.error(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold font-heading">Footer Content</h2>

      <Card>
        <CardHeader><CardTitle className="text-lg">Tagline & Copyright</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Tagline (left column)</Label>
            <Textarea value={data.tagline} onChange={(e) => setData(p => ({ ...p, tagline: e.target.value }))} rows={3} />
          </div>
          <div>
            <Label>Copyright text</Label>
            <Input value={data.copyright} onChange={(e) => setData(p => ({ ...p, copyright: e.target.value }))} />
          </div>
          <div>
            <Label>Right-side tagline</Label>
            <Input value={data.tagline_right} onChange={(e) => setData(p => ({ ...p, tagline_right: e.target.value }))} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Quick Links</CardTitle>
          <Button size="sm" variant="outline" onClick={() => setData(p => ({ ...p, quick_links: [...p.quick_links, { label: "", href: "#" }] }))}>
            <Plus className="h-4 w-4 mr-1" /> Add Link
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.quick_links.map((link, i) => (
            <div key={i} className="flex gap-2">
              <Input placeholder="Label" value={link.label} onChange={(e) => {
                const arr = [...data.quick_links]; arr[i] = { ...arr[i], label: e.target.value }; setData(p => ({ ...p, quick_links: arr }));
              }} />
              <Input placeholder="URL" value={link.href} onChange={(e) => {
                const arr = [...data.quick_links]; arr[i] = { ...arr[i], href: e.target.value }; setData(p => ({ ...p, quick_links: arr }));
              }} />
              <Button size="icon" variant="ghost" onClick={() => setData(p => ({ ...p, quick_links: p.quick_links.filter((_, x) => x !== i) }))}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          {data.quick_links.length === 0 && <p className="text-sm text-muted-foreground">No quick links yet.</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Services List</CardTitle></CardHeader>
        <CardContent>
          <Label className="mb-2 block">One service per line</Label>
          <Textarea
            rows={6}
            value={data.services_list.join("\n")}
            onChange={(e) => setData(p => ({ ...p, services_list: e.target.value.split("\n").map(s => s.trim()).filter(Boolean) }))}
          />
        </CardContent>
      </Card>

      <Button onClick={save} disabled={saving} size="lg">{saving ? "Saving..." : "Save Footer"}</Button>
    </div>
  );
}
