import { useEffect, useState } from "react";

interface TypingOptions {
  text: string;
  speed?: number;
  delay?: number;
}

export function useTypingEffect({ text, speed = 100, delay = 0 }: TypingOptions) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i === text.length) {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return displayed;
}
