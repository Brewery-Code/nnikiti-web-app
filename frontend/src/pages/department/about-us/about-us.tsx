import { motion, useInView } from "framer-motion";
import testImg from "./test.jpg";
import { fadeInAnimation, fadeInAnimationControlled } from "@/shared/ui";
import { useRef } from "react";

export function AboutUs() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { amount: "all", once: true });
  const descriptionRef = useRef(null);
  const isDescriptionInView = useInView(descriptionRef, { amount: "all", once: true });

  return (
    <div className="bg-linear-180 from-[#181818] from-0% via-[#181818] via-90% py-40">
      <div className="container-base grid grid-cols-2 gap-24 py-40">
        <div className="flex flex-col gap-12">
          <motion.div className="flex gap-8" ref={titleRef} {...fadeInAnimation}>
            <span className="h-full w-24 bg-linear-180 from-[#dc4345]" />
            <div className="last- text-4xl leading-12 font-bold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, at suscipit sit
              soluta tempore
              <span className="text-[#dc4345]"> laudantium dignissimos !</span>
            </div>
          </motion.div>
          <motion.div
            className="flex h-full max-h-128 w-full items-center justify-center"
            {...fadeInAnimationControlled}
            animate={isDescriptionInView ? fadeInAnimationControlled.animate : {}}
          >
            <img className="h-full w-full rounded-2xl object-cover" src={testImg} alt="" />
          </motion.div>
        </div>
        <div className="flex flex-col justify-between">
          <motion.div
            className="flex gap-8"
            {...fadeInAnimationControlled}
            animate={isTitleInView ? fadeInAnimationControlled.animate : {}}
          >
            <div className="flex h-full max-h-64 w-full items-center justify-center">
              <img className="h-full w-full rounded-2xl object-cover" src={testImg} alt="" />
            </div>
            <div className="flex h-full max-h-64 w-full items-center justify-center">
              <img className="h-full w-full rounded-2xl object-cover" src={testImg} alt="" />
            </div>
          </motion.div>
          <div className="flex flex-col gap-16">
            <motion.p className="text-xl leading-8" ref={descriptionRef} {...fadeInAnimation}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil id, unde blanditiis
              facilis doloremque dolore doloribus, aliquam quia debitis ut placeat mollitia quo a
              excepturi quisquam natus magni at ipsum?
            </motion.p>
            <motion.div className="flex justify-between" {...fadeInAnimation}>
              <div className="flex flex-col gap-3">
                <div className="text-5xl font-bold">10k +</div>
                <div className="">Some text</div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-5xl font-bold">10k +</div>
                <div className="">Some text</div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-5xl font-bold">10k +</div>
                <div className="">Some text</div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-5xl font-bold">10k +</div>
                <div className="">Some text</div>
              </div>
            </motion.div>
            <motion.div className="flex" {...fadeInAnimation}>
              <div className="h-24 w-24">
                <img
                  className="h-full w-full rounded-full border-2 border-black object-cover"
                  src={testImg}
                  alt=""
                />
              </div>
              <div className="h-24 w-24 -translate-x-10">
                <img
                  className="h-full w-full rounded-full border-2 border-black object-cover"
                  src={testImg}
                  alt=""
                />
              </div>
              <div className="h-24 w-24 -translate-x-20">
                <img
                  className="h-full w-full rounded-full border-2 border-black object-cover"
                  src={testImg}
                  alt=""
                />
              </div>
              <div className="h-24 w-24 -translate-x-30">
                <img
                  className="h-full w-full rounded-full border-2 border-black object-cover"
                  src={testImg}
                  alt=""
                />
              </div>
              <button className="-translate-x-20 text-xl uppercase">{"Our team >"}</button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
