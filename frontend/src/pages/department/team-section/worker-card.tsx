import { fadeInAnimation } from "@/shared/ui";
import { profilePlaceholder } from "@/shared/icons";
import { motion } from "framer-motion";
export function WorkerCard() {
  return (
    <motion.div
      className="relative z-1 flex max-w-125 gap-5 overflow-hidden rounded-md bg-linear-90 from-[rgba(36,40,50,1)] to-[rgba(37,28,40,1)] p-5 opacity-0 before:absolute before:right-1/2 before:-z-1 before:h-full before:w-full before:rotate-45 before:bg-[rgba(255,174,0,1)] before:transition-transform"
      {...fadeInAnimation}
    >
      <div className="flex max-h-31 max-w-31 items-center justify-center">
        <img
          className="h-full w-full rounded-full border-4 border-[rgba(255,174,0,1)] object-cover"
          src={profilePlaceholder}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-3xl font-medium">Name Surname</h3>
        <p className="line-clamp-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi est accusantium quibusdam
          porro voluptatibus voluptatem, iure ex consectetur quod dolorum deleniti aut, sit,
          inventore placeat esse! Veritatis quas cumque deleniti?
        </p>
        <button className="mt-2 ml-auto rounded-2xl bg-[#0a56a8] px-4 py-2 text-center text-primary">
          Read more
        </button>
      </div>
    </motion.div>
  );
}
