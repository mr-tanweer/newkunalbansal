"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Client } from "@/lib/types";

export default function ClientsTable({ clients }: { clients: Client[] }) {
  const router = useRouter();
  const [movingId, setMovingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const move = async (id: string, direction: "up" | "down") => {
    setMovingId(id);
    await fetch(`/api/admin/clients/${id}/move`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    router.refresh();
    setMovingId(null);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this client?")) return;
    setDeletingId(id);
    await fetch(`/api/admin/clients/${id}`, { method: "DELETE" });
    router.refresh();
    setDeletingId(null);
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
          {clients.map((client, i) => {
            const isMoving = movingId === client.id;
            return (
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
                      disabled={i === 0 || isMoving}
                      className="flex h-6 w-6 items-center justify-center rounded border border-white/15 text-neutral-300 hover:border-white/40 disabled:opacity-30"
                    >
                      {isMoving ? (
                        <span className="h-2.5 w-2.5 animate-spin rounded-full border border-neutral-400 border-t-transparent" />
                      ) : (
                        "▲"
                      )}
                    </button>
                    <button
                      onClick={() => move(client.id, "down")}
                      disabled={i === clients.length - 1 || isMoving}
                      className="flex h-6 w-6 items-center justify-center rounded border border-white/15 text-neutral-300 hover:border-white/40 disabled:opacity-30"
                    >
                      {isMoving ? (
                        <span className="h-2.5 w-2.5 animate-spin rounded-full border border-neutral-400 border-t-transparent" />
                      ) : (
                        "▼"
                      )}
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
                      disabled={deletingId === client.id}
                      className="text-red-400 hover:text-red-300 disabled:opacity-40"
                    >
                      {deletingId === client.id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
