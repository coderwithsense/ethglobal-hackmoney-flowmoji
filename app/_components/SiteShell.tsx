import Link from "next/link";

const navLinks = [
  { href: "/onboarding", label: "Onboarding" },
  { href: "/setup/platforms", label: "Setup" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/test-chat", label: "Test Chat" },
  { href: "/docs/getting-started", label: "Docs" },
  { href: "/extension", label: "Extension" },
];

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell min-h-screen flex flex-col">
      <header className="border-b border-soft bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink-900 text-white font-display text-lg">
              💧
            </div>
            <div>
              <p className="font-display text-lg font-semibold">Flowmoji</p>
              <p className="text-sm text-ink-500">Emoji tips for live streams</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-ink-700 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="link-soft">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="pill">Yellow + ENS</span>
            <Link
              href="/onboarding"
              className="rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        {children}
      </main>
      <footer className="mt-auto border-t border-soft bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-ink-500 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-base font-semibold text-ink-700">
              Flowmoji
            </p>
            <p>Gasless emoji tips for YouTube and Twitch.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-ink-700">
            <Link href="/docs/technical" className="link-soft">
              Technical Overview
            </Link>
            <Link href="/settings/profile" className="link-soft">
              Settings
            </Link>
            <Link href="/admin" className="link-soft">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
