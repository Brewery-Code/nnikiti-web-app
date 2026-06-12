import clsx from "clsx";

interface DeptPhotoProps {
  src?: string | null;
  alt?: string;
  className?: string;
}

/**
 * Department photo with a graceful empty state: renders the real image when
 * available, otherwise a minimalist photo icon (no random placeholder photos).
 */
export function DeptPhoto({ src, alt = "", className }: DeptPhotoProps) {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" className={className} />;
  }

  return (
    <div className={clsx("flex items-center justify-center bg-white/[0.015]", className)} aria-hidden>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-16 w-16 text-white/15"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
    </div>
  );
}
