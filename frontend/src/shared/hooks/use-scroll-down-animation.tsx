import { useEffect, useState, type RefObject } from "react";

interface useScrollDownAnimationProps {
  elementRef: RefObject<HTMLElement | null>;
}

function useScrollDownAnimation({ elementRef }: useScrollDownAnimationProps) {
  const [isElementVisible, setIsElementVisible] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const current = elementRef.current;
    current.style.transform = "scale(0.9)";
    current.style.opacity = "0";
    current.style.transition = "transform 0.5s ease, opacity 0.5s ease";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsElementVisible(true);
          current.style.transform = "scale(1)";
          current.style.opacity = "1";
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -180px 0px",
        threshold: 0,
      }
    );

    observer.observe(current);

    return () => {
      observer.disconnect();
    };
  }, [elementRef]);

  return isElementVisible;
}

export { useScrollDownAnimation };
