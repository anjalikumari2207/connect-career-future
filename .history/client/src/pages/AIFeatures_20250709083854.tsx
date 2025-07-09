import { useState } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Zap, Users, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "@/api/axios";

const AIFeatures = () => {
  const [skillText, setSkillText] = useState("");
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [matchedJobs, setMatchedJobs] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleSkillExtraction = async () => {
    if (!skillText.trim()) return;

    setIsAnalyzing(true);
    try {
      const res = await axios.post("/ai/extract-skills", { text: skillText });
      setExtractedSkills(res.data.skills || []);
      toast({
        title: "✅ Skills Extracted",
        description: `Found ${res.data.skills.length} relevant skills.`,
      });
    } catch {
      toast({
        title: "❌ Skill Extraction Failed",
        description: "Try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleJobMatch = async () => {
    if (!skillText.trim()) return;

    setIsAnalyzing(true);
    try {
      const res = await axios.post("/ai/match-jobs", { resumeText: skillText });
      setMatchedJobs(res.data.matches || []);
      toast({
        title: "🎯 Job Matching Complete",
        description: `Found ${res.data.matches.length} matched jobs`,
      });
    } catch {
      toast({
        title: "❌ Job Matching Failed",
        description: "Try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Career Tools</h2>
          <p className="text-lg text-gray-600">
            Extract skills and match jobs using your resume or profile description.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* 🔍 Skill Extraction Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" /> AI Skill Extraction
              </CardTitle>
              <CardDescription>
                Paste your resume or project description to extract relevant skills
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={skillText}
                onChange={(e) => setSkillText(e.target.value)}
                placeholder="Paste your resume or job description here..."
                className="min-h-32"
              />
              <div className="flex gap-4">
                <Button
                  onClick={handleSkillExtraction}
                  disabled={isAnalyzing}
                  className="flex-1"
                >
                  {isAnalyzing ? "Analyzing..." : "Extract Skills"}
                </Button>
                <Button
                  onClick={handleJobMatch}
                  disabled={isAnalyzing}
                  variant="outline"
                  className="flex-1"
                >
                  Match Jobs
                </Button>
              </div>

              {extractedSkills.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Extracted Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {extractedSkills.map(skill => (
                      <Badge key={skill} className="bg-blue-100 text-blue-700 border border-blue-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 🤖 Job Matches Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" /> Smart Job Matching
              </CardTitle>
              <CardDescription>
                See how well your profile matches with available jobs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {matchedJobs.length > 0 ? (
                matchedJobs.slice(0, 5).map((job) => (
                  <div key={job.jobId} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <div>
                        <h4 className="font-semibold">{job.title}</h4>
                        <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                      </div>
                      <span className="text-yellow-600 font-bold">{job.matchScore}%</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No matches yet. Paste your resume and match!</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIFeatures;
