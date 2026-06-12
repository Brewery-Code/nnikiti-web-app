export const SECTION_IDS = ["curriculum", "team", "history", "contacts"] as const;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) { return; }
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 88,
    behavior: "smooth",
  });
}
