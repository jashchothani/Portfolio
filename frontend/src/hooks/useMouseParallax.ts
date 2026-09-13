import { useEffect, useRef } from "react";

/**
 * Tracks normalized mouse position (-1 to 1) in a ref, avoiding re-renders.
 * Read `pointer.current.x / y` inside an animation loop (e.g. useFrame).
 */
export function useMouseParallax() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return pointer;
}
