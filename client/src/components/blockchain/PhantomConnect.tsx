import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";

const PhantomConnect = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [solBalance, setSolBalance] = useState<number | null>(null);

  const connection = new Connection(clusterApiUrl("devnet"));

  const checkIfWalletIsConnected = async () => {
    const { solana } = window as any;
    if (solana?.isPhantom) {
      try {
        const response = await solana.connect({ onlyIfTrusted: true });
        setWalletAddress(response.publicKey.toString());
      } catch (err) {
        console.error("Phantom not authorized:", err);
      }
    }
  };

  const connectWallet = async () => {
    const { solana } = window as any;
    if (solana?.isPhantom) {
      try {
        const response = await solana.connect();
        setWalletAddress(response.publicKey.toString());
        toast({
          title: "Phantom Wallet Connected",
          description: `Connected to ${response.publicKey.toString().slice(0, 8)}...`,
        });
      } catch (err) {
        toast({
          title: "Connection Failed",
          description: "Phantom connection was rejected or failed.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Phantom Not Found",
        description: "Please install the Phantom extension.",
        variant: "destructive",
      });
    }
  };

  const fetchBalance = async (address: string) => {
    try {
      const publicKey = new PublicKey(address);
      const balance = await connection.getBalance(publicKey);
      setSolBalance(balance / 1e9); // Convert lamports to SOL
    } catch (err) {
      console.error("Failed to fetch balance", err);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (walletAddress) fetchBalance(walletAddress);
  }, [walletAddress]);

  return (
    <div className="py-12 px-4 max-w-3xl mx-auto">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Connect Phantom Wallet</CardTitle>
          <CardDescription>
            Secure payments via Solana Devnet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          {!walletAddress ? (
            <Button onClick={connectWallet} className="bg-violet-600 hover:bg-violet-700 text-white">
              Connect Phantom
            </Button>
          ) : (
            <>
              <div className="bg-green-100 rounded p-4">
                <p className="text-green-700 font-semibold">Wallet Connected</p>
                <p className="text-sm break-all text-gray-700 font-mono">
                  {walletAddress}
                </p>
              </div>

              <div className="text-center text-gray-800">
                <p className="text-2xl font-bold">{solBalance?.toFixed(4) || "--"} SOL</p>
                <p className="text-sm text-gray-500">Balance on Devnet</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PhantomConnect;
