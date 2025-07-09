import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Zap, Users, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "@/api/axios";

const AIFeatures = () => {
  const [skillText, setSkillText] = useState("");
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleSkillExtraction = async () => {
    if (!skillText.trim()) return;

    setIsAnalyzing(true);

    try {
      const res = await axios.post("/ai/extract-skills", { text: skillText });
      const skills = res.data.skills || [];

      setExtractedSkills(skills);
      toast({
        title: "✅ Skills Extracted",
        description: `Found ${skills.length} relevant skills.`,
      });
    } catch (err) {
      console.error("Skill extraction error:", err);
      toast({
        title: "❌ Skill Extraction Failed",
        description: "Could not analyze the text. Try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Career Tools</h2>
          <p className="text-xl text-gray-600 mb-8">Leverage artificial intelligence to optimize your career growth</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                AI Skill Extraction
              </CardTitle>
              <CardDescription>
                Paste your resume, job description, or project details to extract relevant skills
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your resume, project description, or any text here..."
                value={skillText}
                onChange={(e) => setSkillText(e.target.value)}
                className="min-h-32"
              />
              <Button
                onClick={handleSkillExtraction}
                disabled={isAnalyzing || !skillText.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                {isAnalyzing ? "Analyzing..." : "Extract Skills"}
              </Button>

              {extractedSkills.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold">Extracted Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {extractedSkills.map((skill) => (
                      <Badge key={skill} className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Add to Profile
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 🔁 You can leave the Smart Job Matching section for next step */}
        </div>
      </div>
    </div>
  );
};

export default AIFeatures;
