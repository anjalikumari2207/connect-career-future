import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";

declare global {
  interface Window {
    solana?: any;
  }
}

export const usePhantom = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (window.solana?.isPhantom) {
      window.solana.connect({ onlyIfTrusted: true }).then(({ publicKey }: any) => {
        setWalletAddress(publicKey.toString());
        setIsConnected(true);
      });
    }
  }, []);

  const connectWallet = async () => {
    if (!window.solana?.isPhantom) {
      alert("Phantom Wallet not found. Please install it.");
      return;
    }

    try {
      const { publicKey } = await window.solana.connect();
      setWalletAddress(publicKey.toString());
      setIsConnected(true);
    } catch (err) {
      console.error("Wallet connection error:", err);
    }
  };

  return { walletAddress, isConnected, connectWallet };
};
