"use client";

import { useState } from "react";
import Image from "next/image";
import type { Client } from "@/lib/types";

function ClientLogo({ client }: { client: Client }) {
  const [errored, setErrored] = useState(false);

  if (errored) return null;

  return (
    <Image
      src={client.logo}
      alt={client.name}
      width={160}
      height={64}
      onError={() => setErrored(true)}
      className="max-h-full max-w-full object-contain"
    />
  );
}

export default function Clients({ clients }: { clients: Client[] }) {
  const loop = [...clients, ...clients];

  return (
    <section className="border-t border-white/10 py-16">
      <p className="mb-8 px-6 text-center font-mono text-sm uppercase tracking-[0.4em] text-neutral-500 sm:px-10">
        Brands I&apos;ve Worked With
      </p>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
        <div className="animate-marquee flex w-max items-center gap-16">
          {loop.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              className="flex h-11 w-32 shrink-0 items-center justify-center opacity-90 transition-opacity hover:opacity-100"
            >
              <ClientLogo client={client} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
