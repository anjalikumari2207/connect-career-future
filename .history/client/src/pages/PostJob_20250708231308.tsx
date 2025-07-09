import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "@/api/axios";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  clusterApiUrl,
} from "@solana/web3.js";

const ADMIN_WALLET = new PublicKey("FkWJRPp3FWDn7UJKLCmL7Wrq9cZFrpmKikmcxkfwYBhN"); // ✅ Replace with your real admin Phantom wallet

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
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [txSignature, setTxSignature] = useState("");
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setJobData((prev) => ({ ...prev, [field]: value }));
  };

  const connectWallet = async () => {
    try {
      const provider = (window as any).phantom?.solana;
      if (!provider?.isPhantom) {
        toast({
          title: "Phantom Wallet Not Found",
          description: "Please install Phantom wallet.",
          variant: "destructive",
        });
        return;
      }
      const res = await provider.connect();
      setWalletAddress(res.publicKey.toString());
      toast({
        title: "Wallet Connected",
        description: `Connected to ${res.publicKey.toString().slice(0, 6)}...`,
      });
    } catch (err) {
      console.error("Wallet connection error:", err);
      toast({ title: "Wallet Connection Failed", variant: "destructive" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!walletAddress) {
      toast({
        title: "Wallet Required",
        description: "Connect your Phantom wallet first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const fromPubkey = new PublicKey(walletAddress);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey: ADMIN_WALLET,
          lamports: 0.01 * 1e9, // 0.01 SOL
        })
      );

      const provider = (window as any).phantom.solana;
      const { signature } = await provider.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signature, "confirmed");
      setTxSignature(signature);

      toast({
        title: "✅ Payment Confirmed",
        description: (
          <a
            href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            View Transaction on Solana Explorer
          </a>
        ),
      });

      const payload = { ...jobData, skills, txHash: signature };
      await axios.post("/jobs", payload);

      toast({
        title: "🎉 Job Posted",
        description: "Your job is now live on the platform!",
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
      console.error("Payment/post error:", err);
      toast({
        title: "Error",
        description: err.message || "Transaction failed.",
        variant: "destructive",
      });
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold mb-2">Post a New Job</h2>
          <p className="text-gray-600">Pay 0.01 SOL to publish on the platform</p>
        </div>

        {!walletAddress && (
          <div className="mb-4 text-center">
            <Button
              onClick={connectWallet}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Connect Phantom Wallet
            </Button>
          </div>
        )}

        {walletAddress && (
          <p className="text-center mb-4 text-sm text-gray-600">
            Connected: <span className="font-mono">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
          </p>
        )}

        {txSignature && (
          <p className="text-center text-sm text-green-700 mb-4">
            Tx:{" "}
            <a
              href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {txSignature.slice(0, 20)}...
            </a>
          </p>
        )}

        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Title</Label>
                  <Input value={jobData.title} onChange={(e) => handleInputChange("title", e.target.value)} required />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input value={jobData.company} onChange={(e) => handleInputChange("company", e.target.value)} required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Location</Label>
                  <Input value={jobData.location} onChange={(e) => handleInputChange("location", e.target.value)} required />
                </div>
                <div>
                  <Label>Salary</Label>
                  <Input value={jobData.salary} onChange={(e) => handleInputChange("salary", e.target.value)} required />
                </div>
              </div>

              <div>
                <Label>Type</Label>
                <Select value={jobData.type} onValueChange={(val) => handleInputChange("type", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea value={jobData.description} onChange={(e) => handleInputChange("description", e.target.value)} required />
              </div>

              <div>
                <Label>Requirements</Label>
                <Textarea value={jobData.requirements} onChange={(e) => handleInputChange("requirements", e.target.value)} required />
              </div>

              <div>
                <Label>Skills</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
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

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1 bg-blue-600 text-white hover:bg-blue-700">
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
