import Link from "next/link";
import SiteShell from "./_components/SiteShell";

export default function Home() {
  return (
    <SiteShell>
      <section className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-6">
          <span className="pill">Instant, gasless emoji tipping</span>
          <h1 className="section-title text-4xl font-semibold text-ink-900 md:text-5xl">
            Turn live chat emojis into real-time USDC tips.
          </h1>
          <p className="text-lg text-ink-700">
            Flowmoji lets creators accept viewer tips on YouTube and Twitch with
            zero gas per tip. Yellow state channels keep it instant, and ENS
            keeps it portable.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/onboarding"
              className="rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white"
            >
              Get Started
            </Link>
            <Link
              href="/docs/technical"
              className="rounded-full border border-strong px-6 py-3 text-sm font-semibold text-ink-700"
            >
              Technical Overview
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-ink-500">
            <span>Yellow Network</span>
            <span>ENS text records</span>
            <span>YouTube + Twitch</span>
          </div>
        </div>
        <div className="glass-card grid gap-4 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink-700">
              Live Tip Stream
            </p>
            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-900">
              Live
            </span>
          </div>
          <div className="space-y-3">
            {[
              "@viewer123 tipped 😊 $5 on Twitch",
              "@kai🔥 sent 🔥 $10 on YouTube",
              "@alyx dropped 💧 $2 on Twitch",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3 text-sm text-ink-700"
              >
                <span>{item}</span>
                <span className="text-ink-500">Off-chain</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div className="rounded-2xl bg-sand-100 p-3">
              <p className="font-semibold">$420</p>
              <p className="text-xs text-ink-500">Session balance</p>
            </div>
            <div className="rounded-2xl bg-sand-100 p-3">
              <p className="font-semibold">36</p>
              <p className="text-xs text-ink-500">Emoji tips</p>
            </div>
            <div className="rounded-2xl bg-sand-100 p-3">
              <p className="font-semibold">2s</p>
              <p className="text-xs text-ink-500">Latency</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-3">
        {[
          {
            title: "Connect your creator stack",
            copy: "Link wallet, ENS, YouTube, and Twitch. Flowmoji resolves your ENS records for instant setup.",
          },
          {
            title: "Viewers tip with emoji chat",
            copy: "😊 = 5 USDC. 🔥 = 10 USDC. Each emoji triggers an off-chain update inside a Yellow session.",
          },
          {
            title: "Settle on-chain in bulk",
            copy: "End of stream? Settle the channel once and finalize all tips in a single transaction.",
          },
        ].map((item) => (
          <div key={item.title} className="space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sand-200 text-lg">
              ✨
            </div>
            <h3 className="section-title text-xl font-semibold">{item.title}</h3>
            <p className="text-sm text-ink-700">{item.copy}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6 rounded-3xl border border-strong bg-white/60 p-8">
          <div>
            <h2 className="section-title text-2xl font-semibold">
              Why creators choose Flowmoji
            </h2>
            <p className="mt-3 text-ink-700">
              A creator-first platform designed for fast streams, rapid chat,
              and predictable revenue.
            </p>
          </div>
          <div className="grid gap-4 text-sm text-ink-700">
            <div className="flex items-center justify-between">
              <span>Gasless tipping experience</span>
              <span className="pill">Yellow</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Portable settings across apps</span>
              <span className="pill">ENS</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Multi-platform analytics</span>
              <span className="pill">YouTube + Twitch</span>
            </div>
          </div>
        </div>
        <div className="glass-card grid gap-4 rounded-3xl p-8">
          <h3 className="section-title text-xl font-semibold">
            Emoji mapping preview
          </h3>
          <div className="grid gap-3 text-sm">
            {[
              { emoji: "😊", amount: "5 USDC", label: "Happy tip" },
              { emoji: "🔥", amount: "10 USDC", label: "Super fan" },
              { emoji: "💧", amount: "2 USDC", label: "Quick shout" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3"
              >
                <span className="text-lg">{row.emoji}</span>
                <span className="text-ink-700">{row.label}</span>
                <span className="font-semibold text-ink-900">{row.amount}</span>
              </div>
            ))}
          </div>
          <Link
            href="/setup/tipping"
            className="rounded-full border border-strong px-5 py-2 text-center text-sm font-semibold text-ink-700"
          >
            Configure Rules
          </Link>
        </div>
      </section>

      <section className="mt-20 rounded-3xl bg-ink-900 px-8 py-12 text-white">
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <h2 className="section-title text-3xl font-semibold">
              Build your stream economy in minutes.
            </h2>
            <p className="mt-3 text-white/70">
              Connect your wallet, sync ENS, and go live with emoji tipping.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              href="/onboarding"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900"
            >
              Start Onboarding
            </Link>
            <Link
              href="/extension"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white"
            >
              Extension Details
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
