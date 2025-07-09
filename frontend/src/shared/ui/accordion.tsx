import { useEffect, useRef, useState } from "react";

export default function Accordion({
  isAccordionOpen,
  onClick,
  title,
  description,
}: {
  isAccordionOpen: boolean;
  onClick: () => void;
  title: string;
  description: string;
}) {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleHeight, setTitleHeight] = useState(0);

  const descriptionRef = useRef<HTMLDivElement>(null);
  const [descriptionHeight, setDescriptionHeight] = useState(0);

  useEffect(() => {
    if (titleRef.current) {
      setTitleHeight(titleRef.current.scrollHeight);
    }

    if (descriptionRef.current) {
      setDescriptionHeight(descriptionRef.current.scrollHeight);
    }
  }, []);

  console.log(descriptionHeight);

  return (
    <div
      className="p-4 bg-[#E8E8E8] rounded-2xl  text-black cursor-pointer transition-[height] duration-300 ease-in-out"
      style={{
        height: isAccordionOpen
          ? descriptionHeight + titleHeight + 42
          : titleHeight + 32,
      }}
      onClick={onClick}
    >
      <h2 className="text-2xl font-bold" ref={titleRef}>
        {title}
      </h2>
      <p className="mt-2.5 text-xl" ref={descriptionRef}>
        {description}
      </p>
    </div>
  );
}
