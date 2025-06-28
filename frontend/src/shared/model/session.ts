import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchClient, publicFetchClient } from "@/shared/api/instance";

type Session = {
  userId: string;
  email: string;
  exp: number;
  iat: number;
};

const TOKEN_KEY = "access_token";

let refreshTokenPromise: Promise<string | null> | null = null;

// const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

function getToken() {
  const match = document.cookie.match(
    RegExp("(?:^|;\\s*)" + escape(TOKEN_KEY) + "=([^;]*)")
  );
  return match ? match[1] : null;
}

// function deleteCookie(name: string, path: string, domain: string) {
//   if (getCookie(name)) {
//     document.cookie =
//       name +
//       "=" +
//       (path ? ";path=" + path : "") +
//       (domain ? ";domain=" + domain : "") +
//       ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
//   }
// }

// export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
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

  const session = jwtDecode<Session>(token);

  if (session.exp < Date.now() / 1000) {
    if (!refreshTokenPromise) {
      refreshTokenPromise = fetchClient
        .POST("/users/token/refresh/", {
          credentials: "include",
        })
        .then((r) => {
          return r.data?.access ?? null;
        })
        .then((newToken) => {
          if (newToken) {
            console.log(newToken);
            login(newToken);
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
