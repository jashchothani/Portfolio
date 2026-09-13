import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface RoleSwitcherProps {
  roles: string[];
}

export function RoleSwitcher({ roles }: RoleSwitcherProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2400);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <div className="relative h-8 overflow-hidden sm:h-10">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -28, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 font-display text-2xl font-medium text-accent-blue sm:text-3xl"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
