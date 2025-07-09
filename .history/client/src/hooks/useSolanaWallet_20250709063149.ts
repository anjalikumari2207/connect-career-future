// hooks/useSolanaWallet.ts
import { useEffect, useState } from "react";

export function useSolanaWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if ("solana" in window && (window as any).solana?.isPhantom) {
      (window as any).solana.connect({ onlyIfTrusted: true }).then((resp: any) => {
        setWalletAddress(resp.publicKey.toString());
        setIsConnected(true);
      });
    }
  }, []);

  const connectWallet = async () => {
    try {
      const resp = await (window as any).solana.connect();
      setWalletAddress(resp.publicKey.toString());
      setIsConnected(true);
    } catch (err) {
      console.error("Phantom Wallet Connection Error", err);
    }
  };

  return { walletAddress, isConnected, connectWallet };
}
