import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Credential } from "../data/profile";

interface CertificateModalProps {
  credential: Credential | null;
  onClose: () => void;
}

export function CertificateModal({ credential, onClose }: CertificateModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock background scrolling when certificate modal is open
  useEffect(() => {
    if (credential) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = origOverflow;
      };
    }
  }, [credential]);

  return (
    <AnimatePresence>
      {credential && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/25 p-4 sm:p-6 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={credential.title}
        >
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden overscroll-contain touch-pan-y rounded-[2.5rem] apple-glass border border-white/85"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.65) 100%)",
              backdropFilter: "blur(32px) saturate(190%) contrast(102%)",
              WebkitBackdropFilter: "blur(32px) saturate(190%) contrast(102%)",
              WebkitOverflowScrolling: "touch",
              boxShadow: "inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 1), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.02), 0 25px 60px -12px rgba(15, 23, 42, 0.20)",
            }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/60 p-5 sm:p-6">
              <div>
                <span className="inline-flex items-center rounded-full border border-accent-blue/20 bg-accent-blue/10 px-3 py-0.5 text-xs font-semibold text-accent-blue shadow-sm">
                  {credential.type === "hackathon" ? "Hackathon" : "Certification"}
                  {credential.highlight ? ` · ${credential.highlight}` : ""}
                </span>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">{credential.title}</h3>
                <p className="mt-1 text-sm text-ink-500">
                  {credential.issuer} · {credential.date}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full apple-glass text-ink-600 hover:bg-black/5 hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-white/40 backdrop-blur-sm p-4 sm:p-8">
              <img
                src={credential.image}
                alt={`${credential.title} certificate`}
                className="mx-auto max-h-[55vh] w-auto rounded-2xl object-contain shadow-glass-lg border border-white/80"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-white/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <p className="text-sm leading-relaxed text-ink-600">{credential.description}</p>
              <a
                href={credential.image}
                download
                className="apple-glass flex-shrink-0 rounded-2xl px-5 py-2.5 text-sm font-semibold text-ink-800 hover:bg-white/90 shadow-sm transition-all hover:scale-105 active:scale-95 text-center"
              >
                Download
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
