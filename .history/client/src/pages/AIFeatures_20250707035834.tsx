
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Zap, Users, Briefcase } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const AIFeatures = () => {
  const [skillText, setSkillText] = useState("");
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleSkillExtraction = async () => {
    if (!skillText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI skill extraction
    setTimeout(() => {
      const skills = [
        "React", "TypeScript", "Node.js", "Python", "Machine Learning",
        "AWS", "Docker", "GraphQL", "MongoDB", "Leadership"
      ];
      
      // Simulate extraction based on text content
      const mockExtracted = skills.slice(0, Math.floor(Math.random() * 5) + 3);
      setExtractedSkills(mockExtracted);
      setIsAnalyzing(false);
      
      toast({
        title: "Skills Extracted",
        description: `Found ${mockExtracted.length} relevant skills from your description`,
      });
    }, 2000);
  };

  const jobMatches = [
    {
      title: "Senior Full Stack Developer",
      company: "TechFlow Inc.",
      matchScore: 94,
      matchReasons: ["React expertise", "TypeScript skills", "Full-stack experience"]
    },
    {
      title: "AI/ML Engineer",
      company: "DataMind Corp",
      matchScore: 87,
      matchReasons: ["Python proficiency", "Machine Learning background", "Problem-solving skills"]
    },
    {
      title: "DevOps Engineer",
      company: "CloudScale",
      matchScore: 82,
      matchReasons: ["AWS experience", "Docker knowledge", "Infrastructure skills"]
    }
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Career Tools
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Leverage artificial intelligence to optimize your career growth
          </p>
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
                placeholder="Paste your resume, project description, or any text here. Our AI will analyze it and extract your professional skills..."
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

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Smart Job Matching
              </CardTitle>
              <CardDescription>
                AI analyzes your profile to find the best job matches
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {jobMatches.map((job, index) => (
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
                      {job.matchReasons.map((reason) => (
                        <Badge key={reason} variant="secondary" className="text-xs">
                          {reason}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                View All Matches
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Resume Optimizer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                AI-powered suggestions to improve your resume and increase interview chances
              </p>
              <Button variant="outline" className="w-full">
                Optimize Resume
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Network Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Discover valuable connections and networking opportunities using AI analysis
              </p>
              <Button variant="outline" className="w-full">
                Find Connections
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Career Path</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Get personalized career guidance and next steps based on your goals
              </p>
              <Button variant="outline" className="w-full">
                Plan Career
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIFeatures;
