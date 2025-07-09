import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Link, Users, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ethers } from "ethers";

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const { toast } = useToast();

  // ✅ Automatically check if wallet is already connected
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const checkConnection = async () => {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setWalletAddress(accounts[0].address || accounts[0]);
          setIsConnected(true);
        }
      };
      checkConnection();
    }
  }, []);

  const handleConnectWallet = async () => {
    try {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        toast({
          title: "Wallet Connected",
          description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
        });
      } else {
        toast({
          title: "MetaMask Not Detected",
          description: "Please install MetaMask or another Ethereum wallet.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Could not connect to wallet. Try again.",
        variant: "destructive",
      });
    }
  };

  const transactions = [
    {
      id: 1,
      type: "Payment Received",
      amount: "0.5 ETH",
      from: "Project Alpha",
      date: "2 hours ago",
      status: "Completed",
    },
    {
      id: 2,
      type: "Payment Sent",
      amount: "0.2 ETH",
      to: "Platform Fee",
      date: "1 day ago",
      status: "Completed",
    },
    {
      id: 3,
      type: "Payment Received",
      amount: "1.2 ETH",
      from: "Web3 Consulting",
      date: "3 days ago",
      status: "Completed",
    },
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Blockchain-Powered Payments</h2>
          <p className="text-xl text-gray-600 mb-8">
            Secure, transparent, and instant payments using cryptocurrency
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Wallet Connection Card */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Wallet Connection
              </CardTitle>
              <CardDescription>
                Connect your MetaMask wallet to start receiving payments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isConnected ? (
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-gray-600">
                    Connect your wallet to start earning with cryptocurrency
                  </p>
                  <Button
                    onClick={handleConnectWallet}
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                  >
                    Connect MetaMask
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-700 font-medium">Wallet Connected</span>
                    </div>
                    <p className="text-sm text-green-600 font-mono break-all">{walletAddress}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">2.7 ETH</p>
                      <p className="text-sm text-blue-500">Total Earned</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">$4,320</p>
                      <p className="text-sm text-purple-500">USD Value</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Why Blockchain Payments */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Why Blockchain Payments?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  icon: <Zap className="w-4 h-4 text-blue-600" />,
                  title: "Instant Payments",
                  desc: "Receive payments instantly without waiting for bank transfers",
                  bg: "bg-blue-100",
                },
                {
                  icon: <Link className="w-4 h-4 text-green-600" />,
                  title: "Transparent",
                  desc: "All transactions are recorded on the blockchain for transparency",
                  bg: "bg-green-100",
                },
                {
                  icon: <Users className="w-4 h-4 text-purple-600" />,
                  title: "Global Access",
                  desc: "Work with clients worldwide without currency conversion hassles",
                  bg: "bg-purple-100",
                },
                {
                  icon: <Briefcase className="w-4 h-4 text-orange-600" />,
                  title: "Lower Fees",
                  desc: "Reduced transaction fees compared to traditional payment processors",
                  bg: "bg-orange-100",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-8 h-8 ${item.bg} rounded-full flex items-center justify-center`}>
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

        {/* Transaction History */}
        {isConnected && (
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest payment activity</CardDescription>
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
                        {tx.type.includes("Received") ? `From: ${tx.from}` : `To: ${tx.to}`}
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

export default WalletConnect;
