import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const WalletPage = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectPhantom = async () => {
    try {
      const provider = (window as any).phantom?.solana;

      if (!provider || !provider.isPhantom) {
        toast({
          title: "Phantom Wallet Not Found",
          description: "Please install Phantom Wallet from https://phantom.app",
          variant: "destructive",
        });
        return;
      }

      const resp = await provider.connect();
      setWalletAddress(resp.publicKey.toString());

      toast({
        title: "Wallet Connected!",
        description: `Address: ${resp.publicKey.toString().slice(0, 8)}...`,
      });
    } catch (err: any) {
      toast({
        title: "Connection Error",
        description: err?.message || "Failed to connect to Phantom.",
        variant: "destructive",
      });
      console.error("Phantom connect error:", err);
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

  return (
    <div className="py-20 px-4">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Phantom Wallet Connection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            {walletAddress ? (
              <div>
                <p className="text-gray-700">Connected Wallet:</p>
                <p className="font-mono break-words text-blue-600">{walletAddress}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">No wallet connected.</p>
                <Button onClick={connectPhantom}>Connect Phantom Wallet</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletPage;
