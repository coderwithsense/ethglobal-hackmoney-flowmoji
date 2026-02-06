"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { injected } from "wagmi/connectors";

const buildMessage = (address: string) =>
  `Flowmoji wallet verification\nAddress: ${address}\nTimestamp: ${new Date().toISOString()}`;

export default function WalletVerifyPanel() {
  const [status, setStatus] = useState<string | null>(null);
  const [storedAddress, setStoredAddress] = useState<string>("");
  const { address, isConnected } = useAccount();
  const { connectAsync, isPending: isConnecting } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const activeAddress = useMemo(
    () => address ?? storedAddress,
    [address, storedAddress]
  );

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/account/providers");
      if (!response.ok) return;
      const data = (await response.json()) as {
        profile?: { walletAddress?: string };
      };
      if (data.profile?.walletAddress) {
        setStoredAddress(data.profile.walletAddress);
      }
    };
    load();
  }, []);

  const connectAndSign = async () => {
    setStatus(null);
    try {
      const connected = isConnected
        ? address
        : (await connectAsync({ connector: injected() })).accounts?.[0];

      if (!connected) {
        setStatus("No wallet selected or no accounts available.");
        return;
      }

      const message = buildMessage(connected);
      const signature = await signMessageAsync({ message });

      const response = await fetch("/api/wallet/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: connected,
          signature,
          message,
        }),
      });

      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        setStatus(body.error ?? "Verification failed.");
        return;
      }

      setStoredAddress(connected);
      setStatus("Wallet verified and saved.");
    } catch (error: any) {
      if (error?.code === 4001) {
        setStatus("Wallet connection was rejected.");
      } else {
        setStatus("Wallet connection failed. Try again.");
      }
    }
  };

  const disconnect = async () => {
    setStatus(null);
    const response = await fetch("/api/wallet/disconnect", { method: "POST" });
    if (!response.ok) {
      setStatus("Failed to disconnect wallet.");
      return;
    }
    if (isConnected) {
      await disconnectAsync();
    }
    setStoredAddress("");
    setStatus("Wallet disconnected.");
  };

  return (
    <div className="rounded-3xl border border-strong bg-white/70 p-6">
      <p className="text-sm font-semibold text-ink-700">Wallet verification</p>
      <p className="mt-2 text-xs text-ink-500">
        Connect your wallet, sign a message, and store a verified address. Only
        one address per account.
      </p>
      <div className="mt-4 rounded-2xl bg-sand-100 px-4 py-3 text-sm text-ink-700">
        {activeAddress ? `Connected: ${activeAddress}` : "No wallet connected yet."}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={connectAndSign}
          className="rounded-full bg-ink-900 px-4 py-2 text-xs font-semibold text-white"
          type="button"
          disabled={isConnecting}
        >
          {isConnecting ? "Connecting..." : "Connect & Sign"}
        </button>
        <button
          onClick={disconnect}
          className="rounded-full border border-strong px-4 py-2 text-xs font-semibold text-ink-700"
          type="button"
          disabled={!activeAddress}
        >
          Disconnect Wallet
        </button>
      </div>
      {status && <p className="mt-3 text-xs text-ink-500">{status}</p>}
    </div>
  );
}
