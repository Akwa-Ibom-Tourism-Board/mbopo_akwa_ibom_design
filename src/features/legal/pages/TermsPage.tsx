import { LegalPage, type LegalSection } from "../components/LegalPage";

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Acceptance of these Terms",
    paragraphs: [
      "By registering for or participating in Mbopo Akwa Ibom, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not proceed with registration.",
    ],
  },
  {
    heading: "2. Eligibility",
    paragraphs: [
      "To be eligible to apply, you must meet all of the following criteria:",
    ],
    list: [
      "Be female",
      "Be an indigene of Akwa Ibom State",
      "Be a graduate (minimum of B.Sc., HND or equivalent)",
      "Be between 22 and 27 years of age",
      "Hold a valid National Identification Number (NIN)",
      "Hold a valid Certificate of Origin",
      "Hold a valid Voter Identification Number (VIN)",
    ],
  },
  {
    heading: "3. No Guarantee of Selection",
    paragraphs: [
      "Meeting the eligibility criteria and submitting a complete application does not guarantee selection as Mbopo Akwa Ibom or advancement to any stage of the program. Every application is reviewed through a competitive, multi-stage selection process (including Local Government Area and Senatorial pageants, camp, and the Grand Finale), and eligibility alone does not entitle an applicant to advance, be shortlisted, or be selected.",
    ],
  },
  {
    heading: "4. No Application Fee",
    paragraphs: [
      "Registration and application for Mbopo Akwa Ibom are completely free. At no stage of the process — registration, verification, selection, or otherwise — will you be asked to pay any fee to the organizers or their representatives.",
      "If anyone requests payment, a gift, or any other consideration in exchange for registering, advancing, or being selected, this is fraudulent and not authorized by the Akwa Ibom State Hotels & Tourism Development Commission. Please report any such request using the contact details on this site.",
    ],
  },
  {
    heading: "5. Registration & Identity Verification",
    paragraphs: [
      "You register with just your email and password, verify your email, and log in. The first step of the application form itself is a one-time identity verification: you enter your National Identification Number together with your name, and confirm it is really you with a live photo taken on the platform, which is checked against your NIN record and also becomes your profile photo. The name, date of birth, and gender confirmed at this step cannot be edited afterward, as they form the verified basis of your application.",
      "Your Voter Identification Number is confirmed separately, when you submit your completed application. If it cannot be found, you will be asked to check it and resubmit; if it is found but does not fully match your verified identity, your application can still be submitted, and this is recorded for the selection panel's review.",
      "You are responsible for the accuracy of every other detail you submit, including your contact information, educational background, and personal statement. Providing false or misleading information may result in disqualification at any stage.",
    ],
  },
  {
    heading: "6. Applicant Conduct",
    paragraphs: [
      "Applicants are expected to conduct themselves with honesty and respect throughout the application and selection process. The organizers reserve the right to disqualify any applicant whose conduct is found to be inconsistent with the values of the program.",
    ],
  },
  {
    heading: "7. Photographs, Documents & Video Pitch",
    paragraphs: [
      "As part of your application, you will submit a Certificate of Origin, two full-length images, and record a short video pitch. Together with the photo confirmed during identity verification, these are required to verify your identity and eligibility documents and to allow the selection panel to review and judge your application at every stage. If you are selected, they may also be used by the Akwa Ibom State Hotels & Tourism Development Commission for promotional and archival purposes directly related to the program.",
      "We do not sell, rent, or transfer your photographs, documents, or video recording to any third party. See our Privacy Policy for full details on how this data is handled.",
      "Your video pitch is recorded live on the platform and, once submitted, becomes a permanent part of your application — it cannot be re-recorded, edited, or replaced afterward, even if you save the rest of your application as a draft and complete it later.",
    ],
  },
  {
    heading: "8. Disqualification",
    paragraphs: [
      "The organizers reserve the right to disqualify an application at any stage, whether before, during, or after selection, where eligibility criteria are not met or where information provided is later found to be inaccurate.",
    ],
  },
  {
    heading: "9. Changes to these Terms",
    paragraphs: [
      "These Terms & Conditions may be updated from time to time. Continued use of the platform after changes are published constitutes acceptance of the revised terms.",
    ],
  },
  {
    heading: "10. Contact",
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
      updatedAt="5 October 2026"
      sections={SECTIONS}
    />
  );
}
