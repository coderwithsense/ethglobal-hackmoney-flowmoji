import Link from "next/link";
import SiteShell from "../../_components/SiteShell";
import SetupStepper from "../../_components/SetupStepper";
import { requireSession, requireSetupNotCompleted } from "@/lib/route-guards";

const rules = [
  { emoji: "😊", amount: "5", currency: "USDC", label: "Happy tip" },
  { emoji: "🔥", amount: "10", currency: "USDC", label: "Super fan" },
  { emoji: "💧", amount: "2", currency: "USDC", label: "Quick shout" },
];

export default async function SetupTippingPage() {
  const session = await requireSession();
  await requireSetupNotCompleted(session.user.id);
  return (
    <SiteShell>
      <section className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="pill">Step 2 of 4</span>
            <h1 className="section-title mt-3 text-3xl font-semibold">
              Configure emoji tipping rules
            </h1>
            <p className="mt-2 text-ink-700">
              Map emojis to amounts once, or customize per platform later.
            </p>
          </div>
          <Link
            href="/setup/ens"
            className="rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white"
          >
            Next: ENS Sync
          </Link>
        </div>
        <SetupStepper current={2} />
        <div className="rounded-3xl border border-strong bg-white/70 p-6">
          <div className="grid grid-cols-5 gap-3 text-xs font-semibold uppercase text-ink-500">
            <span>Emoji</span>
            <span>Amount</span>
            <span>Currency</span>
            <span>Description</span>
            <span>Status</span>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            {rules.map((rule) => (
              <div
                key={rule.label}
                className="grid grid-cols-5 items-center gap-3 rounded-2xl bg-sand-100 px-4 py-3"
              >
                <span className="text-lg">{rule.emoji}</span>
                <span>{rule.amount}</span>
                <span>{rule.currency}</span>
                <span>{rule.label}</span>
                <span className="text-ink-500">Enabled</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full border border-strong px-5 py-2 text-sm font-semibold text-ink-700">
              Add Emoji Rule
            </button>
            <button className="rounded-full bg-ink-900 px-5 py-2 text-sm font-semibold text-white">
              Save Mapping
            </button>
          </div>
        </div>
        <div className="rounded-3xl border border-soft bg-white/60 p-6 text-sm text-ink-700">
          <p className="font-semibold text-ink-900">
            Apply same rules across platforms
          </p>
          <p className="mt-2">
            Toggle once to keep YouTube and Twitch consistent, or customize per
            platform later in Settings.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
