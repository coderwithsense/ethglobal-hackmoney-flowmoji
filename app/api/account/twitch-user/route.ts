import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const account = await prisma.account.findFirst({
    where: { userId: session.user.id, providerId: "twitch" },
    select: { accessToken: true },
  });

  if (!account?.accessToken) {
    return NextResponse.json({ error: "No Twitch access token" }, { status: 404 });
  }

  const response = await fetch("https://api.twitch.tv/helix/users", {
    headers: {
      Authorization: `Bearer ${account.accessToken}`,
      "Client-Id": process.env.TWITCH_CLIENT_ID ?? "",
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch Twitch user" }, { status: 502 });
  }

  const data = (await response.json()) as {
    data?: Array<{ display_name?: string; login?: string }>;
  };

  const user = data?.data?.[0];
  const username = user?.display_name || user?.login || null;

  if (username) {
    await prisma.creatorProfile.upsert({
      where: { userId: session.user.id },
      update: { twitchHandle: username },
      create: { userId: session.user.id, twitchHandle: username },
    });
  }

  return NextResponse.json({ username });
}
