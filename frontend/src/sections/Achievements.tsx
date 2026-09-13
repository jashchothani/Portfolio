import { useState } from "react";
import { Reveal } from "../components/Reveal";
import { Timeline } from "../components/Timeline";
import { timeline } from "../data/profile";
import { cn } from "../lib/utils";

type MilestoneCategory = "all" | "achievement" | "experience" | "education";

export function Achievements() {
  const [filter, setFilter] = useState<MilestoneCategory>("all");

  const filteredItems = timeline.filter((item) => {
    if (filter === "all") return true;
    if (filter === "experience") return item.type === "experience";
    if (filter === "achievement") return item.type === "achievement" || item.type === "event";
    if (filter === "education") return item.type === "education";
    return true;
  });

  const counts = {
    all: timeline.length,
    achievement: timeline.filter((t) => t.type === "achievement" || t.type === "event").length,
    experience: timeline.filter((t) => t.type === "experience").length,
    education: timeline.filter((t) => t.type === "education").length,
  };

  return (
    <section id="achievements" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end mb-12 sm:mb-16">
          <Reveal className="max-w-2xl">
            <span className="label-tag">Key Achievements & Journey</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl leading-tight">
              Milestones along the way.
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-500">
              A comprehensive chronicle of technical breakthroughs, production enterprise leadership at Swastik Chemical India, international hackathon awards, and academic excellence.
            </p>
          </Reveal>

          {/* Filter Pills */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-ink-900/10 bg-white/70 p-1.5 shadow-sm backdrop-blur-md">
              {(
                [
                  { id: "all", label: "All Milestones", count: counts.all },
                  { id: "achievement", label: "Hackathons & Honors", count: counts.achievement },
                  { id: "experience", label: "Work & Enterprise", count: counts.experience },
                  { id: "education", label: "Education", count: counts.education },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all",
                    filter === tab.id
                      ? "bg-ink-900 text-white shadow-sm"
                      : "text-ink-600 hover:bg-ink-900/5 hover:text-ink-900"
                  )}
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      "rounded-md px-1.5 py-0.2 text-[10px] font-bold",
                      filter === tab.id
                        ? "bg-white/20 text-white"
                        : "bg-ink-900/10 text-ink-600"
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <Timeline items={filteredItems} />
      </div>
    </section>
  );
}
