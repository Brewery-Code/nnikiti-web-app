import { i18n } from "@/shared/i18n";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { CONFIG } from "../model/config";
import type { ApiPaths } from "./schema";
import { refreshToken } from "../model/session";

export const fetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
  headers: {
    "Accept-Language": i18n.language,
  },
});

export const rqClient = createClient(fetchClient);

export const publicFetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
  headers: {
    "Accept-Language": i18n.language,
  },
});

export const publicRqClient = createClient(publicFetchClient);

fetchClient.use({
  async onRequest({ request }) {
    request.headers.set("Accept-Language", i18n.language);
    const token = await refreshToken();
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    } else {
      return new Response(
        JSON.stringify({
          code: "NOT_AUTHORIZED",
          message: "You are not authorized to make this request",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  },
});

publicFetchClient.use({
  async onRequest({ request }) {
    request.headers.set("Accept-Language", i18n.language);
  },
});
