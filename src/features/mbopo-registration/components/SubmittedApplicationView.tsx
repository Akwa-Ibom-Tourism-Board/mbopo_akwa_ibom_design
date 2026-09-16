import { CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import type { User } from "@/features/auth";
import type { SubmittedApplication } from "../types";
import { ApplicationSummary } from "./ApplicationSummary";
import {
  ViewFrame,
  StatusBanner,
  StatusCopy,
  StatusTitle,
  StatusMeta,
  ReferencePill,
  SummaryCard,
} from "./SubmittedApplicationView.styles";

export function SubmittedApplicationView({
  user,
  application,
}: {
  user: User;
  application: SubmittedApplication;
}) {
  return (
    <ViewFrame>
      <StatusBanner>
        <StatusCopy>
          <StatusTitle>
            <CheckCircle2
              size={16}
              style={{ verticalAlign: "-3px", marginRight: 6 }}
            />
            Application received
          </StatusTitle>
          <StatusMeta>
            Submitted{" "}
            {format(
              new Date(application.submittedAt),
              "d MMMM yyyy 'at' h:mm a",
            )}
          </StatusMeta>
        </StatusCopy>
        <ReferencePill>
          Reference number
          <strong>{application.referenceCode}</strong>
        </ReferencePill>
      </StatusBanner>

      <SummaryCard>
        <ApplicationSummary
          user={user}
          values={application.values}
          photos={application.photos}
        />
      </SummaryCard>
    </ViewFrame>
  );
}
