import { FileText, ImageOff } from "lucide-react";
import { format } from "date-fns";
import type { User } from "@/features/auth";
import type { RegistrationFormValues } from "../schema";
import type { RegistrationPhotoDataUrls } from "../types";
import {
  Section,
  SectionTitle,
  DetailGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  PhotoRow,
  PhotoThumb,
  PhotoPlaceholder,
} from "./ApplicationSummary.styles";

export interface ApplicationSummaryProps {
  user: User;
  values: RegistrationFormValues;
  // Preview sources for display only — object URLs while still on the
  // form, data URLs once persisted. Optional/partial because a record
  // saved by an older version of this app (or otherwise incomplete) may
  // be missing one or all of these — never assume the whole object, or
  // any given key, is present. See PhotoOrPlaceholder below.
  photos?: Partial<RegistrationPhotoDataUrls>;
}

function isPdf(src: string) {
  return (
    src.startsWith("data:application/pdf") || src.toLowerCase().endsWith(".pdf")
  );
}

function PhotoOrPlaceholder({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <PhotoPlaceholder role="img" aria-label={`${alt} not on file`}>
        <ImageOff size={20} aria-hidden />
      </PhotoPlaceholder>
    );
  }
  if (isPdf(src)) {
    return (
      <a href={src} target="_blank" rel="noopener noreferrer">
        <FileText size={32} />
      </a>
    );
  }
  return <img src={src} alt={alt} />;
}

export function ApplicationSummary({
  user,
  values,
  photos = {},
}: ApplicationSummaryProps) {
  return (
    <>
      <Section>
        <SectionTitle>Personal information</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <DetailLabel>Surname</DetailLabel>
            <DetailValue>{user.lastName}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>First name</DetailLabel>
            <DetailValue>{user.firstName}</DetailValue>
          </DetailItem>
          {values.middleName && (
            <DetailItem>
              <DetailLabel>Middle name</DetailLabel>
              <DetailValue>{values.middleName}</DetailValue>
            </DetailItem>
          )}
          <DetailItem>
            <DetailLabel>Phone number</DetailLabel>
            <DetailValue>{values.phone}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Email address</DetailLabel>
            <DetailValue>{user.email}</DetailValue>
          </DetailItem>
          {values.socialMedia && (
            <DetailItem $wide>
              <DetailLabel>Social media handles</DetailLabel>
              <DetailValue>{values.socialMedia}</DetailValue>
            </DetailItem>
          )}
          <DetailItem>
            <DetailLabel>Next of kin</DetailLabel>
            <DetailValue>{values.nextOfKin}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Next of kin phone</DetailLabel>
            <DetailValue>{values.nextOfKinPhone}</DetailValue>
          </DetailItem>
        </DetailGrid>
        <PhotoRow>
          <PhotoThumb>
            <PhotoOrPlaceholder
              src={photos.passportPhoto}
              alt="Passport photograph preview"
            />
            <figcaption>Passport photograph</figcaption>
          </PhotoThumb>
        </PhotoRow>
      </Section>

      <Section>
        <SectionTitle>Identity &amp; origin</SectionTitle>
        <DetailGrid>
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
          <DetailItem $wide>
            <DetailLabel>National Identification Number (NIN)</DetailLabel>
            <DetailValue>{user.nin}</DetailValue>
          </DetailItem>
          <DetailItem $wide>
            <DetailLabel>Voter Identification Number (VIN)</DetailLabel>
            <DetailValue>{user.vin}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Local Government Area</DetailLabel>
            <DetailValue>{user.lga}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Ward</DetailLabel>
            <DetailValue>{user.ward}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Village</DetailLabel>
            <DetailValue>{values.village}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>State of residence</DetailLabel>
            <DetailValue>{values.residenceState}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Town / city of residence</DetailLabel>
            <DetailValue>{values.city}</DetailValue>
          </DetailItem>
          <DetailItem $wide>
            <DetailLabel>Home address</DetailLabel>
            <DetailValue>{values.address}</DetailValue>
          </DetailItem>
        </DetailGrid>
        <PhotoRow>
          <PhotoThumb>
            <PhotoOrPlaceholder
              src={photos.certificateOfOrigin}
              alt="Certificate of Origin preview"
            />
            <figcaption>Certificate of Origin</figcaption>
          </PhotoThumb>
        </PhotoRow>
      </Section>

      <Section>
        <SectionTitle>Education &amp; background</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <DetailLabel>Highest qualification</DetailLabel>
            <DetailValue>{values.education}</DetailValue>
          </DetailItem>
          {values.institution && (
            <DetailItem>
              <DetailLabel>Institution attended</DetailLabel>
              <DetailValue>{values.institution}</DetailValue>
            </DetailItem>
          )}
          <DetailItem>
            <DetailLabel>Occupation</DetailLabel>
            <DetailValue>{values.occupation}</DetailValue>
          </DetailItem>
          <DetailItem $wide>
            <DetailLabel>Talent(s)</DetailLabel>
            <DetailValue>{values.talents}</DetailValue>
          </DetailItem>
          <DetailItem $wide>
            <DetailLabel>Languages spoken</DetailLabel>
            <DetailValue>{values.languages}</DetailValue>
          </DetailItem>
        </DetailGrid>
        <PhotoRow>
          <PhotoThumb>
            <PhotoOrPlaceholder src={photos.fullImage} alt="Full image preview" />
            <figcaption>Full image</figcaption>
          </PhotoThumb>
        </PhotoRow>
      </Section>

      <Section>
        <SectionTitle>Your story</SectionTitle>
        <DetailGrid>
          {values.initiative && (
            <DetailItem $wide>
              <DetailLabel>Community initiative, business or skill</DetailLabel>
              <DetailValue>{values.initiative}</DetailValue>
            </DetailItem>
          )}
          <DetailItem $wide>
            <DetailLabel>Why Mbopo Akwa Ibom?</DetailLabel>
            <DetailValue>{values.why}</DetailValue>
          </DetailItem>
        </DetailGrid>
      </Section>
    </>
  );
}
