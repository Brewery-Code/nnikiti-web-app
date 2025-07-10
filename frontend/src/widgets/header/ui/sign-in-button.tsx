import { useTranslation } from "react-i18next";

export default function SignInButton() {
  const { t } = useTranslation("header");
  return (
    <button
      className="overflow-hidden relative w-25 px-3 py-1 text-base rounded-2xl outline-2 outline-white text-white font-bold tracking-widest uppercase cursor-pointer 
            transition-[scale,shadow,outline,color] duration-300 hover:text-black hover:scale-110 hover:outline-black hover:shadow-[4px_5px_17px_-4px_#268391]
            before:absolute before:-left-full before:top-0 before:w-0 before:h-full before:bg-white before:skew-x-12 before:-z-10 before:transition-[width] before:duration-500 hover:before:w-[250%]"
      onClick={() =>
        (window.location.href =
          "http://127.0.0.1:8000/api/v1/users/login/google-oauth2/")
      }
    >
      {t("signIn")}
    </button>
  );
}
