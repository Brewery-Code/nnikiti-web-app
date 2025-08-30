import { ArrowIcon } from "@/widgets/header/icons";
import workerPhoto from "./worker-photo.jpg";

export function WorkerCard() {
  return (
    <div className="relative z-1 flex max-w-125 gap-5 overflow-hidden rounded-md bg-white p-5 text-black before:absolute before:right-1/2 before:-z-1 before:h-full before:w-full before:rotate-45 before:bg-[#0a56a8]">
      <div className="flex max-h-31 max-w-31 items-center justify-center">
        <img
          className="h-full w-full rounded-full border-4 border-white object-cover"
          src={workerPhoto}
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
        <button className="mt-2 ml-auto rounded-2xl bg-[#0a56a8] px-4 py-2 text-center text-white">
          Read more
        </button>
      </div>
    </div>
  );
}
