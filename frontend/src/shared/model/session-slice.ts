import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "access_token";

type Session = {
  userId: string;
  email: string;
  exp: number;
  iat: number;
};

function getCookie(name: string) {
  // function escape(s: string) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
  const match = document.cookie.match(
    RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)")
  );
  return match ? match[1] : null;
}

function deleteCookie(name: string, path: string, domain: string) {
  if (getCookie(name)) {
    document.cookie =
      name +
      "=" +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

const initialToken = getCookie(TOKEN_KEY);

const initialState: {
  token: string | null;
  session: Session | null;
} = {
  token: initialToken,
  session: initialToken ? jwtDecode<Session>(initialToken) : null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.session = jwtDecode<Session>(action.payload);
    },
    logout(state) {
      state.token = null;
      state.session = null;
      deleteCookie(TOKEN_KEY, "/", window.location.hostname);
    },
  },
});

export const sessionReducer = sessionSlice.reducer;
export const { login, logout } = sessionSlice.actions;

// export const useSession = () => {
//   const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

//   const login = (token: string) => {
//     localStorage.setItem(TOKEN_KEY, token);
//     setToken(token);
//   };

//   const logout = () => {
//     localStorage.removeItem(TOKEN_KEY);
//     setToken(null);
//   };

//   const session = token ? jwtDecode<Session>(token) : null;

//   return { token, login, logout, session };
// };
