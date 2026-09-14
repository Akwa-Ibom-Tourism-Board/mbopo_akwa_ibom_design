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
}: {
  status: User["applicationStatus"];
}) {
  const submitted = status === "submitted";

  return (
    <CtaCard>
      <CtaCopy>
        <CtaTitle>
          {submitted ? "Review your application" : "Ready to begin?"}
        </CtaTitle>
        <CtaText>
          {submitted
            ? "You can review the details you submitted for your Mbobpo Akwa Ibom application."
            : "Complete your Mbobpo Akwa Ibom registration — your identity details are already saved."}
        </CtaText>
      </CtaCopy>
      <Button asChild variant="secondary" size="lg">
        <Link to="/mbopo-registration">
          {submitted ? "View application" : "Mbobpo Registration"}{" "}
          <ArrowRight size={16} />
        </Link>
      </Button>
    </CtaCard>
  );
}
