import clsx from "clsx";
import { useEffect, useState } from "react";

export default function StatisticBlock({
  className,
  title,
  subtitle = "",
  start_value,
}: {
  className: string;
  title?: string;
  subtitle?: string;
  start_value?: number;
}) {
  const [current, setCurrent] = useState(start_value || 0);
  const [value, setValue] = useState(0);
  const [textBeforeValue, setTextBeforeValue] = useState("");
  const [textAfterValue, setTextAfterValue] = useState("");

  useEffect(() => {
    if (title) {
      const matchValue = title.match(/\d+/);
      const matchBeforeValue = title.match(/^[^\d]+/);
      const matchAfterValue = title.match(/[^\d]+$/);
      if (matchValue) setValue(parseInt(matchValue[0]));
      if (matchBeforeValue) setTextBeforeValue(matchBeforeValue[0]);
      if (matchAfterValue) setTextAfterValue(matchAfterValue[0]);
    }
  }, [title]);

  const startTime = Date.now();
  function animateValue(start: number, end: number, duration: number) {
    const startTime = Date.now();

    function step() {
      const now = Date.now();
      const elapsed = now - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);

      // 👇 Easing-функція: ease-out (сповільнення в кінці)
      const easeOutProgress = 1 - Math.pow(1 - linearProgress, 3); // cubic ease-out

      const currentValue = start + (end - start) * easeOutProgress;
      setCurrent(Math.round(currentValue));

      if (linearProgress < 1) {
        requestAnimationFrame(step);
      }
    }

    step(); // запускаємо
  }

  useEffect(() => {
    if (value !== 0) {
      animateValue(current, value, 4000);
    }
  }, [value]);

  return (
    <div
      className={clsx(
        className,
        "flex flex-col items-center justify-center p-4 rounded-xl text-black text-center cursor-pointer transition-colors duration-400 hover:bg-white"
      )}
      style={{
        boxShadow: "0 0 10px 2px rgba(256, 256, 256, 0.7)",
      }}
    >
      <div className="text-6xl leading-20 font-bold">
        {current ? textBeforeValue + current + textAfterValue : title}
      </div>
      <p className="text-2xl leading-6 font-bold">{subtitle}</p>
    </div>
  );
}
