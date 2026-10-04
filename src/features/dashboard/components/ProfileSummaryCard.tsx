import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/ui";
import { isVerifiedUser, type User } from "@/features/auth";
import {
  DetailGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
} from "./ProfileSummaryCard.styles";

export interface ProfileSummaryCardProps {
  user: User;
  referenceCode?: string;
}

export function ProfileSummaryCard({
  user,
  referenceCode,
}: ProfileSummaryCardProps) {
  const verified = isVerifiedUser(user);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your details</CardTitle>
        <CardDescription>
          {verified
            ? "Verified from your National Identification Number."
            : "Verify your NIN and VIN from the Mbopo Registration page to see your identity details here."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DetailGrid>
          {verified && (
            <>
              <DetailItem>
                <DetailLabel>First name</DetailLabel>
                <DetailValue>{user.firstName}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Last name</DetailLabel>
                <DetailValue>{user.lastName}</DetailValue>
              </DetailItem>
              <DetailItem $wide>
                <DetailLabel>NIN</DetailLabel>
                <DetailValue>{user.nin}</DetailValue>
              </DetailItem>
              <DetailItem $wide>
                <DetailLabel>VIN</DetailLabel>
                <DetailValue>{user.vin}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>LGA</DetailLabel>
                <DetailValue>{user.localGovernment}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Ward</DetailLabel>
                <DetailValue>{user.ward}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Gender</DetailLabel>
                <DetailValue style={{ textTransform: "capitalize" }}>
                  {user.gender}
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Date of birth</DetailLabel>
                <DetailValue>
                  {format(new Date(user.dateOfBirth), "d MMMM yyyy")}
                </DetailValue>
              </DetailItem>
            </>
          )}
          <DetailItem $wide={!verified}>
            <DetailLabel>Email</DetailLabel>
            <DetailValue>{user.email}</DetailValue>
          </DetailItem>
          {referenceCode && (
            <DetailItem $wide>
              <DetailLabel>Reference number</DetailLabel>
              <DetailValue>{referenceCode}</DetailValue>
            </DetailItem>
          )}
        </DetailGrid>
      </CardContent>
    </Card>
  );
}
