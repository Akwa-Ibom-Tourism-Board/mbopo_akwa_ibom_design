import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui";
import type { Application } from "@/features/mbopo-registration";
import {
  CtaCard,
  CtaCopy,
  CtaTitle,
  CtaText,
} from "./StartRegistrationCta.styles";

export function StartRegistrationCta({
  application,
}: {
  application: Application | undefined;
}) {
  const submitted = application?.status === "submitted";
  const inProgress = !submitted && Boolean(application);

  const title = submitted
    ? "Review your application"
    : inProgress
      ? "Continue your application"
      : "Ready to begin?";

  const text = submitted
    ? "You can review the details you submitted for your Mbopo Akwa Ibom application."
    : inProgress
      ? "Pick up right where you left off; your progress has been saved. Note: a submitted video pitch cannot be re-recorded. Registration closes 26th October, 2026."
      : "Complete your Mbopo Akwa Ibom registration. We will verify your NIN with a quick photo as the first step. Registration closes 26th October, 2026.";

  const cta = submitted
    ? "View application"
    : inProgress
      ? "Continue application"
      : "Start application";

  return (
    <CtaCard>
      <CtaCopy>
        <CtaTitle>{title}</CtaTitle>
        <CtaText>{text}</CtaText>
      </CtaCopy>
      <Button asChild variant="secondary" size="lg">
        <Link to="/mbopo-registration">
          {cta} <ArrowRight size={16} />
        </Link>
      </Button>
    </CtaCard>
  );
}
