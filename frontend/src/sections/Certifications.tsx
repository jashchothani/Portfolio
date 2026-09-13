import { useState } from "react";
import { Reveal } from "../components/Reveal";
import { TiltCard } from "../components/TiltCard";
import { CertificateModal } from "../components/CertificateModal";
import { credentials, Credential, CredentialType } from "../data/profile";
import { cn } from "../lib/utils";

const FILTERS: { key: CredentialType | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "hackathon", label: "Hackathons" },
  { key: "certification", label: "Certifications" },
];

export function Certifications() {
  const [filter, setFilter] = useState<CredentialType | "all">("all");
  const [selected, setSelected] = useState<Credential | null>(null);

  const items = filter === "all" ? credentials : credentials.filter((c) => c.type === filter);

  return (
    <section id="certifications" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-lg">
            <span className="label-tag">Achievements &amp; Certifications</span>
            <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">
              Proof, not just a
              <br />
              list of claims.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-500">
              Every credential below has a real certificate behind it — tap any card to open the
              full document, including my district-level{" "}
              <span className="font-medium text-ink-900">Ignite IT 7.0</span> hackathon award.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 apple-glass rounded-2xl p-1.5 w-fit">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all",
                  filter === f.key
                    ? "bg-ink-900 text-white shadow-sm"
                    : "text-ink-600 hover:bg-ink-900/5 hover:text-ink-900"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((credential, i) => (
            <Reveal key={credential.id} delay={i * 0.06}>
              <TiltCard intensity={5} className="h-full">
                <button
                  onClick={() => setSelected(credential)}
                  className="apple-glass-card group flex h-full w-full flex-col overflow-hidden rounded-3xl p-2 text-left"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-ink-900/[0.03]">
                    <img
                      src={credential.image}
                      alt={`${credential.title} certificate thumbnail`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-700 shadow-glass backdrop-blur">
                      {credential.type === "hackathon" ? "Hackathon" : "Certification"}
                    </span>
                    <span className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full bg-white/0 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="rounded-full bg-ink-900/70 px-3 py-1.5 backdrop-blur">View certificate ↗</span>
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    {credential.highlight && (
                      <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-blue/10 px-2.5 py-1 text-[11px] font-semibold text-accent-blue">
                        ★ {credential.highlight}
                      </span>
                    )}
                    <h3 className="text-base font-semibold leading-snug text-ink-900">
                      {credential.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink-400">{credential.issuer}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">
                      {credential.description}
                    </p>
                    <p className="mt-4 text-xs font-medium uppercase tracking-wide text-ink-400">
                      {credential.date}
                    </p>
                  </div>
                </button>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      <CertificateModal credential={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
