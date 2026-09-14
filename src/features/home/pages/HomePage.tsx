import { useEffect } from "react";
import { PageShell } from "@/shared/components";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { EligibilitySection } from "../components/EligibilitySection";
import { WhyEnterSection } from "../components/WhyEnterSection";
import { ValuesSection } from "../components/ValuesSection";
import { CtaSection } from "../components/CtaSection";
import { ScrollToTopButton } from "../components/ScrollToTopButton";

export function HomePage() {
  useEffect(() => {
    document.title = "Mbobpo Akwa Ibom | Beauty with Purpose";
  }, []);

  return (
    <PageShell navVariant="overlay">
      <HeroSection />
      <AboutSection />
      <EligibilitySection />
      <WhyEnterSection />
      <ValuesSection />
      <CtaSection />
      <ScrollToTopButton />
    </PageShell>
  );
}
