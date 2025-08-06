import { ModalWrapper } from "@/widgets";
import testImg from "./test2.png";

interface AlumniModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  name?: string;
  description?: string;
}

export function AlumniModal({
  isOpen,
  toggleModal,
  name,
  description,
}: AlumniModalProps) {
  return (
    <ModalWrapper
      className="flex justify-center items-center"
      isModalOpen={isOpen}
      toggleModal={toggleModal}
    >
      <div className="relative h-11/12 w-200 p-4 bg-[#1E201E] rounded-3xl">
        <div
          className="absolute top-4 right-4 w-8 h-8 cursor-pointer
            before:absolute before:top-1/2 before:-translate-y-1/2 before:rotate-45 before:w-full before:h-1 before:bg-red-900 before:rounded-4xl 
            before:transition-colors hover:before:bg-red-600
            after:absolute after:top-1/2 after:-translate-y-1/2 after:-rotate-45 after:w-full after:h-1 after:bg-red-900 after:rounded-4xl
            after:transition-colors hover:after:bg-red-600"
          onClick={toggleModal}
        />
        <div className="float-left w-64 h-64 mr-4 mb-4">
          <img
            className="w-full h-full object-cover rounded-3xl"
            src={testImg}
            alt=""
          />
        </div>
        <div className="text-4xl font-bold">Surname Name</div>
        <ul className="flex flex-col gap-2 mt-4 text-gray-100 font-semibold">
          <li>Graduated year: 2023</li>
          <li>Work place: gulugulu</li>
          <li>Position: coffee man</li>
          <li>Education program: computer since</li>
        </ul>
        <p className="mt-4 indent-4 text-gray-100 leading-6">
          If someone had told me five years ago that I’d find true fulfillment
          making cappuccinos at a giant tech firm, I would’ve laughed. Back
          then, I was drowning in lectures, assignments, and student loans,
          trying to earn a business degree. I was convinced I needed a fancy
          title, a corner office, and a shiny LinkedIn profile to feel
          “successful.” But life had other plans. University taught me many
          things — economics, management theory, a bit of coding — but what
          stuck most was what I did between classes. I always had a cup of
          coffee in hand. Not the burned cafeteria kind — I mean real, carefully
          crafted coffee. I started brewing my own at home. First a French
          press, then an AeroPress, then a pour-over. Before I knew it, I was
          reading about beans from Ethiopia like people read poetry. By
          graduation, while my friends scrambled for internships, I bought my
          first espresso machine. I started small. A stand outside the metro
          station. Rain or shine, I was there with my thermoses and hand
          grinders, chatting with tired commuters and giving them a reason to
          smile before their 9-to-5. It wasn’t glamorous, but every day, I was
          doing what I loved — and people noticed. One morning, a guy in a suit
          with the Gulugulu Company logo on his backpack stopped for a flat
          white. He came back the next day. And the day after that. Eventually,
          he asked if I’d ever thought about running a coffee bar… inside an
          office. That’s how it started. Today, I’m the head barista at Gulugulu
          HQ. My team serves hundreds of employees every day. I train new hires,
          select our beans, design seasonal menus, and yes — I still make the
          drinks myself. Because that’s where the magic is. In the foam, the
          smile, the moment someone says, “This made my day.” I don’t wear a
          suit. I don’t have a LinkedIn title that’ll blow your mind. But I love
          my job. I get paid well to do something I’m passionate about, and I’m
          surrounded by people who appreciate it. Success doesn’t always look
          like what you imagined in school. Sometimes, it smells like freshly
          ground coffee and starts at 6:30 AM — with joy. And honestly? I
          wouldn’t trade it for anything.
          <p className="mt-2 italic">— Alex, Coffee Man at Gulugulu Company</p>
        </p>
      </div>
    </ModalWrapper>
  );
}
