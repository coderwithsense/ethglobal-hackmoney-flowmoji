import Link from "next/link";
import SiteShell from "../../_components/SiteShell";
import SetupStepper from "../../_components/SetupStepper";
import { requireSession, requireSetupNotCompleted } from "@/lib/route-guards";

const records = [
  "tip.emoji.smile = 5",
  "tip.emoji.fire = 10",
  "tip.platform.youtube = UC123...abc",
  "tip.platform.twitch = creator_handle",
  "tip.wallet.yellow = 0xflow...moji",
];

export default async function SetupEnsPage() {
  const session = await requireSession();
  await requireSetupNotCompleted(session.user.id);
  return (
    <SiteShell>
      <section className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="pill">Step 3 of 4</span>
            <h1 className="section-title mt-3 text-3xl font-semibold">
              Sync your ENS configuration
            </h1>
            <p className="mt-2 text-ink-700">
              Publish your emoji rules and platform IDs as ENS text records for
              portable tipping preferences.
            </p>
          </div>
          <Link
            href="/setup/wallet"
            className="rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white"
          >
            Next: Yellow Session
          </Link>
        </div>
        <SetupStepper current={3} />
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-strong bg-white/70 p-6">
            <h2 className="section-title text-xl font-semibold">
              ENS record preview
            </h2>
            <div className="mt-4 grid gap-3 text-sm text-ink-700">
              {records.map((record) => (
                <div
                  key={record}
                  className="rounded-2xl bg-sand-100 px-4 py-3 font-mono text-xs"
                >
                  {record}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-full bg-ink-900 px-5 py-2 text-sm font-semibold text-white">
                Write to ENS
              </button>
              <button className="rounded-full border border-strong px-5 py-2 text-sm font-semibold text-ink-700">
                Skip for Now
              </button>
            </div>
          </div>
          <div className="rounded-3xl border border-soft bg-white/60 p-6 text-sm text-ink-700">
            <p className="font-semibold text-ink-900">
              ENS name detected: flowmoji.eth
            </p>
            <p className="mt-3">
              No ENS? You can still use Flowmoji with your wallet address and
              store settings locally.
            </p>
            <div className="mt-6 rounded-2xl bg-white/80 px-4 py-3 text-xs text-ink-500">
              ENS writes require wallet signature.
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
