// src/hooks/useSolanaWallet.ts
import { useEffect, useState } from "react";
import { Connection, Transaction, PublicKey } from "@solana/web3.js";

declare global {
  interface Window {
    solana?: any;
  }
}

export function useSolanaWallet() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  // ✅ Connect to Phantom Wallet
  const connect = async () => {
    try {
      if (window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect();
        setPublicKey(response.publicKey.toString());
        setConnected(true);
      } else {
        alert("Phantom Wallet not found! Please install it.");
      }
    } catch (error) {
      console.error("Phantom connection failed:", error);
    }
  };

  // ✅ Send a signed transaction
  const sendTransaction = async (transaction: Transaction, connection: Connection): Promise<string> => {
    if (!window.solana || !window.solana.publicKey) throw new Error("Wallet not connected");

    transaction.feePayer = new PublicKey(window.solana.publicKey);
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    const signed = await window.solana.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());
    return signature;
  };

  // ✅ Auto-connect and listen for changes
  useEffect(() => {
    const provider = window.solana;

    if (provider && provider.isPhantom) {
      // Auto-connect if previously approved
      provider.connect({ onlyIfTrusted: true }).then((resp: any) => {
        setPublicKey(resp.publicKey.toString());
        setConnected(true);
      }).catch(() => {});

      const handleConnect = () => {
        setPublicKey(provider.publicKey.toString());
        setConnected(true);
      };

      const handleDisconnect = () => {
        setPublicKey(null);
        setConnected(false);
      };

      provider.on("connect", handleConnect);
      provider.on("disconnect", handleDisconnect);

      return () => {
        provider.off("connect", handleConnect);
        provider.off("disconnect", handleDisconnect);
      };
    }
  }, []);

  return {
    publicKey,
    connected,
    connect,
    sendTransaction,
  };
}
