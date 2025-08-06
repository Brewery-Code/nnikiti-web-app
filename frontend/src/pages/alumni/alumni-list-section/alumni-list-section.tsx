import { BlackAndWhiteButton, Title } from "@/shared/ui";
import { AlumniCard } from "./alumni-card";

interface AlumniData {
  id: number;
  full_name: string;
  text: string;
  image: string;
  created_at: string;
  date_of_graduation: string;
  links: {
    instagram?: string;
    telegram?: string;
    facebook?: string;
  };
}

const alumniData: AlumniData[] = [
  {
    id: 0,
    full_name: "Пархомчук Віталій",
    text: `If someone had told me five years ago that I’d find true fulfillment making cappuccinos at a giant tech firm, I would’ve laughed. Back
          then, I was drowning in lectures, assignments, and student loans, trying to earn a business degree. I was convinced I needed a fancy
          title, a corner office, and a shiny LinkedIn profile to feel “successful.” But life had other plans. University taught me many
          things — economics, management theory, a bit of coding — but what stuck most was what I did between classes. I always had a cup of
          coffee in hand. Not the burned cafeteria kind — I mean real, carefully crafted coffee. I started brewing my own at home. First a French
          press, then an AeroPress, then a pour-over. Before I knew it, I was reading about beans from Ethiopia like people read poetry. By
          graduation, while my friends scrambled for internships, I bought my first espresso machine. I started small. A stand outside the metro
          station. Rain or shine, I was there with my thermoses and hand grinders, chatting with tired commuters and giving them a reason to
          smile before their 9-to-5. It wasn’t glamorous, but every day, I was doing what I loved — and people noticed. One morning, a guy in a suit
          with the Gulugulu Company logo on his backpack stopped for a flat white. He came back the next day. And the day after that. Eventually,
          he asked if I’d ever thought about running a coffee bar… inside an office. That’s how it started. Today, I’m the head barista at Gulugulu
          HQ. My team serves hundreds of employees every day. I train new hires, select our beans, design seasonal menus, and yes — I still make the
          drinks myself. Because that’s where the magic is. In the foam, the smile, the moment someone says, “This made my day.” I don’t wear a
          suit. I don’t have a LinkedIn title that’ll blow your mind. But I love my job. I get paid well to do something I’m passionate about, and I’m surrounded by people who appreciate it. Success doesn’t always look
          like what you imagined in school. Sometimes, it smells like freshly ground coffee and starts at 6:30 AM — with joy. And honestly? I
          wouldn’t trade it for anything.`,
    image: "string",
    created_at: "2025-08-06T19:56:45.650Z",
    date_of_graduation: "2025-08-06",
    links: {
      instagram: "https://instagram.com/example",
      telegram: "https://t.me/example",
      facebook: "https://facebook.com/example",
    },
  },
  {
    id: 1,
    full_name: "Пархомчук Віталій",
    text: `If someone had told me five years ago that I’d find true fulfillment making cappuccinos at a giant tech firm, I would’ve laughed. Back
          then, I was drowning in lectures, assignments, and student loans, trying to earn a business degree. I was convinced I needed a fancy
          title, a corner office, and a shiny LinkedIn profile to feel “successful.” But life had other plans. University taught me many
          things — economics, management theory, a bit of coding — but what stuck most was what I did between classes. I always had a cup of
          coffee in hand. Not the burned cafeteria kind — I mean real, carefully crafted coffee. I started brewing my own at home. First a French
          press, then an AeroPress, then a pour-over. Before I knew it, I was reading about beans from Ethiopia like people read poetry. By
          graduation, while my friends scrambled for internships, I bought my first espresso machine. I started small. A stand outside the metro
          station. Rain or shine, I was there with my thermoses and hand grinders, chatting with tired commuters and giving them a reason to
          smile before their 9-to-5. It wasn’t glamorous, but every day, I was doing what I loved — and people noticed. One morning, a guy in a suit
          with the Gulugulu Company logo on his backpack stopped for a flat white. He came back the next day. And the day after that. Eventually,
          he asked if I’d ever thought about running a coffee bar… inside an office. That’s how it started. Today, I’m the head barista at Gulugulu
          HQ. My team serves hundreds of employees every day. I train new hires, select our beans, design seasonal menus, and yes — I still make the
          drinks myself. Because that’s where the magic is. In the foam, the smile, the moment someone says, “This made my day.” I don’t wear a
          suit. I don’t have a LinkedIn title that’ll blow your mind. But I love my job. I get paid well to do something I’m passionate about, and I’m surrounded by people who appreciate it. Success doesn’t always look
          like what you imagined in school. Sometimes, it smells like freshly ground coffee and starts at 6:30 AM — with joy. And honestly? I
          wouldn’t trade it for anything.`,
    image: "string",
    created_at: "2025-08-06T19:56:45.650Z",
    date_of_graduation: "2025-08-06",
    links: {
      instagram: "https://instagram.com/example",
      telegram: "https://t.me/example",
      facebook: "https://facebook.com/example",
    },
  },
  {
    id: 2,
    full_name: "Пархомчук Віталій",
    text: `If someone had told me five years ago that I’d find true fulfillment making cappuccinos at a giant tech firm, I would’ve laughed. Back
          then, I was drowning in lectures, assignments, and student loans, trying to earn a business degree. I was convinced I needed a fancy
          title, a corner office, and a shiny LinkedIn profile to feel “successful.” But life had other plans. University taught me many
          things — economics, management theory, a bit of coding — but what stuck most was what I did between classes. I always had a cup of
          coffee in hand. Not the burned cafeteria kind — I mean real, carefully crafted coffee. I started brewing my own at home. First a French
          press, then an AeroPress, then a pour-over. Before I knew it, I was reading about beans from Ethiopia like people read poetry. By
          graduation, while my friends scrambled for internships, I bought my first espresso machine. I started small. A stand outside the metro
          station. Rain or shine, I was there with my thermoses and hand grinders, chatting with tired commuters and giving them a reason to
          smile before their 9-to-5. It wasn’t glamorous, but every day, I was doing what I loved — and people noticed. One morning, a guy in a suit
          with the Gulugulu Company logo on his backpack stopped for a flat white. He came back the next day. And the day after that. Eventually,
          he asked if I’d ever thought about running a coffee bar… inside an office. That’s how it started. Today, I’m the head barista at Gulugulu
          HQ. My team serves hundreds of employees every day. I train new hires, select our beans, design seasonal menus, and yes — I still make the
          drinks myself. Because that’s where the magic is. In the foam, the smile, the moment someone says, “This made my day.” I don’t wear a
          suit. I don’t have a LinkedIn title that’ll blow your mind. But I love my job. I get paid well to do something I’m passionate about, and I’m surrounded by people who appreciate it. Success doesn’t always look
          like what you imagined in school. Sometimes, it smells like freshly ground coffee and starts at 6:30 AM — with joy. And honestly? I
          wouldn’t trade it for anything.`,
    image: "string",
    created_at: "2024-08-06T19:56:45.650Z",
    date_of_graduation: "2025-08-06",
    links: {
      instagram: "https://instagram.com/example",
      telegram: "https://t.me/example",
      facebook: "https://facebook.com/example",
    },
  },
  {
    id: 3,
    full_name: "Пархомчук Віталій",
    text: `If someone had told me five years ago that I’d find true fulfillment making cappuccinos at a giant tech firm, I would’ve laughed. Back
          then, I was drowning in lectures, assignments, and student loans, trying to earn a business degree. I was convinced I needed a fancy
          title, a corner office, and a shiny LinkedIn profile to feel “successful.” But life had other plans. University taught me many
          things — economics, management theory, a bit of coding — but what stuck most was what I did between classes. I always had a cup of
          coffee in hand. Not the burned cafeteria kind — I mean real, carefully crafted coffee. I started brewing my own at home. First a French
          press, then an AeroPress, then a pour-over. Before I knew it, I was reading about beans from Ethiopia like people read poetry. By
          graduation, while my friends scrambled for internships, I bought my first espresso machine. I started small. A stand outside the metro
          station. Rain or shine, I was there with my thermoses and hand grinders, chatting with tired commuters and giving them a reason to
          smile before their 9-to-5. It wasn’t glamorous, but every day, I was doing what I loved — and people noticed. One morning, a guy in a suit
          with the Gulugulu Company logo on his backpack stopped for a flat white. He came back the next day. And the day after that. Eventually,
          he asked if I’d ever thought about running a coffee bar… inside an office. That’s how it started. Today, I’m the head barista at Gulugulu
          HQ. My team serves hundreds of employees every day. I train new hires, select our beans, design seasonal menus, and yes — I still make the
          drinks myself. Because that’s where the magic is. In the foam, the smile, the moment someone says, “This made my day.” I don’t wear a
          suit. I don’t have a LinkedIn title that’ll blow your mind. But I love my job. I get paid well to do something I’m passionate about, and I’m surrounded by people who appreciate it. Success doesn’t always look
          like what you imagined in school. Sometimes, it smells like freshly ground coffee and starts at 6:30 AM — with joy. And honestly? I
          wouldn’t trade it for anything.`,
    image: "string",
    created_at: "2025-08-06T19:56:45.650Z",
    date_of_graduation: "2025-08-06",
    links: {
      instagram: "https://instagram.com/example",
      telegram: "https://t.me/example",
      facebook: "https://facebook.com/example",
    },
  },
  {
    id: 4,
    full_name: "Пархомчук Віталій",
    text: `If someone had told me five years ago that I’d find true fulfillment making cappuccinos at a giant tech firm, I would’ve laughed. Back
          then, I was drowning in lectures, assignments, and student loans, trying to earn a business degree. I was convinced I needed a fancy
          title, a corner office, and a shiny LinkedIn profile to feel “successful.” But life had other plans. University taught me many
          things — economics, management theory, a bit of coding — but what stuck most was what I did between classes. I always had a cup of
          coffee in hand. Not the burned cafeteria kind — I mean real, carefully crafted coffee. I started brewing my own at home. First a French
          press, then an AeroPress, then a pour-over. Before I knew it, I was reading about beans from Ethiopia like people read poetry. By
          graduation, while my friends scrambled for internships, I bought my first espresso machine. I started small. A stand outside the metro
          station. Rain or shine, I was there with my thermoses and hand grinders, chatting with tired commuters and giving them a reason to
          smile before their 9-to-5. It wasn’t glamorous, but every day, I was doing what I loved — and people noticed. One morning, a guy in a suit
          with the Gulugulu Company logo on his backpack stopped for a flat white. He came back the next day. And the day after that. Eventually,
          he asked if I’d ever thought about running a coffee bar… inside an office. That’s how it started. Today, I’m the head barista at Gulugulu
          HQ. My team serves hundreds of employees every day. I train new hires, select our beans, design seasonal menus, and yes — I still make the
          drinks myself. Because that’s where the magic is. In the foam, the smile, the moment someone says, “This made my day.” I don’t wear a
          suit. I don’t have a LinkedIn title that’ll blow your mind. But I love my job. I get paid well to do something I’m passionate about, and I’m surrounded by people who appreciate it. Success doesn’t always look
          like what you imagined in school. Sometimes, it smells like freshly ground coffee and starts at 6:30 AM — with joy. And honestly? I
          wouldn’t trade it for anything.`,
    image: "string",
    created_at: "2020-08-06T19:56:45.650Z",
    date_of_graduation: "2020-08-06",
    links: {
      instagram: "https://instagram.com/example",
      telegram: "https://t.me/example",
      facebook: "https://facebook.com/example",
    },
  },
  {
    id: 5,
    full_name: "Пархомчук Віталій",
    text: `If someone had told me five years ago that I’d find true fulfillment making cappuccinos at a giant tech firm, I would’ve laughed. Back
          then, I was drowning in lectures, assignments, and student loans, trying to earn a business degree. I was convinced I needed a fancy
          title, a corner office, and a shiny LinkedIn profile to feel “successful.” But life had other plans. University taught me many
          things — economics, management theory, a bit of coding — but what stuck most was what I did between classes. I always had a cup of
          coffee in hand. Not the burned cafeteria kind — I mean real, carefully crafted coffee. I started brewing my own at home. First a French
          press, then an AeroPress, then a pour-over. Before I knew it, I was reading about beans from Ethiopia like people read poetry. By
          graduation, while my friends scrambled for internships, I bought my first espresso machine. I started small. A stand outside the metro
          station. Rain or shine, I was there with my thermoses and hand grinders, chatting with tired commuters and giving them a reason to
          smile before their 9-to-5. It wasn’t glamorous, but every day, I was doing what I loved — and people noticed. One morning, a guy in a suit
          with the Gulugulu Company logo on his backpack stopped for a flat white. He came back the next day. And the day after that. Eventually,
          he asked if I’d ever thought about running a coffee bar… inside an office. That’s how it started. Today, I’m the head barista at Gulugulu
          HQ. My team serves hundreds of employees every day. I train new hires, select our beans, design seasonal menus, and yes — I still make the
          drinks myself. Because that’s where the magic is. In the foam, the smile, the moment someone says, “This made my day.” I don’t wear a
          suit. I don’t have a LinkedIn title that’ll blow your mind. But I love my job. I get paid well to do something I’m passionate about, and I’m surrounded by people who appreciate it. Success doesn’t always look
          like what you imagined in school. Sometimes, it smells like freshly ground coffee and starts at 6:30 AM — with joy. And honestly? I
          wouldn’t trade it for anything.`,
    image: "string",
    created_at: "2022-08-06T19:56:45.650Z",
    date_of_graduation: "2023-08-06",
    links: {
      instagram: "https://instagram.com/example",
      telegram: "https://t.me/example",
      facebook: "https://facebook.com/example",
    },
  },
  {
    id: 6,
    full_name: "Пархомчук Віталій",
    text: `If someone had told me five years ago that I’d find true fulfillment making cappuccinos at a giant tech firm, I would’ve laughed. Back
          then, I was drowning in lectures, assignments, and student loans, trying to earn a business degree. I was convinced I needed a fancy
          title, a corner office, and a shiny LinkedIn profile to feel “successful.” But life had other plans. University taught me many
          things — economics, management theory, a bit of coding — but what stuck most was what I did between classes. I always had a cup of
          coffee in hand. Not the burned cafeteria kind — I mean real, carefully crafted coffee. I started brewing my own at home. First a French
          press, then an AeroPress, then a pour-over. Before I knew it, I was reading about beans from Ethiopia like people read poetry. By
          graduation, while my friends scrambled for internships, I bought my first espresso machine. I started small. A stand outside the metro
          station. Rain or shine, I was there with my thermoses and hand grinders, chatting with tired commuters and giving them a reason to
          smile before their 9-to-5. It wasn’t glamorous, but every day, I was doing what I loved — and people noticed. One morning, a guy in a suit
          with the Gulugulu Company logo on his backpack stopped for a flat white. He came back the next day. And the day after that. Eventually,
          he asked if I’d ever thought about running a coffee bar… inside an office. That’s how it started. Today, I’m the head barista at Gulugulu
          HQ. My team serves hundreds of employees every day. I train new hires, select our beans, design seasonal menus, and yes — I still make the
          drinks myself. Because that’s where the magic is. In the foam, the smile, the moment someone says, “This made my day.” I don’t wear a
          suit. I don’t have a LinkedIn title that’ll blow your mind. But I love my job. I get paid well to do something I’m passionate about, and I’m surrounded by people who appreciate it. Success doesn’t always look
          like what you imagined in school. Sometimes, it smells like freshly ground coffee and starts at 6:30 AM — with joy. And honestly? I
          wouldn’t trade it for anything.`,
    image: "string",
    created_at: "2025-08-06T19:56:45.650Z",
    date_of_graduation: "2021-08-06",
    links: {
      instagram: "https://instagram.com/example",
      telegram: "https://t.me/example",
      facebook: "https://facebook.com/example",
    },
  },
  {
    id: 7,
    full_name: "Пархомчук Віталій",
    text: `If someone had told me five years ago that I’d find true fulfillment making cappuccinos at a giant tech firm, I would’ve laughed. Back
          then, I was drowning in lectures, assignments, and student loans, trying to earn a business degree. I was convinced I needed a fancy
          title, a corner office, and a shiny LinkedIn profile to feel “successful.” But life had other plans. University taught me many
          things — economics, management theory, a bit of coding — but what stuck most was what I did between classes. I always had a cup of
          coffee in hand. Not the burned cafeteria kind — I mean real, carefully crafted coffee. I started brewing my own at home. First a French
          press, then an AeroPress, then a pour-over. Before I knew it, I was reading about beans from Ethiopia like people read poetry. By
          graduation, while my friends scrambled for internships, I bought my first espresso machine. I started small. A stand outside the metro
          station. Rain or shine, I was there with my thermoses and hand grinders, chatting with tired commuters and giving them a reason to
          smile before their 9-to-5. It wasn’t glamorous, but every day, I was doing what I loved — and people noticed. One morning, a guy in a suit
          with the Gulugulu Company logo on his backpack stopped for a flat white. He came back the next day. And the day after that. Eventually,
          he asked if I’d ever thought about running a coffee bar… inside an office. That’s how it started. Today, I’m the head barista at Gulugulu
          HQ. My team serves hundreds of employees every day. I train new hires, select our beans, design seasonal menus, and yes — I still make the
          drinks myself. Because that’s where the magic is. In the foam, the smile, the moment someone says, “This made my day.” I don’t wear a
          suit. I don’t have a LinkedIn title that’ll blow your mind. But I love my job. I get paid well to do something I’m passionate about, and I’m surrounded by people who appreciate it. Success doesn’t always look
          like what you imagined in school. Sometimes, it smells like freshly ground coffee and starts at 6:30 AM — with joy. And honestly? I
          wouldn’t trade it for anything.`,
    image: "string",
    created_at: "2025-08-06T19:56:45.650Z",
    date_of_graduation: "2025-08-06",
    links: {
      instagram: "https://instagram.com/example",
      telegram: "https://t.me/example",
      facebook: "https://facebook.com/example",
    },
  },
];

