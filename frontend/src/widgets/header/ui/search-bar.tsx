import clsx from "clsx";
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { searchEntries, type SearchEntry } from "@/shared/model/search-index";

const MAX_SUGGESTIONS = 6;

const DEFAULT_SUGGESTIONS: SearchEntry[] = [
  { title: "Бакалаврат", description: "", link: ROUTES.BACHELOR, category: "Вступникам" },
  { title: "Магістратура", description: "", link: ROUTES.MASTER, category: "Вступникам" },
  { title: "Випускники", description: "", link: ROUTES.ALUMNI, category: "Про нас" },
  { title: "Команда", description: "", link: ROUTES.TEAM, category: "Про нас" },
  { title: "Контакти", description: "", link: ROUTES.CONTACTS, category: "Контакти" },
  { title: "Часті запитання", description: "", link: ROUTES.FAQ, category: "Контакти" },
];

function Suggestion({ entry, onSelect }: { entry: SearchEntry; onSelect: () => void }) {
  return (
    <Link
      to={entry.link}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onSelect}
      className="group flex items-center gap-3 px-4 py-2.5 transition-colors duration-100 hover:bg-surface-md"
    >
      <span
        className="flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.09em]"
        style={{
          background: "rgba(166,132,255,0.12)",
          border: "1px solid rgba(166,132,255,0.22)",
          color: "#b89dff",
        }}
      >
        {entry.category}
      </span>
      <span className="min-w-0 truncate text-[13px] text-primary/70 group-hover:text-primary/90">
        {entry.title}
      </span>
    </Link>
  );
}

export default function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const hasQuery = query.trim().length >= 2;
  const suggestions = hasQuery ? searchEntries(query).slice(0, MAX_SUGGESTIONS) : DEFAULT_SUGGESTIONS;
  const showDropdown = focused;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    close();
    navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(q)}`);
  }

  function close() {
    setFocused(false);
    setQuery("");
    inputRef.current?.blur();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") close();
  }

  return (
    <div className={clsx("relative z-[110]", className)}>
      <form
        onSubmit={handleSubmit}
        className={clsx(
          "relative flex w-[calc(100%-16px)] items-center justify-center justify-self-center leading-7 sm:w-[calc(100%-32px)]",
          "ease transition-[width] duration-300 focus-within:w-[calc(100%+16px)] sm:focus-within:w-[calc(100%+32px)]"
        )}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="pointer-events-none absolute left-4 h-4 w-4 fill-[#bdbecb]"
        >
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          name="searchbar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          autoComplete="off"
          className="h-8 w-full rounded-xl border-0 bg-[#16171d] pr-4 pl-10 text-[#bdbecb] shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_black] transition-[shadow,scale] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] outline-none hover:shadow-[0_0_0_2.5px_#2f303d,0_0_25px_-15px_black] focus:shadow-[0_0_0_2.5px_#2f303d]"
        />
      </form>

      {showDropdown && (
        <div
          className="absolute left-0 right-0 top-[calc(100%+6px)] overflow-hidden rounded-[14px] py-1.5"
          style={{
            background: "#13141c",
            border: "1px solid var(--border-ui)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(166,132,255,0.08)",
          }}
        >
          <p className="px-4 pb-1 pt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-primary/25">
            {hasQuery ? "Результати" : "Популярні розділи"}
          </p>

          {suggestions.length > 0 ? (
            suggestions.map((entry, i) => (
              <Suggestion key={i} entry={entry} onSelect={close} />
            ))
          ) : (
            <p className="px-4 py-3 text-[12px] text-subtle">Нічого не знайдено</p>
          )}

          {hasQuery && suggestions.length > 0 && (
            <div className="mx-4 mt-1 border-t border-white/[0.05] pt-1.5 pb-0.5">
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  const q = query.trim();
                  if (!q) return;
                  close();
                  navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(q)}`);
                }}
                className="w-full rounded-[8px] py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-violet-400/70 transition-colors hover:text-violet-300"
              >
                Усі результати →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
