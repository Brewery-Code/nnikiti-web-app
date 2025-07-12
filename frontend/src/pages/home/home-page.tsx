import { HeroSection } from "./hero-section";
import { StatisticSection } from "./statistic-section";
import { SpecialtiesSection } from "./specialties-section";
import { EventsSection } from "./events-section";
import { PartnersSection } from "./partners-section";
import { PageTransition } from "@/widgets";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { publicRqClient } from "@/shared/api/instance";

export function HomePage() {
  const navigate = useNavigate();

  const mutation = publicRqClient.useMutation("post", "/auth/google/", {
    onSuccess: (data) => {
      console.log("Token received:", data);
      // Наприклад, зберегти токен
      // localStorage.setItem("access_token", data.access_token);
      // Можна зробити редірект, оновити UI тощо
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const code_verifier = localStorage.getItem("pkce_code_verifier");

    if (!code || !code_verifier) {
      console.error("Missing code or code_verifier");
      return;
    }

    mutation.mutate({
      body: {
        code,
        code_verifier,
      },
    });
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
