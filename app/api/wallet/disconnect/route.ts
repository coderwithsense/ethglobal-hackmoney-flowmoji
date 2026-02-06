import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.creatorProfile.upsert({
    where: { userId: session.user.id },
    update: {
      walletAddress: null,
      walletVerifiedAt: null,
      walletSignature: null,
      walletMessage: null,
    },
    create: { userId: session.user.id },
  });

  return NextResponse.json({ ok: true });
}
