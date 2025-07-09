// src/pages/PostJob.tsx
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useSolanaWallet } from "@/hooks/useSolanaWallet";
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";

const ADMIN_WALLET = "12c9CS6jPkKTGhAb1Wi7DQsnpJn9PX2uu54n1EgwzPvV";

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
  const [txHash, setTxHash] = useState("");
  const { toast } = useToast();
  const { publicKey, isConnected, connect } = useSolanaWallet();

  const handleInputChange = (field: string, value: string) => {
    setJobData((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !publicKey) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet before posting.",
        variant: "destructive",
      });
      return;
    }

    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(publicKey),
          toPubkey: new PublicKey(ADMIN_WALLET),
          lamports: 0.01 * 1e9, // 0.01 SOL
        })
      );

      const { signature } = await (window as any).solana.signAndSendTransaction(
        transaction
      );
      await connection.confirmTransaction(signature);
      setTxHash(signature);

      const payload = {
        ...jobData,
        skills,
        txHash: signature,
      };
      await axios.post("/jobs", payload);

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
        description: err?.message || "Payment or posting failed.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Post a New Job</h2>
          <p className="text-xl text-gray-600">
            Find the perfect candidate for your team
          </p>
        </div>

        {!isConnected && (
          <div className="mb-4 text-center">
            <Button
              onClick={connect}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Connect Phantom Wallet
            </Button>
          </div>
        )}

        {txHash && (
          <div className="mb-6 text-center text-sm">
            <p className="text-gray-700">Transaction:</p>
            <a
              href={`https://explorer.solana.com/tx/${txHash}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {txHash}
            </a>
          </div>
        )}

        {/* Job Form UI remains unchanged here... */}
      </div>
    </div>
  );
};

export default PostJob;
