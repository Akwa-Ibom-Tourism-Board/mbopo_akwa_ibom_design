import { useEffect } from "react";
import { PageShell, PageHeroBanner, Container } from "@/shared/components";
import {
  PageFrame,
  Prose,
  UpdatedAt,
  Section,
  SectionTitle,
  Paragraph,
  List,
} from "./LegalContent.styles";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalPageProps {
  documentTitle: string;
  eyebrow: string;
  title: string;
  updatedAt: string;
  sections: LegalSection[];
}

export function LegalPage({
  documentTitle,
  eyebrow,
  title,
  updatedAt,
  sections,
}: LegalPageProps) {
  useEffect(() => {
    document.title = `${documentTitle} | Mbopo Akwa Ibom`;
  }, [documentTitle]);

  return (
    <PageShell>
      <PageHeroBanner eyebrow={eyebrow} title={title} />
      <PageFrame>
        <Container>
          <Prose>
            <UpdatedAt>Last updated: {updatedAt}</UpdatedAt>
            {sections.map((section) => (
              <Section key={section.heading}>
                <SectionTitle>{section.heading}</SectionTitle>
                {section.paragraphs.map((paragraph) => (
                  <Paragraph key={paragraph}>{paragraph}</Paragraph>
                ))}
                {section.list && (
                  <List>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </List>
                )}
              </Section>
            ))}
          </Prose>
        </Container>
      </PageFrame>
    </PageShell>
  );
}
