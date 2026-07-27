"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Client } from "@/lib/types";

export default function ClientsTable({ clients }: { clients: Client[] }) {
  const router = useRouter();

  const move = async (id: string, direction: "up" | "down") => {
    await fetch(`/api/admin/clients/${id}/move`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    router.refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this client?")) return;
    await fetch(`/api/admin/clients/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 font-mono text-xs uppercase tracking-widest text-neutral-500">
            <th className="px-4 py-3">Logo</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Order</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {clients.map((client, i) => (
            <tr key={client.id} className="border-b border-white/5 last:border-0">
              <td className="px-4 py-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={client.logo} alt={client.name} className="h-7 w-auto object-contain" />
              </td>
              <td className="px-4 py-3 text-white">{client.name}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => move(client.id, "up")}
                    disabled={i === 0}
                    className="rounded border border-white/15 px-2 py-1 text-neutral-300 hover:border-white/40 disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => move(client.id, "down")}
                    disabled={i === clients.length - 1}
                    className="rounded border border-white/15 px-2 py-1 text-neutral-300 hover:border-white/40 disabled:opacity-30"
                  >
                    ▼
                  </button>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest">
                  <Link href={`/admin/clients/${client.id}`} className="text-neutral-300 hover:text-white">
                    Edit
                  </Link>
                  <button
                    onClick={() => remove(client.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
