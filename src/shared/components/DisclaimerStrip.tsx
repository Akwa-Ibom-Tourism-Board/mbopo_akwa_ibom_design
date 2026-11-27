import { AlertTriangle } from "lucide-react";
import { useRegistrationStatus } from "@/features/registration-status";
import { Strip, StripIcon, StripText } from "./DisclaimerStrip.styles";

export function DisclaimerStrip() {
  const status = useRegistrationStatus().data?.status;

  const message =
    status === "closed"
      ? "Registration has ended."
      : status === "new_intake_closed"
        ? "New registrations have closed. Existing applicants can still log in and continue."
        : "Applying is free. No payment needed.";

  return (
    <Strip role="note">
      <StripIcon aria-hidden>
        <AlertTriangle size={14} />
      </StripIcon>
      <StripText>{message}</StripText>
    </Strip>
  );
}
