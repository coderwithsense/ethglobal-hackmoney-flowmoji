import Link from "next/link";
import SiteShell from "../_components/SiteShell";
import { SignInForm } from "../_components/AuthForms";

export default function SignInPage() {
  return (
    <SiteShell>
      <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="pill">Authentication</span>
          <h1 className="section-title mt-3 text-3xl font-semibold">
            Welcome back
          </h1>
          <p className="mt-2 text-ink-700">
            Sign in with your username and password to access your dashboard.
          </p>
          <div className="mt-6 rounded-3xl border border-soft bg-white/60 p-6 text-sm text-ink-700">
            New here?{" "}
            <Link href="/sign-up" className="font-semibold text-ink-900">
              Create an account
            </Link>
          </div>
        </div>
        <SignInForm />
      </section>
    </SiteShell>
  );
}
