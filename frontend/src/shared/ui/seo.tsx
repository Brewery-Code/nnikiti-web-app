import { useEffect, useSyncExternalStore } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  DEFAULT_OG_IMAGE,
  getSeoForPath,
  SITE_URL,
  type Lang,
  type SeoMeta,
} from "@/shared/model/seo";

/* ------------------------------------------------------------------ *
 * Override store — lets dynamic pages (news, department, gallery…)
 * push content-derived title/description without re-rendering the app.
 * ------------------------------------------------------------------ */
let currentOverride: SeoMeta | null = null;
const listeners = new Set<() => void>();

function setOverride(meta: SeoMeta | null) {
  currentOverride = meta;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/**
 * Set per-page SEO from fetched content (dynamic routes).
 * Pass `null` while data is loading — the route default is used as fallback.
 * Must be called unconditionally (before any early return) to respect hook rules.
 */
export function useSeo(meta: SeoMeta | null) {
  const title = meta?.title;
  const description = meta?.description;
  useEffect(() => {
    setOverride(title && description ? { title, description } : null);
    return () => setOverride(null);
  }, [title, description]);
}

/* ------------------------------------------------------------------ *
 * Head tag helpers — update existing static tags in place (no dupes).
 * ------------------------------------------------------------------ */
function upsertMeta(selector: string, create: () => HTMLElement): HTMLElement {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

function setMetaByName(name: string, content: string) {
  const el = upsertMeta(`meta[name="${name}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute("name", name);
    return m;
  });
  el.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  const el = upsertMeta(`meta[property="${property}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute("property", property);
    return m;
  });
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  const el = upsertMeta('link[rel="canonical"]', () => {
    const l = document.createElement("link");
    l.setAttribute("rel", "canonical");
    return l;
  });
  el.setAttribute("href", href);
}

/**
 * Centralised, per-route document metadata for the SPA.
 * Rendered once (in App) — keeps <title>, description, canonical and
 * Open Graph / Twitter tags in sync with the active route, language and
 * any per-page override set via {@link useSeo}.
 */
export function Seo() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const override = useSyncExternalStore(subscribe, () => currentOverride);

  useEffect(() => {
    const lang: Lang = i18n.language?.startsWith("en") ? "en" : "uk";
    const { title, description } = override ?? getSeoForPath(pathname, lang);
    const url = `${SITE_URL}${pathname}`;

    document.documentElement.lang = lang;
    document.title = title;
    setMetaByName("description", description);
    setCanonical(url);

    setMetaByProperty("og:title", title);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:url", url);
    setMetaByProperty("og:image", DEFAULT_OG_IMAGE);
    setMetaByProperty("og:locale", lang === "en" ? "en_US" : "uk_UA");

    setMetaByName("twitter:title", title);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", DEFAULT_OG_IMAGE);
  }, [pathname, i18n.language, override]);

  return null;
}
