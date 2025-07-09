import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";

declare global {
  interface Window {
    solana?: any;
  }
}

export function useSolanaWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        const { solana } = window;
        if (solana?.isPhantom) {
          const res = await solana.connect({ onlyIfTrusted: true });
          setWalletAddress(res.publicKey.toString());
        }
      } catch (err) {
        console.error("Phantom wallet not connected", err);
      }
    };

    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      const { solana } = window;
      if (!solana) throw new Error("Phantom wallet not found!");
      const res = await solana.connect();
      setWalletAddress(res.publicKey.toString());
    } catch (err) {
      console.error("Wallet connection failed", err);
    }
  };

  return { walletAddress, connectWallet, isConnected: !!walletAddress };
}
