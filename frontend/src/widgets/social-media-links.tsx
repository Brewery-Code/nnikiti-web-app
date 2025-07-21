import { useContactsData } from "@/shared/hooks";
import { SocialLinkButtonGlassy } from "@/shared/ui";
import clsx from "clsx";

interface SocialMediaLinksProps {
  className?: string;
}

export function SocialMediaLinks({ className }: SocialMediaLinksProps) {
  const { socialMediaLinks } = useContactsData();
  return (
    <div
      className={clsx("flex flex-wrap justify-center gap-4 mt-8", className)}
    >
      <SocialLinkButtonGlassy
        type="telegram"
        link={socialMediaLinks.telegram}
      />
      <SocialLinkButtonGlassy
        type="instagram"
        link={socialMediaLinks.instagram}
      />
      <SocialLinkButtonGlassy
        type="facebook"
        link={socialMediaLinks.facebook}
      />
      <SocialLinkButtonGlassy type="tiktok" link={socialMediaLinks.tikTok} />
      <SocialLinkButtonGlassy type="youtube" link={socialMediaLinks.youtube} />
    </div>
  );
}
