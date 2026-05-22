import clsx from "clsx";
import { clampVw } from "@/shared/lib";

interface ContactBlockProps {
  className?: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  children: React.ReactNode;
  accent?: string;
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
  accent = "#3b82f6",
}: ContactBlockProps) {
  return (
    <div
      className={clsx(
        "relative flex flex-col gap-fluid-md overflow-hidden rounded-fluid-md border border-white/[0.13] bg-white/[0.04] p-fluid-md backdrop-blur-sm",
        className
      )}
    >
      {/* Accent glow top-left */}
      <div
        className="pointer-events-none absolute rounded-full blur-3xl opacity-30"
        style={{ background: accent, top: `calc(-1 * ${clampVw(24, 48, 48)})`, left: `calc(-1 * ${clampVw(24, 48, 48)})`, width: clampVw(64, 128, 128), height: clampVw(64, 128, 128) }}
      />

      {/* Header */}
      <div className="flex items-center gap-fluid-sm">
        <div
          className="flex flex-shrink-0 items-center justify-center rounded-fluid-md"
          style={{ background: `${accent}20`, color: accent, width: clampVw(28, 40, 40), height: clampVw(28, 40, 40) }}
        >
          {icon}
        </div>
        <div>
          <h2 className="text-fluid-xl font-bold text-white">{label}</h2>
          <p className="text-fluid-xs text-gray-500">{description}</p>
        </div>
      </div>

      {/* Accent line */}
      <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${accent}60, transparent)` }} />

      <div className="relative flex flex-col gap-fluid-md">{children}</div>
    </div>
  );
}

function ContactsListItem({ label, className, contactClassName, children }: ContactListProps) {
  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      <p className="text-fluid-xs font-semibold uppercase tracking-wider text-gray-500">{label}</p>
      <div className={clsx("text-fluid-sm", contactClassName)}>{children}</div>
    </div>
  );
}

function Contacts({ contacts }: ContactsProps) {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1">
      {contacts.map((item, index) => (
        <li key={index}>
          <span className="relative cursor-pointer text-gray-300 transition-colors duration-200 hover:text-white before:absolute before:bottom-0 before:left-0 before:h-px before:w-0 before:bg-white before:transition-[width] before:duration-200 hover:before:w-full">
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

