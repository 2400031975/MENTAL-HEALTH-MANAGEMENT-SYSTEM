import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus, Calendar } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood?: string;
}

export const JournalEntries = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "", mood: "" });
  const [errors, setErrors] = useState({ title: "", content: "" });

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const stored = localStorage.getItem('journalEntries');
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  };

  const saveEntries = (newEntries: JournalEntry[]) => {
    localStorage.setItem('journalEntries', JSON.stringify(newEntries));
    setEntries(newEntries);
  };

  const validateForm = () => {
    const newErrors = { title: "", content: "" };
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
      isValid = false;
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
      isValid = false;
    } else if (formData.content.trim().length < 10) {
      newErrors.content = "Content must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreate = () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      content: formData.content.trim(),
      mood: formData.mood.trim() || undefined,
      date: new Date().toISOString(),
    };

    const updated = [newEntry, ...entries];
    saveEntries(updated);
    toast.success("Journal entry created successfully");
    resetForm();
  };

  const handleUpdate = () => {
    if (!editingEntry || !validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const updated = entries.map(entry =>
      entry.id === editingEntry.id
        ? { ...entry, title: formData.title.trim(), content: formData.content.trim(), mood: formData.mood.trim() }
        : entry
    );

    saveEntries(updated);
    toast.success("Journal entry updated successfully");
    resetForm();
  };

  const handleDelete = (id: string) => {
    const updated = entries.filter(entry => entry.id !== id);
    saveEntries(updated);
    toast.success("Journal entry deleted");
  };

  const openEditDialog = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setFormData({ title: entry.title, content: entry.content, mood: entry.mood || "" });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", mood: "" });
    setErrors({ title: "", content: "" });
    setEditingEntry(null);
    setIsDialogOpen(false);
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="lg" className="shadow-soft">
              <Plus className="h-5 w-5 mr-2" />
              New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingEntry ? "Edit Entry" : "New Journal Entry"}</DialogTitle>
              <DialogDescription>
                {editingEntry ? "Update your journal entry" : "Write your thoughts and feelings"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Give your entry a title..."
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className={errors.title ? "border-destructive" : ""}
                  maxLength={100}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mood">Mood (Optional)</Label>
                <Input
                  id="mood"
                  placeholder="How are you feeling?"
                  value={formData.mood}
                  onChange={(e) => updateField("mood", e.target.value)}
                  maxLength={50}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Write your thoughts here..."
                  value={formData.content}
                  onChange={(e) => updateField("content", e.target.value)}
                  className={`min-h-[200px] resize-none ${errors.content ? "border-destructive" : ""}`}
                  maxLength={2000}
                />
                {errors.content && (
                  <p className="text-sm text-destructive">{errors.content}</p>
                )}
                <p className="text-xs text-muted-foreground text-right">
                  {formData.content.length}/2000 characters
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={editingEntry ? handleUpdate : handleCreate} className="flex-1">
                  {editingEntry ? "Update Entry" : "Create Entry"}
                </Button>
                <Button onClick={resetForm} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {entries.length === 0 ? (
        <Card className="shadow-card">
          <CardContent className="py-12 text-center text-muted-foreground">
            <p className="text-lg mb-2">No journal entries yet</p>
            <p className="text-sm">Click "New Entry" to start writing</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="shadow-card hover:shadow-soft transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{entry.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      {entry.mood && (
                        <span className="px-3 py-1 bg-secondary rounded-full text-xs">
                          {entry.mood}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDialog(entry)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(entry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap">{entry.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
