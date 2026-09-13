import { useState, MouseEvent, Suspense, lazy } from "react";
import { motion } from "framer-motion";

import { RoleSwitcher } from "../components/RoleSwitcher";
import { Magnetic } from "../components/Magnetic";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { profile } from "../data/profile";
import { JashAvatar } from "../components/JashAvatar";

function SocialIcon({ icon }: { icon: string }) {
  const common = "h-[18px] w-[18px]";
  if (icon === "github") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={common}>
        <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-1.94c-3.16.69-3.83-1.52-3.83-1.52-.52-1.31-1.26-1.67-1.26-1.67-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.65 1.24 3.3.95.1-.73.4-1.24.72-1.53-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.13 1.16a10.9 10.9 0 0 1 5.7 0c2.17-1.47 3.13-1.16 3.13-1.16.62 1.58.23 2.75.11 3.04.73.79 1.17 1.8 1.17 3.04 0 4.35-2.66 5.31-5.19 5.59.41.35.77 1.04.77 2.11v3.13c0 .3.21.66.79.55 4.51-1.51 7.77-5.76 7.77-10.78C23.25 5.48 18.27.5 12 .5Z" />
      </svg>
    );
  }
  if (icon === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={common}>
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={common}>
      <path d="M22 5.9c-.66.3-1.36.5-2.1.6a3.6 3.6 0 0 0 1.6-2 7.3 7.3 0 0 1-2.3.88 3.6 3.6 0 0 0-6.2 3.3A10.24 10.24 0 0 1 3.15 4.9a3.6 3.6 0 0 0 1.12 4.83c-.58-.02-1.13-.18-1.6-.44v.05a3.6 3.6 0 0 0 2.9 3.55c-.53.14-1.1.17-1.65.06a3.6 3.6 0 0 0 3.37 2.5A7.28 7.28 0 0 1 2 16.98a10.27 10.27 0 0 0 5.55 1.62c6.65 0 10.3-5.5 10.3-10.28l-.01-.47A7.3 7.3 0 0 0 22 5.9Z" />
    </svg>
  );
}

export function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px, y: py });
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      {/* Gentle portrait ambient aura (single soft halo) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="gradient-orb-1 absolute top-[10%] right-[12%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.16)_0%,rgba(129,140,248,0.08)_50%,transparent_70%)] blur-[60px]" />
      </div>

      {/* 3. Subtle cyber-grid texture */}
      <div className="pointer-events-none absolute inset-0 bg-grid-faint [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)] opacity-40" />

      <div className="section-shell relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 xl:gap-20">
        {/* Text column */}
        <div>
          {profile.available && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="label-tag mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to new opportunities · {profile.location}
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-lg text-ink-500"
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-2 text-[13vw] leading-[0.95] tracking-tight sm:text-6xl lg:text-[4.2rem]"
          >
            Jash Bharat
            <br />
            Chothani
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5"
          >
            <RoleSwitcher roles={profile.roles} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-500"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary"
              >
                Explore my work
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-secondary"
              >
                Let's connect
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.resumeUrl} download className="btn-secondary">
                Download résumé ↓
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex items-center gap-4"
          >
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 bg-white/60 text-ink-500 backdrop-blur transition-colors hover:border-accent-blue/40 hover:text-accent-blue"
              >
                <SocialIcon icon={s.icon} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Portrait composition — Premium static avatar with 3D depth & ambient aura */}
        <div
          onMouseMove={handleMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          className="relative mx-auto h-[460px] w-full max-w-sm sm:h-[550px] sm:max-w-md lg:h-[650px] lg:max-w-none"
          style={{ perspective: 1200 }}
        >
          {/* Luminous rim-light glow behind head & shoulders for silhouette separation */}
          <div className="pointer-events-none absolute left-1/2 top-[38%] h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.85)_0%,rgba(224,242,254,0.5)_40%,rgba(199,210,254,0.25)_65%,transparent_80%)] blur-2xl" />

          {/* Wide ambient colorful aura */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18)_0%,rgba(139,92,246,0.12)_45%,rgba(6,182,212,0.06)_70%,transparent_85%)] blur-3xl" />

          {/* Rotating decorative halo rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 36, ease: "linear" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-ink-900/10"
          >
            <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 48, ease: "linear" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink-900/[0.05]"
          />

          {/* Pedestal grounding shadow */}
          <div className="pointer-events-none absolute bottom-1 left-1/2 h-16 w-[75%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.16)_0%,rgba(59,130,246,0.06)_45%,transparent_75%)] blur-md" />

          {/* 3D tilt stage */}
          <motion.div
            animate={{
              rotateY: tilt.x * 12,
              rotateX: -tilt.y * 12,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative mx-auto flex h-full w-fit items-end justify-center"
          >
            {/* Smooth floating motion for static avatar with studio bottom fade */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 mx-auto flex h-full w-full items-end justify-center [mask-image:linear-gradient(to_bottom,black_88%,transparent_100%)]"
              style={{ transform: "translateZ(40px)" }}
            >
              <JashAvatar
                variant="hero"
                className="h-full max-h-[580px]"
              />
            </motion.div>

            {/* Floating optical glass badges — positioned for clarity around the silhouette */}
            <motion.div
              style={{ transform: "translateZ(85px)" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="apple-glass absolute -left-6 top-8 flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 shadow-glass sm:-left-12 sm:top-10"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-blue/15 font-mono text-xs font-bold text-accent-blue shadow-sm">
                {"</>"}
              </span>
              <div>
                <span className="block text-xs font-semibold leading-tight text-ink-900">Full-Stack Dev</span>
                <span className="block text-[10px] leading-tight text-ink-500">React & Node.js</span>
              </div>
            </motion.div>

            <motion.div
              style={{ transform: "translateZ(105px)" }}
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.4 }}
              className="apple-glass absolute -right-6 top-20 flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 shadow-glass sm:-right-12 sm:top-24"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-violet/15 text-xs font-bold text-accent-violet shadow-sm">
                ✦
              </span>
              <div>
                <span className="block text-xs font-semibold leading-tight text-ink-900">AI Systems</span>
                <span className="block text-[10px] leading-tight text-ink-500">LLMs & Agents</span>
              </div>
            </motion.div>

            <motion.div
              style={{ transform: "translateZ(70px)" }}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.8 }}
              className="apple-glass absolute -left-6 bottom-24 flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 shadow-glass sm:-left-12 sm:bottom-28"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 shadow-sm">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.54-3.1 8.79-7 9.92-3.9-1.13-7-5.38-7-9.92V6.3l7-3.12z" />
                </svg>
              </span>
              <div>
                <span className="block text-xs font-semibold leading-tight text-ink-900">Security & SOAR</span>
                <span className="block text-[10px] leading-tight text-ink-500">Hardened & Scalable</span>
              </div>
            </motion.div>

            <motion.div
              style={{ transform: "translateZ(90px)" }}
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.6 }}
              className="apple-glass absolute -right-4 bottom-8 hidden items-center gap-2 rounded-full px-3.5 py-2 shadow-glass sm:flex sm:-right-8 sm:bottom-10"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-ink-700">Open to Roles</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-ink-400"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-ink-900/15 p-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ink-400" />
        </motion.div>
      </motion.button>
    </section>
  );
}
