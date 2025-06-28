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

function getToken() {
  const match = document.cookie.match(
    RegExp("(?:^|;\\s*)" + escape(TOKEN_KEY) + "=([^;]*)")
  );
  return match ? match[1] : null;
}

export const logout = () => {
  document.cookie.split(";").forEach((cookie) => {
    document.cookie = cookie
      .replace(/^ +/, "")
      .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
  });
};

export const getSession = (): Session | null => {
  const token = getToken();
  return token ? jwtDecode<Session>(token) : null;
};

export const refreshToken = async () => {
  const token = getToken();
  if (!token) {
    return null;
  }

  const session = jwtDecode<Session>(token!);

  if (session.exp < Date.now() / 1000) {
    if (!refreshTokenPromise) {
      refreshTokenPromise = publicFetchClient
        .POST("/users/token/refresh/", {
          credentials: "include",
        })
        .then((r) => r.data?.access ?? null)
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
