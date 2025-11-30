import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smile, Meh, Frown, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";

type Mood = 'great' | 'good' | 'okay' | 'down' | 'struggling';

interface MoodEntry {
  mood: Mood;
  date: string;
  note?: string;
}

const moodOptions = [
  { value: 'great' as Mood, label: 'Great', icon: ThumbsUp, color: 'text-green-600' },
  { value: 'good' as Mood, label: 'Good', icon: Smile, color: 'text-green-500' },
  { value: 'okay' as Mood, label: 'Okay', icon: Meh, color: 'text-yellow-500' },
  { value: 'down' as Mood, label: 'Down', icon: Frown, color: 'text-orange-500' },
  { value: 'struggling' as Mood, label: 'Struggling', icon: ThumbsDown, color: 'text-red-500' },
];

export const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('moodHistory');
    if (stored) {
      setMoodHistory(JSON.parse(stored));
    }
  }, []);

  const saveMood = () => {
    if (!selectedMood) return;

    const newEntry: MoodEntry = {
      mood: selectedMood,
      date: new Date().toISOString(),
      note: note.trim() || undefined,
    };

    const updated = [newEntry, ...moodHistory].slice(0, 30); // Keep last 30 entries
    setMoodHistory(updated);
    localStorage.setItem('moodHistory', JSON.stringify(updated));
    
    toast.success('Mood logged successfully', {
      description: 'Your entry has been saved anonymously.',
    });

    setSelectedMood(null);
    setNote('');
  };

  return (
    <section id="mood-tracker" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Daily Mood Check-In</h2>
          <p className="text-xl text-muted-foreground">
            Track how you're feeling. Your data stays private on your device.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>How are you feeling today?</CardTitle>
              <CardDescription>Select the option that best describes your mood</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-5 gap-3">
                {moodOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setSelectedMood(option.value)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        selectedMood === option.value
                          ? 'border-primary bg-secondary scale-105'
                          : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                      }`}
                    >
                      <Icon className={`h-8 w-8 ${option.color}`} />
                      <span className="text-xs font-medium">{option.label}</span>
                    </button>
                  );
                })}
              </div>

              {selectedMood && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Any thoughts to add? (optional)
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="What's on your mind today..."
                      className="w-full min-h-[100px] p-3 rounded-lg border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      maxLength={500}
                    />
                    <p className="text-xs text-muted-foreground mt-1">{note.length}/500 characters</p>
                  </div>
                  <Button onClick={saveMood} className="w-full" size="lg">
                    Save Mood Entry
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Your Recent Moods</CardTitle>
              <CardDescription>Your last {moodHistory.length} mood entries</CardDescription>
            </CardHeader>
            <CardContent>
              {moodHistory.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No mood entries yet.</p>
                  <p className="text-sm mt-2">Start tracking to see your patterns.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {moodHistory.map((entry, index) => {
                    const moodOption = moodOptions.find(m => m.value === entry.mood);
                    const Icon = moodOption?.icon || Meh;
                    const date = new Date(entry.date);
                    
                    return (
                      <div key={index} className="p-4 bg-secondary rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className={`h-6 w-6 ${moodOption?.color}`} />
                            <span className="font-medium capitalize">{entry.mood}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {date.toLocaleDateString()}
                          </span>
                        </div>
                        {entry.note && (
                          <p className="text-sm text-muted-foreground pl-9">{entry.note}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
