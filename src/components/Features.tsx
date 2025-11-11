import { Card, CardContent } from "@/components/ui/card";
import { Brain, Camera, ChefHat } from "lucide-react";
import featurePlanner from "@/assets/feature-planner.jpg";
import featureAssistant from "@/assets/feature-assistant.jpg";
import featureRecipes from "@/assets/feature-recipes.jpg";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Diet Planner",
      description: "Generate personalized recipes and meal plans based on your dietary preferences, nutritional goals, and available ingredients",
      image: featurePlanner,
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: Camera,
      title: "Live Kitchen Assistant",
      description: "Upload photos or videos during cooking for instant AI-powered solutions to culinary challenges like overcooking or preparation issues",
      image: featureAssistant,
      gradient: "from-secondary/20 to-secondary/5"
    },
    {
      icon: ChefHat,
      title: "Smart Recipe Generation",
      description: "Discover novel recipes tailored to your tastes with detailed nutritional information and step-by-step cooking guidance",
      image: featureRecipes,
      gradient: "from-accent/20 to-accent/5"
    }
  ];

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Everything You Need to Cook Smarter
          </h2>
          <p className="text-xl text-muted-foreground">
            Bridging the gap between recipe discovery and professional nutrition tracking with intelligent AI assistance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group overflow-hidden border-2 hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`} />
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
