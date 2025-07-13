import { jwtDecode } from "jwt-decode";
import { publicFetchClient } from "@/shared/api/instance";

type Session = {
  userId: string;
  email: string;
  exp: number;
  iat: number;
};

const TOKEN_KEY = "access_token";

let refreshTokenPromise: Promise<string | null> | null = null;

// function getToken() {
//   const match = document.cookie.match(
//     RegExp("(?:^|;\\s*)" + escape(TOKEN_KEY) + "=([^;]*)")
//   );
//   return match ? match[1] : null;
// }

export const logout = () => {
  document.cookie.split(";").forEach((cookie) => {
    document.cookie = cookie
      .replace(/^ +/, "")
      .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
  });
};

export const getSession = (): Session | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? jwtDecode<Session>(token) : null;
};

export const refreshToken = async () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const exp = localStorage.getItem("access_token_exp");

  if (!token || !exp) {
    return null;
  }

  if (Number(exp) < Date.now() / 1000) {
    if (!refreshTokenPromise) {
      refreshTokenPromise = publicFetchClient
        .POST("/auth/token/", {
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: {
            client_id: "client_backend",
            grant_type: "refresh_token",
          },
        })
        // .then((r) => r.data?.access_token ?? null)
        .then((r) => {
          if (!r.data?.access_token) {
            console.log(r);
          }
        })
        .then((newToken) => {
          if (newToken) {
            return newToken;
          } else {
            logout();
            return null;
          }
        })
        .finally(() => {
          refreshTokenPromise = null;
        });
    }

    const newToken = await refreshTokenPromise;

    if (newToken) {
      return newToken;
    } else {
      return null;
    }
  }

  return token;
};
