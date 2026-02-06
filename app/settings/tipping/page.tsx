import SiteShell from "../../_components/SiteShell";

export default function SettingsTippingPage() {
  return (
    <SiteShell>
      <section className="space-y-6">
        <div>
          <span className="pill">Settings</span>
          <h1 className="section-title mt-3 text-3xl font-semibold">
            Tipping Rules
          </h1>
          <p className="mt-2 text-ink-700">
            Adjust emoji mappings, platform overrides, and session safety
            controls.
          </p>
        </div>
        <div className="rounded-3xl border border-strong bg-white/70 p-6">
          <h2 className="section-title text-xl font-semibold">
            Emoji price mapping
          </h2>
          <div className="mt-4 grid gap-3 text-sm">
            {[
              { emoji: "😊", amount: "5 USDC", platform: "All" },
              { emoji: "🔥", amount: "10 USDC", platform: "Twitch" },
              { emoji: "💧", amount: "2 USDC", platform: "YouTube" },
            ].map((rule) => (
              <div
                key={`${rule.emoji}-${rule.platform}`}
                className="flex items-center justify-between rounded-2xl bg-sand-100 px-4 py-3"
              >
                <span className="text-lg">{rule.emoji}</span>
                <span className="text-ink-700">{rule.amount}</span>
                <span className="text-xs text-ink-500">
                  {rule.platform} override
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full border border-strong px-5 py-2 text-sm font-semibold text-ink-700">
              Add Rule
            </button>
            <button className="rounded-full bg-ink-900 px-5 py-2 text-sm font-semibold text-white">
              Save Changes
            </button>
          </div>
        </div>
        <div className="rounded-3xl border border-soft bg-white/60 p-6 text-sm text-ink-700">
          <p className="font-semibold text-ink-900">
            Require minimum Yellow balance
          </p>
          <p className="mt-2">
            Prevent tips if the off-chain channel drops below a minimum balance.
          </p>
          <div className="mt-4 rounded-2xl bg-white/80 px-4 py-3 text-xs text-ink-500">
            Minimum balance: 10 USDC
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
