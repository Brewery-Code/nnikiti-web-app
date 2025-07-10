import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export default function Accordion({
  isAccordionOpen,
  onClick,
  title,
  description,
}: {
  isAccordionOpen: boolean;
  onClick: () => void;
  title?: string;
  description?: string;
}) {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [descriptionHeight, setDescriptionHeight] = useState(0);

  useEffect(() => {
    if (descriptionRef.current) {
      setDescriptionHeight(descriptionRef.current.scrollHeight);
    }
  }, [isAccordionOpen]);

  return (
    <div
      className="overflow-hidden p-4 bg-[#E8E8E8] rounded-2xl  text-black cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      <p
        className={clsx(
          "relative text-xl transition-[height,translate] duration-300 ease-in-out",
          isAccordionOpen ? "translate-y-4" : "translate-y-4 "
        )}
        style={{
          height: isAccordionOpen ? descriptionHeight + 16 : 0,
        }}
        ref={descriptionRef}
      >
        {description}
      </p>
    </div>
  );
}
