import { ErrorMessage, SpinnerLoader } from "@/shared/ui";

export default function QueryHandler({
  isLoading,
  isError,
  children,
  fallback = <SpinnerLoader />,
  errorFallback = <ErrorMessage />,
}: {
  isLoading: boolean;
  isError: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
}) {
  if (isLoading) return <div className="flex items-center justify-center">{fallback}</div>;
  if (isError) return <div className="flex items-center justify-center">{errorFallback}</div>;
  return <>{children}</>;
}
