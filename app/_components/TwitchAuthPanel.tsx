"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function TwitchAuthPanel() {
  const { data: session, isLoading } = authClient.useSession();
  const [error, setError] = useState<string | null>(null);
  const [expectedHandle, setExpectedHandle] = useState("");

  const signIn = async () => {
    setError(null);
    try {
      await authClient.signIn.social({ provider: "twitch" });
    } catch (err) {
      setError("Twitch sign-in failed. Check your OAuth settings.");
    }
  };

  const signOut = async () => {
    setError(null);
    await authClient.signOut();
  };

  return (
    <div className="rounded-3xl border border-strong bg-white/70 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink-700">
            Twitch OAuth verification
          </p>
          <p className="text-xs text-ink-500">
            Ensure the connected Twitch account belongs to the creator.
          </p>
        </div>
        <span className="pill">
          {isLoading ? "Checking..." : session ? "Verified" : "Not connected"}
        </span>
      </div>
      <div className="mt-4 rounded-2xl bg-sand-100 px-4 py-3 text-sm text-ink-700">
        {session ? (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>
              Connected as{" "}
              <strong className="text-ink-900">
                {session.user?.name ?? "Twitch user"}
              </strong>
            </span>
            <button
              onClick={signOut}
              className="rounded-full border border-strong px-4 py-2 text-xs font-semibold text-ink-700"
              type="button"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>No OAuth session yet.</span>
            <button
              onClick={signIn}
              className="rounded-full bg-ink-900 px-4 py-2 text-xs font-semibold text-white"
              type="button"
            >
              Connect with Twitch
            </button>
          </div>
        )}
      </div>
      <div className="mt-4 grid gap-3 text-xs text-ink-500">
        <label className="grid gap-2">
          Expected channel handle
          <input
            value={expectedHandle}
            onChange={(event) => setExpectedHandle(event.target.value)}
            className="rounded-2xl border border-soft bg-white/80 px-4 py-3 text-sm text-ink-700"
            placeholder="e.g., ohnepixel"
          />
        </label>
        {session && expectedHandle ? (
          <div className="rounded-2xl bg-white/80 px-4 py-3 text-sm">
            {session.user?.name?.toLowerCase() === expectedHandle.toLowerCase()
              ? "Account match verified."
              : "Connected account does not match the expected channel."}
          </div>
        ) : null}
      </div>
      {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
      <p className="mt-3 text-xs text-ink-500">
        OAuth verifies account ownership and enables trusted chat ingestion.
      </p>
    </div>
  );
}
