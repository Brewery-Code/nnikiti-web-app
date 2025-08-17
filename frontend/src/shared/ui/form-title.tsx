interface FormSubtitleProps {
  className?: string;
  children: React.ReactNode;
}

export function FormTitle({ className, children }: FormSubtitleProps) {
  return (
    <h4 className={`${className} text-[#eee] text-4xl font-semibold`}>
      {children}
    </h4>
  );
}
