import { ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal } from "@/shared/components";
import {
  Section,
  SectionShell,
  Header,
  EyebrowRow,
  EyebrowRule,
  Eyebrow,
  Title,
  Subtitle,
  Panel,
  PanelHeader,
  PanelHeading,
  PanelSubheading,
  RequiredBadge,
  CriteriaGrid,
  CriteriaCard,
  CriteriaIndex,
  CriteriaText,
  CtaCell,
  CtaCellText,
  RegisterLink,
} from "./EligibilitySection.styles";

const ELIGIBILITY_CRITERIA = [
  "Must be female",
  "Must be an indigene of Akwa Ibom State",
  "Must be a graduate (minimum of B.Sc. or HND)",
  "Must be between 22 and 27 years old",
  "Must have a National Identification Number (NIN)",
  "Must have a Certificate of Origin",
  "Must have a Voter Identification Number (VIN)",
  "Must have a passport photograph",
];

export function EligibilitySection() {
  return (
    <Section id="eligibility">
      <SectionShell>
        <Reveal>
          <Header>
            <EyebrowRow>
              <EyebrowRule />
              <Eyebrow>Eligibility</Eyebrow>
              <EyebrowRule />
            </EyebrowRow>
            <Title>Who can apply?</Title>
            <Subtitle>
              Make sure you meet every requirement below before you start your
              application.
            </Subtitle>
          </Header>

          <Panel>
            <PanelHeader>
              <div>
                <PanelHeading>Eligibility Requirements</PanelHeading>
                <PanelSubheading>
                  All {ELIGIBILITY_CRITERIA.length} conditions must be met at
                  the time of application.
                </PanelSubheading>
              </div>
              <RequiredBadge>
                <ShieldCheck size={14} />
                All {ELIGIBILITY_CRITERIA.length} Required
              </RequiredBadge>
            </PanelHeader>

            <CriteriaGrid>
              {ELIGIBILITY_CRITERIA.map((text, index) => (
                <CriteriaCard key={text}>
                  <CriteriaIndex>
                    {String(index + 1).padStart(2, "0")}
                  </CriteriaIndex>
                  <CriteriaText>{text}</CriteriaText>
                </CriteriaCard>
              ))}
              <CtaCell>
                <CtaCellText>
                  Meet all {ELIGIBILITY_CRITERIA.length} conditions?
                </CtaCellText>
                <RegisterLink to="/register">
                  Register Now <ArrowRight size={15} />
                </RegisterLink>
              </CtaCell>
            </CriteriaGrid>
          </Panel>
        </Reveal>
      </SectionShell>
    </Section>
  );
}
