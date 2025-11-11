import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-4 bg-gradient-hero relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-foreground/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground font-medium text-sm">
            <Sparkles className="w-4 h-4" />
            Join Thousands of Home Cooks
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
            Ready to Transform Your Cooking Experience?
          </h2>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Start cooking smarter today with AI-powered recipes, nutrition tracking, and real-time kitchen assistance
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg"
              variant="secondary"
              className="bg-background text-foreground hover:bg-background/90 shadow-soft text-lg px-8 py-6 rounded-full"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6 rounded-full"
            >
              See Pricing
            </Button>
          </div>

          <p className="text-sm text-primary-foreground/80">
            No credit card required • Free 14-day trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
