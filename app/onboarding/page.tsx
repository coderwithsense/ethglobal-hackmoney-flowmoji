import Link from "next/link";
import SiteShell from "../_components/SiteShell";

export default function OnboardingPage() {
  return (
    <SiteShell>
      <section className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <div className="space-y-6">
          <span className="pill">Creator onboarding</span>
          <h1 className="section-title text-3xl font-semibold">
            Connect your wallet and claim your stream identity.
          </h1>
          <p className="text-ink-700">
            Flowmoji starts with your wallet. We detect ENS, then guide you to
            connect YouTube and Twitch and set your emoji tipping rules.
          </p>
          <div className="rounded-3xl border border-strong bg-white/70 p-6">
            <p className="text-sm font-semibold text-ink-700">Wallet status</p>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-sand-100 px-4 py-3 text-sm">
              <span className="text-ink-700">No wallet connected</span>
              <button className="rounded-full bg-ink-900 px-4 py-2 text-xs font-semibold text-white">
                Connect Wallet
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-ink-500">
              <span>ENS detected</span>
              <span>—</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/setup/platforms"
              className="rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white"
            >
              Continue to Setup
            </Link>
            <Link
              href="/docs/getting-started"
              className="rounded-full border border-strong px-6 py-3 text-sm font-semibold text-ink-700"
            >
              Read the Guide
            </Link>
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-soft bg-white/60 p-6">
          <h2 className="section-title text-xl font-semibold">
            What you will connect
          </h2>
          <ul className="space-y-3 text-sm text-ink-700">
            {[
              "Wallet + ENS name",
              "YouTube channel ID",
              "Twitch username",
              "Emoji-to-USDC rules",
              "Yellow session funding",
            ].map((item) => (
              <li key={item} className="flex items-center justify-between">
                <span>{item}</span>
                <span className="text-ink-500">Pending</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
