import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { fetchClient, publicClient } from "@/shared/api/instance";
import type { RootState } from "@/app/store";
// import { user } from "./user.utils";

const TOKEN_KEY = "access_token";

function getCookie(name: string) {
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

type Session = {
  userId: string;
  email: string;
  exp: number;
  iat: number;
};

const initialToken = getCookie(TOKEN_KEY);

const initialState: {
  token: string | null;
  session: Session | null;
} = {
  token: initialToken,
  session: initialToken ? jwtDecode<Session>(initialToken) : null,
};

// let refreshTokenPromise: Promise<string | null> | null = null;

// export const refreshToken = createAsyncThunk<
//   string | null,
//   void,
//   { state: RootState }
// >("user/refreshToken", async (_, thunkAPI) => {
//   console.log("test");
//   const state = thunkAPI.getState();
//   const token = state.user.token;

//   if (!token) return null;

//   const session = jwtDecode<Session>(token);
//   if (session.exp < Date.now() / 1000) {
//     if (!refreshTokenPromise) {
//       refreshTokenPromise = publicClient
//         .POST("/users/token/refresh/")
//         .then((r) => r.data?.access ?? null)
//         .then((newToken) => {
//           if (newToken) {
//             // login(newToken);
//             return newToken;
//           } else {
//             thunkAPI.dispatch(logout());
//             return null;
//           }
//         })
//         .finally(() => {
//           refreshTokenPromise = null;
//         });
//     }

//     const newToken = await refreshTokenPromise;

//     return typeof newToken === "string" ? newToken : null;
//   }

//   return token;
// });

// export const refreshToken = () => {};

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await fetchClient.POST("/users/logout/");
      deleteCookie(TOKEN_KEY, "/", window.location.hostname);
    } catch (error) {
      return rejectWithValue(error || "Unknown error");
    }
  }
);

const sessionSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload!;
        state.session = jwtDecode<Session>(action.payload!);
      })
      .addCase(refreshToken.rejected, (state) => {
        state.token = null;
        state.session = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.session = null;
      });
  },
});

export const userReducer = sessionSlice.reducer;
