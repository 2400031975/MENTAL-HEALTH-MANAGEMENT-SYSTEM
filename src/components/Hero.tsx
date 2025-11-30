import { Button } from "@/components/ui/button";
import { Heart, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-calm opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {/* Icon trio */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="p-3 bg-card rounded-full shadow-card animate-in zoom-in duration-700 delay-100">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div className="p-3 bg-card rounded-full shadow-card animate-in zoom-in duration-700 delay-200">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="p-3 bg-card rounded-full shadow-card animate-in zoom-in duration-700 delay-300">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Your Mental Health
            <span className="block text-primary mt-2">Matters</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A safe, anonymous space for students to access mental health support, track your well-being, and find resources—available 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/register">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-soft hover:shadow-lg transition-all"
              >
                Start Your Journey
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-2 hover:bg-secondary transition-all"
              onClick={() => scrollToSection('resources')}
            >
              Explore Resources
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>100% Anonymous</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>Available 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              <span>Judgment-Free</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
