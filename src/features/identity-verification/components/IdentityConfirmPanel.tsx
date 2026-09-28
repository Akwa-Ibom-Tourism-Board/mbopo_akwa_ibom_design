import { format } from "date-fns";
import { Button } from "@/shared/ui";
import type { NinRecord } from "../types";
import {
  DetailGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  ConfirmActions,
  ChangeNinButton,
} from "./IdentityConfirmPanel.styles";

export interface IdentityConfirmPanelProps {
  record: NinRecord;
  isSubmitting: boolean;
  onConfirm: () => void;
  onChangeNin: () => void;
}

export function IdentityConfirmPanel({
  record,
  isSubmitting,
  onConfirm,
  onChangeNin,
}: IdentityConfirmPanelProps) {
  return (
    <>
      <DetailGrid>
        <DetailItem>
          <DetailLabel>First name</DetailLabel>
          <DetailValue>{record.firstName}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Last name</DetailLabel>
          <DetailValue>{record.lastName}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>NIN</DetailLabel>
          <DetailValue>{record.nin}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>VIN</DetailLabel>
          <DetailValue>{record.vin}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Local Government Area</DetailLabel>
          <DetailValue>{record.lga}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Ward</DetailLabel>
          <DetailValue>{record.ward}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Gender</DetailLabel>
          <DetailValue style={{ textTransform: "capitalize" }}>
            {record.gender}
          </DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Date of birth</DetailLabel>
          <DetailValue>
            {format(new Date(record.dateOfBirth), "d MMMM yyyy")}
          </DetailValue>
        </DetailItem>
      </DetailGrid>

      <ChangeNinButton type="button" onClick={onChangeNin}>
        This isn&apos;t me, change NIN/VIN
      </ChangeNinButton>

      <ConfirmActions>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={onConfirm}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verifying…" : "Confirm & Continue"}
        </Button>
      </ConfirmActions>
    </>
  );
}
