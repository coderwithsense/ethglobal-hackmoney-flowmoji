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

  const accounts = await prisma.account.findMany({
    where: { userId: session.user.id },
    select: {
      providerId: true,
      providerUserId: true,
      createdAt: true,
    },
  });

  const profile = await prisma.creatorProfile.findUnique({
    where: { userId: session.user.id },
    select: {
      walletAddress: true,
      walletVerifiedAt: true,
    },
  });

  return NextResponse.json({ accounts, profile });
}
