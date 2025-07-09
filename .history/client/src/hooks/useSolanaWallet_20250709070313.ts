import { useEffect, useState } from "react";
import { Connection, Transaction, clusterApiUrl } from "@solana/web3.js";

export function useSolanaWallet() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  const connect = async () => {
    const provider = (window as any).solana;
    if (!provider?.isPhantom) {
      alert("Phantom Wallet not found!");
      return;
    }

    const resp = await provider.connect();
    setPublicKey(resp.publicKey.toString());
    setConnected(true);
  };

  const sendTransaction = async (transaction: Transaction, connection: Connection) => {
    const provider = (window as any).solana;
    if (!provider?.isPhantom || !provider.publicKey) {
      throw new Error("Wallet not connected");
    }

    transaction.feePayer = provider.publicKey;

    // ✅ Get recent blockhash BEFORE signing
    const { blockhash } = await connection.getLatestBlockhash("finalized");
    transaction.recentBlockhash = blockhash;

    // ✅ Sign and send
    const signed = await provider.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());

    // ✅ Confirm the transaction
    await connection.confirmTransaction(signature, "confirmed");

    return signature;
  };

  useEffect(() => {
    const provider = (window as any).solana;
    if (provider?.isPhantom) {
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
