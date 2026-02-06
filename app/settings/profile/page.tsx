import SiteShell from "../../_components/SiteShell";

export default function SettingsProfilePage() {
  return (
    <SiteShell>
      <section className="space-y-6">
        <div>
          <span className="pill">Settings</span>
          <h1 className="section-title mt-3 text-3xl font-semibold">
            Profile & Identity
          </h1>
          <p className="mt-2 text-ink-700">
            Control how your creator profile appears inside Flowmoji.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-strong bg-white/70 p-6">
            <div className="grid gap-4 text-sm">
              {[
                { label: "Display name", value: "Flowmoji Creator" },
                { label: "ENS name", value: "flowmoji.eth" },
                { label: "Wallet address", value: "0xF1ow...Moji" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between rounded-2xl bg-sand-100 px-4 py-3"
                >
                  <span className="text-ink-500">{row.label}</span>
                  <span className="font-semibold text-ink-900">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-6 rounded-full bg-ink-900 px-5 py-2 text-sm font-semibold text-white">
              Update Profile
            </button>
          </div>
          <div className="rounded-3xl border border-soft bg-white/60 p-6 text-sm text-ink-700">
            <p className="font-semibold text-ink-900">Public Flowmoji link</p>
            <p className="mt-2">flowmoji.xyz/creator/flowmoji</p>
            <p className="mt-4 text-ink-500">
              Add this link to stream descriptions or overlays.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
