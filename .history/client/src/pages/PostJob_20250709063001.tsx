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
import axios from "@/api/axios";
import { useSolanaWallet } from "@/hooks/useSolanaWallet";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  clusterApiUrl,
} from "@solana/web3.js";

const ADMIN_WALLET = "12c9CS6jPkKTGhAb1Wi7DQsnpJn9PX2uu54n1EgwzPvV"; // Replace with your real admin pubkey

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
  const { publicKey, sendTransaction, connected, connect } = useSolanaWallet();
  const { walletAddress, isConnected, connectWallet } = useSolanaWallet();
  
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

    if (!connected || !publicKey) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect Phantom Wallet before posting.",
        variant: "destructive",
      });
      return;
    }

    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const toPubkey = new PublicKey(ADMIN_WALLET);
      const fromPubkey = new PublicKey(publicKey);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports: 0.01 * 1e9, // 0.01 SOL
        })
      );

      toast({ title: "Awaiting wallet signature..." });

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");

      setTxHash(signature);

      toast({
        title: "✅ Payment Successful",
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

      // Submit job only after successful payment
      const payload = { ...jobData, skills, txHash: signature };
      await axios.post("/jobs", payload);

      toast({
        title: "🎉 Job Posted!",
        description: "Your job listing is now live on the platform.",
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
      console.error("❌ Error submitting job:", err);
      toast({
        title: "Transaction Failed",
        description:
          err?.message || "Something went wrong while posting the job.",
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

        {!connected && (
          <div className="text-center mb-4">
            <Button onClick={connect} className="bg-purple-600 text-white">
              Connect Phantom Wallet
            </Button>
          </div>
        )}

        {connected && publicKey && (
          <p className="text-center mb-4 text-sm text-gray-600">
            Connected: <span className="font-mono">{publicKey.slice(0, 6)}...{publicKey.slice(-4)}</span>
          </p>
        )}

        {txHash && (
          <div className="mb-6 text-center text-sm">
            <p className="text-gray-700">Transaction Hash:</p>
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

        {/* Job Form UI (unchanged) */}
        {/* Keep your existing job form layout here (inputs, selects, skills) */}
        {/* Form submission is now handled through blockchain logic above */}

        {/* ... retain your form JSX as shown in your version ... */}
      </div>
    </div>
  );
};

export default PostJob;
