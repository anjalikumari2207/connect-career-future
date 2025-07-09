import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "@/api/axios"; // ✅ Token-authenticated axios instance

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    description: "",
    requirements: "",
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setJobData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = { ...jobData, skills };
      const res = await axios.post("/jobs", payload);

      toast({
        title: "Job Posted Successfully!",
        description: "Your job listing is now live.",
      });

      setJobData({
        title: "",
        company: "",
        location: "",
        salary: "",
        type: "",
        description: "",
        requirements: "",
      });
      setSkills([]);
    } catch (err: any) {
      console.error("❌ Job post failed", err);
      toast({
        title: "Error",
        description: err.response?.data?.msg || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Post a New Job</h2>
          <p className="text-xl text-gray-600">Find the perfect candidate for your team</p>
        </div>

        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={jobData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g. Senior React Developer"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={jobData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    placeholder="e.g. TechCorp Inc."
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={jobData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="e.g. Remote, San Francisco, CA"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input
                    id="salary"
                    value={jobData.salary}
                    onChange={(e) => handleInputChange("salary", e.target.value)}
                    placeholder="e.g. $80k - $120k"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="type">Job Type</Label>
                <Select value={jobData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  value={jobData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe the responsibilities and role..."
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={jobData.requirements}
                  onChange={(e) => handleInputChange("requirements", e.target.value)}
                  placeholder="List the required qualifications..."
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div>
                <Label>Required Skills</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g. React, Python)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => removeSkill(skill)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                >
                  Post Job
                </Button>
                <Button type="button" variant="outline" className="flex-1">
                  Save Draft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostJob;
