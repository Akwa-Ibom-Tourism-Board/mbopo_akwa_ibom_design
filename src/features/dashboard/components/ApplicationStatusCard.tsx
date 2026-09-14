import { CheckCircle2, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/ui";
import type { User } from "@/features/auth";
import { StatusRow, StatusBadge } from "./ApplicationStatusCard.styles";

export function ApplicationStatusCard({
  status,
}: {
  status: User["applicationStatus"];
}) {
  const submitted = status === "submitted";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application status</CardTitle>
        <CardDescription>
          {submitted
            ? "Your Mbobpo Akwa Ibom application has been received."
            : "You haven't started your Mbobpo Akwa Ibom application yet."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StatusRow>
          <StatusBadge $submitted={submitted}>
            {submitted ? <CheckCircle2 size={14} /> : <Clock size={14} />}
            {submitted ? "Submitted" : "Not started"}
          </StatusBadge>
        </StatusRow>
      </CardContent>
    </Card>
  );
}
