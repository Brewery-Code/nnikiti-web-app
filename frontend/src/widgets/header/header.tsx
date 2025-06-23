import MicrocircuitLabelLogo from "../logos/microcircuit-label-logo/microcircuit-label-logo";

export default function Header() {
  return (
    <header className="h-20 bg-black">
      <div className="header__container">
        <div className="flex items-center h-full">
          <MicrocircuitLabelLogo />
        </div>
      </div>
    </header>
  );
}
