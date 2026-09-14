import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/ui";
import type { User } from "@/features/auth";
import {
  DetailGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
} from "./ProfileSummaryCard.styles";

export function ProfileSummaryCard({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your details</CardTitle>
        <CardDescription>
          Verified from your National Identification Number.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DetailGrid>
          <DetailItem>
            <DetailLabel>First name</DetailLabel>
            <DetailValue>{user.firstName}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Last name</DetailLabel>
            <DetailValue>{user.lastName}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>NIN</DetailLabel>
            <DetailValue>{user.nin}</DetailValue>
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
          <DetailItem>
            <DetailLabel>Email</DetailLabel>
            <DetailValue>{user.email}</DetailValue>
          </DetailItem>
        </DetailGrid>
      </CardContent>
    </Card>
  );
}
