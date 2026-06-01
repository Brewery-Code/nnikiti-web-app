import { useEffect } from "react";
import Lenis from "lenis";

export let globalLenis: Lenis | null = null;
let scrollLocked = false;

export function setScrollLocked(locked: boolean) {
  scrollLocked = locked;
  if (globalLenis) {
    if (locked) globalLenis.stop();
    else globalLenis.start();
  }
}

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    globalLenis = lenis;

    if (scrollLocked) lenis.stop();

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      globalLenis = null;
    };
  }, []);
}
