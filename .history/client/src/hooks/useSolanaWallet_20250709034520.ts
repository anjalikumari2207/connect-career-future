// src/hooks/useSolanaWallet.ts
import { useEffect, useState } from "react";
import { Connection, Transaction } from "@solana/web3.js";

export function useSolanaWallet() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  const connect = async () => {
    if ("solana" in window) {
      const provider = (window as any).solana;
      const resp = await provider.connect();
      setPublicKey(resp.publicKey.toString());
      setConnected(true);
    } else {
      alert("Phantom Wallet not found!");
    }
  };

  const sendTransaction = async (transaction: Transaction, connection: Connection) => {
    const { solana } = window as any;
    transaction.feePayer = solana.publicKey;
    transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
    const signed = await solana.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());
    return signature;
  };

  useEffect(() => {
    if ("solana" in window) {
      const provider = (window as any).solana;
      provider.on("connect", () => {
        setPublicKey(provider.publicKey.toString());
        setConnected(true);
      });
      provider.on("disconnect", () => {
        setPublicKey(null);
        setConnected(false);
      });
    }
  }, []);

  return { publicKey, connected, connect, sendTransaction };
}
