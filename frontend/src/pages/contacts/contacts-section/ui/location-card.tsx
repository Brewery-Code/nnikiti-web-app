import { useTranslation } from "react-i18next";
import { Reveal } from "@/shared/ui";
import { PinIcon } from "../icons";

interface LocationData {
  address: string;
  link: string;
  googleMapsEmbedAPI: string;
}

export function LocationCard({ locationData }: { locationData: LocationData }) {
  const { t } = useTranslation("contacts");

  return (
    <div id="map" className="flex flex-col gap-4 lg:sticky lg:top-24">
      <Reveal mode="scale" inView={false} className="grad-border overflow-hidden rounded-[20px]">
        <iframe
          className="h-[240px] w-full sm:h-[300px] lg:h-[360px]"
          src={locationData.googleMapsEmbedAPI}
          loading="lazy"
          style={{
            filter: "invert(92%) hue-rotate(180deg) saturate(0.9) brightness(0.85)",
          }}
        />
      </Reveal>

      <Reveal
        mode="up"
        delay={0.1}
        inView={false}
        className="grad-border-animated relative overflow-hidden rounded-[20px] bg-gradient-to-br from-violet-500/[0.08] to-blue-500/[0.04] p-6 backdrop-blur-xl"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-violet-500/30 to-blue-500/30 text-violet-200">
            <PinIcon className="h-5 w-5" />
          </div>
          <div>
            <h3
              className="font-display font-bold text-primary"
              style={{ fontSize: "1.05rem", letterSpacing: "-0.02em" }}
            >
              {t("location.title")}
            </h3>
            <p className="mt-0.5 text-[12px] text-subtle">{t("location.description")}</p>
          </div>
        </div>

        <div className="mt-5 h-px w-full bg-gradient-to-r from-violet-500/40 via-blue-500/20 to-transparent" />

        <div className="mt-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-subtle">
            {t("address")}
          </p>
          <p className="mt-1 text-[15px] font-semibold text-primary">{locationData.address}</p>
        </div>

        <a
          href={locationData.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-[12px] border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-[12px] font-semibold text-violet-200 transition-all duration-200 hover:bg-violet-500/20 hover:text-primary active:scale-95"
        >
          {t("location.openMap")} <span aria-hidden>→</span>
        </a>
      </Reveal>
    </div>
  );
}
