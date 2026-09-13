import { useState } from "react";
import { Reveal } from "../components/Reveal";
import { timeline, TimelineItem } from "../data/profile";
import { cn } from "../lib/utils";

type TrackFilter = "all" | "experience" | "education" | "achievement";

export function Experience() {
  const [filter, setFilter] = useState<TrackFilter>("all");

  const filteredItems = timeline.filter((item) => {
    if (filter === "all") return true;
    if (filter === "experience") return item.type === "experience";
    if (filter === "education") return item.type === "education";
    if (filter === "achievement") return item.type === "achievement" || item.type === "event";
    return true;
  });

  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end mb-14">
          <Reveal className="max-w-xl">
            <span className="label-tag">Career & Academic Milestones</span>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl font-bold tracking-tight text-ink-900">
              Experience & Education.
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-500">
              My engineering trajectory across enterprise full-stack ERP architecture, international cybersecurity
              threat intelligence, academic distinction, and national hackathon honors.
            </p>
          </Reveal>

          {/* Filter Pills */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-ink-900/10 bg-white/70 p-1.5 shadow-sm backdrop-blur-md">
              {(
                [
                  { id: "all", label: "All Milestones" },
                  { id: "experience", label: "Work Experience" },
                  { id: "education", label: "Education & Schooling" },
                  { id: "achievement", label: "Honors & Awards" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={cn(
                    "rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all",
                    filter === tab.id
                      ? "bg-ink-900 text-white shadow-sm"
                      : "text-ink-600 hover:bg-ink-900/5 hover:text-ink-900"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Milestone Grid Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredItems.map((item, i) => {
            const isEducation = item.type === "education";
            const isExperience = item.type === "experience";
            const isLakshdham = item.id === "edu-lakshdham";
            const isDeepCytes = item.id === "exp-deepcytes";
            const isSwastik = item.id === "exp-swastik";

            return (
              <Reveal key={item.id} delay={i * 0.06}>
                <article
                  className={cn(
                    "apple-glass-card group relative flex h-full flex-col justify-between rounded-3xl p-6 sm:p-7",
                    isLakshdham && "bg-gradient-to-br from-white/80 via-white/70 to-amber-500/[0.04]",
                    isSwastik && "bg-gradient-to-br from-white/80 via-white/70 to-blue-500/[0.04]",
                    isDeepCytes && "bg-gradient-to-br from-white/80 via-white/70 to-indigo-500/[0.04]"
                  )}
                >
                  <div>
                    {/* Header bar with icon, badge and date */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm text-lg",
                            isEducation && "bg-amber-500/10 text-amber-600 border border-amber-500/20",
                            isExperience && "bg-blue-500/10 text-blue-600 border border-blue-500/20",
                            !isEducation && !isExperience && "bg-purple-500/10 text-purple-600 border border-purple-500/20"
                          )}
                        >
                          {isLakshdham && "🎓"}
                          {item.id === "edu-sbmp" && "🏛️"}
                          {isDeepCytes && "🛡️"}
                          {isSwastik && "🧪"}
                          {!isEducation && !isExperience && "🏆"}
                        </div>

                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-ink-400">
                            {item.date}
                          </span>
                          <h3 className="text-lg font-bold text-ink-900 leading-snug group-hover:text-accent-blue transition-colors">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      {item.badge && (
                        <span
                          className={cn(
                            "hidden sm:inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                            isLakshdham
                              ? "border-amber-500/30 bg-amber-50 text-amber-700 font-bold"
                              : "border-ink-900/10 bg-ink-900/[0.04] text-ink-700"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Organization / School */}
                    <p className="mt-3 text-sm font-semibold text-accent-blue flex items-center gap-1.5">
                      <span>{item.org}</span>
                    </p>

                    {/* Academic Score Pill */}
                    {item.score && (
                      <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-800 shadow-sm">
                        <span>★ {isLakshdham ? "ICSE Board Distinction:" : "Board Examination Distinction:"}</span>
                        <span className="rounded-md bg-amber-500 text-white px-1.5 py-0.5 text-[11px]">
                          {item.score}
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer link for live production company */}
                  {item.link && (
                    <div className="mt-5 border-t border-ink-900/5 pt-3.5 flex items-center justify-between">
                      <span className="text-xs font-medium text-ink-400">Live Enterprise Web Portal</span>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 transition-all hover:bg-blue-600 hover:text-white"
                      >
                        <span>Visit Website</span>
                        <span className="text-[10px]">↗</span>
                      </a>
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
