import Link from "next/link";
import SiteShell from "../../_components/SiteShell";
import SetupStepper from "../../_components/SetupStepper";
import { requireSession, requireSetupNotCompleted } from "@/lib/route-guards";

export default async function SetupWalletPage() {
  const session = await requireSession();
  await requireSetupNotCompleted(session.user.id);
  return (
    <SiteShell>
      <section className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="pill">Step 4 of 4</span>
            <h1 className="section-title mt-3 text-3xl font-semibold">
              Open your Yellow session
            </h1>
            <p className="mt-2 text-ink-700">
              Deposit once to fund the off-chain channel for the entire stream.
            </p>
          </div>
          <Link
            href="/setup/complete"
            className="rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white"
          >
            Finish Setup
          </Link>
        </div>
        <SetupStepper current={4} />
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-strong bg-white/70 p-6">
            <h2 className="section-title text-xl font-semibold">
              Session funding
            </h2>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="rounded-2xl bg-sand-100 px-4 py-3">
                <p className="text-xs font-semibold text-ink-500">
                  Deposit amount
                </p>
                <p className="mt-1 text-lg font-semibold">50 USDC</p>
              </div>
              <div className="rounded-2xl bg-sand-100 px-4 py-3">
                <p className="text-xs font-semibold text-ink-500">Network</p>
                <p className="mt-1 text-lg font-semibold">Arbitrum</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-full bg-ink-900 px-5 py-2 text-sm font-semibold text-white">
                Open Yellow Session
              </button>
              <button className="rounded-full border border-strong px-5 py-2 text-sm font-semibold text-ink-700">
                Simulate Funding
              </button>
            </div>
          </div>
          <div className="rounded-3xl border border-soft bg-white/60 p-6 text-sm text-ink-700">
            <p className="font-semibold text-ink-900">Session status</p>
            <div className="mt-4 grid gap-3">
              {[
                { label: "Session ID", value: "yellow-39492" },
                { label: "Balance", value: "$50.00 USDC" },
                { label: "Settlement", value: "Not settled" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3"
                >
                  <span>{row.label}</span>
                  <span className="text-ink-500">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
