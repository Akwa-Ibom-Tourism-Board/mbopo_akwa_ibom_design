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
    title: "Represent your LGA",
    text: "Compete from Ward and LGA pageants through to the Senatorial finals, carrying your community's pride all the way to the state stage.",
  },
  {
    number: "02",
    title: "Be judged on substance",
    text: "Presence and poise carry only a small share of the score; character, culture and purpose carry the rest.",
  },
  {
    number: "03",
    title: "Grow the creative economy",
    text: "Every wrapper, bead and hairstyle you wear commissions a local tailor, stylist or artisan.",
  },
  {
    number: "04",
    title: "Serve for a full year",
    text: "Wear the crown for 365 days as a tourism ambassador, with your impact tracked and celebrated statewide.",
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
