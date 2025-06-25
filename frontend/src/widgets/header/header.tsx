import MicrocircuitLabelLogo from "./widgets/microcircuit-label-logo";
import ChangeLanguage from "./widgets/change-language";
import Search from "./icons/search.svg?react";
import Profile from "./icons/profile.svg?react";
import Arrow from "./icons/arrow.svg?react";

export default function Header() {
  const handleGoogleLogin = () => {
    window.location.href =
      "http://127.0.0.1:8000/api/v1/auth/login/google-oauth2/";
  };

  const refreshToken = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/auth/token/refresh/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 🔐 надсилаємо кукі разом із запитом
          body: JSON.stringify({}), // 🔁 порожнє тіло, якщо сервер бере refresh токен з cookie
        }
      );

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();

      console.log("Refresh token response:", data);

      // 🟢 Зберігаємо новий access token
      if (data.access) {
        localStorage.setItem("access_token", data.access);
        console.log("Access token refreshed:", data.access);
      } else {
        throw new Error("Access token missing in response");
      }
    } catch (error) {
      console.error("Refresh token error:", error);
      // Можливо, перенаправити користувача на логін
    }
  };

  console.log(document.cookie);

  return (
    <header className="fixed z-[100] flex justify-center w-full h-20 bg-black before:absolute before:-bottom-5 before:w-full before:h-5 before:bg-[linear-gradient(180deg,_rgba(0,0,0,1)_0%,_rgba(0,0,0,0)_100%)]">
      <div className="container-base flex justify-between items-center h-full">
        <MicrocircuitLabelLogo />
        <div className="grow flex justify-center items-center gap-4">
          <ul className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm xl:text-base leading-6 font-semibold">
            <li className="flex items-center gap-1.5">
              <span className=" ">Navigation Item</span>
              <Arrow className="mt-0.5" />
            </li>
            <li className="flex items-center gap-1.5">
              <span className=" ">Navigation Item</span>
              <Arrow className="mt-0.5" />
            </li>
            <li className="flex items-center gap-1.5">
              <span className=" ">Navigation Item</span>
              <Arrow className="mt-0.5" />
            </li>
            <li className="flex items-center gap-1.5">
              <span className=" ">Navigation Item</span>
              <Arrow className="mt-0.5" />
            </li>
            <li className="flex items-center gap-1.5">
              <span className=" ">Navigation Item</span>
              <Arrow className="mt-0.5" />
            </li>
          </ul>
          <form
            action=""
            className="relative flex justify-center align-middle w-2/3 lg:w-auto"
          >
            <input
              type="text"
              placeholder="Search"
              className="grow block lg:hidden w-full p-0.5 pl-2 pr-2 bg-[#74747479] rounded-md border-[1px] border-[#858585]  placeholder:text-center"
            />
            <Search className="absolute lg:static left-[calc(50%+32px)] top-1.5 lg:flex w-4.5 h-4.5 text-[#959b98]" />
          </form>
        </div>
        <div
          className="hidden lg:flex items-center gap-4"
          onClick={handleGoogleLogin}
        >
          <ChangeLanguage />
          <Profile className="w-8 h-8 stroke-white" />
        </div>
        <div
          onClick={refreshToken}
          className="relative flex lg:hidden justify-center items-center w-8 h-8"
        >
          <span className="w-7 h-[1px] bg-white before:absolute before:top-1 before:w-7 before:h-[1px] before:bg-white after:absolute after:bottom-1 after:w-7 after:h-[1px] after:bg-white"></span>
        </div>
      </div>
    </header>
  );
}
