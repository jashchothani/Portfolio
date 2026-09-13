import { FormEvent, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { profile } from "../data/profile";
import { API_URL, cn } from "../lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mumbaiTime, setMumbaiTime] = useState("");

  // Live Mumbai IST clock
  useEffect(() => {
    function updateTime() {
      const time = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setMumbaiTime(time);
    }
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  function handleCopyEmail() {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const rawMessage = String(data.get("message") || "").trim();

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      message: rawMessage,
    };

    if (!payload.name || !payload.email || !rawMessage) {
      setStatus("error");
      setErrorMsg("Please fill in your name, email, and message before transmitting.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json?.error || "Something went wrong transmitting your message.");
      }
      setEmailSent(Boolean(json?.emailSent));
      setSubmittedEmail(payload.email);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28 lg:py-32">
      <div className="section-shell max-w-4xl mx-auto px-4 sm:px-6">
        {/* Main Frosted Glass Bento Shell */}
        <div className="apple-glass relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem] p-5 sm:p-9 lg:p-11 shadow-glass border border-white/85">
          <div className="pointer-events-none absolute inset-0 bg-aurora opacity-30" />

          {/* Section Header */}
          <div className="relative">
            <Reveal>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-5">
                <span className="label-tag">Direct Communication</span>

                {/* Live Mumbai Clock Pill */}
                {mumbaiTime && (
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.06] bg-white/70 px-3.5 py-1 text-xs font-medium text-ink-600 shadow-sm backdrop-blur-md">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-ink-500">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <span>Mumbai, India</span>
                    <span className="text-ink-300">·</span>
                    <span className="font-mono font-semibold text-ink-900">{mumbaiTime} IST</span>
                  </div>
                )}
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink-900 leading-[1.18]">
                Let's engineer something{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                  extraordinary.
                </span>
              </h2>
              <p className="mt-2.5 sm:mt-3 text-sm sm:text-[16px] leading-relaxed text-ink-500 max-w-2xl">
                Have an enterprise platform project, cybersecurity inquiry, applied AI initiative, or an engineering role? Transmit a message below or connect directly across my active channels.
              </p>
            </Reveal>

            {/* Mobile-Optimized Structured Communication Channels */}
            <Reveal delay={0.08}>
              <div className="mt-6 sm:mt-7 space-y-2.5">
                
                {/* 1. Primary Channels Grid (Email + WhatsApp) */}
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  
                  {/* Email Action Card */}
                  <div className="flex items-center justify-between gap-2.5 rounded-2xl border border-white/90 bg-white/80 p-3 sm:px-4 sm:py-3 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:shadow-md">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Email Address</p>
                        <a
                          href={`mailto:${profile.email}`}
                          className="block truncate font-mono text-xs sm:text-sm font-semibold text-ink-900 hover:text-accent-blue transition-colors"
                        >
                          {profile.email}
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className={cn(
                        "flex flex-shrink-0 items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all active:scale-95",
                        copiedEmail
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "apple-glass text-ink-700 hover:bg-white hover:text-accent-blue border border-black/5"
                      )}
                      title="Copy email address"
                    >
                      {copiedEmail ? (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                            <rect x="9" y="9" width="13" height="13" rx="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* WhatsApp Action Card */}
                  <a
                    href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-2.5 rounded-2xl border border-white/90 bg-white/80 p-3 sm:px-4 sm:py-3 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:shadow-md active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-[#25D366]">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.19.53-1.11 1.04-1.54 1.09-.41.05-.93.07-1.49-.11-.34-.11-.79-.27-1.36-.52-2.42-1.05-3.99-3.52-4.11-3.69-.12-.16-.99-1.32-.99-2.52 0-1.2.63-1.79.85-2.03.22-.24.49-.3.66-.3.17 0 .34 0 .49.01.15.01.37-.06.57.43.21.5.71 1.73.78 1.86.06.13.1.28.02.44-.08.17-.12.28-.24.42-.12.15-.26.33-.37.44-.12.13-.25.27-.11.51.14.24.63 1.04 1.36 1.68.93.83 1.72 1.09 1.96 1.21.24.12.39.1.53-.06.15-.17.63-.73.8-1 .17-.24.35-.2.58-.12.24.08 1.49.7 1.75.83.26.13.43.19.49.3.06.11.06.66-.13 1.19" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">WhatsApp & Phone</p>
                        <p className="font-mono text-xs sm:text-sm font-semibold text-ink-900 group-hover:text-emerald-700 transition-colors">
                          {profile.phone}
                        </p>
                      </div>
                    </div>

                    <span className="flex-shrink-0 rounded-xl apple-glass px-2.5 py-1.5 text-xs font-bold text-emerald-700 group-hover:bg-emerald-500 group-hover:text-white transition-all flex items-center gap-1 border border-emerald-500/20">
                      <span>Chat</span>
                      <span>↗</span>
                    </span>
                  </a>

                </div>

                {/* 2. Symmetrical Socials Row (Balanced 3-column grid on mobile & desktop) */}
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  {/* GitHub */}
                  <a
                    href="https://github.com/jashchothani"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/90 bg-white/80 py-2.5 px-3 text-xs font-semibold text-ink-800 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:text-black hover:shadow hover:scale-[1.02] active:scale-95"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 flex-shrink-0">
                      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-1.94c-3.16.69-3.83-1.52-3.83-1.52-.52-1.31-1.26-1.67-1.26-1.67-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.65 1.24 3.3.95.1-.73.4-1.24.72-1.53-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.13 1.16a10.9 10.9 0 0 1 5.7 0c2.17-1.47 3.13-1.16 3.13-1.16.62 1.58.23 2.75.11 3.04.73.79 1.17 1.8 1.17 3.04 0 4.35-2.66 5.31-5.19 5.59.41.35.77 1.04.77 2.11v3.13c0 .3.21.66.79.55 4.51-1.51 7.77-5.76 7.77-10.78C23.25 5.48 18.27.5 12 .5Z" />
                    </svg>
                    <span className="truncate">GitHub</span>
                    <span className="text-[10px] text-ink-400">↗</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/jash-chothani-90422a316"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/90 bg-white/80 py-2.5 px-3 text-xs font-semibold text-ink-800 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:text-[#0A66C2] hover:shadow hover:scale-[1.02] active:scale-95"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-[#0A66C2]">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    <span className="truncate">LinkedIn</span>
                    <span className="text-[10px] text-ink-400">↗</span>
                  </a>

                  {/* X / Twitter */}
                  <a
                    href="https://twitter.com/jashchothani"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/90 bg-white/80 py-2.5 px-3 text-xs font-semibold text-ink-800 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:text-black hover:shadow hover:scale-[1.02] active:scale-95"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 flex-shrink-0">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span className="truncate">Twitter</span>
                    <span className="text-[10px] text-ink-400">↗</span>
                  </a>
                </div>

              </div>
            </Reveal>

            {/* Direct Message Console Form (Clean, Spacious, No Category Noise) */}
            <Reveal delay={0.14}>
              <div className="mt-7 sm:mt-8 rounded-[1.5rem] sm:rounded-[2rem] border border-white/90 bg-white/70 p-4 sm:p-7 lg:p-8 shadow-glass backdrop-blur-xl">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Name Input with User Icon */}
                    <div>
                      <label htmlFor="name" className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-600">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-accent-blue">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span>Full Name</span>
                        <span className="text-accent-blue">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="w-full rounded-xl sm:rounded-2xl border border-white/90 bg-white/85 px-4 py-3 sm:py-3.5 text-base sm:text-sm font-medium text-ink-900 outline-none transition-all placeholder:text-ink-400 focus:bg-white focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 shadow-sm"
                        placeholder="e.g. Alex Mercer"
                      />
                    </div>

                    {/* Email Input with Mail Icon */}
                    <div>
                      <label htmlFor="email" className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-600">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-accent-blue">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        <span>Email Address</span>
                        <span className="text-accent-blue">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full rounded-xl sm:rounded-2xl border border-white/90 bg-white/85 px-4 py-3 sm:py-3.5 text-base sm:text-sm font-medium text-ink-900 outline-none transition-all placeholder:text-ink-400 focus:bg-white focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 shadow-sm"
                        placeholder="alex@company.com"
                      />
                    </div>
                  </div>

                  {/* Message Input with Message Icon */}
                  <div>
                    <label htmlFor="message" className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-600">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-accent-blue">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span>Message & Requirements</span>
                      <span className="text-accent-blue">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full resize-none rounded-xl sm:rounded-2xl border border-white/90 bg-white/85 px-4 py-3 sm:py-3.5 text-base sm:text-sm font-medium text-ink-900 outline-none transition-all placeholder:text-ink-400 focus:bg-white focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 shadow-sm leading-relaxed"
                      placeholder="Share project goals, timeline, architecture requirements, or questions..."
                    />
                  </div>

                  {/* Action Bar */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      style={{ backgroundColor: "#0B1220", color: "#FFFFFF" }}
                      className="group w-full sm:w-auto rounded-xl sm:rounded-2xl px-8 py-3.5 text-sm font-bold shadow-lg transition-all hover:bg-black hover:scale-[1.02] active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2.5 border border-white/20"
                    >
                      {status === "loading" ? (
                        <>
                          <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>Transmitting Message…</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message Directly</span>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-cyan-400 group-hover:translate-x-1 transition-transform">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" fillOpacity="0.2" />
                          </svg>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1.5 text-xs text-ink-500 font-medium">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-emerald-600">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>Direct Inbox Delivery · Instant Confirmation</span>
                    </div>
                  </div>

                  {/* Animated Feedback Messages */}
                  <AnimatePresence>
                    {status === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-start gap-3 rounded-xl sm:rounded-2xl border border-emerald-500/30 bg-emerald-50/95 backdrop-blur-md p-4 shadow-sm"
                      >
                        <span className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-sm">
                          ✓
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-emerald-900">
                            Message Dispatched Successfully!
                          </p>
                          <p className="mt-0.5 text-xs leading-relaxed text-emerald-800">
                            {emailSent
                              ? `A confirmation receipt was sent to ${submittedEmail}. I will review your inquiry and follow up shortly.`
                              : "Your inquiry has been registered. I'll get back to you soon."}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2.5 rounded-xl sm:rounded-2xl border border-rose-500/30 bg-rose-50/95 backdrop-blur-md p-3.5 text-sm font-semibold text-rose-700 shadow-sm"
                      >
                        <span>⚠️</span>
                        <span>{errorMsg}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
