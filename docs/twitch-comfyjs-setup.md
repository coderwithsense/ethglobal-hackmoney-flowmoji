# Twitch Chat Integration with ComfyJS

This guide explains how Flowmoji listens to Twitch chat using ComfyJS, how IRC works under the hood, and how OAuth is used for authenticated actions.

## Overview

Flowmoji uses Twitch IRC (chat) to detect emoji tips in real time. ComfyJS is a lightweight wrapper on top of Twitch IRC and WebSockets:

- It connects to `irc-ws.chat.twitch.tv:443` over WebSocket.
- It receives chat messages, system events, and user metadata.
- It can also send messages if an OAuth token is provided.

For Flowmoji, read-only mode is enough to detect tips. OAuth is optional unless you want the bot to speak in chat or access user-level actions.

## How Twitch IRC Works

Twitch chat uses a standard IRC-style protocol over WebSocket:

1. Client opens a WebSocket connection to Twitch IRC.
2. Client authenticates with `PASS oauth:...` and `NICK <username>` (optional for read-only, required for sending).
3. Client sends `JOIN #channel`.
4. Twitch sends chat events back to the client.

ComfyJS handles all of the above for you.

## OAuth Model

There are two OAuth types relevant to Twitch chat:

1. **App token** (client credentials)
   - Good for API calls, not for IRC chat identity.
   - Does not allow sending chat messages.

2. **User token** (authorization code flow)
   - Grants permission to act on behalf of a user/bot account.
   - Required if you want to send messages as that account.

For Flowmoji:

- **Read-only chat**: No OAuth required.
- **Send acknowledgements** (e.g., "Thanks for the tip!"): OAuth required.

## Recommended OAuth Flow

If you want the bot to send messages:

1. Use Twitch Authorization Code flow with `chat:read` and `chat:edit` scopes.
2. Store the token server-side (never expose secrets to the client).
3. Provide the token to ComfyJS on the backend or via a secure proxy.

When possible, prefer a backend service (or serverless function) to manage tokens and avoid exposing them in the browser.

## Emoji Detection Strategy

Flowmoji listens for emojis and maps them to USDC values:

- `😊` → 5 USDC
- `🔥` → 10 USDC
- `💧` → 2 USDC

Use Unicode emoji detection via the `Extended_Pictographic` class:

```ts
const emojis = Array.from(message.matchAll(/\p{Extended_Pictographic}/gu)).map(
  (match) => match[0]
);
```

Then match against the configured emoji map.

## ComfyJS Example (Node Script)

```js
import ComfyJS from "comfy.js";

ComfyJS.onChat = (user, message) => {
  console.log(`[CHAT] ${user}: ${message}`);
};

ComfyJS.Init("ohnepixel");
```

## ComfyJS Example (Flowmoji UI Demo)

Flowmoji includes a UI demo that connects to a channel and detects emoji tips:

- Component: `app/_components/TwitchComfyDemo.tsx`
- Page: `app/setup/platforms/page.tsx`

This demo runs in the browser and is intended for development/testing.

## Production Architecture Recommendation

For a production-ready Flowmoji setup:

1. **Backend service** connects to Twitch IRC using ComfyJS or a dedicated IRC client.
2. Backend parses emoji tips and performs:
   - ENS lookup (tip configuration)
   - Yellow state channel updates
   - Anti-spam checks
3. Frontend only displays live tip events via WebSocket or SSE.

This keeps OAuth tokens secure and prevents client-side abuse.

## Common Issues

- **No messages received**: Ensure the channel name is correct and live chat is active.
- **Disconnects**: Twitch may throttle or close connections if you create too many sessions.
- **Emoji not detected**: Make sure the emoji is part of the configured map.

## Next Step

When you are ready for backend integration, move ComfyJS into a Node service and expose a clean WebSocket to the frontend.
