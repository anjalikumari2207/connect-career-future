// src/hooks/useSolanaWallet.ts
import { useEffect, useState } from "react";

export function useSolanaWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Auto-detect connection on load
  useEffect(() => {
    if ("solana" in window) {
      const provider = (window as any).solana;
      if (provider.isPhantom) {
        provider.connect({ onlyIfTrusted: true }).then(({ publicKey }: any) => {
          setWalletAddress(publicKey.toString());
          setIsConnected(true);
        });
      }
    }
  }, []);

  // Manual connect
  const connectWallet = async () => {
    try {
      const provider = (window as any).solana;
      if (!provider?.isPhantom) {
        alert("Phantom wallet not found. Please install Phantom.");
        return;
      }

      const { publicKey } = await provider.connect();
      setWalletAddress(publicKey.toString());
      setIsConnected(true);
    } catch (err) {
      console.error("❌ Phantom wallet connection failed:", err);
    }
  };

  return { walletAddress, isConnected, connectWallet };
}
