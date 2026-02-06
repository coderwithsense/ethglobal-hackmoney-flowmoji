import Link from "next/link";

const links = [
  { href: "/settings/profile", label: "Profile & Identity" },
  { href: "/settings/tipping", label: "Tipping Rules" },
  { href: "/settings/integrations", label: "Integrations" },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-8 md:grid-cols-[220px_1fr]">
      <aside className="rounded-3xl border border-soft bg-white/60 p-4">
        <p className="text-xs font-semibold uppercase text-ink-500">
          Settings
        </p>
        <nav className="mt-4 grid gap-2 text-sm font-semibold text-ink-700">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-transparent px-3 py-2 transition hover:border-strong hover:bg-white/70"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div>{children}</div>
    </div>
  );
}
