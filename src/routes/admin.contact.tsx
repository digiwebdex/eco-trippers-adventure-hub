import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Trash2, Mail, MailOpen, Phone, Calendar } from "lucide-react";

export const Route = createFileRoute("/admin/contact")({
  component: AdminContact,
});

function AdminContact() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    setSubmissions(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const toggleRead = async (id: string, current: boolean) => {
    const { error } = await supabase.from("contact_submissions").update({ is_read: !current }).eq("id", id);
    if (error) return toast.error(error.message);
    fetchData();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    fetchData();
  };

  const filtered = filter === "unread" ? submissions.filter(s => !s.is_read) : submissions;
  const unreadCount = submissions.filter(s => !s.is_read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-heading">Contact Submissions</h2>
        <div className="flex gap-2">
          <Button size="sm" variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>All ({submissions.length})</Button>
          <Button size="sm" variant={filter === "unread" ? "default" : "outline"} onClick={() => setFilter("unread")}>Unread ({unreadCount})</Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : filtered.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">No submissions yet.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((s) => (
            <Card key={s.id} className={!s.is_read ? "border-primary/50" : ""}>
              <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <CardTitle className="text-base">{s.name}</CardTitle>
                    {!s.is_read && <Badge>New</Badge>}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 flex flex-wrap items-center gap-3">
                    <a href={`mailto:${s.email}`} className="flex items-center gap-1 hover:text-primary"><Mail className="h-3 w-3" />{s.email}</a>
                    {s.phone && <a href={`tel:${s.phone}`} className="flex items-center gap-1 hover:text-primary"><Phone className="h-3 w-3" />{s.phone}</a>}
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(s.created_at).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button size="icon" variant="ghost" onClick={() => toggleRead(s.id, s.is_read)} title={s.is_read ? "Mark unread" : "Mark read"}>
                    {s.is_read ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => remove(s.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {s.subject && <div className="font-medium text-sm mb-1">{s.subject}</div>}
                <p className="text-sm text-foreground/80 whitespace-pre-wrap">{s.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
