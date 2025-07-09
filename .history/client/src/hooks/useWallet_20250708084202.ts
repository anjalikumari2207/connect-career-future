// src/hooks/useWallet.ts
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export function useWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkWallet = async () => {
      if ((window as any).ethereum) {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner(); // ✅ Get signer object
        const address = await signer.getAddress(); // ✅ Convert to string
        if (address) {
          setWalletAddress(address); // ✅ Now this works
          setIsConnected(true);
        }
      }
    };

    checkWallet();
  }, []);

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      alert("MetaMask not found! Install it first.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []); // ✅ trigger MetaMask connect
      const signer = await provider.getSigner();
      const address = await signer.getAddress(); // ✅ get wallet address
      console.log("Wallet address:", address);
      console.log("Connecting to wallet...");
      setWalletAddress(address);
      setIsConnected(true);
    } catch (err) {
      console.error("Wallet connection failed", err);
    }
  };

  return { walletAddress, isConnected, connectWallet };
}
