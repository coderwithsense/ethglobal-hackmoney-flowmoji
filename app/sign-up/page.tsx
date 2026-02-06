import Link from "next/link";
import SiteShell from "../_components/SiteShell";
import { SignUpForm } from "../_components/AuthForms";

export default function SignUpPage() {
  return (
    <SiteShell>
      <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="pill">Authentication</span>
          <h1 className="section-title mt-3 text-3xl font-semibold">
            Create your Flowmoji account
          </h1>
          <p className="mt-2 text-ink-700">
            Sign up with a username and password. After signup, you will go
            directly to the one-time setup flow.
          </p>
          <div className="mt-6 rounded-3xl border border-soft bg-white/60 p-6 text-sm text-ink-700">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-semibold text-ink-900">
              Sign in
            </Link>
          </div>
        </div>
        <SignUpForm />
      </section>
    </SiteShell>
  );
}
