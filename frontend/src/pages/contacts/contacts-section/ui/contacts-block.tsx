import clsx from "clsx";

interface ContactBlockProps {
  className?: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  children: React.ReactNode;
}

interface ContactListProps {
  className?: string;
  label: string;
  contactClassName?: string;
  children: React.ReactNode;
}

interface ContactsProps {
  className?: string;
  contacts: string[];
}

function ContactBlockComponent({
  className,
  icon,
  label,
  description,
  children,
}: ContactBlockProps) {
  return (
    <div
      className={clsx(
        "flex h-auto flex-col gap-4 rounded-xl bg-[linear-gradient(135deg,_rgba(30,39,255,0.1)_0%,_rgba(246,0,255,0.1)_50%,_rgba(255,141,0,0.1)_100%)] bg-fixed p-4 shadow-xl",
        "gradient-animation",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="text-2xl font-semibold">{label}</h2>
      </div>
      <p className="">{description}</p>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function ContactsListItem({ label, className, contactClassName, children }: ContactListProps) {
  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      <p className="text-sm text-gray-300">{label}</p>
      <div className={clsx("font-medium", contactClassName)}>{children}</div>
    </div>
  );
}

function Contacts({ contacts }: ContactsProps) {
  return (
    <ul className="flex flex-wrap gap-x-2 gap-y-1">
      {contacts.map((item, index) => (
        <li key={index}>
          <span className="relative cursor-pointer before:absolute before:top-[calc(100%+1px)] before:left-1/2 before:h-[1px] before:w-0 before:-translate-x-1/2 before:bg-gray-300 before:transition-[width] before:duration-200 before:ease-in-out hover:before:w-full">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

type ContactBlockType = typeof ContactBlockComponent & {
  List: typeof ContactsListItem;
  Contacts: typeof Contacts;
};

export const ContactBlock = ContactBlockComponent as ContactBlockType;
ContactBlock.List = ContactsListItem;
ContactBlock.Contacts = Contacts;
