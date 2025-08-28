import clsx from "clsx";
import { useState } from "react";
import { FacebookIcon, InstagramIcon, TelegramIcon, TikTokIcon, YouTubeIcon } from "@/shared/icons";

type SocialType = "facebook" | "telegram" | "instagram" | "tiktok" | "youtube";

interface SocialLinkButtonProps {
  className?: string;
  type: SocialType;
  link: string;
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
    bg: "bg-[#0163E0]",
    label: "Facebook",
    icon: <FacebookIcon className="h-8 w-8" />,
  },
  telegram: {
    bg: "bg-[#24A1DE]",
    label: "Telegram",
    icon: <TelegramIcon className="h-8 w-8" />,
  },
  instagram: {
    bg: "bg-[linear-gradient(to_right,#833ab4,#fd1d1d,#fcb045)]",
    label: "Instagram",
    icon: <InstagramIcon className="h-8 w-8" />,
  },
  tiktok: {
    bg: "bg-[#222111]",
    label: "TikTok",
    icon: <TikTokIcon className="h-8 w-8" />,
  },
  youtube: {
    bg: "bg-[#FF0000]",
    label: "YouTube",
    icon: <YouTubeIcon className="h-8 w-8" />,
  },
};

export default function SocialLinkButtonGlassy({ className, type, link }: SocialLinkButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { bg, label, icon } = SOCIAL_STYLES[type];

  return (
    <a
      href={link}
      className={clsx(
        "relative z-10 flex h-[44px] w-[44px] cursor-pointer items-center rounded-[14px] border border-white/20 bg-[rgba(255,255,255,0.2)] p-1.5 shadow-md backdrop-blur-md",
        "transition-[border-color] duration-300 ease-in hover:border-transparent",
        className
      )}
      style={{}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={clsx(
          `absolute inset-0 -z-10 ${bg} rounded-[14px] transition-[opacity,scale] duration-300 ease-in`,
          isHovered ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
      />
      <div
        className={clsx(
          `absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 rounded-xl p-1.5 font-bold ${bg}`,
          "transition-[opacity,scale] duration-200 ease-in",
          isHovered ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
      >
        {label}
      </div>
      {icon}
    </a>
  );
}
