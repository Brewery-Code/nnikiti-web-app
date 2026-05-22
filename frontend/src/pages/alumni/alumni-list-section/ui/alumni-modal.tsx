import { ModalWrapper } from "@/widgets";
import type { Alumni } from "../types";
import { profilePlaceholder } from "@/shared/icons";

interface AlumniModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  alumni: Alumni;
}

const SOCIAL_ICONS: Record<string, string> = {
  linkedin: "in",
  github: "gh",
  twitter: "tw",
  facebook: "fb",
  instagram: "ig",
  telegram: "tg",
};

export function AlumniModal({ isOpen, toggleModal, alumni }: AlumniModalProps) {
  const socialEntries = alumni.links ? Object.entries(alumni.links) : [];

  return (
    <ModalWrapper isModalOpen={isOpen} toggleModal={toggleModal}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="mx-auto flex-shrink-0 sm:mx-0">
          <div
            className="overflow-hidden rounded-[18px]"
            style={{
              background: "linear-gradient(135deg, rgba(166,132,255,0.3) 0%, rgba(81,162,255,0.2) 100%)",
              padding: 2,
            }}
          >
            <img
              className="h-28 w-28 rounded-[16px] object-cover sm:h-36 sm:w-36"
              src={alumni.image || profilePlaceholder}
              alt={alumni.full_name}
              onError={(e) => { e.currentTarget.src = profilePlaceholder; }}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 min-w-0">
          {alumni.date_of_graduation && (
            <span className="inline-flex w-fit items-center rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-violet-300">
              Випуск {alumni.date_of_graduation.split("-")[0]}
            </span>
          )}

          <h2
            className="font-display font-black text-white"
            style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)", letterSpacing: "-0.03em" }}
          >
            {alumni.full_name}
          </h2>

          {(alumni.position || alumni.workplace) && (
            <p className="text-[13px] text-white/55">
              {alumni.position && <span className="font-semibold text-white/80">{alumni.position}</span>}
              {alumni.position && alumni.workplace && " · "}
              {alumni.workplace}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 h-px w-full bg-gradient-to-r from-violet-500/30 via-blue-500/20 to-transparent" />

      {(alumni.major || alumni.degree) && (
        <div className="mt-5 flex flex-wrap gap-2">
          {alumni.major && (
            <div className="grad-border rounded-[12px] bg-white/[0.04] px-4 py-2.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/35 mb-0.5">Спеціальність</p>
              <p className="text-[13px] font-semibold text-white/80">{alumni.major}</p>
            </div>
          )}
          {alumni.degree && (
            <div className="grad-border rounded-[12px] bg-white/[0.04] px-4 py-2.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/35 mb-0.5">Ступінь</p>
              <p className="text-[13px] font-semibold text-white/80">{alumni.degree}</p>
            </div>
          )}
        </div>
      )}

      {alumni.text && (
        <p className="mt-5 text-[14px] leading-relaxed text-white/60">{alumni.text}</p>
      )}

      {socialEntries.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {socialEntries.map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-[12px] font-semibold text-violet-200 transition-all hover:bg-violet-500/20 hover:text-white"
            >
              <span className="font-display text-[10px] font-extrabold uppercase">
                {SOCIAL_ICONS[platform.toLowerCase()] ?? platform.slice(0, 2)}
              </span>
              <span className="capitalize">{platform}</span>
            </a>
          ))}
        </div>
      )}
    </ModalWrapper>
  );
}
