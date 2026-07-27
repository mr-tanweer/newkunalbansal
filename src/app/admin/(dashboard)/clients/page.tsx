import Link from "next/link";
import { listClients, serializeClient } from "@/lib/db/clients";
import ClientsTable from "./ClientsTable";

export const dynamic = "force-dynamic";

export default async function AdminClientsPage() {
  const docs = await listClients();
  const clients = docs.map(serializeClient);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl text-white">Clients</h1>
        <Link
          href="/admin/clients/new"
          className="rounded-full border border-white/30 px-5 py-2 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-black"
        >
          + New Client
        </Link>
      </div>
      <ClientsTable clients={clients} />
    </div>
  );
}
