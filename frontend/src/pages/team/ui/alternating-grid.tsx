import clsx from "clsx";
import { Reveal } from "@/shared/ui";

/* ─── Alternating rows grid (4 → 5 → 4 → 5 …) ──────────────── */
/*
  All cards share one fixed width = (100% - 4*gap) / 5
  (i.e. what fits 5 cards per row).
  Rows of 4 are flex-centered so the cards stay same size but sit
  symmetrically rather than stretching to fill the row.
*/
const GAP = 12; // px, matches gap-3

export function AlternatingGrid<T>({
  items,
  firstRowSize = 4,
  secondRowSize = 5,
  renderItem,
  className,
}: {
  items: T[];
  firstRowSize?: number;
  secondRowSize?: number;
  renderItem: (item: T, idx: number) => React.ReactNode;
  className?: string;
}) {
  const maxPerRow = Math.max(firstRowSize, secondRowSize);
  // fixed card width based on the widest row
  const cardWidth = `calc((100% - ${(maxPerRow - 1) * GAP}px) / ${maxPerRow})`;

  const rows: T[][] = [];
  let i = 0;
  let toggle = true;
  while (i < items.length) {
    const size = toggle ? firstRowSize : secondRowSize;
    rows.push(items.slice(i, i + size));
    i += size;
    toggle = !toggle;
  }

  return (
    <div className={clsx("flex flex-col", className)} style={{ gap: GAP }}>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="flex justify-center" style={{ gap: GAP }}>
          {row.map((item, j) => {
            const globalIdx = rowIdx * firstRowSize + j;
            return (
              <Reveal
                key={j}
                mode="up"
                amount={0.1}
                delay={j * 0.07}
                style={{ flex: `0 0 ${cardWidth}`, minWidth: 0 }}
              >
                {renderItem(item, globalIdx)}
              </Reveal>
            );
          })}
        </div>
      ))}
    </div>
  );
}
