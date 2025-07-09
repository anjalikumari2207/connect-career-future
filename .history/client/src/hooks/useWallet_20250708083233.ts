import { useEffect, useState } from "react";
import { ethers } from "ethers";

export function useWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [networkName, setNetworkName] = useState<string | null>(null);

  useEffect(() => {
    const checkWallet = async () => {
      if ((window as any).ethereum) {
        const provider = new ethers.BrowserProvider((window as any).ethereum);

        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);

          const network = await provider.getNetwork();
          setNetworkName(network.name);
        }
      }
    };

    checkWallet();
  }, []);

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      alert("MetaMask not found! Please install it.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);

        const network = await provider.getNetwork();
        setNetworkName(network.name);

        console.log("✅ Wallet connected:", accounts[0]);
        console.log("🟢 Network:", network.name);
      }
    } catch (err) {
      console.error("❌ Wallet connection failed", err);
    }
  };

  return {
    walletAddress,
    isConnected,
    connectWallet,
    networkName,
  };
}
