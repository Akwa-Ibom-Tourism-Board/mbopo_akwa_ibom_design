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
  ComplianceNote,
  ComplianceLink,
} from "./EligibilitySection.styles";

const ELIGIBILITY_CRITERIA = [
  "Must be female (gender verified via NIN)",
  "Must be an indigene of Akwa Ibom State",
  "Must be a graduate (minimum of B.Sc., HND or equivalent)",
  "Must be between 22 and 27 years old (age verified via NIN)",
  "Must have a National Identification Number (NIN)",
  "Must have a Certificate of Origin",
  "Must have a Voter Identification Number (VIN)",
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
              Applicants must meet the following requirements to be eligible to
              apply. Every application is reviewed through the full, competitive
              selection process.
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
              {/* <CtaCell>
                <CtaCellText>
                  Meet all {ELIGIBILITY_CRITERIA.length} conditions?
                </CtaCellText>
                <RegisterLink to="/register">
                  Register Now <ArrowRight size={15} />
                </RegisterLink>
              </CtaCell> */}
            </CriteriaGrid>
          </Panel>

          <ComplianceNote>
            Ensure you read the{" "}
            <ComplianceLink to="/terms">terms and conditions</ComplianceLink>{" "}
            and <ComplianceLink to="/privacy">privacy policy</ComplianceLink>{" "}
            before you register.
          </ComplianceNote>
        </Reveal>
      </SectionShell>
    </Section>
  );
}
