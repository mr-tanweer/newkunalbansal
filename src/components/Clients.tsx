import { clients } from "@/lib/data";

export default function Clients() {
  const loop = [...clients, ...clients];

  return (
    <section className="border-t border-white/10 py-16">
      <p className="mb-8 px-6 text-center text-sm uppercase tracking-[0.4em] text-neutral-500 sm:px-10">
        Brands I&apos;ve Worked With
      </p>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
        <div className="animate-marquee flex w-max gap-16">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display whitespace-nowrap text-3xl text-neutral-600 transition-colors hover:text-white sm:text-4xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
