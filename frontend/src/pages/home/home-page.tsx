import { HeroSection } from "./hero-section";
import { StatisticSection } from "./statistic-section";
import { SpecialtiesSection } from "./specialties-section";
import { EventsSection } from "./events-section";
import { PartnersSection } from "./partners-section";
import { PageTransition } from "@/widgets";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { publicRqClient } from "@/shared/api/instance";

export function HomePage() {
  const [searchParams] = useSearchParams();
  const google_code = searchParams.get("code");
  const code_verifier = localStorage.getItem("code_verifier");

  const googleAuthMutation = publicRqClient.useMutation(
    "post",
    "/auth/google/",
    {
      onSuccess: (data) => {
        if (
          typeof data.access_token === "string" &&
          typeof data.expires_in === "number"
        ) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem(
            "access_token_exp",
            String(Date.now() / 1000 + data.expires_in)
          );
        }
      },
      onError: (error) => {
        console.error("Auth error:", error.message);
      },
    }
  );

  useEffect(() => {
    if (google_code && code_verifier) {
      googleAuthMutation.mutate({
        body: {
          code: google_code,
          code_verifier: code_verifier,
        },
      });
    }
  }, []);

  return (
    <PageTransition className="!pt-0">
      <HeroSection />
      <StatisticSection className="m-section " />
      <SpecialtiesSection className="m-section " />
      <EventsSection className="m-section fade-animation" />
      <PartnersSection className="m-section" />
    </PageTransition>
  );
}

export const Component = HomePage;
