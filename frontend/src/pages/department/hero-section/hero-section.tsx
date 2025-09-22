import { DustEffect, NavButton } from "./ui";
import { sectionParams } from "../section-params";
import { motion } from "framer-motion";
import { useTypingEffect } from "@/shared/hooks";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

interface HeroSectionProps {
  setSection: (section: string) => void;
}

export function HeroSection({ setSection }: HeroSectionProps) {
  const navigationButtonsData = [
    {
      title: "Contacts",
      link: sectionParams.contacts,
    },
    {
      title: "History",
      link: sectionParams.history,
    },
    {
      title: "Main",
      link: sectionParams.main,
    },
    {
      title: "Since",
      link: sectionParams.since,
    },
    {
      title: "team",
      link: sectionParams.team,
    },
  ];

  const descriptionRef = useRef<HTMLDivElement>(null);
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  useEffect(() => {
    if (descriptionRef.current) {
      setDescriptionHeight(descriptionRef.current.scrollHeight);
    }
  }, [descriptionRef]);

  const [searchParams] = useSearchParams();

  function isMainSection() {
    return searchParams.get(sectionParams.paramName) === sectionParams.main;
  }

  const titleText = useTypingEffect({ text: "Department of" });
  const departmentName = useTypingEffect({
    text: "Computer Engineering",
    delay: "Department of".length * 100,
  });

  return (
    <motion.div
      className="relative h-dvh bg-black pt-16 before:absolute before:top-full before:h-32 before:w-full before:bg-linear-180 before:from-black before:to-transparent"
      animate={{
        height: isMainSection() ? "100dvh" : "50dvh",
      }}
      transition={{ duration: 0.5 }}
    >
      <DustEffect />
      <motion.div
        className="relative flex h-full w-full flex-col"
        animate={{
          paddingTop: isMainSection() ? 128 : 32,
        }}
      >
        <div className="flex flex-col">
          <motion.div
            className="leading mx-auto overflow-hidden font-mono text-2xl font-extrabold whitespace-nowrap"
            animate={{
              height: isMainSection() ? "" : 0,
            }}
            transition={{ delay: 0 }}
          >
            {titleText}
          </motion.div>
          <motion.div className="mx-auto overflow-hidden border-r-2 bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-8xl leading-30 font-extrabold whitespace-nowrap text-transparent">
            {departmentName}
          </motion.div>
          <motion.p
            className="mx-auto mt-8 w-256 overflow-hidden text-center font-mono text-xl"
            ref={descriptionRef}
            initial={{ y: 100, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              height: isMainSection() ? descriptionHeight : 0,
            }}
            transition={{
              delay: "Computer Engineering".length / 10 + "Department of".length / 10,
              duration: 0.5,
              height: { delay: 0, duration: 0.5 },
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed saepe ipsum praesentium
            cupiditate molestias nihil commodi perferendis recusandae eius necessitatibus veniam,
            excepturi beatae repudiandae at, minus atque facilis dolores quam?
          </motion.p>
        </div>
        <motion.div
          className="my-auto flex items-center justify-center gap-12"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: "Computer Engineering".length / 10 + "Department of".length / 10 + 0.5,
            duration: 0.5,
          }}
        >
          {navigationButtonsData.map((item, index) => (
            <NavButton
              className="basis-50"
              key={index}
              active={searchParams.get(sectionParams.paramName) === item.link}
              setSection={() => setSection(item.link)}
            >
              {item.title}
            </NavButton>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
