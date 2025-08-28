import clsx from "clsx";
import { useRef, useState } from "react";
import { FacebookIcon, InstagramIcon, TelegramIcon, TikTokIcon, YouTubeIcon } from "@/shared/icons";

type SocialType = "facebook" | "telegram" | "instagram" | "tiktok" | "youtube";

interface SocialLinkButtonProps {
  className?: string;
  type: SocialType;
}

const SOCIAL_STYLES: Record<
  SocialType,
  {
    bg: string;
    label: string;
    icon: React.ReactNode;
  }
> = {
  facebook: {
    bg: "#0163E0",
    label: "Facebook",
    icon: <FacebookIcon className="h-8 w-8" />,
  },
  telegram: {
    bg: "#24A1DE",
    label: "Telegram",
    icon: <TelegramIcon className="h-8 w-8" />,
  },
  instagram: {
    bg: "linear-gradient(to right,#833ab4,#fd1d1d,#fcb045)",
    label: "Instagram",
    icon: <InstagramIcon className="h-8 w-8" />,
  },
  tiktok: {
    bg: "#000000",
    label: "TikTok",
    icon: <TikTokIcon className="h-8 w-8" />,
  },
  youtube: {
    bg: "#FF0000",
    label: "YouTube",
    icon: <YouTubeIcon className="h-8 w-8" />,
  },
};

export default function SocialLinkButton({ className, type }: SocialLinkButtonProps) {
  const [hovered, setHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const getButtonWidth = () => buttonRef.current?.scrollWidth ?? 42;

  const { bg, label, icon } = SOCIAL_STYLES[type];

  return (
    <button
      className={clsx(
        "flex h-[44px] w-[44px] cursor-pointer items-center gap-2 overflow-hidden rounded-full p-1.5",
        "transition-[width] duration-300 ease-in",
        className
      )}
      style={{
        width: hovered ? getButtonWidth() - 14 : 44,
        background: bg,
      }}
      ref={buttonRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-center">{icon}</div>
      <span
        className={clsx(
          "text-[1.2em] font-semibold",
          "transition-transform duration-300 ease-in",
          hovered ? "translate-x-0" : "translate-x-5"
        )}
      >
        {label}
      </span>
    </button>
  );
}
