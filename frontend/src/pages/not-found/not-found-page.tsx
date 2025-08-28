import { Link } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import styles from "./gradientAnimation.module.css";
import { PageTransition } from "@/widgets";

function ErrorElement({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative">
      <span
        className={clsx(
          "absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500",
          styles["hue-animated"]
        )}
      />
      <span className="relative">{children}</span>
    </span>
  );
}

export function NotFoundPage() {
  const { t } = useTranslation("notFound");
  useLoadNamespace("notFound", loadTranslations);

  return (
    <PageTransition>
      <div className="flex grow flex-col items-center justify-center text-white">
        <div className="flex items-center justify-center text-9xl font-bold">
          <ErrorElement>4</ErrorElement>
          <ErrorElement>0</ErrorElement>
          <ErrorElement>4</ErrorElement>
        </div>
        <p className="mt-4 text-center text-lg">
          {t("notExist")}.{" "}
          <Link
            to="/"
            className="relative text-pink-500 before:absolute before:bottom-0 before:left-1/2 before:h-0.5 before:w-full before:-translate-x-1/2 before:scale-x-0 before:bg-pink-500 before:transition-transform before:duration-500 before:ease-out hover:before:scale-x-100"
          >
            {t("goHome")}.
          </Link>
        </p>
      </div>
    </PageTransition>
  );
}

export const Component = NotFoundPage;
