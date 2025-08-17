interface FormSubtitleProps {
  className?: string;
  children: React.ReactNode;
}

export function FormSubtitle({ className, children }: FormSubtitleProps) {
  return (
    <h4 className={`${className} text-[#eee] text-base font-semibold`}>
      {children}
    </h4>
  );
}
