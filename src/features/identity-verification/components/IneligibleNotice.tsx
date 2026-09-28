import { ShieldX } from "lucide-react";
import { Button } from "@/shared/ui";
import {
  NoticeCard,
  IconRing,
  NoticeTitle,
  ReasonList,
  ReasonItem,
} from "./IneligibleNotice.styles";

export interface IneligibleNoticeProps {
  reasons: string[];
  onTryAgain: () => void;
}

export function IneligibleNotice({
  reasons,
  onTryAgain,
}: IneligibleNoticeProps) {
  return (
    <NoticeCard>
      <IconRing>
        <ShieldX size={26} />
      </IconRing>
      <NoticeTitle>You don&apos;t meet the eligibility criteria</NoticeTitle>
      <ReasonList>
        {reasons.map((reason) => (
          <ReasonItem key={reason}>{reason}</ReasonItem>
        ))}
      </ReasonList>
      <Button
        variant="outline"
        size="lg"
        style={{ width: "100%" }}
        onClick={onTryAgain}
      >
        Try a different NIN
      </Button>
    </NoticeCard>
  );
}
