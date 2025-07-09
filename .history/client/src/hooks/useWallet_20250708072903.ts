import { useEffect, useState } from "react";
import { ethers } from "ethers";

export function useWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkWallet = async () => {
      if ((window as any).ethereum) {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setWalletAddress(accounts[0].address);
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
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      }
    } catch (err) {
      console.error("Connection failed", err);
    }
  };

  return { walletAddress, isConnected, connectWallet };
}
