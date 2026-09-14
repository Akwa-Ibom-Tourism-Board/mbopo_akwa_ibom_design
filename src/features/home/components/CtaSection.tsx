import { ArrowRight } from "lucide-react";
import { Reveal } from "@/shared/components";
import {
  Section,
  Inner,
  Eyebrow,
  Title,
  Copy,
  RegisterLink,
} from "./CtaSection.styles";

export function CtaSection() {
  return (
    <Section>
      <Reveal>
        <Inner>
          <Eyebrow>THE NEXT CHAPTER</Eyebrow>
          <Title>
            Represent your
            <br />
            <em>Akwa Ibom.</em>
          </Title>
          <Copy>
            Applications are open — represent your Local Government Area.
          </Copy>
          <RegisterLink to="/register">
            Begin your application <ArrowRight size={17} />
          </RegisterLink>
        </Inner>
      </Reveal>
    </Section>
  );
}
