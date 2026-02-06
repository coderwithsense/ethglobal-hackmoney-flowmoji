"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async () => {
    setStatus(null);
    try {
      setLoading(true);
      await authClient.signUp.email({
        email,
        password,
        name: usernameValue,
        username: usernameValue,
      });
      setStatus("Account created. Redirecting to setup...");
      router.push("/setup/platforms");
    } catch (error) {
      setStatus("Sign up failed. Check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-strong bg-white/70 p-6">
      <h2 className="section-title text-xl font-semibold">Create account</h2>
      <div className="mt-4 grid gap-3 text-sm">
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-2xl border border-soft bg-white/80 px-4 py-3"
          placeholder="Email"
        />
        <input
          value={usernameValue}
          onChange={(event) => setUsernameValue(event.target.value)}
          className="rounded-2xl border border-soft bg-white/80 px-4 py-3"
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-2xl border border-soft bg-white/80 px-4 py-3"
          placeholder="Password"
          type="password"
        />
      </div>
      <button
        onClick={submit}
        className="mt-4 w-full rounded-full bg-ink-900 px-4 py-3 text-sm font-semibold text-white"
        type="button"
        disabled={loading}
      >
        {loading ? "Creating..." : "Sign Up"}
      </button>
      {status && <p className="mt-3 text-xs text-ink-500">{status}</p>}
    </div>
  );
}

export function SignInForm() {
  const [usernameValue, setUsernameValue] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async () => {
    setStatus(null);
    try {
      setLoading(true);
      await authClient.signIn.username({
        username: usernameValue,
        password,
      });
      setStatus("Signed in. Redirecting...");
      router.push("/dashboard");
    } catch (error) {
      setStatus("Sign in failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-strong bg-white/70 p-6">
      <h2 className="section-title text-xl font-semibold">Sign in</h2>
      <div className="mt-4 grid gap-3 text-sm">
        <input
          value={usernameValue}
          onChange={(event) => setUsernameValue(event.target.value)}
          className="rounded-2xl border border-soft bg-white/80 px-4 py-3"
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-2xl border border-soft bg-white/80 px-4 py-3"
          placeholder="Password"
          type="password"
        />
      </div>
      <button
        onClick={submit}
        className="mt-4 w-full rounded-full bg-ink-900 px-4 py-3 text-sm font-semibold text-white"
        type="button"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
      {status && <p className="mt-3 text-xs text-ink-500">{status}</p>}
    </div>
  );
}
