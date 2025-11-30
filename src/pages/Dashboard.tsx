import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { MoodTracker } from "@/components/MoodTracker";
import { StressTest } from "@/components/StressTest";
import { Resources } from "@/components/Resources";
import { CrisisButton } from "@/components/CrisisButton";
import { JournalEntries } from "@/components/JournalEntries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      toast.error("Please log in to access this page");
      navigate('/login');
    } else {
      setUser(JSON.parse(currentUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast.success("Logged out successfully");
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen" id="home">
      <Navigation />
      <main className="pt-16">
        {/* User Welcome Section */}
        <section className="py-12 px-4 bg-gradient-calm">
          <div className="container mx-auto max-w-4xl">
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Welcome back, {user.name}!</CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track your mental wellness journey in your private, secure space.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <MoodTracker />
        
        <section id="journal" className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Journal</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Write, reflect, and manage your personal thoughts
              </p>
            </div>
            <JournalEntries />
          </div>
        </section>

        <section id="stress-test" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Stress Self-Assessment</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Take a quick assessment to understand your stress levels
              </p>
            </div>
            <StressTest />
          </div>
        </section>

        <Resources />

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-border">
          <div className="container mx-auto text-center space-y-4">
            <p className="text-muted-foreground">
              This platform is designed for educational purposes and is not a substitute for professional mental health care.
            </p>
            <p className="text-sm text-muted-foreground">
              If you're experiencing a mental health crisis, please contact emergency services or use the crisis button.
            </p>
            <p className="text-sm font-medium">
              © 2025 MindSpace. All data is stored locally and securely on your device.
            </p>
          </div>
        </footer>
      </main>

      <CrisisButton />
    </div>
  );
};

export default Dashboard;
