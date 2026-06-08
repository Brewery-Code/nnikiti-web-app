import clsx from "clsx";
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
    hoverBorder: string;
    hoverGlow: string;
    label: string;
    icon: React.ReactNode;
  }
> = {
  facebook: {
    hoverBorder: "hover:border-[#0163E0]/60",
    hoverGlow: "hover:shadow-[0_0_16px_rgba(1,99,224,0.35)]",
    label: "Facebook",
    icon: <FacebookIcon className="h-[22px] w-[22px]" />,
  },
  telegram: {
    hoverBorder: "hover:border-[#24A1DE]/60",
    hoverGlow: "hover:shadow-[0_0_16px_rgba(36,161,222,0.35)]",
    label: "Telegram",
    icon: <TelegramIcon className="h-[22px] w-[22px]" />,
  },
  instagram: {
    hoverBorder: "hover:border-pink-500/60",
    hoverGlow: "hover:shadow-[0_0_16px_rgba(253,29,29,0.3)]",
    label: "Instagram",
    icon: <InstagramIcon className="h-[22px] w-[22px]" />,
  },
  tiktok: {
    hoverBorder: "hover:border-white/40",
    hoverGlow: "hover:shadow-[0_0_16px_rgba(255,255,255,0.15)]",
    label: "TikTok",
    icon: <TikTokIcon className="h-[22px] w-[22px]" />,
  },
  youtube: {
    hoverBorder: "hover:border-[#FF0000]/60",
    hoverGlow: "hover:shadow-[0_0_16px_rgba(255,0,0,0.35)]",
    label: "YouTube",
    icon: <YouTubeIcon className="h-[22px] w-[22px]" />,
  },
};

export default function SocialLinkButtonGlassy({ className, type, link }: SocialLinkButtonProps) {
  const { hoverBorder, hoverGlow, label, icon } = SOCIAL_STYLES[type];

  return (
    <a
      href={link}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "flex h-[44px] w-[44px] items-center justify-center rounded-[14px]",
        "border border-white/15 bg-white/[0.07] backdrop-blur-md",
        "text-white/70 transition-all duration-200",
        "hover:bg-white/[0.12] hover:text-white",
        hoverBorder,
        hoverGlow,
        className
      )}
    >
      {icon}
    </a>
  );
}
