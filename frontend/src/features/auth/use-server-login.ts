import { publicRqClient } from "@/shared/api/instance";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function useServerLogin() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const google_code = searchParams.get("code");
  const code_verifier = localStorage.getItem("code_verifier");

  const googleAuthMutation = publicRqClient.useMutation("post", "/auth/google/", {
    onSuccess: (data) => {
      console.log("Auth success:", data);
      if (typeof data.access_token === "string" && typeof data.expires_in === "number") {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("access_token_exp", String(Date.now() / 1000 + data.expires_in));
      }
    },
    onError: (error) => {
      console.error("Auth error:", error.message);
    },
  });

  useEffect(() => {
    if (google_code && code_verifier) {
      googleAuthMutation.mutate({
        credentials: "include",
        body: {
          code: google_code,
          code_verifier: code_verifier,
        },
      });
      navigate("/");
    }
  }, []);

  return {
    isLoading: googleAuthMutation.isPending,
    isError: googleAuthMutation.isError,
    error: googleAuthMutation.error,
  };
}
