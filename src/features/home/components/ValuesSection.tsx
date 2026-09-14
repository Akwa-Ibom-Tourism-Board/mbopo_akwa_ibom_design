import { Sparkles } from "lucide-react";
import { Reveal } from "@/shared/components";
import {
  Section,
  SectionShell,
  Inner,
  Title,
  Copy,
} from "./ValuesSection.styles";

export function ValuesSection() {
  return (
    <Section>
      <SectionShell>
        <Reveal>
          <Inner>
            <Sparkles size={20} />
            <Title>Beauty · Culture · Enterprise</Title>
            <Copy>Your story belongs on the state stage.</Copy>
          </Inner>
        </Reveal>
      </SectionShell>
    </Section>
  );
}
