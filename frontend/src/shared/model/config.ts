export const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
};

const API_ORIGIN = new URL(CONFIG.API_BASE_URL).origin;

export function resolveMediaUrl(url?: string | null): string | undefined {
  if (!url) { return undefined; }
  if (url.startsWith("http://") || url.startsWith("https://")) { return url; }
  return `${API_ORIGIN}${url}`;
}
