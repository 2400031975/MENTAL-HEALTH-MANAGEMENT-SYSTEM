import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Brain, Heart, Users, Sparkles, Shield } from "lucide-react";

const resources = [
  {
    icon: Brain,
    title: "Understanding Mental Health",
    description: "Learn about common mental health challenges students face and how to recognize the signs.",
    topics: ["Anxiety & Stress", "Depression", "Academic Pressure", "Sleep Issues"]
  },
  {
    icon: Heart,
    title: "Self-Care Strategies",
    description: "Practical techniques to maintain your mental well-being and build resilience.",
    topics: ["Mindfulness", "Exercise", "Nutrition", "Sleep Hygiene"]
  },
  {
    icon: Users,
    title: "Building Support Networks",
    description: "How to connect with others and create meaningful relationships on campus.",
    topics: ["Making Friends", "Study Groups", "Campus Activities", "Peer Support"]
  },
  {
    icon: Sparkles,
    title: "Stress Management",
    description: "Evidence-based techniques to manage academic and personal stress effectively.",
    topics: ["Time Management", "Breathing Exercises", "Progressive Relaxation", "Journaling"]
  },
  {
    icon: BookOpen,
    title: "Academic Wellness",
    description: "Balance your studies with mental health and prevent burnout.",
    topics: ["Study Skills", "Work-Life Balance", "Exam Anxiety", "Procrastination"]
  },
  {
    icon: Shield,
    title: "Crisis Prevention",
    description: "Recognize warning signs and know when to seek professional help.",
    topics: ["Warning Signs", "When to Get Help", "Campus Resources", "Emergency Contacts"]
  },
];

export const Resources = () => {
  return (
    <section id="resources" className="py-20 px-4 bg-gradient-calm">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Mental Health Resources</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Evidence-based information and strategies to support your mental well-being
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card 
                key={index} 
                className="shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Key Topics:</p>
                    <div className="flex flex-wrap gap-2">
                      {resource.topics.map((topic, i) => (
                        <span 
                          key={i}
                          className="text-xs px-3 py-1 bg-secondary rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Remember</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                Seeking help is a sign of strength, not weakness. Every student deserves support, 
                and taking care of your mental health is just as important as your physical health.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
