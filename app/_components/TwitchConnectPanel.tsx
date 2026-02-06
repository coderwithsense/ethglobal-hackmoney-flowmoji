"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

type AccountInfo = {
  providerId: string;
  providerUserId?: string | null;
};

export default function TwitchConnectPanel() {
  const [status, setStatus] = useState<string | null>(null);
  const [twitchAccount, setTwitchAccount] = useState<AccountInfo | null>(null);
  const [twitchName, setTwitchName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadAccounts = async () => {
    const response = await fetch("/api/account/providers");
    if (!response.ok) return;
    const data = (await response.json()) as {
      accounts: AccountInfo[];
    };
    const match = data.accounts?.find(
      (account) => account.providerId === "twitch"
    );
    setTwitchAccount(match ?? null);
  };

  const loadTwitchUser = async () => {
    const response = await fetch("/api/account/twitch-user");
    if (!response.ok) return;
    const data = (await response.json()) as { username?: string | null };
    setTwitchName(data.username ?? null);
  };

  useEffect(() => {
    loadAccounts();
    loadTwitchUser();
  }, []);

  const connect = async () => {
    setStatus(null);
    try {
      await authClient.signIn.social({
        provider: "twitch",
        callbackURL: "/settings/integrations",
      });
    } catch (error) {
      setStatus("Failed to connect Twitch. Check OAuth settings.");
    }
  };

  const disconnect = async () => {
    setLoading(true);
    setStatus(null);
    const response = await fetch("/api/account/twitch", { method: "DELETE" });
    if (!response.ok) {
      setStatus("Failed to disconnect Twitch.");
      setLoading(false);
      return;
    }
    setTwitchAccount(null);
    setTwitchName(null);
    setLoading(false);
  };

  return (
    <div className="rounded-3xl border border-strong bg-white/70 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink-700">Twitch OAuth</p>
          <p className="text-xs text-ink-500">
            Connect your Twitch account to validate ownership.
          </p>
        </div>
        {twitchAccount ? (
          <button
            onClick={disconnect}
            className="rounded-full border border-strong px-4 py-2 text-xs font-semibold text-ink-700"
            type="button"
            disabled={loading}
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={connect}
            className="rounded-full bg-ink-900 px-4 py-2 text-xs font-semibold text-white"
            type="button"
          >
            Connect Twitch
          </button>
        )}
      </div>
      {twitchAccount ? (
        <div className="mt-4 rounded-2xl bg-sand-100 px-4 py-3 text-xs text-ink-500">
          Connected account:{" "}
          <span className="font-semibold text-ink-700">
            {twitchName ?? twitchAccount.providerUserId ?? "Twitch user"}
          </span>
        </div>
      ) : (
        <div className="mt-4 rounded-2xl bg-sand-100 px-4 py-3 text-xs text-ink-500">
          No Twitch account connected.
        </div>
      )}
      {status && <p className="mt-3 text-xs text-ink-500">{status}</p>}
    </div>
  );
}
