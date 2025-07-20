import { SocialLinkButtonGlassy } from "@/shared/ui";

export function SocialMediaLinks() {
  return (
    <div className="flex gap-4 mt-8">
      <SocialLinkButtonGlassy type="telegram" link="#" />
      <SocialLinkButtonGlassy type="instagram" link="#" />
      <SocialLinkButtonGlassy type="facebook" link="#" />
      <SocialLinkButtonGlassy type="tiktok" link="#" />
      <SocialLinkButtonGlassy type="youtube" link="#" />
    </div>
  );
}
