import { Quote } from "lucide-react";
import { Reveal } from "@/shared/components";
import {
  Section,
  SectionShell,
  SectionEyebrow,
  SectionTitle,
  Accent,
  AboutGrid,
  AboutLead,
  AboutNote,
  Stats,
  Stat,
  StatNumber,
  StatLabel,
} from "./AboutSection.styles";

const LGA_COUNT = "31";

export function AboutSection() {
  return (
    <Section id="about">
      <SectionShell>
        <Reveal>
          <SectionEyebrow>THE CROWN WITHIN</SectionEyebrow>
          <SectionTitle>
            Where beauty becomes <Accent>purpose.</Accent>
          </SectionTitle>
          <AboutGrid>
            <AboutLead>
              Mbopo Akwa Ibom is a state backed cultural pageant celebrating
              beauty, culture, character and purpose. It is a platform for women
              to represent their communities with grace, and to carry Akwa
              Ibom&apos;s story further.
            </AboutLead>
            <AboutNote>
              <Quote size={22} />
              <span>
                One woman. One state. A year of meaningful representation.
              </span>
            </AboutNote>
          </AboutGrid>
          <Stats>
            <Stat>
              <StatNumber>{LGA_COUNT}</StatNumber>
              <StatLabel>LGAs represented</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>01</StatNumber>
              <StatLabel>State, one crown</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>365</StatNumber>
              <StatLabel>Days of ambassadorship</StatLabel>
            </Stat>
          </Stats>
        </Reveal>
      </SectionShell>
    </Section>
  );
}
