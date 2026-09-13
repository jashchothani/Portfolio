import { motion } from "framer-motion";
import jashHeadshotWebp from "../assets/jash-headshot.webp";
import jashHeadshotPng from "../assets/jash-headshot.png";
import { cn } from "../lib/utils";

export type AvatarAnimState =
  | "idle"
  | "speaking"
  | "thinking"
  | "listening"
  | "happy"
  | "waving"
  | "pointing";

interface AnimatedAvatarProps {
  size?: number;
  className?: string;
  ring?: boolean;
  breathe?: boolean;
  animState?: AvatarAnimState;
}

/**
 * AnimatedAvatar: Premium static portrait avatar with glowing state rings
 * Used for AI chat launcher orb, modal header, and message bubbles.
 */
export function AnimatedAvatar({
  size = 40,
  className,
  ring = true,
  breathe = true,
  animState = "idle",
}: AnimatedAvatarProps) {
  const isSpeaking = animState === "speaking";
  const isThinking = animState === "thinking";
  const isListening = animState === "listening";

  return (
    <div
      className={cn("relative flex-shrink-0 select-none", className)}
      style={{ width: size, height: size }}
    >
      {/* Dynamic ambient halo ring based on state */}
      {ring && (
        <motion.span
          animate={
            isSpeaking
              ? { scale: [1, 1.25, 1], opacity: [0.9, 0.2, 0.9] }
              : isThinking
              ? { rotate: 360 }
              : isListening
              ? { scale: [1, 1.18, 1], opacity: [0.8, 0.3, 0.8] }
              : { scale: [1, 1.1, 1], opacity: [0.5, 0.1, 0.5] }
          }
          transition={
            isThinking
              ? { duration: 2, repeat: Infinity, ease: "linear" }
              : isSpeaking
              ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute -inset-1 rounded-full blur-[2px]"
          style={{
            background: isSpeaking
              ? "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)"
              : isThinking
              ? "conic-gradient(from 0deg, #3B82F6, #8B5CF6, #06B6D4, #3B82F6)"
              : isListening
              ? "linear-gradient(135deg, #06B6D4, #3B82F6)"
              : "linear-gradient(135deg, rgba(59,130,246,0.5), rgba(139,92,246,0.5))",
          }}
        />
      )}

      {/* Avatar portrait container */}
      <motion.div
        animate={breathe ? { y: [0, -1.5, 0], scale: [1, 1.02, 1] } : undefined}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative h-full w-full rounded-full overflow-hidden border-2 border-white shadow-md bg-gradient-to-b from-slate-100 to-slate-200"
      >
        <picture className="h-full w-full block">
          <source srcSet={jashHeadshotWebp} type="image/webp" />
          <img
            src={jashHeadshotPng}
            alt="Jash Chothani"
            className="h-full w-full object-cover object-top"
            loading="lazy"
            draggable={false}
          />
        </picture>

        {/* Subtle shine overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/20 to-white/0" />
      </motion.div>

      {/* State badge indicator dot */}
      {size >= 36 && (
        <span className="absolute bottom-0 right-0 flex h-3 w-3">
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
              isSpeaking
                ? "bg-blue-400"
                : isThinking
                ? "bg-amber-400"
                : isListening
                ? "bg-cyan-400"
                : "bg-emerald-400"
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-3 w-3 rounded-full border-2 border-white",
              isSpeaking
                ? "bg-blue-500"
                : isThinking
                ? "bg-amber-500"
                : isListening
                ? "bg-cyan-500"
                : "bg-emerald-500"
            )}
          />
        </span>
      )}
    </div>
  );
}
