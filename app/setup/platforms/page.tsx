import Link from "next/link";
import SiteShell from "../../_components/SiteShell";
import SetupStepper from "../../_components/SetupStepper";
import TwitchAuthPanel from "../../_components/TwitchAuthPanel";

export default function SetupPlatformsPage() {
  return (
    <SiteShell>
      <section className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="pill">Step 1 of 4</span>
            <h1 className="section-title mt-3 text-3xl font-semibold">
              Connect your streaming platforms
            </h1>
            <p className="mt-2 text-ink-700">
              Link YouTube and Twitch so Flowmoji can monitor live chat in real
              time.
            </p>
          </div>
          <Link
            href="/setup/tipping"
            className="rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white"
          >
            Next: Tipping Rules
          </Link>
        </div>
        <SetupStepper current={1} />
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              name: "YouTube",
              status: "Not connected",
              detail: "Connect your channel and allow chat access.",
            },
            {
              name: "Twitch",
              status: "Not connected",
              detail: "Authorize chat read access for live streams.",
            },
          ].map((platform) => (
            <div
              key={platform.name}
              className="rounded-3xl border border-strong bg-white/70 p-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="section-title text-xl font-semibold">
                  {platform.name}
                </h2>
                <span className="pill">{platform.status}</span>
              </div>
              <p className="mt-3 text-sm text-ink-700">{platform.detail}</p>
              <button className="mt-6 rounded-full bg-ink-900 px-5 py-2 text-sm font-semibold text-white">
                Connect {platform.name}
              </button>
            </div>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <TwitchAuthPanel />
          <div className="rounded-3xl border border-soft bg-white/60 p-6 text-sm text-ink-700">
            <p className="font-semibold text-ink-900">Test chat ingestion</p>
            <p className="mt-2">
              Use the Twitch Test Chat page to verify emoji detection and debit
              logs before going live.
            </p>
            <Link
              href="/test-chat"
              className="mt-4 inline-flex rounded-full border border-strong px-4 py-2 text-xs font-semibold text-ink-700"
            >
              Open Test Chat
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
