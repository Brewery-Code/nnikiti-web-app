import clsx from "clsx";

interface ContactBlockProps {
  className?: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

interface ContactBlockItemProps {
  className?: string;
  title: string;
  subtitle: string;
}

const ContactBlockComponent = ({
  className,
  icon,
  title,
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
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <p className="">{description}</p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
};

const ContactBlockItem = ({
  title,
  subtitle,
  className,
}: ContactBlockItemProps) => {
  return (
    <div
      className={clsx(
        className,
        "grid grid-cols-[70%_30%] content-start",
        className
      )}
    >
      <p className="text-sm text-gray-300">{title}</p>
      <p className="font-medium">{subtitle}</p>
    </div>
  );
};

type ContactBlockType = typeof ContactBlockComponent & {
  Item: typeof ContactBlockItem;
};

const ContactBlock = ContactBlockComponent as ContactBlockType;
ContactBlock.Item = ContactBlockItem;

export default ContactBlock;