const yearColor = [
  "#F42272",
  "#FFA500",
  "#63C132",
  "#89A6FB",
  "#1400cc",
  "#c49a02",
  "#FF57BB",
  "#7f03fc",
  "#c40202",
  "#6EFAFB",
];

const getColor = (year: number) => {
  const lastDigit = year % 10;
  const color = `bg-[${yearColor[lastDigit]}]`;
  return color;
};

function RenderAlumniList() {
  return <div className=""></div>;
}

export function AlumniListSection() {
  return (
    <div className="container-base">
      {/* <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 mt-24">
        {Array.from({ length: 2024 - 2000 + 1 }, (_, i) => {
          const year = 2024 - i;
          return <BlackAndWhiteButton>{year}</BlackAndWhiteButton>;
        })}
      </div> */}
      <div className="relative before:absolute before:bottom-0 before:w-full before:h-0.5 before:bg-white">
        <Title className="mt-8">ВИПУСК 2024</Title>
      </div>
      <div className="grid grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
        <AlumniCard />
        <AlumniCard />
        <AlumniCard />
        <AlumniCard />
      </div>
      <div className="relative before:absolute before:bottom-0 before:w-full before:h-0.5 before:bg-white">
        <Title className="mt-8">ВИПУСК 2023</Title>
      </div>
      <div className="grid grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
        <AlumniCard />
        <AlumniCard />
        <AlumniCard />
        <AlumniCard />
        <AlumniCard />
        <AlumniCard />
      </div>
      <div className="relative before:absolute before:bottom-0 before:w-full before:h-0.5 before:bg-white">
        <Title className="mt-8">ВИПУСК 2022</Title>
      </div>
      <div className="grid grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
        <AlumniCard />
        <AlumniCard />
        <AlumniCard />
        <AlumniCard />
      </div>
    </div>
  );
}
