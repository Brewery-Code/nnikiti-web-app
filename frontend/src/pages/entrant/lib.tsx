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
 * Returns needsSlider=true when there are more cards than fit in 3 columns.
 * Below that threshold a static grid looks better than a carousel.
 */
export function useNeedsSlider(count: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [needsSlider, setNeedsSlider] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const compute = () => {
      const vw = window.innerWidth;
      if (vw < 640) {
        // On mobile always use a list — horizontal sliders are awkward for many cards
        setNeedsSlider(false);
        return;
      }
      const card = cardWidth(vw);
      const cols = Math.max(1, Math.floor((el.clientWidth + CARD_GAP) / (card + CARD_GAP)));
      // Slider only when we have more cards than fit in 3 columns with room to spare
      setNeedsSlider(count > Math.max(cols, 3));
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [count]);

  return { ref, needsSlider };
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
