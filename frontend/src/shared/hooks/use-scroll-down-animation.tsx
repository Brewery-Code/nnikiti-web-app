import { useEffect, useState, type RefObject } from "react";

interface useScrollDownAnimationProps {
  elementRef: RefObject<HTMLElement | null>;
  isDefaultAnimationOn?: boolean;
}

function useScrollDownAnimation({ elementRef, isDefaultAnimationOn }: useScrollDownAnimationProps) {
  const [isElementVisible, setIsElementVisible] = useState(false);

  useEffect(() => {
    const current = elementRef.current;
    if (!current) return;

    if (isDefaultAnimationOn) {
      current.style.transform = "translateY(40px) scale(0.96)";
      current.style.opacity = "0";
      current.style.filter = "blur(6px)";
      current.style.transition =
        "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsElementVisible(true);

          if (isDefaultAnimationOn) {
            current.style.transform = "translateY(0) scale(1)";
            current.style.opacity = "1";
            current.style.filter = "blur(0px)";
          }

          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -120px 0px",
        threshold: 0,
      }
    );

    observer.observe(current);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, isDefaultAnimationOn]);

  return isElementVisible;
}

export { useScrollDownAnimation };
