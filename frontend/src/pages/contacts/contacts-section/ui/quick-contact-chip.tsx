import { StaggerItem } from "@/shared/ui";

export interface QuickContact {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

export function QuickContactChip({ icon, label, value, href }: QuickContact) {
  return (
    <StaggerItem
      as="a"
      mode="up"
      href={href}
      className="sheen grad-border card-hover flex items-center gap-4 rounded-[18px] bg-surface p-5 backdrop-blur-xl"
    >
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-lg text-violet-300">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-subtle">
          {label}
        </p>
        <p className="mt-1 truncate text-[15px] font-semibold text-primary">
          {value}
        </p>
      </div>
    </StaggerItem>
  );
}
