import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}

const TECH_CATEGORIES = [
  {
    category: "Frontend & 3D Interactive Web",
    accent: "blue",
    icon: "⚡",
    description: "Built with modern React and TypeScript for bulletproof typing, high performance, and silky 60fps animations.",
    skills: [
      { name: "React 18", desc: "Component architecture, hooks, and reactive state management" },
      { name: "TypeScript", desc: "100% strictly typed codebase across both frontend and backend" },
      { name: "Vite 5", desc: "Lightning-fast HMR and optimized Rollup production bundling" },
      { name: "Tailwind CSS", desc: "Custom-configured utility tokens and visionOS glassmorphism engine" },
      { name: "Three.js & R3F", desc: "Interactive 3D particle stardust and geometric meshes on GPU canvas" },
      { name: "Framer Motion", desc: "Physics spring animations, layout transitions, and scroll path tracking" },
      { name: "Lenis Smooth Scroll", desc: "60fps momentum inertia with touch and nested modal isolation" },
    ],
  },
  {
    category: "AI Engine & Knowledge Systems",
    accent: "purple",
    icon: "🧠",
    description: "Production LLM pipeline providing intelligent portfolio Q&A grounded in verified profile data.",
    skills: [
      { name: "NVIDIA NIM", desc: "Ultra-low latency Llama-3.1-70b-instruct cloud inference" },
      { name: "Zero-Hallucination Grounding", desc: "LLM answers strictly bound to structured profile facts" },
      { name: "Real-time Token Streaming", desc: "Server-Sent Events (SSE) dispatching live text chunks to the client" },
      { name: "Reactive 4-State Avatar", desc: "Dynamic canvas avatar morphing across Idle, Listening, Thinking, and Speaking" },
      { name: "Markdown Stream Parser", desc: "Live code highlighting, lists, and formatted link rendering" },
    ],
  },
  {
    category: "Backend & Cloud Infrastructure",
    accent: "teal",
    icon: "☁️",
    description: "Robust serverless backend infrastructure handling AI proxying, contact dispatch, and edge delivery.",
    skills: [
      { name: "Node.js & Express", desc: "TypeScript REST API server orchestrating AI calls and contact inquiries" },
      { name: "Vercel Edge Network", desc: "Global CDN deployment with sub-second asset delivery and SSL" },
      { name: "Secure Contact Dispatch", desc: "Nodemailer/Resend transactional email transport with spam heuristics" },
      { name: "CORS & Rate Limiting", desc: "Defensive API security protecting backend endpoints from abuse" },
    ],
  },
  {
    category: "Design System & Glassmorphism",
    accent: "rose",
    icon: "💎",
    description: "Apple visionOS inspired optical glassmorphic aesthetics tailored for maximum visual elegance.",
    skills: [
      { name: "Optical Frosted Glass", desc: "Multi-layered blur(24px-32px) saturate(190%) with specular bevel highlights" },
      { name: "Living Aurora Gradient", desc: "Continuous 60fps GPU-accelerated ambient meshes drifting in whisper-soft tints" },
      { name: "3D TiltCard Physics", desc: "Dynamic cursor light glare and perspective tilt calculating angle of incidence" },
      { name: "Universal Accessibility", desc: "Full ARIA compliance, keyboard navigation traps, and reduced motion fallbacks" },
    ],
  },
];

