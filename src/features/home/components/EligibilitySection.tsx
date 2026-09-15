import {
  ArrowRight,
  Cake,
  FileText,
  GraduationCap,
  IdCard,
  MapPinned,
  ScanFace,
  ScrollText,
  UserRound,
} from "lucide-react";
import { Reveal } from "@/shared/components";
import {
  Section,
  SectionShell,
  Header,
  Eyebrow,
  Title,
  Subtitle,
  CriteriaGrid,
  CriteriaCard,
  CriteriaIcon,
  CriteriaText,
  CtaRow,
  RegisterLink,
} from "./EligibilitySection.styles";

const ELIGIBILITY_CRITERIA = [
  { icon: UserRound, text: "Must be female" },
  { icon: MapPinned, text: "Must be an indigene of Akwa Ibom State" },
  { icon: GraduationCap, text: "Must be a graduate (Minimum of B.Sc. or HND)" },
  { icon: Cake, text: "Must be between 22 and 27 years old" },
  { icon: IdCard, text: "Must have a National Identification Number (NIN)" },
  { icon: ScrollText, text: "Must have a Certificate of Origin" },
  {
    icon: FileText,
    text: "Must have Voter Identification Number (VIN)",
  },
  { icon: ScanFace, text: "Must have a passport photograph" },
];

export function EligibilitySection() {
  return (
    <Section id="eligibility">
      <SectionShell>
        <Reveal>
          <Header>
            <Eyebrow>BEFORE YOU BEGIN</Eyebrow>
            <Title>Eligibility criteria</Title>
            <Subtitle>
              Make sure you meet every requirement below before you start your
              application.
            </Subtitle>
          </Header>
          <CriteriaGrid>
            {ELIGIBILITY_CRITERIA.map(({ icon: Icon, text }) => (
              <CriteriaCard key={text}>
                <CriteriaIcon>
                  <Icon size={18} />
                </CriteriaIcon>
                <CriteriaText>{text}</CriteriaText>
              </CriteriaCard>
            ))}
          </CriteriaGrid>
          <CtaRow>
            <RegisterLink to="/register">
              Register Now <ArrowRight size={16} />
            </RegisterLink>
          </CtaRow>
        </Reveal>
      </SectionShell>
    </Section>
  );
}
