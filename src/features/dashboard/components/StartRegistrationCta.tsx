import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui";
import type { User } from "@/features/auth";
import {
  CtaCard,
  CtaCopy,
  CtaTitle,
  CtaText,
} from "./StartRegistrationCta.styles";

export function StartRegistrationCta({
  status,
  hasDraft,
}: {
  status: User["applicationStatus"];
  hasDraft: boolean;
}) {
  const submitted = status === "submitted";
  const inProgress = !submitted && hasDraft;

  const title = submitted
    ? "Review your application"
    : inProgress
      ? "Continue your application"
      : "Ready to begin?";

  const text = submitted
    ? "You can review the details you submitted for your Mbopo Akwa Ibom application."
    : inProgress
      ? "Pick up right where you left off; your progress has been saved."
      : "Complete your Mbopo Akwa Ibom registration; your identity details are already saved.";

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
