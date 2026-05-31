import { useState } from "react";
import clsx from "clsx";
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

  return (
    <>
      <button
        type="button"
        onClick={() => setIsDescriptionOpen(true)}
        className={clsx(
          className,
          "spec-card grad-border group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[20px] bg-surface p-5 text-left backdrop-blur-xl sm:p-6"
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-50 blur-2xl transition-opacity group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(166,132,255,0.30) 0%, transparent 70%)",
          }}
        />

        <div className="relative flex items-center gap-4">
          <div className="grad-border flex-shrink-0 overflow-hidden rounded-full bg-[#111] p-[2px]">
            <img
              className="h-16 w-16 rounded-full object-cover"
              src={alumni.image || profilePlaceholder}
              alt={alumni.full_name}
              onError={(e) => { e.currentTarget.src = profilePlaceholder; }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-400">
              Випуск {getYear(alumni.date_of_graduation)}
            </span>
            <h3
              className="font-display mt-0.5 truncate font-bold text-primary"
              style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}
            >
              {alumni.full_name}
            </h3>
          </div>
        </div>

        <div className="my-5 h-px w-full bg-gradient-to-r from-violet-500/40 via-blue-500/20 to-transparent" />

        <p className="line-clamp-2 text-[14px] text-primary/60">
          {[alumni.position, alumni.workplace].filter(Boolean).join(" • ")}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {alumni.major && (
            <span
              className="font-display rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.04em] text-primary"
              style={{
                background:
                  "linear-gradient(135deg, rgba(166,132,255,0.20) 0%, rgba(81,162,255,0.20) 100%)",
                border: "1px solid rgba(166,132,255,0.30)",
              }}
            >
              {alumni.major}
            </span>
          )}
          {alumni.degree && (
            <span className="font-display rounded-full border border-ui bg-surface-md px-3 py-1 text-[10px] font-bold uppercase tracking-[0.04em] text-primary/70">
              {alumni.degree}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between text-[12px] font-semibold text-muted transition-colors group-hover:text-primary">
          Дізнатись більше
          <span aria-hidden className="text-violet-400 transition-transform group-hover:translate-x-1">
            →
          </span>
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
