import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Resources } from "@/components/Resources";
import { CrisisButton } from "@/components/CrisisButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen" id="home">
      <Navigation />
      <main className="pt-16">
        <Hero />
        
        {/* CTA Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Journey?</h2>
            <p className="text-lg text-muted-foreground">
              Create a free account to track your moods, write journal entries, and access personalized resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/register">
                <Button size="lg" className="text-lg px-8 py-6 shadow-soft">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Sign In
                </Button>
              </Link>
            </div>
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
              If you're experiencing a mental health crisis, please contact emergency services or use the crisis button below.
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

export default Index;
