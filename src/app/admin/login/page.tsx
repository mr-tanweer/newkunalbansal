"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-neutral-950 p-8"
      >
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-neutral-500">
          Admin
        </p>
        <h1 className="font-display text-2xl text-white">Sign in</h1>

        <label className="mt-8 block font-mono text-xs uppercase tracking-widest text-neutral-400">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            className="mt-2 w-full rounded-lg border border-white/15 bg-black px-4 py-2.5 text-sm font-sans normal-case tracking-normal text-white outline-none focus:border-white/40"
          />
        </label>

        <label className="mt-5 block font-mono text-xs uppercase tracking-widest text-neutral-400">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="mt-2 w-full rounded-lg border border-white/15 bg-black px-4 py-2.5 text-sm font-sans normal-case tracking-normal text-white outline-none focus:border-white/40"
          />
        </label>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full rounded-full border border-white/30 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-black disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
