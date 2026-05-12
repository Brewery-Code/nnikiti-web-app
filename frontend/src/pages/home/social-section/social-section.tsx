import { useState, type ReactNode } from "react";
import clsx from "clsx";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";

const SOCIALS = [
  { icon: "ig", label: "Instagram", href: "#" },
  { icon: "fb", label: "Facebook", href: "#" },
  { icon: "yt", label: "YouTube", href: "#" },
  { icon: "tg", label: "Telegram", href: "#" },
];

const ICONS: Record<string, ReactNode> = {
  ig: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  ),
  fb: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  yt: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75,15.02 15.5,12 9.75,8.98" fill="white" />
    </svg>
  ),
  tg: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z" />
    </svg>
  ),
};

function SocialLink({ icon, label, href }: { icon: string; label: string; href: string }) {
  const [h, setH] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="flex items-center"
      style={{
        gap: 8,
        padding: "8px 16px",
        borderRadius: 10,
        background: h ? "rgba(166,132,255,0.1)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${h ? "rgba(166,132,255,0.25)" : "rgba(255,255,255,0.07)"}`,
        fontSize: 13,
        fontWeight: 500,
        color: h ? "#fff" : "rgba(255,255,255,0.65)",
        transition: "all 180ms",
      }}
    >
      <span style={{ color: h ? "#a684ff" : "rgba(255,255,255,0.55)" }}>
        {ICONS[icon]}
      </span>
      {label}
    </a>
  );
}

export default function SocialSection({ className = "" }: { className?: string }) {
  return (
    <section
      className={clsx(className)}
      style={{
        padding: "40px 0",
        background: "#0a0b12",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Reveal
        mode="fade"
        amount={0.3}
        className="container-v2 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
      >
        <span
          className="flex-shrink-0"
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          Соцмережі
        </span>
        <div
          className="hidden sm:block flex-1"
          style={{ height: 1, background: "rgba(255,255,255,0.5)" }}
        />
        <Stagger className="flex flex-wrap gap-2 sm:gap-2.5" stagger={0.07}>
          {SOCIALS.map((s) => (
            <StaggerItem key={s.icon} mode="up">
              <SocialLink icon={s.icon} label={s.label} href={s.href} />
            </StaggerItem>
          ))}
        </Stagger>
      </Reveal>
    </section>
  );
}
