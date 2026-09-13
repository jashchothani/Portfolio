import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { skills, Skill, SkillCategory } from "../data/profile";
import { cn } from "../lib/utils";

const CATEGORIES: SkillCategory[] = [
  "Languages",
  "Cybersecurity",
  "AI / Machine Learning",
  "Backend / Cloud",
  "Frontend / Data",
];

const CATEGORY_META: Record<
  SkillCategory,
  { color: string; glow: string; icon: string; blurb: string }
> = {
  Languages: {
    color: "#0891B2",
    glow: "rgba(8,145,178,0.14)",
    icon: "{ }",
    blurb: "The core languages I think and build in.",
  },
  Cybersecurity: {
    color: "#DC2626",
    glow: "rgba(220,38,38,0.14)",
    icon: "⛨",
    blurb: "SOC-grade detection, response, and hardening.",
  },
  "AI / Machine Learning": {
    color: "#7C3AED",
    glow: "rgba(124,58,237,0.14)",
    icon: "✦",
    blurb: "Applied ML that ships — explainable, not a black box.",
  },
  "Backend / Cloud": {
    color: "#0EA5B7",
    glow: "rgba(14,165,183,0.14)",
    icon: "⌁",
    blurb: "APIs and infrastructure that hold up under load.",
  },
  "Frontend / Data": {
    color: "#2563EB",
    glow: "rgba(37,99,235,0.14)",
    icon: "▣",
    blurb: "Interfaces and data layers, built to last.",
  },
};

function groupByCategory(items: Skill[]): [SkillCategory, Skill[]][] {
  const map = new Map<SkillCategory, Skill[]>();
  CATEGORIES.forEach((c) => map.set(c, []));
  items.forEach((s) => map.get(s.category)?.push(s));
  return CATEGORIES.map((c) => [c, map.get(c) ?? []]).filter(([, list]) => list.length > 0) as [
    SkillCategory,
    Skill[]
  ][];
}

function SkillBar({ skill, color, delay }: { skill: Skill; color: string; delay: number }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group rounded-2xl border border-white/80 bg-white/75 p-4 backdrop-blur-md shadow-sm transition-all hover:bg-white/90 hover:shadow-glass hover:scale-[1.01]"
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-ink-900">{skill.name}</p>
        <span className="flex-shrink-0 text-xs font-medium text-ink-400">{skill.level}%</span>
      </div>
      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-900/[0.06]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <motion.p
        initial={false}
        animate={{ height: hover ? "auto" : 0, opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden text-xs leading-relaxed text-ink-400"
      >
        <span className="mt-2 block">{skill.detail}</span>
      </motion.p>
    </div>
  );
}

export function Skills() {
  const [active, setActive] = useState<"All" | SkillCategory>("All");
  const grouped = useMemo(() => {
    if (active === "All") return groupByCategory(skills);
    return [[active, skills.filter((s) => s.category === active)] as [SkillCategory, Skill[]]];
  }, [active]);

  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <Reveal className="mb-14 max-w-lg">
          <span className="label-tag">Capabilities</span>
          <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">
            Tools and systems
            <br />I work with daily.
          </h2>
        </Reveal>

        <div className="mb-10 flex flex-wrap gap-2 apple-glass rounded-2xl p-1.5 w-fit">
          {(["All", ...CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all",
                active === cat
                  ? "bg-ink-900 text-white shadow-sm"
                  : "text-ink-600 hover:bg-ink-900/5 hover:text-ink-900"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-10">
          {grouped.map(([category, items], gi) => {
            const meta = CATEGORY_META[category];
            return (
              <Reveal key={category} delay={gi * 0.06}>
                <div
                  className="apple-glass rounded-3xl p-6 sm:p-8 shadow-glass transition-all"
                  style={{
                    background: `radial-gradient(120% 100% at 0% 0%, ${meta.glow}, rgba(255,255,255,0.75) 55%)`,
                  }}
                >
                  <div className="mb-6 flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-base font-semibold"
                      style={{ background: `${meta.color}1A`, color: meta.color }}
                    >
                      {meta.icon}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink-900">{category}</h3>
                      <p className="text-xs text-ink-400">{meta.blurb}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((skill, i) => (
                      <SkillBar key={skill.name} skill={skill} color={meta.color} delay={i * 0.04} />
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
