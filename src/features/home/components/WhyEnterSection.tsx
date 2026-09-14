import { Reveal } from "@/shared/components";
import {
  Section,
  SectionShell,
  Eyebrow,
  Heading,
  Benefits,
  Benefit,
  BenefitIcon,
  BenefitTitle,
  BenefitText,
} from "./WhyEnterSection.styles";

const BENEFITS = [
  {
    number: "01",
    title: "Represent your community",
    text: "Carry the voice, pride and possibility of your LGA.",
  },
  {
    number: "02",
    title: "Lead with mentorship",
    text: "Grow through guidance, connection and shared experience.",
  },
  {
    number: "03",
    title: "Unlock your potential",
    text: "Access visibility, empowerment and new opportunities.",
  },
  {
    number: "04",
    title: "Be recognised statewide",
    text: "Stand for a new generation of Akwa Ibom excellence.",
  },
];

export function WhyEnterSection() {
  return (
    <Section id="why-enter">
      <SectionShell>
        <Reveal>
          <Eyebrow>THE PLATFORM</Eyebrow>
          <Heading>
            More than a title.
            <br />
            <em>A lasting platform.</em>
          </Heading>
          <Benefits>
            {BENEFITS.map(({ number, title, text }) => (
              <Benefit key={number}>
                <BenefitIcon>{number}</BenefitIcon>
                <div>
                  <BenefitTitle>{title}</BenefitTitle>
                  <BenefitText>{text}</BenefitText>
                </div>
              </Benefit>
            ))}
          </Benefits>
        </Reveal>
      </SectionShell>
    </Section>
  );
}
