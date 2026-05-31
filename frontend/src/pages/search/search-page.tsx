import { useSearchParams, Link } from "react-router-dom";
import { PageTransition } from "@/widgets";
import { searchEntries, type SearchEntry } from "@/shared/model/search-index";
import { Stagger, StaggerItem } from "@/shared/ui";

function CategoryBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
      style={{
        background: "linear-gradient(90deg,rgba(166,132,255,0.18),rgba(81,162,255,0.18))",
        border: "1px solid rgba(166,132,255,0.3)",
        color: "#c4a8ff",
      }}
    >
      {label}
    </span>
  );
}

function ResultCard({ entry }: { entry: SearchEntry }) {
  return (
    <Link
      to={entry.link}
      className="group flex items-start justify-between gap-4 rounded-[16px] border border-ui-sm bg-surface p-5 transition-all duration-200 hover:border-violet-500/20 hover:bg-violet-500/[0.06] active:scale-[0.99]"
    >
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-2">
          <CategoryBadge label={entry.category} />
        </div>
        <h3
          className="font-display font-bold text-primary transition-colors duration-150 group-hover:text-violet-300"
          style={{ fontSize: "1rem", letterSpacing: "-0.01em", lineHeight: 1.4 }}
        >
          {entry.title}
        </h3>
        <p className="mt-1.5 text-[14px] leading-relaxed text-primary/50">
          {entry.description}
        </p>
      </div>
      <span className="mt-1 flex-shrink-0 text-[18px] text-primary/20 transition-colors duration-200 group-hover:text-violet-400">
        →
      </span>
    </Link>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <div
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: "rgba(166,132,255,0.08)", border: "1px solid rgba(166,132,255,0.2)" }}
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-violet-400/50">
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
        </svg>
      </div>
      <p className="font-display text-[1.1rem] font-bold text-primary/70">
        Нічого не знайдено
      </p>
      <p className="mt-2 text-[14px] text-subtle">
        За запитом «{query}» результатів не знайдено. Спробуйте інше слово.
      </p>
    </div>
  );
}

export function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";
  const results = searchEntries(query);

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <div className="min-h-screen bg-base pt-24 pb-20 sm:pt-32 lg:pt-40">
        <div className="container-v2 max-w-[860px]">
          {/* header */}
          <div className="mb-10">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-500">
              — Пошук
            </p>
            <h1
              className="font-display font-black text-primary"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", letterSpacing: "-0.04em" }}
            >
              {query ? (
                <>
                  Результати для{" "}
                  <span className="text-grad">«{query}»</span>
                </>
              ) : (
                "Пошук по сайту"
              )}
            </h1>
            {results.length > 0 && (
              <p className="mt-3 text-[14px] text-subtle">
                Знайдено {results.length} {results.length === 1 ? "результат" : results.length < 5 ? "результати" : "результатів"}
              </p>
            )}
          </div>

          {/* results */}
          {!query ? (
            <p className="text-[15px] text-subtle">
              Введіть запит у рядку пошуку вгорі сторінки.
            </p>
          ) : results.length === 0 ? (
            <EmptyState query={query} />
          ) : (
            <Stagger className="flex flex-col gap-3" stagger={0.05} inView={false}>
              {results.map((entry, i) => (
                <StaggerItem key={i} mode="up">
                  <ResultCard entry={entry} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export const Component = SearchPage;
