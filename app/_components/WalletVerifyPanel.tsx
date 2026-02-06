"use client";

import { useEffect, useState } from "react";

const buildMessage = (address: string) =>
  `Flowmoji wallet verification\nAddress: ${address}\nTimestamp: ${new Date().toISOString()}`;

export default function WalletVerifyPanel() {
  const [address, setAddress] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/account/providers");
      if (!response.ok) return;
      const data = (await response.json()) as {
        profile?: { walletAddress?: string };
      };
      if (data.profile?.walletAddress) {
        setAddress(data.profile.walletAddress);
      }
    };
    load();
  }, []);

  const connectAndSign = async () => {
    setStatus(null);
    setIsLoading(true);
    try {
      if (!window.ethereum) {
        setStatus("No wallet detected. Install a wallet extension.");
        return;
      }

      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];

      const selected = accounts?.[0];
      if (!selected) {
        setStatus("No wallet selected or no accounts available.");
        return;
      }

      setAddress(selected);
      const message = buildMessage(selected);

      const signature = (await window.ethereum.request({
        method: "personal_sign",
        params: [message, selected],
      })) as `0x${string}`;

      const response = await fetch("/api/wallet/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: selected,
          signature,
          message,
        }),
      });

      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        setStatus(body.error ?? "Verification failed.");
        return;
      }

      setStatus("Wallet verified and saved.");
    } catch (error: any) {
      if (error?.code === 4001) {
        setStatus("Wallet connection was rejected.");
      } else {
        setStatus("Wallet connection failed. Try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = async () => {
    setStatus(null);
    setIsLoading(true);
    const response = await fetch("/api/wallet/disconnect", { method: "POST" });
    if (!response.ok) {
      setStatus("Failed to disconnect wallet.");
      setIsLoading(false);
      return;
    }
    setAddress("");
    setStatus("Wallet disconnected.");
    setIsLoading(false);
  };

  return (
    <div className="rounded-3xl border border-strong bg-white/70 p-6">
      <p className="text-sm font-semibold text-ink-700">
        Wallet verification
      </p>
      <p className="mt-2 text-xs text-ink-500">
        Connect your wallet, sign a message, and store a verified address. Only
        one address per account.
      </p>
      <div className="mt-4 rounded-2xl bg-sand-100 px-4 py-3 text-sm text-ink-700">
        {address ? `Connected: ${address}` : "No wallet connected yet."}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={connectAndSign}
          className="rounded-full bg-ink-900 px-4 py-2 text-xs font-semibold text-white"
          type="button"
          disabled={isLoading}
        >
          Connect & Sign
        </button>
        <button
          onClick={disconnect}
          className="rounded-full border border-strong px-4 py-2 text-xs font-semibold text-ink-700"
          type="button"
          disabled={isLoading || !address}
        >
          Disconnect Wallet
        </button>
      </div>
      {status && <p className="mt-3 text-xs text-ink-500">{status}</p>}
    </div>
  );
}
