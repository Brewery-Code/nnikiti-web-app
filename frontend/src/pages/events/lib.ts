import { EVENT_TYPE_META, type EventType } from "./events-data";

export function formatDate(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });
}

export function stripMarkdown(md?: string | null): string {
  if (!md) return "";
  return md.replace(/[#*_`>\[\]!]/g, "").replace(/\n+/g, " ").trim();
}

export function monFirstDay(year: number, month: number): number {
  return (new Date(year, month, 1).getDay() + 6) % 7;
}
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}
export function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" });
}

export function tagStyle(rgb?: string | null) {
  if (!rgb) return { background: "rgba(166,132,255,0.2)", border: "1px solid rgba(166,132,255,0.4)", color: "#c4a8ff" };
  return {
    background: `rgba${rgb.replace(/(\d+),(\d+),(\d+).*/, "$1,$2,$3,0.18)")}`,
    border: `1px solid rgba${rgb.replace(/(\d+),(\d+),(\d+).*/, "$1,$2,$3,0.38)")}`,
    color: `rgb${rgb.replace(/(\d+),(\d+),(\d+).*/, "$1,$2,$3)")}`,
  };
}

export function categoryToType(name?: string): EventType {
  const lower = (name ?? "").toLowerCase();
  for (const [type, meta] of Object.entries(EVENT_TYPE_META)) {
    if (meta.label.toLowerCase() === lower) return type as EventType;
  }
  return "conference";
}
