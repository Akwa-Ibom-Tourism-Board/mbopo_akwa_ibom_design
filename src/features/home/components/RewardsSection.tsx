import type { LucideIcon } from "lucide-react";
import { Car, Gift, Landmark } from "lucide-react";
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
  RewardsGrid,
  RewardCard,
  RewardIcon,
  RewardTitle,
  RewardText,
} from "./RewardsSection.styles";

interface Reward {
  icon: LucideIcon;
  title: string;
  text?: string;
}

const REWARDS: Reward[] = [
  {
    icon: Car,
    title: "Brand New Car",
    // text: "Mbopo Akwa Ibom drives into her reign of purposeful representation with a brand new car.",
  },
  {
    icon: Gift,
    title: "A Mouth Watering Cash Prize",
    // text: "A cash prize",
  },
  {
    icon: Landmark,
    title: "The Prestigious Office of",
    text: "Mbopo Akwa Ibom in the Governor’s Office",
  },
  // {
  //   icon: Gift,
  //   title: "Consolation Prizes",
  //   // text: "Runners-up and outstanding finalists are recognised with consolation prizes for their journey and impact.",
  // },
];

export function RewardsSection() {
  return (
    <Section id="rewards">
      <SectionShell>
        <Reveal>
          <Header>
            <EyebrowRow>
              <EyebrowRule />
              <Eyebrow>Rewards</Eyebrow>
              <EyebrowRule />
            </EyebrowRow>
            <Title>THE CROWN COMES WITH MORE</Title>
            <Subtitle>
              Beyond the crown, Mbopo Akwa Ibom comes with recognition and
              reward for the woman who carries it.
            </Subtitle>
          </Header>

          <Panel>
            <RewardsGrid>
              {REWARDS.map(({ icon: Icon, title, text }) => (
                <RewardCard key={title}>
                  <RewardIcon>
                    <Icon size={22} strokeWidth={1.75} />
                  </RewardIcon>
                  <RewardTitle>{title}</RewardTitle>
                  <RewardText>{text}</RewardText>
                </RewardCard>
              ))}
            </RewardsGrid>
          </Panel>
        </Reveal>
      </SectionShell>
    </Section>
  );
}
