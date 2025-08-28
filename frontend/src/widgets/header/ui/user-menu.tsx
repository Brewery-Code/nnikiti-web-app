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
      <div className="flex h-full cursor-pointer items-center gap-2 px-2 py-1">
        <img className="h-full w-full rounded-full object-cover" src={userData?.avatar} alt="" />
        <span className="leading-6 font-bold text-ellipsis">{userData?.first_name}</span>
      </div>
      <div
        className={clsx(
          "absolute top-full left-1/2 -translate-x-1/2 overflow-hidden pt-4 transition-[height,opacity] duration-200 ease-in",
          isListOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        style={{ height: isListOpen ? height : 0 }}
        ref={listRef}
      >
        <ul className="last-child:pb-2 flex w-full flex-col gap-1 overflow-hidden rounded-2xl border-2 bg-black text-xl font-semibold first:pt-2">
          {userRole?.role === "ST"
            ? studentMenuData.map((item, index) => (
                <Link className="px-2 hover:bg-gray-800" key={index} to={item.link}>
                  {item.title}
                </Link>
              ))
            : teacherMenuData.map((item, index) => (
                <Link className="px-2 hover:bg-gray-600" key={index} to={item.link}>
                  {item.title}
                </Link>
              ))}
        </ul>
      </div>
    </div>
  );
}
