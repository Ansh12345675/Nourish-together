import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";

const RecipeGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateRecipe = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setRecipe("");

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
            messages: [{ role: "user", content: prompt }],
            type: "recipe",
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to generate recipe");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let generatedRecipe = "";

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
                  generatedRecipe += content;
                  setRecipe(generatedRecipe);
                }
              } catch (e) {
                // Ignore parse errors
              }
            }
          }
        }
      }

      toast({
        title: "Recipe generated!",
        description: "Your personalized recipe is ready.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate recipe. Please try again.",
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
          <Sparkles className="text-primary" size={24} />
          Generate a Recipe
        </h3>

        <div className="space-y-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., 'A healthy vegetarian pasta dish with seasonal vegetables' or 'Quick 30-minute chicken dinner for 4 people'"
            rows={3}
            className="resize-none"
          />

          <Button
            onClick={generateRecipe}
            disabled={isLoading || !prompt.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2" size={20} />
                Generate Recipe
              </>
            )}
          </Button>
        </div>
      </Card>

      {recipe && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Your Recipe</h3>
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm">{recipe}</pre>
          </div>
        </Card>
      )}
    </div>
  );
};

export default RecipeGenerator;
