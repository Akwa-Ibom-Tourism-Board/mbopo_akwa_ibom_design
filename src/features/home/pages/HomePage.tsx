import { useEffect } from "react";
import styled from "styled-components";
import { PageShell } from "@/shared/components";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { EligibilitySection } from "../components/EligibilitySection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { WhyEnterSection } from "../components/WhyEnterSection";
import { ValuesSection } from "../components/ValuesSection";
import { FaqSection } from "../components/FaqSection";
import { CtaSection } from "../components/CtaSection";
import { ScrollToTopButton } from "../components/ScrollToTopButton";

// WhyEnterSection and ValuesSection are meant to read as one continuous
// panel, not two separately-colored sections — so the gradient lives here,
// on a wrapper spanning both, rather than on each section individually.
const PlatformPanel = styled.div`
  background: ${({ theme }) => theme.gradients.platform};
`;

export function HomePage() {
  useEffect(() => {
    document.title = "Mbopo Akwa Ibom | Beauty with Purpose";
  }, []);

  return (
    <PageShell navVariant="overlay">
      <HeroSection />
      <AboutSection />
      <EligibilitySection />
      <HowItWorksSection />
      <PlatformPanel>
        <WhyEnterSection />
        <ValuesSection />
      </PlatformPanel>
      <FaqSection />
      <CtaSection />
      <ScrollToTopButton />
    </PageShell>
  );
}
