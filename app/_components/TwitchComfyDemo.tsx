"use client";

import { useEffect, useMemo, useState } from "react";

type ChatEvent = {
  user: string;
  message: string;
  emoji: string[];
  time: string;
};

const defaultMap: Record<string, number> = {
  "😊": 5,
  "🔥": 10,
  "💧": 2,
};

function extractEmojis(message: string) {
  return Array.from(message.matchAll(/\p{Extended_Pictographic}/gu)).map(
    (match) => match[0]
  );
}

export default function TwitchComfyDemo() {
  const [channel, setChannel] = useState("ohnepixel");
  const [oauth, setOauth] = useState("");
  const [connected, setConnected] = useState(false);
  const [events, setEvents] = useState<ChatEvent[]>([]);
  const [status, setStatus] = useState("Idle");

  const emojiList = useMemo(() => Object.keys(defaultMap), []);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        const comfy = (window as unknown as { ComfyJS?: { Disconnect?: () => void } })
          .ComfyJS;
        comfy?.Disconnect?.();
      }
    };
  }, []);

  const connect = async () => {
    if (!channel.trim()) return;
    setStatus("Connecting...");
    const { default: ComfyJS } = await import("comfy.js");

    ComfyJS.onChat = (user: string, message: string) => {
      const emojis = extractEmojis(message);
      const detected = emojis.filter((emoji) => emojiList.includes(emoji));

      if (detected.length === 0) return;
      setEvents((prev) =>
        [
          {
            user,
            message,
            emoji: detected,
            time: new Date().toLocaleTimeString(),
          },
          ...prev,
        ].slice(0, 6)
      );
    };

    ComfyJS.onConnected = () => {
      setConnected(true);
      setStatus("Connected");
    };

    ComfyJS.onError = () => {
      setStatus("Connection error");
      setConnected(false);
    };

    if (oauth.trim()) {
      ComfyJS.Init(channel.trim(), oauth.trim());
    } else {
      ComfyJS.Init(channel.trim());
    }
  };

  const disconnect = async () => {
    const { default: ComfyJS } = await import("comfy.js");
    ComfyJS.Disconnect?.();
    setConnected(false);
    setStatus("Disconnected");
  };

  return (
    <div className="rounded-3xl border border-strong bg-white/70 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink-700">
            Twitch chat listener (ComfyJS)
          </p>
          <p className="text-xs text-ink-500">
            Connect to a channel and detect emoji tips in real time.
          </p>
        </div>
        <span className="pill">{status}</span>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr_auto_auto]">
        <input
          value={channel}
          onChange={(event) => setChannel(event.target.value)}
          className="rounded-2xl border border-soft bg-white/80 px-4 py-3 text-sm"
          placeholder="Channel name"
        />
        <input
          value={oauth}
          onChange={(event) => setOauth(event.target.value)}
          className="rounded-2xl border border-soft bg-white/80 px-4 py-3 text-sm"
          placeholder="OAuth token (optional)"
        />
        <button
          onClick={connect}
          className="rounded-full bg-ink-900 px-5 py-3 text-xs font-semibold text-white"
          type="button"
        >
          Connect
        </button>
        <button
          onClick={disconnect}
          className="rounded-full border border-strong px-5 py-3 text-xs font-semibold text-ink-700"
          type="button"
          disabled={!connected}
        >
          Disconnect
        </button>
      </div>
      <div className="mt-6 grid gap-3 text-sm">
        {events.length === 0 ? (
          <div className="rounded-2xl bg-sand-100 px-4 py-4 text-ink-500">
            No emoji tips detected yet. Send one of {emojiList.join(" ")} in chat.
          </div>
        ) : (
          events.map((event, index) => (
            <div
              key={`${event.user}-${event.time}-${index}`}
              className="rounded-2xl bg-sand-100 px-4 py-3"
            >
              <div className="flex items-center justify-between text-xs text-ink-500">
                <span>@{event.user}</span>
                <span>{event.time}</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="font-semibold text-ink-700">{event.message}</span>
                <span className="text-ink-500">
                  {event.emoji
                    .map((emoji) => `${emoji} $${defaultMap[emoji]} USDC`)
                    .join(" · ")}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
