import { Reveal } from "../components/Reveal";
import { TiltCard } from "../components/TiltCard";
import { about } from "../data/profile";

const ICONS: Record<string, string> = {
  ai: "✦",
  web: "◈",
  security: "⛨",
  innovation: "◎",
  "problem-solving": "◆",
};

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <span className="label-tag">About</span>
            <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">
              Curious by default,
              <br />
              precise by discipline.
            </h2>
            <div className="mt-6 space-y-4 max-w-md rounded-3xl apple-glass p-6 text-[15.5px] leading-relaxed text-ink-600 shadow-glass">
              {about.story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {about.focus.map((item, i) => (
              <Reveal key={item.key} delay={i * 0.08}>
                <TiltCard
                  className={
                    "apple-glass-card h-full rounded-3xl p-6 sm:p-7 " +
                    (item.key === "innovation" ? "sm:col-span-2" : "")
                  }
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-blue/10 to-accent-violet/10 text-xl text-accent-blue shadow-sm">
                    {ICONS[item.key]}
                  </div>
                  <h3 className="text-lg font-semibold text-ink-900">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                    {item.description}
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
