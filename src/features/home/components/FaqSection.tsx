import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/shared/components";
import {
  Section,
  SectionShell,
  Grid,
  Intro,
  EyebrowRow,
  EyebrowRule,
  Eyebrow,
  Title,
  Subtitle,
  ContactNote,
  List,
  Item,
  Question,
  IconFrame,
  Answer,
  AnswerInner,
  AnswerText,
} from "./FaqSection.styles";

const FAQS = [
  {
    question: "Who is eligible to apply for Mbopo Akwa Ibom?",
    answer:
      "Any female indigene of Akwa Ibom State, aged between 22 and 27, who holds a minimum of a B.Sc. or HND, a valid NIN, VIN and Certificate of Origin.",
  },
  {
    question: "Is there any fee to apply?",
    answer:
      "No. Registration for Mbopo Akwa Ibom is completely free. You should never be asked to pay to submit your application.",
  },
  {
    question: "Can I apply from outside Akwa Ibom State?",
    answer:
      "Yes, you can apply from anywhere, as long as you are an indigene of Akwa Ibom State and hold a valid Certificate of Origin.",
  },
  {
    question: "What documents do I need to have ready?",
    answer:
      "You'll need your NIN, VIN, Certificate of Origin, a recent passport photograph and proof of your academic qualification before you start.",
  },
  {
    question: "What is Mbopo judged on?",
    answer:
      "Judges score across a whole person standard. Presence and poise carry only a small share of the marks; character, cultural knowledge and purposeful leadership carry the rest.",
  },
  {
    question: "How will I know if my application was successful?",
    answer:
      "You'll receive SMS and email updates as your application moves through verification, and shortlisted applicants are contacted directly ahead of their LGA pageant.",
  },
  {
    question: "What happens after I'm shortlisted?",
    answer:
      "Shortlisted applicants compete through LGA pageants and Senatorial finals, then a residential camp leading into the statewide Grand Finale, where one woman is crowned Mbopo Akwa Ibom for a year of purposeful representation.",
  },
  {
    question: "How do I track my application status?",
    answer:
      "Log in to your dashboard at any time to see your current application status and reference code.",
  },
  {
    question: "Who do I contact for help?",
    answer:
      "Reach the Akwa Ibom State Hotels & Tourism Development Commission using the contact details in the footer below.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq">
      <SectionShell>
        <Reveal>
          <Grid>
            <Intro>
              <EyebrowRow>
                <EyebrowRule />
                <Eyebrow>FAQ</Eyebrow>
              </EyebrowRow>
              <Title>Frequently Asked Questions</Title>
              <Subtitle>
                Common questions about the Mbopo Akwa Ibom program.
              </Subtitle>
              <ContactNote>
                Still have questions? Reach the Akwa Ibom State Hotels &amp;
                Tourism Development Commission; see the contact details in the
                footer below.
              </ContactNote>
            </Intro>

            <List>
              {FAQS.map(({ question, answer }, index) => {
                const open = openIndex === index;
                return (
                  <Item key={question}>
                    <Question
                      type="button"
                      $open={open}
                      aria-expanded={open}
                      onClick={() => setOpenIndex(open ? null : index)}
                    >
                      <span>{question}</span>
                      <IconFrame $open={open}>
                        <Plus size={15} />
                      </IconFrame>
                    </Question>
                    <Answer $open={open}>
                      <AnswerInner>
                        <AnswerText>{answer}</AnswerText>
                      </AnswerInner>
                    </Answer>
                  </Item>
                );
              })}
            </List>
          </Grid>
        </Reveal>
      </SectionShell>
    </Section>
  );
}
