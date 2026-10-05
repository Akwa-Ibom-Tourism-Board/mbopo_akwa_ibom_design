import { CalendarDays, CheckCircle2, Clock, FileEdit } from "lucide-react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/ui";
import type { Application } from "@/features/mbopo-registration";
import {
  StatusRow,
  StatusBadge,
  MetaList,
  MetaRow,
  MetaIcon,
  MetaText,
  MetaLabel,
  MetaValue,
} from "./ApplicationStatusCard.styles";

export interface ApplicationStatusCardProps {
  application: Application | undefined;
  memberSince?: string;
}

export function ApplicationStatusCard({
  application,
  memberSince,
}: ApplicationStatusCardProps) {
  const submitted = application?.status === "submitted";
  const inProgress = !submitted && Boolean(application);

  const description = submitted
    ? "Your Mbopo Akwa Ibom application has been received."
    : inProgress
      ? "Your application is saved as a draft. Pick up where you left off anytime."
      : "You have not started your Mbopo Akwa Ibom application yet.";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application status</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <StatusRow>
          <StatusBadge $submitted={submitted}>
            {submitted ? (
              <CheckCircle2 size={14} />
            ) : inProgress ? (
              <FileEdit size={14} />
            ) : (
              <Clock size={14} />
            )}
            {submitted
              ? "Submitted"
              : inProgress
                ? "In progress"
                : "Not started"}
          </StatusBadge>
        </StatusRow>

        {memberSince && (
          <MetaList>
            <MetaRow>
              <MetaIcon>
                <CalendarDays size={15} />
              </MetaIcon>
              <MetaText>
                <MetaLabel>Member since</MetaLabel>
                <MetaValue>
                  {format(new Date(memberSince), "d MMMM yyyy")}
                </MetaValue>
              </MetaText>
            </MetaRow>
          </MetaList>
        )}
      </CardContent>
    </Card>
  );
}
