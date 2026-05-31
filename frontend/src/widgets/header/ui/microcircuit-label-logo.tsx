import { logoCat } from "@/shared/icons";

export default function MicrocircuitLabelLogo() {
  return (
    <img
      src={logoCat}
      alt="ННІКІТІ логотип"
      style={{ height: "calc(var(--header-height) * 0.65)", width: "auto" }}
    />
  );
}
