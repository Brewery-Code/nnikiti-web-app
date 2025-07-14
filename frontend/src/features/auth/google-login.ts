import pkceChallenge from "pkce-challenge";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID!;
const REDIRECT_URI = "http://127.0.0.1:5173/";
const CODE_CHALLENGE_METHOD = "S256";

export async function googleLogin() {
  const { code_challenge, code_verifier } = await pkceChallenge();

  localStorage.setItem("code_verifier", code_verifier);

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: "openid email profile",
    code_challenge,
    code_challenge_method: CODE_CHALLENGE_METHOD,
  });

  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}