export function TechStackModal({ isOpen, onClose, onOpenChat }: TechStackModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 p-3 sm:p-6 backdrop-blur-lg"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio Tech Stack & Architecture"
        >
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto overscroll-contain touch-pan-y rounded-[2.5rem] p-6 sm:p-10 apple-glass border border-white/90 shadow-[0_25px_70px_rgba(0,0,0,0.25)]"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.72) 100%)",
              backdropFilter: "blur(36px) saturate(200%) contrast(102%)",
              WebkitBackdropFilter: "blur(36px) saturate(200%) contrast(102%)",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-black/[0.06] pb-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="label-tag">Engineering & Architecture</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-0.5 text-xs font-bold text-accent-blue shadow-sm">
                    <span>⚡</span>
                    <span>Live Architecture</span>
                  </span>
                </div>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                  How This Portfolio Was Built.
                </h2>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-ink-500">
                  A transparent technical overview of the full-stack engineering, NVIDIA NIM AI integration, 3D graphics, and visionOS design tokens powering this site.
                </p>
              </div>

              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full apple-glass text-ink-600 hover:bg-black/5 hover:scale-105 active:scale-95 transition-all shadow-sm border border-white/80"
              >
                ✕
              </button>
            </div>

            {/* Spotlight Card: Ask Jash — AI Portfolio Assistant */}
            <div className="mt-8 apple-glass-card rounded-3xl p-6 sm:p-8 border-2 border-accent-blue/30 bg-gradient-to-br from-blue-500/[0.08] via-indigo-500/[0.04] to-white/70 shadow-glass">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-base shadow-sm">
                      🧠
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-blue">
                      Embedded Intelligence Feature
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                    Ask Jash — AI Portfolio Assistant
                  </h3>

                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-700 font-medium">
                    The AI assistant embedded in this very site — answers questions about my work using a structured knowledge base and NVIDIA NIM inference.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      "NVIDIA NIM API",
                      "Llama 3.1 70B Instruct",
                      "Zero-Hallucination RAG",
                      "Real-time Token Streaming",
                      "4-State Morphing Avatar",
                    ].map((pill) => (
                      <span
                        key={pill}
                        className="rounded-full border border-blue-500/20 bg-white/80 px-3 py-1 text-xs font-semibold text-accent-blue shadow-sm"
                      >
                        ✓ {pill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenChat();
                    }}
                    style={{ backgroundColor: "#0B1220", color: "#FFFFFF" }}
                    className="rounded-2xl px-6 py-3.5 text-sm font-bold shadow-lg transition-all hover:bg-black hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Try Ask Jash Now</span>
                    <span className="text-accent-blue font-bold">💬</span>
                  </button>
                  <p className="text-center text-[11px] font-medium text-ink-400">
                    Live interactive assistant in bottom-right dock
                  </p>
                </div>
              </div>
            </div>

            {/* Architecture Pipeline Flow Diagram */}
            <div className="mt-8 rounded-3xl apple-glass-card p-6 border border-white/80 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink-400 mb-4">
                Architecture Flow: Request to AI Stream
              </h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 text-center">
                <div className="rounded-2xl border border-white/80 bg-white/60 p-3.5 shadow-sm">
                  <span className="text-lg">💻</span>
                  <p className="mt-1 font-bold text-xs text-ink-900">1. Client UI</p>
                  <p className="mt-0.5 text-[11px] text-ink-500">React 18 + Framer Motion</p>
                </div>
                <div className="rounded-2xl border border-white/80 bg-white/60 p-3.5 shadow-sm">
                  <span className="text-lg">🛡️</span>
                  <p className="mt-1 font-bold text-xs text-ink-900">2. Express API</p>
                  <p className="mt-0.5 text-[11px] text-ink-500">Validation, CORS, Rate Limit</p>
                </div>
                <div className="rounded-2xl border border-white/80 bg-white/60 p-3.5 shadow-sm">
                  <span className="text-lg">📚</span>
                  <p className="mt-1 font-bold text-xs text-ink-900">3. Knowledge Base</p>
                  <p className="mt-0.5 text-[11px] text-ink-500">Strict Profile Context Grounding</p>
                </div>
                <div className="rounded-2xl border border-white/80 bg-white/60 p-3.5 shadow-sm">
                  <span className="text-lg">⚡</span>
                  <p className="mt-1 font-bold text-xs text-ink-900">4. NVIDIA NIM</p>
                  <p className="mt-0.5 text-[11px] text-ink-500">Streaming Llama-3.1-70B</p>
                </div>
              </div>
            </div>

            {/* Comprehensive Stack Categories */}
            <div className="mt-8 space-y-6">
              <h3 className="text-xl font-bold tracking-tight text-ink-900">
                Complete Engineering Layers
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {TECH_CATEGORIES.map((cat) => (
                  <div
                    key={cat.category}
                    className="apple-glass-card rounded-3xl p-6 border border-white/85 shadow-glass hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="text-xl">{cat.icon}</span>
                      <h4 className="text-lg font-bold text-ink-900">{cat.category}</h4>
                    </div>
                    <p className="text-xs text-ink-500 mb-4 leading-relaxed">{cat.description}</p>

                    <div className="space-y-2.5">
                      {cat.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="rounded-xl border border-black/[0.04] bg-white/50 p-2.5 backdrop-blur-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-ink-900">
                              {skill.name}
                            </span>
                          </div>
                          <p className="mt-0.5 text-[11.5px] leading-snug text-ink-500">
                            {skill.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.06] pt-6">
              <a
                href="https://github.com/jashchothani"
                target="_blank"
                rel="noreferrer"
                className="apple-glass rounded-2xl px-5 py-2.5 text-xs font-bold text-ink-700 hover:bg-white hover:text-ink-900 transition-all shadow-sm border border-white/80 inline-flex items-center gap-2"
              >
                <span>Explore GitHub Repositories</span>
                <span>↗</span>
              </a>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenChat();
                  }}
                  className="apple-glass rounded-2xl px-5 py-2.5 text-xs font-bold text-accent-blue hover:bg-white transition-all shadow-sm border border-accent-blue/20"
                >
                  Ask AI About Stack 💬
                </button>
                <button
                  onClick={onClose}
                  style={{ backgroundColor: "#0B1220", color: "#FFFFFF" }}
                  className="rounded-2xl px-6 py-2.5 text-xs font-bold shadow-md transition-all hover:bg-black hover:scale-105 active:scale-95"
                >
                  Back to Portfolio →
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
