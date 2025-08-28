interface FormSubtitleProps {
  className?: string;
  children: React.ReactNode;
}

export function FormTitle({ className, children }: FormSubtitleProps) {
  return <h4 className={`${className} text-4xl font-semibold text-[#eee]`}>{children}</h4>;
}
