import { useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import type { Alumni } from "../types";
import { AlumniModal } from "./alumni-modal";
import { getYear } from "../alumni-list-section";
import { profilePlaceholder } from "@/shared/icons";

interface AlumniCardProps {
  className?: string;
  alumni: Alumni;
}

export function AlumniCard({ alumni, className }: AlumniCardProps) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const { t } = useTranslation("alumni");

  return (
    <>
      <button
        type="button"
        onClick={() => setIsDescriptionOpen(true)}
        className={clsx(
          className,
          "group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[18px] border border-white/[0.07] bg-[#0d0e1a] text-left transition-all duration-300 hover:border-violet-500/30 hover:shadow-[0_8px_32px_rgba(124,58,237,0.14)]"
        )}
      >
        {/* Header */}
        <div
          className="relative flex items-center gap-3.5 px-4 py-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.13) 0%, rgba(59,130,246,0.07) 100%)",
          }}
        >
          <img
            className="h-12 w-12 flex-shrink-0 rounded-[10px] object-cover ring-1 ring-white/10"
            src={alumni.image || profilePlaceholder}
            alt={alumni.full_name}
            onError={(e) => { e.currentTarget.src = profilePlaceholder; }}
          />

          <div className="min-w-0 flex-1">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-violet-400/80">
              {t("alumniCard.graduation")} {getYear(alumni.date_of_graduation)}
            </span>
            <h3
              className="font-display mt-0.5 truncate font-bold text-primary"
              style={{ fontSize: "0.95rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}
            >
              {alumni.full_name}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 px-4 py-3.5">
          {(alumni.position || alumni.workplace) && (
            <p className="text-[13px] leading-snug text-white/50">
              {[alumni.position, alumni.workplace].filter(Boolean).join(" · ")}
            </p>
          )}

          <div className="flex flex-wrap gap-1.5">
            {alumni.major && (
              <span
                className="rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-violet-300/80"
                style={{
                  background: "rgba(139,92,246,0.10)",
                  border: "1px solid rgba(139,92,246,0.22)",
                }}
              >
                {alumni.major}
              </span>
            )}
            {alumni.degree && (
              <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white/35">
                {alumni.degree}
              </span>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-white/[0.05] pt-3 text-[11px] font-semibold text-white/30 transition-colors duration-200 group-hover:text-white/60">
            {t("alumniCard.learnMore")}
            <span className="text-violet-400/60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-violet-400">
              →
            </span>
          </div>
        </div>
      </button>

      <AlumniModal
        isOpen={isDescriptionOpen}
        toggleModal={() => setIsDescriptionOpen(false)}
        alumni={alumni}
      />
    </>
  );
}
