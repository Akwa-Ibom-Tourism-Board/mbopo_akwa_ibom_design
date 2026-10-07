import { useState } from "react";
import { FileText, ImageOff } from "lucide-react";
import { format } from "date-fns";
import type { VerifiedUser } from "@/features/auth";
import type { RegistrationFormValues } from "../schema";
import type { RegistrationPhotoUrls } from "../types";
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
  VideoPreview,
} from "./ApplicationSummary.styles";

export interface ApplicationSummaryProps {
  user: VerifiedUser;
  values: Partial<RegistrationFormValues>;
  // Preview sources for display only — a local object URL while still on
  // the form (not yet confirmed uploaded), a Cloudinary URL once saved.
  // Optional/partial because an in-progress draft may be missing any of
  // these — never assume the whole object, or any given key, is present.
  // See PhotoOrPlaceholder below.
  photos?: Partial<RegistrationPhotoUrls>;
  // Local object URL while still on the form, or the Cloudinary URL once
  // the video pitch has been submitted and locked.
  videoPreviewUrl?: string;
}

function isPdf(src: string) {
  return src.toLowerCase().endsWith(".pdf");
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

// A video element given a URL that fails to load (network hiccup, a stale
// local object URL from before a reload) would otherwise sit stuck
// "loading" forever — falling back to the same placeholder as a missing
// photo is more honest than that silent spin.
function VideoOrPlaceholder({ src }: { src?: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <PhotoPlaceholder role="img" aria-label="Video pitch not on file">
        <ImageOff size={20} aria-hidden />
      </PhotoPlaceholder>
    );
  }

  return (
    <VideoPreview
      src={src}
      controls
      playsInline
      onError={() => setFailed(true)}
    />
  );
}

export function ApplicationSummary({
  user,
  values,
  photos = {},
  videoPreviewUrl,
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
          <DetailItem>
            <DetailLabel>Relationship with next of kin</DetailLabel>
            <DetailValue>{values.nextOfKinRelationship}</DetailValue>
          </DetailItem>
        </DetailGrid>
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
            <DetailValue>{values.vin}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Local Government Area</DetailLabel>
            <DetailValue>{values.localGovernment}</DetailValue>
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
              <DetailValue>
                {values.institution === "Other"
                  ? values.institutionOther
                  : values.institution}
              </DetailValue>
            </DetailItem>
          )}
          <DetailItem>
            <DetailLabel>Occupation</DetailLabel>
            <DetailValue>
              {values.occupation === "Other"
                ? values.occupationOther
                : values.occupation}
            </DetailValue>
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
      </Section>

      <Section>
        <SectionTitle>Pitch</SectionTitle>
        <VideoOrPlaceholder src={videoPreviewUrl} />
        <PhotoRow>
          <PhotoThumb>
            <PhotoOrPlaceholder
              src={photos.fullImage}
              alt="Full image 1 preview"
            />
            <figcaption>Full image 1</figcaption>
          </PhotoThumb>
          <PhotoThumb>
            <PhotoOrPlaceholder
              src={photos.fullImage2}
              alt="Full image 2 preview"
            />
            <figcaption>Full image 2</figcaption>
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
