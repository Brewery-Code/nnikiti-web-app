import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { globalLenis, setScrollLocked } from "@/shared/hooks/use-lenis";
import { useCriticalLoading, resetCriticalSession } from "@/shared/model/critical-loading";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
// Скільки чекати на появу критичної (hero) секції; якщо її немає — ховаємось.
const WAIT_WINDOW_MS = 600;

export function Preloader() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);
  const [windowClosed, setWindowClosed] = useState(false);
  const [settled, setSettled] = useState(false);
  const { pending, everRegistered } = useCriticalLoading();
  const location = useLocation();
  const isFirstNav = useRef(true);

  useEffect(() => {
    const done = () => setPageLoaded(true);
    // Чекаємо лише парсинг DOM, а не всі картинки/шрифти (window.load)
    if (document.readyState !== "loading") { done(); }
    else { document.addEventListener("DOMContentLoaded", done, { once: true }); }
    return () => document.removeEventListener("DOMContentLoaded", done);
  }, []);

  // Нова "сесія" показу — на старті й на кожній навігації
  useLayoutEffect(() => {
    if (!isFirstNav.current) {
      if (globalLenis) { globalLenis.scrollTo(0, { immediate: true }); }
      else { window.scrollTo({ top: 0 }); }
      setEntranceDone(false);
      setSettled(false);
    }
    isFirstNav.current = false;
    resetCriticalSession();
    setWindowClosed(false);
    const id = setTimeout(() => setWindowClosed(true), WAIT_WINDOW_MS);
    return () => clearTimeout(id);
  }, [location.pathname]);

  // Дані готові: критичні секції догрузились. Поки вікно очікування відкрите —
  // чекаємо появи hero; після закриття — просто щоб не лишилось активних запитів.
  const criticalDone = windowClosed ? pending === 0 : everRegistered && pending === 0;
  const rawShow = !pageLoaded || !entranceDone || !criticalDone;
  // Засувка: щойно сховались — не показуємось знову до наступної навігації (без мерехтіння)
  const visible = !settled && rawShow;

  useEffect(() => {
    if (!rawShow) { setSettled(true); }
  }, [rawShow]);

  useEffect(() => {
    setScrollLocked(visible);
    return () => setScrollLocked(false);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-base"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(166,132,255,0.11) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(81,162,255,0.07) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* Logo + dots */}
          <div className="relative flex flex-col items-center gap-7">
            <motion.span
              className="font-display select-none font-black text-grad-animated"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", letterSpacing: "-0.05em" }}
              initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: EASE }}
              onAnimationComplete={() => setEntranceDone(true)}
            >
              ННІКІТІ
            </motion.span>

            <motion.div
              className="flex items-center gap-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.25, ease: EASE }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-[5px] w-[5px] rounded-full bg-violet-500"
                  animate={{ opacity: [0.25, 1, 0.25], scale: [0.7, 1.25, 0.7] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
                />
              ))}
            </motion.div>
          </div>

          {/* Bottom sweep bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              aria-hidden
              className="h-full w-[32%]"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(166,132,255,0.85) 35%, rgba(81,162,255,0.85) 65%, transparent 100%)",
              }}
              animate={{ x: ["-110%", "450%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
