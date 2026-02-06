import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { verifyMessage } from "viem";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { address, signature, message } = (await request.json()) as {
    address: string;
    signature: `0x${string}`;
    message: string;
  };

  if (!address || !signature || !message) {
    return NextResponse.json(
      { error: "Missing address, signature, or message." },
      { status: 400 }
    );
  }

  const isValid = await verifyMessage({
    address: address as `0x${string}`,
    message,
    signature,
  });

  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  const existing = await prisma.creatorProfile.findFirst({
    where: {
      walletAddress: address.toLowerCase(),
      userId: { not: session.user.id },
    },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Wallet already linked to another account." },
      { status: 409 }
    );
  }

  await prisma.creatorProfile.upsert({
    where: { userId: session.user.id },
    update: {
      walletAddress: address.toLowerCase(),
      walletVerifiedAt: new Date(),
      walletSignature: signature,
      walletMessage: message,
    },
    create: {
      userId: session.user.id,
      walletAddress: address.toLowerCase(),
      walletVerifiedAt: new Date(),
      walletSignature: signature,
      walletMessage: message,
    },
  });

  return NextResponse.json({ ok: true });
}
