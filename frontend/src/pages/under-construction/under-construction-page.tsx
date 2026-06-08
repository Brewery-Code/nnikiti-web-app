import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageTransition } from "@/widgets";
import { ROUTES } from "@/shared/model/routes";

export function Component() {

  return (
    <PageTransition>
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-5"
        >
          <h1
            className="font-display font-black text-primary"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 1.05 }}
          >
            Ця сторінка <span className="text-grad-animated">в розробці</span>
          </h1>

          <p className="max-w-md text-[15px] leading-snug text-muted">
            Ми активно працюємо над цим розділом. Скоро тут з'явиться повноцінний контент.
          </p>

          <Link
            to={ROUTES.HOME}
            className="mt-2 inline-flex items-center rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-7 py-3 text-[15px] font-semibold text-white shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(166,132,255,0.5)] active:scale-95"
          >
            На головну
          </Link>
        </motion.div>
      </div>
    </PageTransition>
  );
}
