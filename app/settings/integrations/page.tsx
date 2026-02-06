import SiteShell from "../../_components/SiteShell";
import TwitchConnectPanel from "../../_components/TwitchConnectPanel";

export default function SettingsIntegrationsPage() {
  return (
    <SiteShell>
      <section className="space-y-6">
        <div>
          <span className="pill">Settings</span>
          <h1 className="section-title mt-3 text-3xl font-semibold">
            Integrations
          </h1>
          <p className="mt-2 text-ink-700">
            Monitor platform connections, ENS sync, and Yellow session health.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              name: "YouTube",
              status: "Connected",
              action: "Reconnect",
              detail: "Channel: Flowmoji Live",
            },
            {
              name: "Twitch",
              status: "Connected",
              action: "Reconnect",
              detail: "Channel: flowmoji",
            },
            {
              name: "ENS",
              status: "Synced",
              action: "Push Updates",
              detail: "Last synced: Today",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-strong bg-white/70 p-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="section-title text-lg font-semibold">
                  {item.name}
                </h2>
                <span className="pill">{item.status}</span>
              </div>
              <p className="mt-3 text-sm text-ink-700">{item.detail}</p>
              <button className="mt-6 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white">
                {item.action}
              </button>
            </div>
          ))}
        </div>
        <TwitchConnectPanel />
        <div className="rounded-3xl border border-strong bg-white/70 p-6">
          <h2 className="section-title text-xl font-semibold">
            Yellow session
          </h2>
          <div className="mt-4 grid gap-3 text-sm">
            {[
              { label: "Session ID", value: "yellow-39492" },
              { label: "Balance", value: "$420 USDC" },
              { label: "Settlement", value: "Ready to settle" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-2xl bg-sand-100 px-4 py-3"
              >
                <span className="text-ink-500">{row.label}</span>
                <span className="font-semibold text-ink-900">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full bg-ink-900 px-5 py-2 text-sm font-semibold text-white">
              Settle & Withdraw
            </button>
            <button className="rounded-full border border-strong px-5 py-2 text-sm font-semibold text-ink-700">
              Top Up Session
            </button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
