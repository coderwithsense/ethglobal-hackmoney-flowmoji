import SiteShell from "../../_components/SiteShell";

export default function DocsTechnicalPage() {
  return (
    <SiteShell>
      <section className="space-y-8">
        <div>
          <span className="pill">Docs</span>
          <h1 className="section-title mt-3 text-3xl font-semibold">
            Technical Overview
          </h1>
          <p className="mt-2 text-ink-700">
            Flowmoji combines Yellow state channels, ENS text records, and live
            chat ingestion for gasless tips.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Yellow payment flow",
              copy: "Open a funded channel once, update balances off-chain per emoji, then settle on-chain in bulk.",
            },
            {
              title: "ENS configuration",
              copy: "Store emoji rules and platform identifiers as ENS text records for portability.",
            },
            {
              title: "YouTube live chat",
              copy: "Poll liveChatMessages for emoji triggers and map to tips with anti-spam checks.",
            },
            {
              title: "Twitch chat",
              copy: "Use tmi.js to subscribe to live IRC messages and parse emojis or emotes.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-strong bg-white/70 p-6"
            >
              <h2 className="section-title text-xl font-semibold">
                {item.title}
              </h2>
              <p className="mt-3 text-sm text-ink-700">{item.copy}</p>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-soft bg-white/60 p-6 text-sm text-ink-700">
          <p className="font-semibold text-ink-900">Architecture outline</p>
          <div className="mt-3 grid gap-3 font-mono text-xs text-ink-500">
            <span>Browser / Extension → Backend Orchestrator</span>
            <span>Backend → Yellow SDK (state channel)</span>
            <span>Backend → ENS resolver + text record writer</span>
            <span>Backend → YouTube + Twitch APIs</span>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
