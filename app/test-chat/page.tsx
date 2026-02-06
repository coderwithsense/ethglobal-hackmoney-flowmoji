import SiteShell from "../_components/SiteShell";
import TwitchComfyDemo from "../_components/TwitchComfyDemo";

export default function TestChatPage() {
  return (
    <SiteShell>
      <section className="space-y-8">
        <div>
          <span className="pill">Test Chat</span>
          <h1 className="section-title mt-3 text-3xl font-semibold">
            Twitch chat sandbox
          </h1>
          <p className="mt-2 text-ink-700">
            Connect to a Twitch channel, watch live chat, and verify emoji
            tipping debits in real time.
          </p>
        </div>
        <TwitchComfyDemo />
      </section>
    </SiteShell>
  );
}
