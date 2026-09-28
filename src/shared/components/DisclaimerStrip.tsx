import { AlertTriangle } from "lucide-react";
import { Strip, StripIcon, StripText } from "./DisclaimerStrip.styles";

export function DisclaimerStrip() {
  return (
    <Strip role="note">
      <StripIcon aria-hidden>
        <AlertTriangle size={14} />
      </StripIcon>
      <StripText>
        Applying is completely free, never pay anyone at any stage. Submitting
        an application does not guarantee selection.
      </StripText>
    </Strip>
  );
}
