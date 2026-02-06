import SiteShell from "../_components/SiteShell";

export default function AdminPage() {
  return (
    <SiteShell>
      <section className="space-y-8">
        <div>
          <span className="pill">Admin</span>
          <h1 className="section-title mt-3 text-3xl font-semibold">
            Debug Console
          </h1>
          <p className="mt-2 text-ink-700">
            Internal dashboard for hackathon debugging and event tracing.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Users", value: "24" },
            { title: "ENS mappings", value: "18" },
            { title: "Yellow sessions", value: "12" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-strong bg-white/70 p-6"
            >
              <p className="text-xs font-semibold text-ink-500">{item.title}</p>
              <p className="mt-2 text-2xl font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-strong bg-white/70 p-6">
          <h2 className="section-title text-xl font-semibold">
            Recent events
          </h2>
          <div className="mt-4 grid gap-3 text-sm text-ink-700">
            {[
              "YouTube chat poll started for channel UC123...abc",
              "ENS sync completed for flowmoji.eth",
              "Yellow channel settled for session yellow-39492",
              "Twitch event stream connected to flowmoji",
            ].map((event) => (
              <div
                key={event}
                className="rounded-2xl bg-sand-100 px-4 py-3"
              >
                {event}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
