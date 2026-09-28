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
              Mbopo Akwa Ibom is a cultural pageant celebrating beauty, culture,
              character and purpose. It is a platform for women to proudly
              represent their communities with grace, inspire others through
              their character and purpose, and carry the rich story and heritage
              of Akwa Ibom forward.
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
