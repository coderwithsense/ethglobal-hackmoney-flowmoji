import SiteShell from "../_components/SiteShell";

export default function ExtensionPage() {
  return (
    <SiteShell>
      <section className="space-y-8">
        <div>
          <span className="pill">Extension</span>
          <h1 className="section-title mt-3 text-3xl font-semibold">
            Creator overlay & Chrome extension
          </h1>
          <p className="mt-2 text-ink-700">
            The Flowmoji extension helps creators track tips live on YouTube and
            Twitch while staying in control of their Yellow session.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-strong bg-white/70 p-6">
            <h2 className="section-title text-xl font-semibold">
              What the extension does
            </h2>
            <div className="mt-4 grid gap-3 text-sm text-ink-700">
              {[
                "Shows current session balance and tip count.",
                "Toggles emoji tipping on/off per site.",
                "Displays live tip feed while streaming.",
                "Helps parse chat when API limits apply.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-sand-100 px-4 py-3"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-soft bg-white/60 p-6">
            <h2 className="section-title text-xl font-semibold">
              Overlay preview
            </h2>
            <div className="mt-4 grid gap-3 text-sm text-ink-700">
              {[
                { label: "Status", value: "Connected" },
                { label: "Session balance", value: "$420 USDC" },
                { label: "Tips this stream", value: "36" },
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
            <button className="mt-6 rounded-full bg-ink-900 px-5 py-2 text-sm font-semibold text-white">
              Download Extension
            </button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
