import { useState } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
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
      const res = await axios.post<{ skills: string[] }>("/ai/extract-skills", { text: skillText });
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

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);
    setIsAnalyzing(true);

    try {
      const res = await axios.post<{ skills: string[] }>("/ai/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const skills = res.data.skills || [];
      setExtractedSkills(skills);

      toast({
        title: "📄 Resume Analyzed",
        description: `Found ${skills.length} skills from your resume.`,
      });
    } catch (err) {
      console.error("Resume upload failed:", err);
      toast({
        title: "❌ Upload Failed",
        description: "Could not extract skills from resume.",
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
      const jobsRes = await axios.get("/jobs");
      const res = await axios.post<{ matches: MatchResult[] }>("/ai/match-jobs", {
        resumeText: skillText,
        jobs: jobsRes.data,
      });

      setMatchedJobs(res.data.matches || []);

      toast({
        title: "✅ Job Matches Found",
        description: `${res.data.matches.length} matches found.`,
      });
    } catch (err) {
      console.error("Job match error:", err);
      toast({
        title: "❌ Job Matching Failed",
        description: "Something went wrong while matching jobs.",
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
          <p className="text-xl text-gray-600 mb-8">Leverage AI to boost your job hunt and profile</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Resume Upload + Skill Extraction */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-600" />
                Upload Resume (.pdf or .docx)
              </CardTitle>
              <CardDescription>AI will extract skills from your uploaded resume</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleResumeUpload}
                className="w-full p-2 border rounded bg-white shadow"
              />

              {extractedSkills.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold">Extracted Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {extractedSkills.map((skill) => (
                      <Badge key={skill} className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Text Input Skill Extraction */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Paste Resume / Text
              </CardTitle>
              <CardDescription>Paste any job-related text to extract skills and match jobs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste resume, LinkedIn bio, or text here..."
                value={skillText}
                onChange={(e) => setSkillText(e.target.value)}
                className="min-h-32"
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
                      <Badge key={skill} className="bg-blue-100 text-blue-800 border">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Smart Job Matches */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Smart Job Matching
            </CardTitle>
            <CardDescription>AI compares your resume text with job descriptions</CardDescription>
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
                    {job.matchReasons?.map((reason, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{reason}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-sm text-gray-500">Paste resume or upload file to see job matches.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIFeatures;
