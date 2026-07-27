import Image from "next/image";
import { clients } from "@/lib/data";

export default function Clients() {
  const loop = [...clients, ...clients];

  return (
    <section className="border-t border-white/10 py-16">
      <p className="mb-8 px-6 text-center font-mono text-sm uppercase tracking-[0.4em] text-neutral-500 sm:px-10">
        Brands I&apos;ve Worked With
      </p>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
        <div className="animate-marquee flex w-max items-center gap-6">
          {loop.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex h-16 w-32 shrink-0 items-center justify-center opacity-90 transition-opacity hover:opacity-100 sm:h-20 sm:w-40"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={160}
                height={64}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
