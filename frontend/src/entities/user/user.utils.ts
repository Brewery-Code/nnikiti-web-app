import { store } from "@/app/store";

export const user = {
  getSession: () => store.getState().user.session,
  getToken: () => store.getState().user.token,
};
