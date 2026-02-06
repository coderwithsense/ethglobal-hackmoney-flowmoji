import { redirect } from "next/navigation";
import SiteShell from "../../_components/SiteShell";
import { requireSession } from "@/lib/route-guards";
import prisma from "@/lib/prisma";

export default async function SetupCompletePage() {
  const session = await requireSession();

  await prisma.creatorProfile.upsert({
    where: { userId: session.user.id },
    update: { setupCompleted: true },
    create: { userId: session.user.id, setupCompleted: true },
  });

  redirect("/dashboard");

  return (
    <SiteShell>
      <section className="rounded-3xl border border-soft bg-white/60 p-6 text-sm text-ink-700">
        Completing setup...
      </section>
    </SiteShell>
  );
}
