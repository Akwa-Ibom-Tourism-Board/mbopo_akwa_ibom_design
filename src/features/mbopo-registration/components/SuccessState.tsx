import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import {
  SuccessPage,
  SuccessCard,
  SuccessIcon,
  Eyebrow,
  SuccessTitle,
  SuccessCopy,
  Reference,
  DashboardButton,
} from "./SuccessState.styles";

export function SuccessState({ referenceCode }: { referenceCode: string }) {
  return (
    <SuccessPage>
      <SuccessCard>
        <SuccessIcon>
          <Check size={31} />
        </SuccessIcon>
        <Eyebrow>APPLICATION RECEIVED</Eyebrow>
        <SuccessTitle>
          Thank you for
          <br />
          <em>stepping forward.</em>
        </SuccessTitle>
        <SuccessCopy>
          Thank you for applying to represent your community. Our team will
          review your application and reach out via the phone number and email
          on file.
        </SuccessCopy>
        <Reference>
          REFERENCE NUMBER <strong>{referenceCode}</strong>
        </Reference>
        <DashboardButton asChild variant="secondary" size="lg">
          <Link to="/dashboard">
            Return to dashboard <ArrowRight size={16} />
          </Link>
        </DashboardButton>
      </SuccessCard>
    </SuccessPage>
  );
}
