import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function requireSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return session;
}

export async function ensureProfile(userId: string) {
  return prisma.creatorProfile.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
}

export async function requireSetupNotCompleted(userId: string) {
  const profile = await ensureProfile(userId);
  if (profile.setupCompleted) {
    redirect("/dashboard");
  }
  return profile;
}

export async function requireSetupCompleted(userId: string) {
  const profile = await ensureProfile(userId);
  if (!profile.setupCompleted) {
    redirect("/setup/platforms");
  }
  return profile;
}
