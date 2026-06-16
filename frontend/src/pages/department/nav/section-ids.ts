import { globalLenis } from "@/shared/hooks/use-lenis";

export const SECTION_IDS = ["programs", "team", "history", "contacts"] as const;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = el.getBoundingClientRect().top + window.scrollY - 88;
  if (globalLenis) {
    globalLenis.scrollTo(offset, { duration: 1.2 });
  } else {
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
}
