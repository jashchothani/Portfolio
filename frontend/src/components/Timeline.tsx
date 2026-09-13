import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { TimelineItem } from "../data/profile";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { cn } from "../lib/utils";

const TYPE_CONFIG: Record<
  string,
  { icon: string; ring: string; bg: string; text: string; gradient: string }
> = {
  education: {
    icon: "🎓",
    ring: "ring-amber-500/40",
    bg: "bg-amber-500/15",
    text: "text-amber-700",
    gradient: "from-amber-500/[0.06] to-transparent",
  },
  achievement: {
    icon: "🏆",
    ring: "ring-blue-500/40",
    bg: "bg-blue-500/15",
    text: "text-blue-700",
    gradient: "from-blue-500/[0.06] to-transparent",
  },
  event: {
    icon: "⚡",
    ring: "ring-emerald-500/40",
    bg: "bg-emerald-500/15",
    text: "text-emerald-700",
    gradient: "from-emerald-500/[0.06] to-transparent",
  },
  experience: {
    icon: "💼",
    ring: "ring-indigo-500/40",
    bg: "bg-indigo-500/15",
    text: "text-indigo-700",
    gradient: "from-indigo-500/[0.06] to-transparent",
  },
  swastik: {
    icon: "🧪",
    ring: "ring-teal-500/50",
    bg: "bg-teal-500/15",
    text: "text-teal-700",
    gradient: "from-teal-500/[0.08] via-emerald-500/[0.04] to-transparent",
  },
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <div ref={ref} className="relative mt-8">
      {/* Central continuous track */}
      <div className="absolute left-[23px] top-6 bottom-6 w-[3px] -ml-[1.5px] rounded-full bg-ink-900/[0.06] sm:left-1/2" />
      <motion.div
        style={{ scaleY: pathLength, transformOrigin: "top" }}
        className="absolute left-[23px] top-6 bottom-6 w-[3px] -ml-[1.5px] rounded-full bg-gradient-to-b from-blue-500 via-indigo-500 to-emerald-400 shadow-[0_0_14px_rgba(59,130,246,0.55)] sm:left-1/2"
      />

      <div className="space-y-12 sm:space-y-16">
        {items.map((item, i) => {
          const alignRight = i % 2 === 1;
          const isSwastik = item.id === "exp-swastik";
          const isLakshdham = item.id === "edu-lakshdham";
          const config = isSwastik ? TYPE_CONFIG.swastik : TYPE_CONFIG[item.type];
          const isLatest = i === items.length - 1;

          return (
            <Reveal key={item.id} delay={i * 0.05}>
              <div
                className={cn(
                  "relative flex items-start sm:items-center",
                  alignRight ? "sm:flex-row-reverse" : "sm:flex-row"
                )}
              >
                {/* Node icon on central track */}
                <div
                  className={cn(
                    "absolute left-0 z-20 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl apple-glass shadow-glass ring-2 transition-all hover:scale-110 sm:left-1/2 sm:-ml-6",
                    config.ring
                  )}
                >
                  <span className="text-xl select-none">{config.icon}</span>
                  {isLatest && (
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-blue-500 border-2 border-white" />
                    </span>
                  )}
                </div>

                {/* Horizontal connector line on desktop */}
                <div
                  className={cn(
                    "hidden sm:block absolute top-1/2 -translate-y-1/2 h-[2px] z-10",
                    alignRight
                      ? "left-1/2 w-10 bg-gradient-to-r from-blue-500/50 to-transparent"
                      : "right-1/2 w-10 bg-gradient-to-l from-blue-500/50 to-transparent"
                  )}
                />

                {/* Horizontal connector line on mobile */}
                <div className="sm:hidden absolute left-12 top-6 w-4 h-[2px] bg-blue-500/30 z-10" />

                {/* Milestone Card */}
                <div className="w-full pl-16 sm:w-1/2 sm:pl-0">
                  <div
                    className={cn(
                      "sm:w-[calc(100%-2.5rem)]",
                      alignRight ? "sm:ml-auto sm:mr-10" : "sm:mr-auto sm:ml-10"
                    )}
                  >
                    <TiltCard intensity={5} className="h-full">
                      <article
                        className={cn(
                          "apple-glass-card rounded-[2rem] p-6 sm:p-7 shadow-glass transition-all hover:shadow-xl",
                          isSwastik && "border-teal-500/30 bg-gradient-to-br from-white/85 via-white/70 to-teal-500/[0.05]",
                          isLakshdham && "border-amber-500/30 bg-gradient-to-br from-white/85 via-white/70 to-amber-500/[0.05]"
                        )}
                      >
                        {/* Header bar: Date pill + Status Badge */}
                        <div className="flex flex-wrap items-center justify-between gap-2.5">
                          {/* Exact date badge */}
                          <span
                            className={cn(
                              "font-mono text-xs font-bold px-3 py-1 rounded-full shadow-sm",
                              isSwastik
                                ? "text-teal-700 bg-teal-500/15 border border-teal-500/30"
                                : "text-accent-blue bg-accent-blue/10 border border-accent-blue/20"
                            )}
                          >
                            {item.date}
                          </span>

                          {/* Status Badge */}
                          {item.badge && (
                            <span
                              className={cn(
                                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm backdrop-blur-sm",
                                isSwastik
                                  ? "border border-teal-500/30 bg-teal-500/10 text-teal-800"
                                  : isLakshdham
                                  ? "border border-amber-500/30 bg-amber-500/10 text-amber-800"
                                  : "border border-black/[0.06] bg-white/80 text-ink-800"
                              )}
                            >
                              {isSwastik ? (
                                <span className="relative flex h-2 w-2">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
                                </span>
                              ) : (
                                <span>★</span>
                              )}
                              <span>{item.badge}</span>
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="mt-3.5 text-lg font-bold tracking-tight text-ink-900 sm:text-xl leading-snug">
                          {item.title}
                        </h3>

                        {/* Organization */}
                        <p
                          className={cn(
                            "mt-1.5 text-sm font-semibold flex items-center gap-1.5",
                            isSwastik ? "text-teal-700" : "text-accent-blue"
                          )}
                        >
                          <span>{item.org}</span>
                        </p>

                        {/* Academic score distinction */}
                        {item.score && (
                          <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-800 shadow-sm">
                            <span>★ ICSE Board Distinction:</span>
                            <span className="rounded-md bg-amber-500 text-white px-2 py-0.5 text-[11px] shadow-sm">
                              {item.score}
                            </span>
                          </div>
                        )}

                        {/* Description */}
                        <p className="mt-3.5 text-[14.5px] leading-relaxed text-ink-600">
                          {item.description}
                        </p>

                        {/* Link / CTA */}
                        {item.link && (
                          <div className="mt-5 pt-3.5 border-t border-black/[0.05]">
                            {isSwastik ? (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
                              >
                                <span>Explore Live Swastik Chemical Portal</span>
                                <span className="text-sm">↗</span>
                              </a>
                            ) : (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-blue hover:underline"
                              >
                                <span>View Platform Details</span>
                                <span>↗</span>
                              </a>
                            )}
                          </div>
                        )}
                      </article>
                    </TiltCard>
                  </div>
                </div>

                {/* Empty column for alternating layout */}
                <div className="hidden sm:block sm:w-1/2" />
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
