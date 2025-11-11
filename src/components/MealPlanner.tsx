import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Calendar } from "lucide-react";

const MealPlanner = () => {
  const [preferences, setPreferences] = useState("");
  const [mealPlan, setMealPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateMealPlan = async () => {
    if (!preferences.trim()) return;

    setIsLoading(true);
    setMealPlan("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: `Create a weekly meal plan based on these preferences: ${preferences}`,
              },
            ],
            type: "meal-plan",
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to generate meal plan");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let generatedPlan = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  generatedPlan += content;
                  setMealPlan(generatedPlan);
                }
              } catch (e) {
                // Ignore parse errors
              }
            }
          }
        }
      }

      toast({
        title: "Meal plan created!",
        description: "Your personalized meal plan is ready.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate meal plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="text-primary" size={24} />
          Create Your Meal Plan
        </h3>

        <div className="space-y-4">
          <Textarea
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="E.g., 'I'm vegetarian, prefer high-protein meals, need 2000 calories per day, and I'm allergic to nuts'"
            rows={4}
            className="resize-none"
          />

          <Button
            onClick={generateMealPlan}
            disabled={isLoading || !preferences.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Creating Plan...
              </>
            ) : (
              <>
                <Calendar className="mr-2" size={20} />
                Generate Meal Plan
              </>
            )}
          </Button>
        </div>
      </Card>

      {mealPlan && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Your Weekly Meal Plan</h3>
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm">{mealPlan}</pre>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MealPlanner;
