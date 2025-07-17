import clsx from "clsx";
import type { Contact, Location } from "./types";

interface ContactBlockProps {
  className?: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  links: Contact[] | Location[];
}

export default function ContactBlock({
  className,
  icon,
  title,
  description,
  links,
}: ContactBlockProps) {
  function isContactArray(data: Contact[] | Location[]): data is Contact[] {
    return "position" in data[0];
  }

  function isLocationArray(data: Contact[] | Location[]): data is Location[] {
    return "address" in data[0];
  }

  const renderContacts = () => {
    if (isContactArray(links)) {
      return links.map((contact, index) => (
        <li key={index}>
          {contact.position} – {contact.name}:{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>{" "}
          {contact.audience && `(${contact.audience})`}
        </li>
      ));
    }

    if (isLocationArray(links)) {
      return links.map((location, index) => (
        <li key={index}>
          {location.title}:{" "}
          <a
            href={location.addressLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {location.address}
          </a>
        </li>
      ));
    }
  };

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 h-auto p-4 rounded-xl bg-fixed bg-[linear-gradient(135deg,_rgba(30,39,255,0.1)_0%,_rgba(246,0,255,0.1)_33%,_rgba(255,141,0,0.1)_66%,_rgba(0,0,0,0.2)_100%)]",
        className
      )}
    >
      <div className="flex items-center gap-2 text-[18px] font-semibold">
        {icon}
        {title}
      </div>
      <p className="grow">{description}</p>
      <ul className="flex flex-col gap-1 text-gray-400">{renderContacts()}</ul>
    </div>
  );
}
