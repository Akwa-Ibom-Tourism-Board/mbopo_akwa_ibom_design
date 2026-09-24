import { ArrowRight } from "lucide-react";
import { Reveal } from "@/shared/components";
import {
  Section,
  Inner,
  EyebrowRow,
  EyebrowRule,
  Eyebrow,
  Title,
  Copy,
  Actions,
  RegisterLink,
  GhostLink,
} from "./CtaSection.styles";

export function CtaSection() {
  return (
    <Section>
      <Reveal>
        <Inner>
          <EyebrowRow>
            <EyebrowRule />
            <Eyebrow>Start Your Application</Eyebrow>
          </EyebrowRow>
          <Title>
            Represent your
            <br />
            <em>Akwa Ibom.</em>
          </Title>
          <Copy>
            Applications are open; represent your Local Government Area.
          </Copy>
          <Actions>
            <RegisterLink to="/register">
              Begin your application <ArrowRight size={17} />
            </RegisterLink>
            <GhostLink to="/#eligibility">View Requirements</GhostLink>
          </Actions>
        </Inner>
      </Reveal>
    </Section>
  );
}
