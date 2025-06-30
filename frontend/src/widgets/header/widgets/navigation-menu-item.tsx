import { useState } from "react";
import Arrow from "../icons/arrow.svg?react";
import DropdownMenu from "./dropdown-menu";

export default function NavigationMenuItem() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <li
      className="relative flex items-center gap-1.5 h-full cursor-pointer"
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <span className="up">Navigation</span>
      <Arrow className="mt-0.5" />
      <DropdownMenu isMenuOpen={isMenuOpen} />
    </li>
  );
}
