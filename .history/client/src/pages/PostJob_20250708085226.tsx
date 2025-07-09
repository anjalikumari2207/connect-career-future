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
import { useWallet } from "@/hooks/useWallet";
import axios from "@/api/axios";
import { ethers } from "ethers";

// ✅ Replace with your actual admin wallet
const ADMIN_WALLET = "0xb40dfB28A1D92f60b9eEe20A764E572eef728ACb";

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
  const { walletAddress, isConnected, connectWallet } = useWallet();

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

    if (!isConnected || !walletAddress) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet before posting.",
        variant: "destructive",
      });
      return;
    }

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      toast({ title: "Confirming blockchain payment..." });

      // 💸 Blockchain payment of 0.001 ETH
      const tx = await signer.sendTransaction({
        to: ADMIN_WALLET,
        value: ethers.parseEther("0.001"),
      });

      await tx.wait();

      toast({
        title: "✅ Payment Confirmed",
        description: "Transaction completed on blockchain.",
      });

      // 🎯 Post job only after payment success
      const payload = { ...jobData, skills };
      const res = await axios.post("/jobs", payload);

      toast({
        title: "🎉 Job Posted!",
        description: "Your job is now live on the platform.",
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
      console.error("❌ Transaction or Posting Error:", err);
      toast({
        title: "Error",
        description: err?.message || "Transaction or job posting failed.",
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

        {!isConnected && (
          <div className="mb-4 text-center">
            <Button
              onClick={connectWallet}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Connect Wallet to Post Job
            </Button>
          </div>
        )}

        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" value={jobData.title} onChange={(e) => handleInputChange("title", e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" value={jobData.company} onChange={(e) => handleInputChange("company", e.target.value)} required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={jobData.location} onChange={(e) => handleInputChange("location", e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="salary">Salary</Label>
                  <Input id="salary" value={jobData.salary} onChange={(e) => handleInputChange("salary", e.target.value)} required />
                </div>
              </div>

              <div>
                <Label htmlFor="type">Type</Label>
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
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={jobData.description} onChange={(e) => handleInputChange("description", e.target.value)} required />
              </div>

              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea id="requirements" value={jobData.requirements} onChange={(e) => handleInputChange("requirements", e.target.value)} required />
              </div>

              <div>
                <Label>Required Skills</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add skill (e.g. React)"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill(skill)} />
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
