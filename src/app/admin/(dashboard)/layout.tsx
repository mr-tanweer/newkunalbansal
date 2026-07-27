"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { label: "Projects", href: "/admin/projects" },
  { label: "Clients", href: "/admin/clients" },
  { label: "Site Content", href: "/admin/content" },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-10">
        <Link href="/admin/projects" className="font-display text-lg tracking-wide">
          KUNAL BANSAL — Admin
        </Link>
        <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-neutral-300">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname?.startsWith(link.href)
                  ? "text-white"
                  : "transition-colors hover:text-white"
              }
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="rounded-full border border-white/30 px-4 py-2 text-white transition-colors hover:border-white hover:bg-white hover:text-black"
          >
            Logout
          </button>
        </nav>
      </header>
      <main className="px-6 py-10 sm:px-10">{children}</main>
    </div>
  );
}
