import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, GripVertical, X, ArrowUp, ArrowDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "switch" | "array" | "image" | "date" | "select" | "itinerary";
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

interface Props {
  title: string;
  table: string;
  fields: FieldDef[];
  data: any[];
  loading: boolean;
  onRefresh: () => void;
  displayFields?: string[];
}

export function AdminCrudTable({ title, table, fields, data, loading, onRefresh, displayFields }: Props) {
  const [editItem, setEditItem] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const visibleFields = displayFields || fields.slice(0, 3).map(f => f.name);

  const openNew = () => {
    const defaults: Record<string, any> = {};
    fields.forEach(f => {
      if (f.type === "switch") defaults[f.name] = true;
      else if (f.type === "number") defaults[f.name] = 0;
      else if (f.type === "array") defaults[f.name] = [];
      else if (f.type === "itinerary") defaults[f.name] = [];
      else defaults[f.name] = "";
    });
    setFormData(defaults);
    setIsNew(true);
    setEditItem(null);
    setDialogOpen(true);
  };

  const openEdit = (item: any) => {
    const fd: Record<string, any> = {};
    fields.forEach(f => {
      if (f.type === "itinerary") {
        fd[f.name] = Array.isArray(item[f.name]) ? item[f.name] : [];
      } else {
        fd[f.name] = item[f.name] ?? "";
      }
    });
    setFormData(fd);
    setEditItem(item);
    setIsNew(false);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: Record<string, any> = {};
      fields.forEach(f => {
        let val = formData[f.name];
        if (f.type === "number") val = Number(val) || 0;
        if (f.type === "array" && typeof val === "string") {
          val = val.split("\n").map((s: string) => s.trim()).filter(Boolean);
        }
        if (f.type === "itinerary") {
          const days = Array.isArray(val) ? val : [];
          val = days
            .map((d: any, i: number) => {
              const title = (d?.title || "").trim();
              const desc = (d?.description || "").trim();
              if (!title && !desc) return "";
              return `Day ${i + 1}: ${title} || ${desc}`;
            })
            .filter(Boolean);
        }
        payload[f.name] = val;
      });

      if (isNew) {
        const { error } = await (supabase.from(table as any) as any).insert(payload);
        if (error) throw error;
        toast.success("Item created successfully");
      } else {
        const { error } = await (supabase.from(table as any) as any).update(payload).eq("id", editItem.id);
        if (error) throw error;
        toast.success("Item updated successfully");
      }
      setDialogOpen(false);
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const { error } = await (supabase.from(table as any) as any).delete().eq("id", id);
      if (error) throw error;
      toast.success("Item deleted");
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || "Delete failed");
    }
  };

  const handleImageUpload = async (fieldName: string, file: File) => {
    const ext = file.name.split(".").pop();
    const path = `${table}/${Date.now()}.${ext}`;
    const { data: uploadData, error } = await supabase.storage.from("cms-images").upload(path, file);
    if (error) { toast.error("Upload failed"); return; }
    const { data: { publicUrl } } = supabase.storage.from("cms-images").getPublicUrl(path);
    setFormData(prev => ({ ...prev, [fieldName]: publicUrl }));
    toast.success("Image uploaded");
  };

  const renderField = (field: FieldDef) => {
    const val = formData[field.name];
    switch (field.type) {
      case "textarea":
        return <Textarea value={val || ""} onChange={(e) => setFormData(p => ({ ...p, [field.name]: e.target.value }))} placeholder={field.placeholder} rows={3} />;
      case "number":
        return <Input type="number" value={val || 0} onChange={(e) => setFormData(p => ({ ...p, [field.name]: e.target.value }))} />;
      case "switch":
        return <Switch checked={!!val} onCheckedChange={(c) => setFormData(p => ({ ...p, [field.name]: c }))} />;
      case "array":
        return <Textarea value={Array.isArray(val) ? val.join("\n") : val || ""} onChange={(e) => setFormData(p => ({ ...p, [field.name]: e.target.value }))} placeholder="One item per line" rows={4} />;
      case "image":
        return (
          <div className="space-y-2">
            {val && <img src={val} alt="" className="h-20 w-20 object-cover rounded" />}
            <Input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(field.name, f); }} />
            <Input value={val || ""} onChange={(e) => setFormData(p => ({ ...p, [field.name]: e.target.value }))} placeholder="Or paste image URL" />
          </div>
        );
      case "date":
        return <Input type="date" value={val || ""} onChange={(e) => setFormData(p => ({ ...p, [field.name]: e.target.value }))} />;
      case "select":
        return (
          <select className="w-full border rounded-md px-3 py-2 text-sm bg-background" value={val || ""} onChange={(e) => setFormData(p => ({ ...p, [field.name]: e.target.value }))}>
            <option value="">Select...</option>
            {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        );
      case "itinerary": {
        // Normalize: parse strings like "Day 1: Title || Description" into {title, description}
        const rawDays: any[] = Array.isArray(val) ? val : [];
        const days = rawDays.map((d: any) => {
          if (typeof d === "string") {
            const headerMatch = d.match(/^(?:Day[\s-]*\d+)\s*[:\-]?\s*(.*)$/i);
            const rest = headerMatch ? headerMatch[1] : d;
            const [titleRaw, ...descParts] = rest.split("||");
            return { title: (titleRaw || "").trim(), description: descParts.join("||").trim() };
          }
          return { title: d?.title || "", description: d?.description || "" };
        });
        const updateDays = (next: { title: string; description: string }[]) =>
          setFormData(p => ({ ...p, [field.name]: next }));
        return (
          <div className="space-y-3">
            {days.length === 0 && (
              <p className="text-xs text-muted-foreground">No days added yet. Click "Add Day" below.</p>
            )}
            {days.map((day, idx) => (
              <div key={idx} className="border rounded-lg p-3 bg-muted/30 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-primary">Day {idx + 1}</span>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      disabled={idx === 0}
                      onClick={() => {
                        const next = [...days];
                        [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                        updateDays(next);
                      }}
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      disabled={idx === days.length - 1}
                      onClick={() => {
                        const next = [...days];
                        [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
                        updateDays(next);
                      }}
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateDays(days.filter((_, i) => i !== idx))}
                    >
                      <X className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                </div>
                <Input
                  placeholder="Day title (e.g. Arrival in Tokyo)"
                  value={day.title}
                  onChange={(e) => {
                    const next = [...days];
                    next[idx] = { ...next[idx], title: e.target.value };
                    updateDays(next);
                  }}
                />
                <Textarea
                  placeholder="Detailed description shown when this day is expanded"
                  rows={3}
                  value={day.description}
                  onChange={(e) => {
                    const next = [...days];
                    next[idx] = { ...next[idx], description: e.target.value };
                    updateDays(next);
                  }}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => updateDays([...days, { title: "", description: "" }])}
            >
              <Plus className="h-3.5 w-3.5" /> Add Day
            </Button>
          </div>
        );
      }
      default:
        return <Input value={val || ""} onChange={(e) => setFormData(p => ({ ...p, [field.name]: e.target.value }))} placeholder={field.placeholder} />;
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-heading">{title}</CardTitle>
          <Button onClick={openNew} size="sm" className="gap-1"><Plus className="h-4 w-4" /> Add New</Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : data.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No items yet. Click "Add New" to create one.</div>
          ) : (
            <div className="space-y-2">
              {data.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border bg-background hover:bg-accent/50 transition-colors">
                  {item.image_url && <img src={item.image_url} alt="" className="h-10 w-10 rounded object-cover shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{item[visibleFields[0]] || item.title || item.name || item.question || "—"}</div>
                    {visibleFields[1] && <div className="text-xs text-muted-foreground truncate">{String(item[visibleFields[1]] || "").substring(0, 80)}</div>}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? "Add New" : "Edit"} {title.replace(/s$/, "")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {fields.map(field => (
              <div key={field.name} className="space-y-1.5">
                <Label>{field.label}</Label>
                {renderField(field)}
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} disabled={saving} className="flex-1">
                {saving ? "Saving..." : isNew ? "Create" : "Update"}
              </Button>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
