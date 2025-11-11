import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Utensils, TrendingUp, Award } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageSquare,
      number: "01",
      title: "Tell Us Your Goals",
      description: "Share your dietary preferences, nutritional targets, and cooking skill level with our AI"
    },
    {
      icon: Utensils,
      number: "02", 
      title: "Get Personalized Recipes",
      description: "Receive custom recipes with detailed nutrition info and step-by-step instructions"
    },
    {
      icon: TrendingUp,
      number: "03",
      title: "Cook with AI Assistance",
      description: "Upload photos during cooking for real-time help and problem-solving"
    },
    {
      icon: Award,
      number: "04",
      title: "Track & Improve",
      description: "Monitor your nutrition progress and refine your cooking skills over time"
    }
  ];

  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Your journey to smarter cooking in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="relative border-2 hover:shadow-card transition-all duration-300 group"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <span className="text-5xl font-bold text-muted/20 group-hover:text-primary/20 transition-colors">
                    {step.number}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
