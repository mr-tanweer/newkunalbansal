import { notFound } from "next/navigation";
import { getClientById, serializeClient } from "@/lib/db/clients";
import ClientForm from "../ClientForm";

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await getClientById(id);
  if (!doc) notFound();

  const client = serializeClient(doc);

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl text-white">Edit Client</h1>
      <ClientForm client={client} />
    </div>
  );
}
