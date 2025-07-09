import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Link, Users, Briefcase } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const WalletPage = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectPhantom = async () => {
    try {
      const provider = (window as any).phantom?.solana;

      if (!provider || !provider.isPhantom) {
        toast({
          title: "Phantom Not Found",
          description: "Install Phantom Wallet from https://phantom.app",
          variant: "destructive",
        });
        return;
      }

      const resp = await provider.connect();
      setWalletAddress(resp.publicKey.toString());

      toast({
        title: "✅ Wallet Connected!",
        description: `Address: ${resp.publicKey.toString().slice(0, 8)}...`,
      });
    } catch (err: any) {
      console.error("Connection failed", err);
      toast({
        title: "❌ Connection Error",
        description: err?.message || "Failed to connect Phantom wallet",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const provider = (window as any).phantom?.solana;
    if (provider?.isConnected) {
      provider.connect({ onlyIfTrusted: true }).then((res: any) => {
        setWalletAddress(res.publicKey.toString());
      });
    }
  }, []);

  const transactions = [
    {
      id: 1,
      type: "Payment Received",
      amount: "0.5 SOL",
      from: "Project Alpha",
      date: "2 hours ago",
      status: "Completed",
    },
    {
      id: 2,
      type: "Payment Sent",
      amount: "0.2 SOL",
      to: "Platform Fee",
      date: "1 day ago",
      status: "Completed",
    },
    {
      id: 3,
      type: "Payment Received",
      amount: "1.2 SOL",
      from: "Web3 Consulting",
      date: "3 days ago",
      status: "Completed",
    },
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Phantom Wallet</h2>
          <p className="text-xl text-gray-600">
            Securely connect and manage your Solana wallet.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Phantom Connection */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                Phantom Wallet
              </CardTitle>
              <CardDescription>Connect your wallet to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!walletAddress ? (
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-gray-600">Click to connect your Phantom wallet</p>
                  <Button
                    onClick={connectPhantom}
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-violet-700"
                  >
                    Connect Wallet
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-700 font-medium">Connected</span>
                    </div>
                    <p className="text-sm text-green-600 font-mono break-all">
                      {walletAddress}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">2.7 SOL</p>
                      <p className="text-sm text-blue-500">Total Earned</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">$510</p>
                      <p className="text-sm text-purple-500">USD Value</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Why Solana */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Why Solana?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  icon: <Zap className="w-4 h-4 text-blue-600" />,
                  title: "Fast Transactions",
                  desc: "Lightning-fast transfers at a fraction of a cent.",
                },
                {
                  icon: <Link className="w-4 h-4 text-green-600" />,
                  title: "Decentralized",
                  desc: "You control your keys and funds.",
                },
                {
                  icon: <Users className="w-4 h-4 text-purple-600" />,
                  title: "Growing Ecosystem",
                  desc: "Access Solana’s apps, tools, and tokens.",
                },
                {
                  icon: <Briefcase className="w-4 h-4 text-orange-600" />,
                  title: "Lower Fees",
                  desc: "Ultra-low gas costs even at scale.",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {walletAddress && (
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Sample Solana payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{tx.type}</p>
                      <p className="text-sm text-gray-600">
                        {tx.type.includes("Received")
                          ? `From: ${tx.from}`
                          : `To: ${tx.to}`}
                      </p>
                      <p className="text-xs text-gray-500">{tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">{tx.amount}</p>
                      <Badge variant="secondary" className="text-xs">
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WalletPage;
