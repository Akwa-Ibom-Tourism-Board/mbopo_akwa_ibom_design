import { LegalPage, type LegalSection } from "../components/LegalPage";

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Acceptance of these Terms",
    paragraphs: [
      "By registering for or participating in Mbobpo Akwa Ibom, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not proceed with registration.",
    ],
  },
  {
    heading: "2. Eligibility",
    paragraphs: [
      "To be eligible to apply, you must meet all of the following criteria:",
    ],
    list: [
      "Be an indigene of Akwa Ibom State",
      "Be a graduate",
      "Be between 22 and 27 years of age",
      "Hold a valid National Identification Number (NIN)",
      "Have a current passport photograph",
    ],
  },
  {
    heading: "3. Registration & Identity Verification",
    paragraphs: [
      "Applications begin with a lookup of your National Identification Number to confirm your identity, gender, and age before you may proceed. The name, date of birth, gender, and NIN returned by this lookup cannot be edited during registration, as they form the verified basis of your application.",
      "You are responsible for the accuracy of every other detail you submit, including your contact information, educational background, and personal statement. Providing false or misleading information may result in disqualification at any stage.",
    ],
  },
  {
    heading: "4. Applicant Conduct",
    paragraphs: [
      "Applicants are expected to conduct themselves with honesty and respect throughout the application and selection process. The organizers reserve the right to disqualify any applicant whose conduct is found to be inconsistent with the values of the program.",
    ],
  },
  {
    heading: "5. Use of Photographs & Media",
    paragraphs: [
      "Photographs and images submitted as part of your application may be used by the Akwa Ibom State Hotels & Tourism Development Commission for purposes directly related to the program, including promotional and archival use.",
    ],
  },
  {
    heading: "6. Disqualification",
    paragraphs: [
      "The organizers reserve the right to disqualify an application at any stage — before, during, or after selection — where eligibility criteria are not met or where information provided is later found to be inaccurate.",
    ],
  },
  {
    heading: "7. Changes to these Terms",
    paragraphs: [
      "These Terms & Conditions may be updated from time to time. Continued use of the platform after changes are published constitutes acceptance of the revised terms.",
    ],
  },
  {
    heading: "8. Contact",
    paragraphs: [
      "Questions about these terms can be directed to the Akwa Ibom State Hotels & Tourism Development Commission.",
    ],
  },
];

export function TermsPage() {
  return (
    <LegalPage
      documentTitle="Terms & Conditions"
      eyebrow="Legal"
      title="Terms & Conditions"
      updatedAt="14 September 2026"
      sections={SECTIONS}
    />
  );
}
