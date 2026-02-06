import SiteShell from "../_components/SiteShell";
import { requireSession, requireSetupCompleted } from "@/lib/route-guards";

const tips = [
  "@viewer123 tipped 😊 $5 on Twitch",
  "@kai🔥 sent 🔥 $10 on YouTube",
  "@alyx dropped 💧 $2 on Twitch",
  "@mila tipped ✨ $4 on YouTube",
];

export default async function DashboardPage() {
  const session = await requireSession();
  await requireSetupCompleted(session.user.id);
  return (
    <SiteShell>
      <section className="space-y-10">
        <div className="grid gap-6 rounded-3xl border border-strong bg-white/70 p-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-sm text-ink-500">Creator dashboard</p>
            <h1 className="section-title mt-2 text-3xl font-semibold">
              flowmoji.eth
            </h1>
            <p className="mt-2 text-ink-700">
              Live across YouTube and Twitch with a funded Yellow session.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="pill">YouTube Connected</span>
              <span className="pill">Twitch Connected</span>
              <span className="pill">ENS Synced</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              { label: "Yellow balance", value: "$420 USDC" },
              { label: "Tips today", value: "36" },
              { label: "Settlement", value: "Ready" },
              { label: "Latency", value: "2s" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-sand-100 px-4 py-3"
              >
                <p className="text-xs text-ink-500">{stat.label}</p>
                <p className="mt-1 text-lg font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-strong bg-white/70 p-6">
            <h2 className="section-title text-xl font-semibold">
              Live streams
            </h2>
            <div className="mt-4 grid gap-3 text-sm">
              {[
                {
                  title: "Building Flowmoji MVP",
                  platform: "YouTube",
                  status: "Live",
                },
                {
                  title: "Late night chat",
                  platform: "Twitch",
                  status: "Scheduled",
                },
              ].map((stream) => (
                <div
                  key={stream.title}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-sand-100 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold">{stream.title}</p>
                    <p className="text-xs text-ink-500">{stream.platform}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="pill">{stream.status}</span>
                    <button className="rounded-full bg-ink-900 px-3 py-2 text-xs font-semibold text-white">
                      View Tips
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-soft bg-white/60 p-6">
            <h2 className="section-title text-xl font-semibold">
              Tip activity feed
            </h2>
            <div className="mt-4 grid gap-3 text-sm text-ink-700">
              {tips.map((tip) => (
                <div
                  key={tip}
                  className="rounded-2xl bg-white/80 px-4 py-3"
                >
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-strong bg-white/70 p-6">
          <h2 className="section-title text-xl font-semibold">Analytics</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              { label: "Today", value: "$86" },
              { label: "This week", value: "$420" },
              { label: "Top emoji", value: "🔥" },
              { label: "Top platform", value: "Twitch" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl bg-sand-100 px-4 py-4 text-sm"
              >
                <p className="text-ink-500">{item.label}</p>
                <p className="text-lg font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
