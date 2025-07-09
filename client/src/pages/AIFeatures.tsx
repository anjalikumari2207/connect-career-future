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

interface MatchResult {
  title: string;
  company: string;
  matchScore: number;
  matchReasons: string[];
}

const AIFeatures = () => {
  const [skillText, setSkillText] = useState("");
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [matchedJobs, setMatchedJobs] = useState<MatchResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleSkillExtraction = async () => {
    if (!skillText.trim()) return;
    setIsAnalyzing(true);

    try {
      const res = await axios.post("/ai/extract-skills", { text: skillText });
      const data = res.data as { skills: string[] };
      setExtractedSkills(data.skills || []);

      toast({
        title: "✅ Skills Extracted",
        description: `Found ${data.skills.length} relevant skills.`,
      });
    } catch (err) {
      console.error("Skill extraction error:", err);
      toast({
        title: "❌ Extraction Failed",
        description: "Could not extract skills.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);
    setIsAnalyzing(true);

    try {
      const res = await axios.post("/ai/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const data = res.data as { skills: string[] };
      setExtractedSkills(data.skills || []);
      toast({
        title: "📄 Resume Analyzed",
        description: `Found ${data.skills.length} skill(s).`
      });
    } catch (err) {
      console.error("Resume upload failed:", err);
      toast({
        title: "Upload Failed",
        description: "Could not extract skills from resume.",
        variant: "destructive"
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
      const data = res.data as { matches: MatchResult[] };
      setMatchedJobs(data.matches || []);

      toast({
        title: "✅ Job Matches Found",
        description: `${data.matches.length} matches.`,
      });
    } catch (err) {
      console.error("Matching error:", err);
      toast({
        title: "❌ Match Failed",
        description: "Could not match jobs.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddToProfile = async () => {
    try {
      await axios.put("/profile/skills", { skills: extractedSkills });
      toast({
        title: "✅ Skills Updated",
        description: "Your profile has been updated with extracted skills."
      });
    } catch (err) {
      console.error("Add to profile error:", err);
      toast({
        title: "❌ Update Failed",
        description: "Could not update your profile.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Career Tools</h2>
          <p className="text-xl text-gray-600 mb-8">
            Use artificial intelligence to boost your resume and job search
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Skill Extraction Section */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                AI Skill Extraction
              </CardTitle>
              <CardDescription>
                Paste your resume or upload a file to extract skills
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste resume, bio, or text here..."
                value={skillText}
                onChange={(e) => setSkillText(e.target.value)}
                className="min-h-32"
              />

              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleResumeUpload}
                className="w-full p-2 border rounded bg-white shadow"
              />

              <div className="flex gap-2">
                <Button onClick={handleSkillExtraction} disabled={isAnalyzing} className="w-full bg-blue-600">
                  {isAnalyzing ? "Analyzing..." : "Extract Skills"}
                </Button>
                <Button onClick={handleJobMatch} disabled={isAnalyzing} className="w-full bg-yellow-500 text-white">
                  {isAnalyzing ? "Matching..." : "Match Jobs"}
                </Button>
              </div>

              {extractedSkills.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold">Extracted Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {extractedSkills.map((skill) => (
                      <Badge key={skill} className="bg-blue-100 text-blue-800 border">{skill}</Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full" onClick={handleAddToProfile}>
                    Add to Profile
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Smart Job Matching Section */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Smart Job Matching
              </CardTitle>
              <CardDescription>
                AI compares your resume with jobs and shows best matches
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {matchedJobs.length > 0 ? matchedJobs.map((job, index) => (
                <div key={index} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-yellow-600">{job.matchScore}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-700">Match Reasons:</p>
                    <div className="flex flex-wrap gap-1">
                      {job.matchReasons?.map((reason) => (
                        <Badge key={reason} variant="secondary" className="text-xs">{reason}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-gray-500">No matches yet. Paste your resume and click Match Jobs.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Placeholder Features */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Resume Optimizer", icon: MessageSquare, color: "purple", text: "Get suggestions to improve your resume" },
            { title: "Network Insights", icon: Users, color: "green", text: "Discover valuable professional connections" },
            { title: "Career Path", icon: Briefcase, color: "orange", text: "Plan your future with personalized guidance" },
          ].map(({ title, icon: Icon, color, text }, index) => (
            <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm text-center">
              <CardHeader>
                <div className={`w-16 h-16 bg-${color}-500 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{text}</p>
                <Button variant="outline" className="w-full">Explore</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIFeatures;
