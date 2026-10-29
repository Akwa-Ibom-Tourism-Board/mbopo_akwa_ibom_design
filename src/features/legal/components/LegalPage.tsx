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
  SubList,
} from "./LegalContent.styles";

// An ordered sequence of blocks, not a fixed "intro paragraphs then one
// list" shape — some sections (e.g. eligibility, prohibited conduct) have
// a lettered sub-list in the middle of several numbered clauses, not just
// trailing at the end, and the source legal document's own clause order
// has to be preserved exactly.
export type LegalBlock =
  | { type: "paragraph"; text: string }
  // "bullet" for a plain list of items; "lettered" for an a./b./c.
  // sub-clause list nested under a numbered clause (the source document
  // distinguishes these, and collapsing them to one style would blur
  // actual clause-letter references like "clause 7.2(b)").
  | { type: "list"; style: "bullet" | "lettered"; items: string[] };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalPageProps {
  documentTitle: string;
  eyebrow: string;
  title: string;
  updatedAt: string;
  // Unnumbered lead-in paragraphs rendered before the numbered sections —
  // the governing-law/acceptance framing most legal documents open with.
  intro?: string[];
  sections: LegalSection[];
}

export function LegalPage({
  documentTitle,
  eyebrow,
  title,
  updatedAt,
  intro,
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
            {intro?.map((paragraph) => (
              <Paragraph key={paragraph}>{paragraph}</Paragraph>
            ))}
            {sections.map((section) => (
              <Section key={section.heading}>
                <SectionTitle>{section.heading}</SectionTitle>
                {section.blocks.map((block, index) => {
                  if (block.type === "paragraph") {
                    return <Paragraph key={index}>{block.text}</Paragraph>;
                  }
                  const ListComponent =
                    block.style === "lettered" ? SubList : List;
                  return (
                    <ListComponent key={index}>
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ListComponent>
                  );
                })}
              </Section>
            ))}
          </Prose>
        </Container>
      </PageFrame>
    </PageShell>
  );
}
