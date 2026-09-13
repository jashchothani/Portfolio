import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "../hooks/useActiveSection";
import { profile } from "../data/profile";
import { cn } from "../lib/utils";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export function Navbar({ onOpenTechStack }: { onOpenTechStack?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(LINKS.map((l) => l.id));

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goTo(id: string) {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-3 z-50 flex justify-center px-4"
      >
        <nav
          className={cn(
            "apple-glass flex w-full max-w-4xl items-center justify-between rounded-full transition-all duration-300",
            scrolled ? "h-11 px-3 shadow-[0_8px_30px_rgba(0,0,0,0.07)]" : "h-12 px-3.5"
          )}
        >
          <button
            onClick={() => goTo("home")}
            className="flex items-center gap-2 pl-1 pr-1.5 hover:opacity-80 transition-opacity"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#0B1220] to-[#1E293B] text-white font-display text-[11px] font-bold shadow-sm">
              JC
            </span>
            <span className="hidden sm:inline font-display text-sm font-semibold tracking-tight text-ink-900">
              Jash<span className="text-accent-blue">.</span>
            </span>
          </button>

          <ul className="hidden items-center gap-0.5 md:flex lg:gap-1">
            {LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => goTo(link.id)}
                  className={cn(
                    "relative rounded-full px-2 py-1 text-[12px] font-medium tracking-tight transition-colors lg:px-2.5 lg:text-[12.5px]",
                    active === link.id
                      ? "text-ink-900 font-semibold"
                      : "text-ink-500 hover:text-ink-900"
                  )}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)] border border-black/[0.04]"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => onOpenTechStack ? onOpenTechStack() : goTo("skills")}
            style={{ backgroundColor: "#0B1220", color: "#FFFFFF" }}
            className="hidden rounded-full px-3.5 py-1 text-xs font-semibold shadow-[0_2px_8px_rgba(11,18,32,0.25)] transition-all hover:bg-black hover:scale-105 active:scale-95 md:inline-flex items-center gap-1.5 border border-white/20"
          >
            <span className="text-amber-400 text-xs">⚡</span>
            <span className="text-white font-medium">Portfolio Tech Stack</span>
            <span className="text-[11px] text-accent-blue font-bold">→</span>
          </button>

          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink-700 md:hidden hover:bg-black/5 transition-colors"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "h-[1.5px] w-4 bg-current transition-transform",
                  menuOpen && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-[1.5px] w-4 bg-current transition-transform",
                  menuOpen && "-translate-y-[3.5px] -rotate-45"
                )}
              />
            </div>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="apple-glass fixed inset-x-4 top-16 z-50 rounded-2xl p-3 shadow-xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => goTo(link.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                      active === link.id
                        ? "bg-black/[0.05] text-ink-900 font-semibold"
                        : "text-ink-500 hover:text-ink-900 hover:bg-black/[0.02]"
                    )}
                  >
                    <span>{link.label}</span>
                    {active === link.id && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-2 pt-2 border-t border-black/[0.06] space-y-2">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  if (onOpenTechStack) onOpenTechStack();
                }}
                className="w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold text-accent-blue bg-accent-blue/10 border border-accent-blue/20"
              >
                <span className="flex items-center gap-1.5">
                  <span>⚡</span>
                  <span>Portfolio Tech Stack & AI</span>
                </span>
                <span>→</span>
              </button>

              <button
                onClick={() => goTo("contact")}
                style={{ backgroundColor: "#0B1220", color: "#FFFFFF" }}
                className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold text-white shadow-sm"
              >
                <span>Let's talk</span>
                <span className="text-accent-blue font-bold">→</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
