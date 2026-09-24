import type { LucideIcon } from "lucide-react";
import {
  Check,
  ClipboardList,
  Crown,
  ScanSearch,
  UserPlus,
} from "lucide-react";
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
  Steps,
  Step,
  BadgeRow,
  Index,
  Connector,
  Card,
  CardTop,
  CardTitle,
  CardText,
  CardDivider,
  ChecklistLabel,
  Checklist,
  ChecklistItem,
} from "./HowItWorksSection.styles";

interface ProcessStep {
  icon: LucideIcon;
  title: string;
  text: string;
  checklistLabel: string;
  checklist: string[];
  final?: boolean;
}

const STEPS: ProcessStep[] = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    text: "Sign up on the Mbopo Akwa Ibom portal with your personal details, including a National Identification Number (NIN) that matches your records.",
    checklistLabel: "What you'll need",
    checklist: [
      "Valid National Identification Number (NIN)",
      "Active email address",
      "Phone number",
    ],
  },
  {
    icon: ClipboardList,
    title: "Complete Your Application",
    text: "Log in and fill out the application form: your personal details, LGA of origin, education history and your story. Upload a clear passport photograph.",
    checklistLabel: "Required documents",
    checklist: [
      "Certificate of Origin",
      "Voter Identification Number (VIN)",
      "Passport photograph",
      "Academic qualification (B.Sc. or HND)",
    ],
  },
  {
    icon: ScanSearch,
    title: "Verification",
    text: "Your application undergoes verification, checking your NIN, Certificate of Origin and academic qualification to confirm your eligibility.",
    checklistLabel: "What happens",
    checklist: [
      "NIN matched against your application",
      "Certificate of Origin confirmed",
      "SMS and email updates on your status",
    ],
  },
  {
    icon: Crown,
    title: "Compete For The Crown",
    text: "Verified applicants advance to LGA pageants and Senatorial finals, then a residential camp leading into the statewide Grand Finale, where one woman is crowned Mbopo Akwa Ibom.",
    checklistLabel: "The journey ahead",
    checklist: [
      "LGA pageant, one of 93 held statewide",
      "Senatorial finals, 31 contestants",
      "Camp and the statewide Grand Finale",
    ],
    final: true,
  },
];

export function HowItWorksSection() {
  return (
    <Section id="how-it-works">
      <SectionShell>
        <Reveal>
          <Header>
            <EyebrowRow>
              <EyebrowRule />
              <Eyebrow>Process</Eyebrow>
            </EyebrowRow>
            <Title>Simple. Transparent. Purposeful.</Title>
            <Subtitle>
              The Mbopo Akwa Ibom application process is designed to be
              straightforward and accessible. Four steps stand between you and
              the crown.
            </Subtitle>
          </Header>

          <Steps>
            {STEPS.map(
              (
                { icon: Icon, title, text, checklistLabel, checklist, final },
                index,
              ) => (
                <Step key={title}>
                  <BadgeRow>
                    <Index $final={final}>
                      {String(index + 1).padStart(2, "0")}
                    </Index>
                    {index < STEPS.length - 1 && <Connector />}
                  </BadgeRow>
                  <Card $final={final}>
                    <CardTop>
                      <CardTitle>{title}</CardTitle>
                      <Icon size={22} strokeWidth={1.75} />
                    </CardTop>
                    <CardText $final={final}>{text}</CardText>
                    <CardDivider $final={final}>
                      <ChecklistLabel $final={final}>
                        {checklistLabel}
                      </ChecklistLabel>
                      <Checklist>
                        {checklist.map((item) => (
                          <ChecklistItem key={item} $final={final}>
                            <Check size={13} strokeWidth={3} />
                            <span>{item}</span>
                          </ChecklistItem>
                        ))}
                      </Checklist>
                    </CardDivider>
                  </Card>
                </Step>
              ),
            )}
          </Steps>
        </Reveal>
      </SectionShell>
    </Section>
  );
}
