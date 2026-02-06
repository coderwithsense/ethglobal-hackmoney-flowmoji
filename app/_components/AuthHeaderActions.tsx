"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function AuthHeaderActions() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="rounded-full border border-strong px-4 py-2 text-sm font-semibold text-ink-700">
        Checking...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/sign-in"
          className="rounded-full border border-strong px-4 py-2 text-sm font-semibold text-ink-700"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <button
      onClick={() => authClient.signOut()}
      className="rounded-full border border-strong px-4 py-2 text-sm font-semibold text-ink-700"
      type="button"
    >
      Sign Out
    </button>
  );
}
