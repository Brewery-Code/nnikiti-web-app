import { publicRqClient, rqClient } from "@/shared/api/instance";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface MenuData {
  title: string;
  link: string;
}

export default function UserMenu() {
  const userData = rqClient.useQuery("get", "/users/me/").data;
  const userRole = publicRqClient.useQuery("get", "/users/role/").data;

  const studentMenuData: MenuData[] = [
    {
      title: "Schedule",
      link: "https://desk.nuwm.edu.ua/cgi-bin/timetable.cgi",
    },
    {
      title: "Journal",
      link: "https://desk.nuwm.edu.ua/cgi-bin/kaf.cgi?n=999&t=98",
    },
  ];

  const teacherMenuData: MenuData[] = [
    {
      title: "Schedule",
      link: "https://desk.nuwm.edu.ua/cgi-bin/timetable.cgi",
    },
    {
      title: "Journal",
      link: "https://desk.nuwm.edu.ua/cgi-bin/kaf.cgi?n=999&t=98",
    },
  ];

  const [isListOpen, setIsListOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      setHeight(listRef.current.scrollHeight);
    }
  }, [isListOpen]);

  return (
    <div
      className="relative h-8 rounded-4xl outline-2 outline-white"
      onMouseEnter={() => setIsListOpen(true)}
      onMouseLeave={() => setIsListOpen(false)}
    >
      <div className="flex items-center gap-2 h-full py-1 px-2 cursor-pointer">
        <img
          className="rounded-full w-full h-full object-cover"
          src={userData?.avatar}
          alt=""
        />
        <span className="text-ellipsis leading-6 font-bold">
          {userData?.first_name}
        </span>
      </div>
      <div
        className={clsx(
          "overflow-hidden absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-[height,opacity] duration-200 ease-in",
          isListOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        style={{ height: isListOpen ? height : 0 }}
        ref={listRef}
      >
        <ul
          className="overflow-hidden flex flex-col gap-1 w-full rounded-2xl bg-black text-xl font-semibold border-2
        first:pt-2 last-child:pb-2"
        >
          {userRole?.role === "ST"
            ? studentMenuData.map((item) => (
                <Link className="px-2 hover:bg-gray-800" to={item.link}>
                  {item.title}
                </Link>
              ))
            : teacherMenuData.map((item) => (
                <Link className="px-2 hover:bg-gray-600" to={item.link}>
                  {item.title}
                </Link>
              ))}
        </ul>
      </div>
    </div>
  );
}
