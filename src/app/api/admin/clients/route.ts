import { NextResponse } from "next/server";
import { listClients, createClient, serializeClient } from "@/lib/db/clients";

export async function GET() {
  const clients = await listClients();
  return NextResponse.json(clients.map(serializeClient));
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.name !== "string" || typeof body.logo !== "string") {
    return NextResponse.json({ error: "Invalid client data" }, { status: 400 });
  }

  const client = await createClient({ name: body.name, logo: body.logo });
  return NextResponse.json(serializeClient(client), { status: 201 });
}
