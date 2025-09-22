import { motion } from "framer-motion";
import testImg from "./test.jpg";
import { fadeInAnimation } from "@/shared/ui";

export function AboutUs() {
  return (
    <div className="bg-linear-180 from-[#181818] from-0% via-[#181818] via-90% py-40">
      <div className="container-base grid grid-cols-2 gap-24 py-40">
        <div className="flex flex-col gap-12">
          <motion.div className="flex gap-8" {...fadeInAnimation}>
            <span className="h-full w-24 bg-linear-180 from-[#dc4345]" />
            <div className="last- text-4xl leading-12 font-bold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, at suscipit sit
              soluta tempore
              <span className="text-[#dc4345]"> laudantium dignissimos !</span>
            </div>
          </motion.div>
          <motion.div
            className="flex h-full max-h-128 w-full items-center justify-center"
            {...fadeInAnimation}
          >
            <img className="h-full w-full rounded-2xl object-cover" src={testImg} alt="" />
          </motion.div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex gap-8">
            <motion.div
              className="flex h-full max-h-64 w-full items-center justify-center"
              {...fadeInAnimation}
            >
              <img className="h-full w-full rounded-2xl object-cover" src={testImg} alt="" />
            </motion.div>
            <motion.div
              className="flex h-full max-h-64 w-full items-center justify-center"
              {...fadeInAnimation}
            >
              <img className="h-full w-full rounded-2xl object-cover" src={testImg} alt="" />
            </motion.div>
          </div>
          <div className="flex flex-col gap-16">
            <motion.p className="text-xl leading-8" {...fadeInAnimation}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil id, unde blanditiis
              facilis doloremque dolore doloribus, aliquam quia debitis ut placeat mollitia quo a
              excepturi quisquam natus magni at ipsum?
            </motion.p>
            <div className="flex justify-between">
              <motion.div className="flex flex-col gap-3" {...fadeInAnimation}>
                <div className="text-5xl font-bold">10k +</div>
                <div className="">Some text</div>
              </motion.div>
              <motion.div className="flex flex-col gap-3" {...fadeInAnimation}>
                <div className="text-5xl font-bold">10k +</div>
                <div className="">Some text</div>
              </motion.div>
              <motion.div className="flex flex-col gap-3" {...fadeInAnimation}>
                <div className="text-5xl font-bold">10k +</div>
                <div className="">Some text</div>
              </motion.div>
              <motion.div className="flex flex-col gap-3" {...fadeInAnimation}>
                <div className="text-5xl font-bold">10k +</div>
                <div className="">Some text</div>
              </motion.div>
            </div>
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
