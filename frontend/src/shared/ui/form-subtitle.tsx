interface FormSubtitleProps {
  className?: string;
  children: React.ReactNode;
}

export function FormSubtitle({ className, children }: FormSubtitleProps) {
  return <h4 className={`${className} text-base font-semibold text-[#eee]`}>{children}</h4>;
}
