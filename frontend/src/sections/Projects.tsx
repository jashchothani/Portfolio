import { useState } from "react";
import { Reveal } from "../components/Reveal";
import { TiltCard } from "../components/TiltCard";
import { ProjectModal } from "../components/ProjectModal";
import { projects, Project } from "../data/profile";
import { cn } from "../lib/utils";

const ACCENT: Record<Project["accent"], { grad: string; text: string; badge: string }> = {
  blue: {
    grad: "from-blue-600/15 via-indigo-500/10 to-cyan-500/15",
    text: "text-blue-600",
    badge: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  violet: {
    grad: "from-purple-600/15 via-pink-500/10 to-blue-500/15",
    text: "text-purple-600",
    badge: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  },
  cyan: {
    grad: "from-cyan-500/15 via-teal-500/10 to-blue-500/15",
    text: "text-cyan-600",
    badge: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  },
};

type FilterCategory = "all" | "featured" | "security" | "fullstack" | "ai";

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<FilterCategory>("all");

  const fullstackCount = projects.filter(
    (p) =>
      p.slug === "swastik-chemical-india" ||
      p.slug === "driveverse" ||
      p.slug === "career-mitra" ||
      p.slug === "presenterlink-erp" ||
      p.stack.some((s) => s.toLowerCase().includes("react") || s.toLowerCase().includes("next.js") || s.toLowerCase().includes("pwa"))
  ).length;

  const securityCount = projects.filter(
    (p) =>
      p.slug === "kavach" ||
      p.slug === "netsentinel" ||
      p.stack.some((s) => s.toLowerCase().includes("scapy") || s.toLowerCase().includes("security"))
  ).length;

  const aiCount = projects.filter(
    (p) =>
      p.slug === "banksight-ai" ||
      p.slug === "ai-face-recognition" ||
      p.slug === "ask-jash-ai" ||
      p.slug === "career-mitra" ||
      p.stack.some((s) => s.toLowerCase().includes("ai") || s.toLowerCase().includes("xgboost") || s.toLowerCase().includes("nlp"))
  ).length;

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "featured") return p.featured;
    if (filter === "security") {
      return (
        p.slug === "kavach" ||
        p.slug === "netsentinel" ||
        p.stack.some((s) => s.toLowerCase().includes("scapy") || s.toLowerCase().includes("security"))
      );
    }
    if (filter === "fullstack") {
      return (
        p.slug === "swastik-chemical-india" ||
        p.slug === "driveverse" ||
        p.slug === "career-mitra" ||
        p.slug === "presenterlink-erp" ||
        p.stack.some((s) => s.toLowerCase().includes("react") || s.toLowerCase().includes("next.js") || s.toLowerCase().includes("pwa"))
      );
    }
    if (filter === "ai") {
      return (
        p.slug === "banksight-ai" ||
        p.slug === "ai-face-recognition" ||
        p.slug === "ask-jash-ai" ||
        p.slug === "career-mitra" ||
        p.stack.some((s) => s.toLowerCase().includes("ai") || s.toLowerCase().includes("xgboost") || s.toLowerCase().includes("nlp"))
      );
    }
    return true;
  });

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end mb-12">
          <Reveal className="max-w-lg">
            <span className="label-tag">Featured Engineering Works</span>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl font-bold tracking-tight text-ink-900">
              Things I've shipped.
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-500">
              A curated catalog of production enterprise platforms, national hackathon finalists,
              SOAR-XDR security engines, and applied AI systems.
            </p>
          </Reveal>

          {/* Interactive Filter Tabs */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-ink-900/10 bg-white/70 p-1.5 shadow-sm backdrop-blur-md">
              {(
                [
                  { id: "all", label: "All Projects", count: projects.length },
                  { id: "featured", label: "Featured", count: projects.filter((p) => p.featured).length },
                  { id: "fullstack", label: "Full-Stack & Cloud", count: fullstackCount },
                  { id: "security", label: "Security & SOAR", count: securityCount },
                  { id: "ai", label: "AI & ML", count: aiCount },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all",
                    filter === tab.id
                      ? "bg-ink-900 text-white shadow-sm"
                      : "text-ink-600 hover:bg-ink-900/5 hover:text-ink-900"
                  )}
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.2 text-[10px]",
                      filter === tab.id ? "bg-white/20 text-white" : "bg-ink-900/10 text-ink-500"
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          {filteredProjects.map((project, i) => {
            const isSwastik = project.slug === "swastik-chemical-india";
            const isDriveVerse = project.slug === "driveverse";
            const isKavach = project.slug === "kavach";
            const isBankSight = project.slug === "banksight-ai";
            const isNetSentinel = project.slug === "netsentinel";
            const isFaceRecognition = project.slug === "ai-face-recognition";
            const isPresenterLink = project.slug === "presenterlink-erp";
            const isAskJash = project.slug === "ask-jash-ai";
            const isCareerMitra = project.slug === "career-mitra";

            return (
              <Reveal key={project.slug} delay={i * 0.08}>
                <TiltCard intensity={4} className="h-full">
                  <article className="apple-glass-card group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-2.5">
                      {/* Visual Banner */}
                      <div
                        className={cn(
                          "relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br",
                          isSwastik && "from-emerald-950 via-teal-950 to-slate-950 border-b border-emerald-500/20",
                          isCareerMitra && "from-emerald-950 via-teal-950 to-slate-950 border-b border-emerald-500/20",
                          isKavach && "from-red-950 via-zinc-950 to-black border-b border-red-500/20",
                          isDriveVerse && "from-blue-950 via-indigo-950 to-slate-950 border-b border-blue-500/20",
                          isBankSight && "from-purple-950 via-zinc-950 to-fuchsia-950 border-b border-purple-500/20",
                          isNetSentinel && "from-cyan-950 via-slate-950 to-blue-950 border-b border-cyan-500/20",
                          isFaceRecognition && "from-amber-950 via-zinc-950 to-orange-950 border-b border-amber-500/20",
                          isPresenterLink && "from-violet-950 via-purple-950 to-slate-950 border-b border-violet-500/20",
                          isAskJash && "from-indigo-950 via-blue-950 to-slate-950 border-b border-indigo-500/20",
                          !isSwastik && !isCareerMitra && !isKavach && !isDriveVerse && !isBankSight && !isNetSentinel && !isFaceRecognition && !isPresenterLink && !isAskJash && ACCENT[project.accent].grad
                        )}
                      >
                        <div className="absolute inset-0 bg-grid-faint opacity-40 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />

                        {/* Status / Honor Pill in Banner */}
                        <div className="absolute left-4 top-4 z-10">
                          {isSwastik && (
                            <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-950/80 px-3 py-1 text-xs font-semibold text-emerald-300 shadow-sm backdrop-blur-md">
                              <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                              </span>
                              Live in Production · Vercel
                            </span>
                          )}
                          {isCareerMitra && (
                            <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-950/80 px-3 py-1 text-xs font-semibold text-emerald-300 shadow-sm backdrop-blur-md">
                              🌾 Hackathon Innovation · Live on Vercel
                            </span>
                          )}
                          {isDriveVerse && (
                            <span className="flex items-center gap-1.5 rounded-full border border-blue-400/40 bg-blue-950/80 px-3 py-1 text-xs font-semibold text-blue-300 shadow-sm backdrop-blur-md">
                              ★ National Finalist · IIT Madras
                            </span>
                          )}
                          {isKavach && (
                            <span className="flex items-center gap-1.5 rounded-full border border-red-400/40 bg-red-950/80 px-3 py-1 text-xs font-semibold text-red-300 shadow-sm backdrop-blur-md">
                              🛡️ SOAR-XDR · 16 Collectors
                            </span>
                          )}
                          {isBankSight && (
                            <span className="flex items-center gap-1.5 rounded-full border border-purple-400/40 bg-purple-950/80 px-3 py-1 text-xs font-semibold text-purple-300 shadow-sm backdrop-blur-md">
                              📈 Explainable AI · SHAP
                            </span>
                          )}
                          {isNetSentinel && (
                            <span className="flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/80 px-3 py-1 text-xs font-semibold text-cyan-300 shadow-sm backdrop-blur-md">
                              ⚡ AI Network Intrusion Defense
                            </span>
                          )}
                          {isPresenterLink && (
                            <span className="flex items-center gap-1.5 rounded-full border border-violet-400/40 bg-violet-950/80 px-3 py-1 text-xs font-semibold text-violet-300 shadow-sm backdrop-blur-md">
                              ⚡ WebRTC P2P · Zero-Latency LAN
                            </span>
                          )}
                          {isAskJash && (
                            <span className="flex items-center gap-1.5 rounded-full border border-indigo-400/40 bg-indigo-950/80 px-3 py-1 text-xs font-semibold text-indigo-300 shadow-sm backdrop-blur-md">
                              🧠 NVIDIA NIM · Llama 3.1 70B
                            </span>
                          )}
                        </div>

                        {/* Visual Centerpiece Logos for Each Project */}
                        {isKavach ? (
                          /* 1. KAVACH: Official Shield Logo */
                          <div className="relative flex flex-col items-center justify-center p-4">
                            <div className="relative h-28 w-28 drop-shadow-[0_0_28px_rgba(239,68,68,0.55)] transition-transform duration-300 group-hover:scale-110">
                              <img
                                src="/custom-shield.png"
                                alt="KAVACH SOAR-XDR Shield Logo"
                                className="h-full w-full object-contain"
                              />
                            </div>
                            <div className="mt-2.5 flex items-center gap-2">
                              <span className="rounded-md border border-red-500/30 bg-red-500/20 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-red-400">
                                SOAR · XDR
                              </span>
                              <span className="text-xs font-extrabold tracking-wider text-white uppercase drop-shadow">
                                KAVACH DEFENSE PLATFORM
                              </span>
                            </div>
                          </div>
                        ) : isSwastik ? (
                          /* 2. Swastik Chemical India: Professional B2B Chemical Enterprise Gradient Artwork */
                          <div className="relative flex flex-col items-center justify-center p-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/20 via-teal-400/20 to-cyan-400/20 p-3 shadow-[0_0_30px_rgba(16,185,129,0.25)] backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                              <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12 text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]">
                                <polygon points="24,4 40,13 40,31 24,40 8,31 8,13" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeDasharray="3 3" opacity="0.6" />
                                <path d="M21 12V18L14 30C12.5 32.5 14.3 36 17.2 36H30.8C33.7 36 35.5 32.5 34 30L27 18V12" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="19" y1="12" x2="29" y2="12" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
                                <path d="M16.5 26C18 25 21 28 24 26C27 24 30 27 31.5 26" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="21" cy="30" r="1.5" fill="#34D399" />
                                <circle cx="27" cy="32" r="1" fill="#22D3EE" />
                              </svg>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-emerald-400">
                                SCI · B2B
                              </span>
                              <span className="text-xs font-extrabold tracking-wider text-white uppercase drop-shadow">
                                Swastik Chemical India
                              </span>
                            </div>
                          </div>
                        ) : isDriveVerse ? (
                          /* 3. DriveVerse: Automotive Cyber Telemetry & Radar Shield */
                          <div className="relative flex flex-col items-center justify-center p-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-400/20 via-indigo-400/20 to-sky-400/20 p-3 shadow-[0_0_30px_rgba(59,130,246,0.3)] backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                              <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12 text-blue-400 drop-shadow-[0_0_12px_rgba(96,165,250,0.6)]">
                                <path d="M24 4L7 11V22C7 32.5 14.3 42.1 24 44C33.7 42.1 41 32.5 41 22V11L24 4Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
                                <path d="M16 26L18 20H30L32 26M14 26H34M16 26V30M32 26V30" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="19" cy="27" r="1.5" fill="#38BDF8" />
                                <circle cx="29" cy="27" r="1.5" fill="#38BDF8" />
                                <path d="M22 14H26" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <span className="rounded-md border border-blue-500/30 bg-blue-500/20 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-blue-400">
                                IIT MADRAS · BIMSTEC
                              </span>
                              <span className="text-xs font-extrabold tracking-wider text-white uppercase drop-shadow">
                                DRIVEVERSE ECOSYSTEM
                              </span>
                            </div>
                          </div>
                        ) : isBankSight ? (
                          /* 4. BankSight AI: Financial AI Candlestick & SHAP Curve */
                          <div className="relative flex flex-col items-center justify-center p-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-400/20 via-fuchsia-400/20 to-pink-400/20 p-3 shadow-[0_0_30px_rgba(168,85,247,0.3)] backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                              <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12 text-purple-400 drop-shadow-[0_0_12px_rgba(192,132,252,0.6)]">
                                <line x1="12" y1="14" x2="12" y2="34" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" />
                                <rect x="9.5" y="18" width="5" height="10" rx="1.5" fill="#C084FC" />
                                <line x1="22" y1="8" x2="22" y2="38" stroke="#E879F9" strokeWidth="2" strokeLinecap="round" />
                                <rect x="19.5" y="14" width="5" height="16" rx="1.5" fill="#E879F9" />
                                <line x1="32" y1="12" x2="32" y2="36" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                                <rect x="29.5" y="16" width="5" height="12" rx="1.5" fill="#38BDF8" />
                                <path d="M8 32Q18 26 24 16T40 8" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
                                <circle cx="40" cy="8" r="2.5" fill="#34D399" />
                              </svg>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <span className="rounded-md border border-purple-500/30 bg-purple-500/20 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-purple-400">
                                SHAP · XGBOOST
                              </span>
                              <span className="text-xs font-extrabold tracking-wider text-white uppercase drop-shadow">
                                BANKSIGHT AI
                              </span>
                            </div>
                          </div>
                        ) : isNetSentinel ? (
                          /* 5. NetSentinel: Cyber Radar Sentinel Network */
                          <div className="relative flex flex-col items-center justify-center p-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/20 via-teal-400/20 to-blue-400/20 p-3 shadow-[0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                              <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12 text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
                                <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
                                <circle cx="24" cy="24" r="11" stroke="#22D3EE" strokeWidth="2" />
                                <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                                <line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                                <line x1="24" y1="24" x2="36" y2="12" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
                                <circle cx="24" cy="24" r="3" fill="#22D3EE" />
                                <circle cx="33" cy="18" r="2" fill="#F87171" className="animate-ping" />
                              </svg>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <span className="rounded-md border border-cyan-500/30 bg-cyan-500/20 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-cyan-400">
                                SCAPY · ML FIREWALL
                              </span>
                              <span className="text-xs font-extrabold tracking-wider text-white uppercase drop-shadow">
                                NETSENTINEL AI
                              </span>
                            </div>
                          </div>
                        ) : project.slug === "ai-face-recognition" ? (
                          /* 6. AI Face Recognition: Biometric Face Scan */
                          <div className="relative flex flex-col items-center justify-center p-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-400/20 via-orange-400/20 to-yellow-400/20 p-3 shadow-[0_0_30px_rgba(245,158,11,0.3)] backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                              <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]">
                                <path d="M8 14V8H14M34 8H40V14M40 34V40H34M14 40H8V34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                <circle cx="24" cy="22" r="8" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3 3" />
                                <circle cx="20" cy="20" r="1.5" fill="#FBBF24" />
                                <circle cx="28" cy="20" r="1.5" fill="#FBBF24" />
                                <path d="M21 26C22 27 26 27 27 26" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <span className="rounded-md border border-amber-500/30 bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-amber-400">
                                DLIB · RESNET-128D
                              </span>
                              <span className="text-xs font-extrabold tracking-wider text-white uppercase drop-shadow">
                                AI FACE RECOGNITION
                              </span>
                            </div>
                          </div>
                        ) : isPresenterLink ? (
                          /* 7. PresenterLink: WebRTC LAN Screen-Sharing & ERP Module */
                          <div className="relative flex flex-col items-center justify-center p-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-400/20 via-purple-400/20 to-indigo-400/20 p-3 shadow-[0_0_30px_rgba(139,92,246,0.3)] backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                              <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12 text-violet-400 drop-shadow-[0_0_12px_rgba(167,139,250,0.6)]">
                                {/* Host Monitor */}
                                <rect x="5" y="10" width="22" height="15" rx="2" stroke="#A78BFA" strokeWidth="2" />
                                <line x1="16" y1="25" x2="16" y2="29" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" />
                                <line x1="12" y1="29" x2="20" y2="29" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" />
                                {/* Broadcast waves from Host */}
                                <path d="M13 16C15 14 17 14 19 16" stroke="#C084FC" strokeWidth="1.8" strokeLinecap="round" />
                                <circle cx="16" cy="18" r="1.5" fill="#38BDF8" />
                                {/* P2P Data Beam to Client Screen */}
                                <path d="M25 17L31 23" stroke="#818CF8" strokeWidth="2" strokeDasharray="2 2" />
                                {/* Client Device & ERP Billing Ledger */}
                                <rect x="23" y="21" width="20" height="15" rx="2" stroke="#818CF8" strokeWidth="2" fill="rgba(15,23,42,0.6)" />
                                <line x1="27" y1="25" x2="35" y2="25" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="27" y1="28" x2="39" y2="28" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M33 32L35 34L39 30" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <span className="rounded-md border border-violet-500/30 bg-violet-500/20 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-violet-400">
                                WEBRTC · P2P
                              </span>
                              <span className="text-xs font-extrabold tracking-wider text-white uppercase drop-shadow">
                                PRESENTERLINK & ERP
                              </span>
                            </div>
                          </div>
                        ) : isAskJash ? (
                          /* 8. Ask Jash: AI Portfolio Assistant with NVIDIA NIM Neural Core */
                          <div className="relative flex flex-col items-center justify-center p-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-indigo-400/30 bg-gradient-to-br from-indigo-400/20 via-blue-400/20 to-sky-400/20 p-3 shadow-[0_0_30px_rgba(99,102,241,0.3)] backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                              <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12 text-indigo-400 drop-shadow-[0_0_12px_rgba(129,140,248,0.6)]">
                                {/* Outer Neural Orbit */}
                                <circle cx="24" cy="24" r="18" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                                {/* Core Node Ring */}
                                <circle cx="24" cy="24" r="9" stroke="#38BDF8" strokeWidth="2" fill="rgba(56,189,248,0.15)" />
                                {/* Synapses */}
                                <line x1="24" y1="6" x2="24" y2="15" stroke="#818CF8" strokeWidth="1.8" strokeLinecap="round" />
                                <line x1="24" y1="33" x2="24" y2="42" stroke="#818CF8" strokeWidth="1.8" strokeLinecap="round" />
                                <line x1="6" y1="24" x2="15" y2="24" stroke="#818CF8" strokeWidth="1.8" strokeLinecap="round" />
                                <line x1="33" y1="24" x2="42" y2="24" stroke="#818CF8" strokeWidth="1.8" strokeLinecap="round" />
                                <circle cx="24" cy="6" r="2" fill="#38BDF8" />
                                <circle cx="24" cy="42" r="2" fill="#38BDF8" />
                                <circle cx="6" cy="24" r="2" fill="#A855F7" />
                                <circle cx="42" cy="24" r="2" fill="#A855F7" />
                                {/* AI Center Spark */}
                                <path d="M24 19V29M19 24H29" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
                                <circle cx="24" cy="24" r="2.5" fill="#38BDF8" />
                              </svg>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <span className="rounded-md border border-indigo-500/30 bg-indigo-500/20 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-indigo-400">
                                NVIDIA NIM · LLAMA 3.1
                              </span>
                              <span className="text-xs font-extrabold tracking-wider text-white uppercase drop-shadow">
                                ASK JASH AI ASSISTANT
                              </span>
                            </div>
                          </div>
                        ) : isCareerMitra ? (
                          /* 9. CareerMitra: Multilingual AI Career & Scholarship Companion */
                          <div className="relative flex flex-col items-center justify-center p-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/20 via-teal-400/20 to-amber-400/20 p-3 shadow-[0_0_30px_rgba(16,185,129,0.3)] backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                              <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12 text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]">
                                {/* Graduation Cap */}
                                <path d="M24 10L6 19L24 28L42 19L24 10Z" stroke="#34D399" strokeWidth="2.2" strokeLinejoin="round" />
                                <path d="M12 22V32C12 35 17 38 24 38C31 38 36 35 36 32V22" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" />
                                <path d="M40 21V31" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="40" cy="32" r="1.5" fill="#FBBF24" />
                                {/* Seedling / AI Compass Sprout */}
                                <path d="M24 23V15" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
                                <path d="M24 15C22 13 18 14 18 17C21 17 24 16 24 15Z" fill="#34D399" />
                                <path d="M24 17C26 15 30 16 30 19C27 19 24 18 24 17Z" fill="#FBBF24" />
                              </svg>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-emerald-400">
                                HACKATHON · PWA AI
                              </span>
                              <span className="text-xs font-extrabold tracking-wider text-white uppercase drop-shadow">
                                CAREERMITRA PLATFORM
                              </span>
                            </div>
                          </div>
                        ) : (
                          /* Fallback: Monogram */
                          <div className="flex flex-col items-center justify-center">
                            <span
                              className={cn(
                                "font-display text-5xl font-extrabold tracking-tight drop-shadow-sm transition-transform duration-300 group-hover:scale-105",
                                ACCENT[project.accent].text
                              )}
                            >
                              {project.title.slice(0, 2).toUpperCase()}
                            </span>
                            <span className="mt-2 text-xs font-semibold text-ink-500">
                              {project.stack.slice(0, 2).join(" · ")}
                            </span>
                          </div>
                        )}
                      </div>

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-xl font-bold text-ink-900 leading-snug group-hover:text-accent-blue transition-colors">
                          {project.title}
                        </h3>
                      </div>

                      <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-600">
                        {project.summary}
                      </p>

                      {/* Tech Stack Chips */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.stack.map((t) => (
                          <span
                            key={t}
                            className="rounded-lg border border-ink-900/5 bg-ink-900/[0.03] px-2.5 py-1 text-xs font-medium text-ink-600 transition-colors group-hover:bg-ink-900/[0.05]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Actions Bottom Bar */}
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink-900/5 pt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setSelected(project)}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-accent-blue transition-colors"
                          >
                            <span>Architecture Specs</span>
                            <span className="text-xs transition-transform group-hover:translate-x-0.5">→</span>
                          </button>

                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-sm font-medium text-ink-400 hover:text-ink-900 transition-colors"
                            >
                              <span>Code</span>
                              <span className="text-xs">↗</span>
                            </a>
                          )}
                        </div>

                        {project.slug === "ask-jash-ai" ? (
                          <button
                            type="button"
                            onClick={() => window.dispatchEvent(new CustomEvent("open-ai-chat"))}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:brightness-110 hover:shadow-md active:scale-95"
                          >
                            <span>Chat with AI</span>
                            <span className="text-[10px]">✨</span>
                          </button>
                        ) : project.demo ? (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:brightness-110 hover:shadow-md"
                          >
                            <span>Live Website</span>
                            <span className="text-[10px]">↗</span>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
