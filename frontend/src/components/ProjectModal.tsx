import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Project } from "../data/profile";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock background scrolling when modal is open
  useEffect(() => {
    if (project) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = origOverflow;
      };
    }
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/25 p-4 sm:p-6 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto overscroll-contain touch-pan-y rounded-[2.5rem] p-6 sm:p-9 apple-glass border border-white/85"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.65) 100%)",
              backdropFilter: "blur(32px) saturate(190%) contrast(102%)",
              WebkitBackdropFilter: "blur(32px) saturate(190%) contrast(102%)",
              WebkitOverflowScrolling: "touch",
              boxShadow: "inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 1), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.02), 0 25px 60px -12px rgba(15, 23, 42, 0.20)",
            }}
          >
            {/* Header */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center rounded-full border border-accent-blue/20 bg-accent-blue/10 px-3 py-0.5 text-xs font-semibold text-accent-blue shadow-sm">
                  {project.stack[0]}
                </span>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                  {project.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full apple-glass text-ink-600 hover:bg-black/5 hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-[15px] leading-relaxed text-ink-600">
              {/* Overview */}
              <div className="rounded-2xl border border-white/80 bg-white/50 backdrop-blur-sm p-4 sm:p-5 shadow-sm">
                <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-ink-400">Overview</h4>
                <p className="text-ink-700 leading-relaxed">{project.summary}</p>
              </div>

              {/* Problem & Solution Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/80 bg-white/50 backdrop-blur-sm p-4 sm:p-5 shadow-sm">
                  <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-amber-600">Problem</h4>
                  <p className="text-sm text-ink-600 leading-relaxed">{project.problem}</p>
                </div>
                <div className="rounded-2xl border border-white/80 bg-white/50 backdrop-blur-sm p-4 sm:p-5 shadow-sm">
                  <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-emerald-600">Solution</h4>
                  <p className="text-sm text-ink-600 leading-relaxed">{project.solution}</p>
                </div>
              </div>

              {/* Features */}
              <div className="rounded-2xl border border-white/80 bg-white/50 backdrop-blur-sm p-4 sm:p-5 shadow-sm">
                <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-400">Key Features</h4>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink-700">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-blue" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture */}
              <div className="rounded-2xl border border-white/80 bg-white/50 backdrop-blur-sm p-4 sm:p-5 shadow-sm">
                <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-ink-400">Architecture & Technical Specs</h4>
                <p className="font-mono text-[13px] text-ink-800 bg-ink-900/[0.03] p-3 rounded-xl border border-ink-900/[0.04]">
                  {project.architecture}
                </p>
              </div>

              {/* Tech stack */}
              <div className="rounded-2xl border border-white/80 bg-white/50 backdrop-blur-sm p-4 sm:p-5 shadow-sm">
                <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-ink-400">Tech Stack & Libraries</h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/85 bg-white/70 backdrop-blur-sm px-3.5 py-1 text-xs font-semibold text-ink-800 shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-white/60 pt-5">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="apple-glass rounded-2xl px-5 py-2.5 text-sm font-semibold text-ink-800 hover:bg-white/90 shadow-sm transition-all hover:scale-105 active:scale-95"
                >
                  <span>View code</span>
                  <span className="ml-1 text-xs">↗</span>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  style={{ backgroundColor: "#0B1220", color: "#FFFFFF" }}
                  className="rounded-2xl px-6 py-2.5 text-sm font-semibold shadow-md transition-all hover:bg-black hover:scale-105 active:scale-95 flex items-center gap-1.5"
                >
                  <span className="text-white">Visit Live Site</span>
                  <span className="text-blue-400 font-bold">→</span>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
