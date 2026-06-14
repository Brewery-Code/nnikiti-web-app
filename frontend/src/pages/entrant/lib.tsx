import { useEffect, useRef, useState } from "react";

export const isTouchDevice =
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

const CARD_GAP = 20; // matches gap-5 / spaceBetween in the slider

/** Card width (px) at the current viewport, mirroring the slide width classes. */
function cardWidth(viewportWidth: number): number {
  if (viewportWidth >= 1536) return 420;
  if (viewportWidth >= 1280) return 380;
  if (viewportWidth >= 1024) return 340;
  return 300;
}

/**
 * Measures the available content width and reports whether `count` program
 * cards fit in a single row. When they do, the section renders a static grid
 * instead of a slider.
 */
export function useCardsFit(count: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [fits, setFits] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const compute = () => {
      const vw = window.innerWidth;
      // On mobile the cards are full-width, so only a single one fits a row.
      if (vw < 640) {
        setFits(count > 0 && count <= 1);
        return;
      }
      const card = cardWidth(vw);
      const cols = Math.max(1, Math.floor((el.clientWidth + CARD_GAP) / (card + CARD_GAP)));
      setFits(count > 0 && count <= cols);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [count]);

  return { ref, fits };
}

const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

/** Renders a translated step body, linking occurrences of linkText to linkHref. */
export function linkedStepText(text: string, linkText: string, linkHref: string): React.ReactNode {
  return (
    <>
      {text.split(linkText).map((part, i, arr) =>
        i < arr.length - 1 ? (
          <span key={i}>
            {part}
            <ExternalLink href={linkHref}>{linkText}</ExternalLink>
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
