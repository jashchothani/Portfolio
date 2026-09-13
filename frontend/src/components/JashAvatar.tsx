import { memo } from "react";
import { motion } from "framer-motion";
import jashAvatarWebp from "../assets/jash-avatar.webp";
import jashAvatarPng from "../assets/jash-avatar.png";
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

export interface JashAvatarProps {
  size?: number;
  className?: string;
  variant?: "hero" | "compact" | "mini";
  showBubble?: boolean;
  bubbleText?: string;
  interactive?: boolean;
  animState?: AvatarAnimState;
}

/**
 * JashAvatar: High-resolution static character portrait of Jash
 * - "hero": Full-body cartoon portrait with natural drop-shadow and ambient light
 * - "compact" / "mini": Crisp headshot crop for badges and avatars
 */
export const JashAvatar = memo(function JashAvatar({
  size,
  className,
  variant = "hero",
}: JashAvatarProps) {
  if (variant === "mini" || variant === "compact") {
    const dim = size || (variant === "mini" ? 28 : 44);
    return (
      <div
        className={cn("relative rounded-full overflow-hidden select-none", className)}
        style={{ width: dim, height: dim }}
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
      </div>
    );
  }

  // Hero full-body portrait
  return (
    <div className={cn("relative flex items-end justify-center select-none", className)}>
      <picture className="h-full w-auto flex items-end justify-center">
        <source srcSet={jashAvatarWebp} type="image/webp" />
        <img
          src={jashAvatarPng}
          alt="Jash Bharat Chothani - AI & Full Stack Engineer"
          className="h-full max-h-[580px] w-auto object-contain drop-shadow-[0_24px_40px_rgba(15,23,42,0.22)] select-none pointer-events-none filter"
          draggable={false}
          loading="eager"
        />
      </picture>
    </div>
  );
});
