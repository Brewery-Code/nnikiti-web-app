import clsx from "clsx";
import styles from "./neon-label.module.css";

interface NeonLabelProps {
  children: React.ReactNode;
}

export function NeonLabel({ children }: NeonLabelProps) {
  return (
    <h1 className={clsx(styles.neonText, "text-7xl font-bold uppercase")}>
      {children}
    </h1>
  );
}
