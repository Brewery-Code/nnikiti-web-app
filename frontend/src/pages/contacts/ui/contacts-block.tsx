import clsx from "clsx";

interface ContactBlockProps {
  className?: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  children: React.ReactNode;
}

interface ContactBlockItemProps {
  className?: string;
  label: string;
  contact: string;
  contactClassName?: string;
}

const ContactBlockComponent = ({
  className,
  icon,
  label,
  description,
  children,
}: ContactBlockProps) => {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4 h-auto p-4 rounded-xl bg-fixed bg-[linear-gradient(135deg,_rgba(30,39,255,0.1)_0%,_rgba(246,0,255,0.1)_33%,_rgba(255,141,0,0.1)_66%,_rgba(0,0,0,0.2)_100%)]",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {icon}
        <h2 className="text-2xl font-semibold">{label}</h2>
      </div>
      <p className="">{description}</p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
};

const ContactBlockItem = ({
  label,
  contact,
  className,
  contactClassName,
}: ContactBlockItemProps) => {
  return (
    <div className={clsx("flex justify-between gap-2", className)}>
      <p className="text-sm text-gray-300">{label}</p>
      <p className={clsx("font-medium", contactClassName)}>
        <span
          className="relative cursor-pointer
          before:absolute before:top-[calc(100%+1px)] before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-[1px] before:bg-gray-300 
          before:transition-[width] before:duration-200 before:ease-in-out hover:before:w-full"
        >
          {contact}
        </span>
      </p>
    </div>
  );
};

type ContactBlockType = typeof ContactBlockComponent & {
  Item: typeof ContactBlockItem;
};

export const ContactBlock = ContactBlockComponent as ContactBlockType;
ContactBlock.Item = ContactBlockItem;
