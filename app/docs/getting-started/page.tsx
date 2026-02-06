import Link from "next/link";
import SiteShell from "../../_components/SiteShell";

export default function DocsGettingStartedPage() {
  return (
    <SiteShell>
      <section className="space-y-8">
        <div>
          <span className="pill">Docs</span>
          <h1 className="section-title mt-3 text-3xl font-semibold">
            Getting Started
          </h1>
          <p className="mt-2 text-ink-700">
            A quick guide for creators to enable emoji tipping across YouTube
            and Twitch.
          </p>
        </div>
        <div className="grid gap-6 rounded-3xl border border-strong bg-white/70 p-6">
          {[
            {
              title: "Connect wallet + ENS",
              copy: "Sign in with your wallet and let Flowmoji resolve your ENS name.",
            },
            {
              title: "Link streaming platforms",
              copy: "Authorize YouTube and Twitch so we can read live chat messages.",
            },
            {
              title: "Set emoji rules",
              copy: "Map emojis to USDC amounts and optionally sync to ENS text records.",
            },
            {
              title: "Fund Yellow session",
              copy: "Deposit once to open a state channel for gasless tips.",
            },
          ].map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl bg-sand-100 px-4 py-4 text-sm"
            >
              <p className="text-xs font-semibold text-ink-500">
                Step {index + 1}
              </p>
              <p className="mt-2 font-semibold text-ink-900">{step.title}</p>
              <p className="mt-1 text-ink-700">{step.copy}</p>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-soft bg-white/60 p-6 text-sm text-ink-700">
          <p className="font-semibold text-ink-900">Need setup help?</p>
          <p className="mt-2">
            Start onboarding or review the technical overview if you want a
            deeper architecture explanation.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/onboarding"
              className="rounded-full bg-ink-900 px-5 py-2 text-sm font-semibold text-white"
            >
              Start Onboarding
            </Link>
            <Link
              href="/docs/technical"
              className="rounded-full border border-strong px-5 py-2 text-sm font-semibold text-ink-700"
            >
              Technical Overview
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
