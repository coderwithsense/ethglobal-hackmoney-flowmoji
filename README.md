Flowmoji is a creator-focused tipping platform where viewers send emoji-based, gasless tips during Twitch streams. Tips are processed off-chain via Yellow state channels and settled on-chain later. ENS is used to store portable tipping preferences. YouTube integration is explicitly out of scope for this hackathon.

## What’s In This Repo

- Next.js app with onboarding, setup flow, dashboard, and settings
- Twitch OAuth connect + test chat listener (ComfyJS)
- Wallet verification (sign a message + store verified address)
- Prisma + MongoDB for users, sessions, tips, and creator profiles

## Quick Start

1. Install dependencies:
```
npm install
```

2. Set env vars:
```
cp .env.example .env
```

3. Push Prisma schema + generate client:
```
npx prisma db push
npx prisma generate
```

4. Start dev server:
```
npm run dev
```

Open `http://localhost:3000`.

## Notes

- YouTube integration is out of scope for this hackathon.
- All pages require authentication.

## Stack

- Next.js 16 (App Router)
- Better Auth
- Prisma + MongoDB
- ComfyJS (Twitch chat)
