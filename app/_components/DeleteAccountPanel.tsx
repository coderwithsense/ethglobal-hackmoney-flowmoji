"use client";

import { useState } from "react";

export default function DeleteAccountPanel() {
  const [status, setStatus] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);

  const handleDelete = async () => {
    setStatus(null);
    if (!confirm) {
      setStatus("Please confirm deletion first.");
      return;
    }

    const response = await fetch("/api/account/delete", { method: "DELETE" });
    if (!response.ok) {
      setStatus("Failed to delete account.");
      return;
    }
    setStatus("Account deleted. You can close this tab.");
  };

  return (
    <div className="rounded-3xl border border-strong bg-white/70 p-6">
      <p className="text-sm font-semibold text-ink-700">Delete account</p>
      <p className="mt-2 text-xs text-ink-500">
        This removes your profile, connected wallets, tips, and sessions.
      </p>
      <label className="mt-4 flex items-center gap-2 text-xs text-ink-700">
        <input
          type="checkbox"
          checked={confirm}
          onChange={(event) => setConfirm(event.target.checked)}
        />
        I understand this action is permanent.
      </label>
      <button
        onClick={handleDelete}
        className="mt-4 rounded-full border border-red-600 px-4 py-2 text-xs font-semibold text-red-600"
        type="button"
      >
        Delete Account
      </button>
      {status && <p className="mt-3 text-xs text-ink-500">{status}</p>}
    </div>
  );
}
