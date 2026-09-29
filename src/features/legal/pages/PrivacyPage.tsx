import { LegalPage, type LegalSection } from "../components/LegalPage";

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Information We Collect",
    paragraphs: [
      "When you register for Mbopo Akwa Ibom, we collect information including:",
    ],
    list: [
      "Identity details confirmed through your National Identification Number (name, gender, date of birth, NIN)",
      "Contact information, including your email address and phone number",
      "Personal and background details you provide, such as your Local Government Area of origin, education, and a personal statement",
      "Photographs you upload, including your passport photograph, your Certificate of Origin, and two full-length images",
      "A short video pitch you record live on the platform",
    ],
  },
  {
    heading: "2. How We Use Your Information",
    paragraphs: [
      "We use the information you provide to verify your eligibility, process your application, communicate with you about your registration, and, if you are selected, to fulfil your role as a program ambassador.",
    ],
  },
  {
    heading: "3. Photographs & Video Pitch",
    paragraphs: [
      "We do not sell, rent, or transfer your photographs or video recording to any third party. They are stored securely and used solely by the Akwa Ibom State Hotels & Tourism Development Commission, for specific, limited purposes:",
    ],
    list: [
      "To verify your identity and eligibility documents",
      "For the selection panel to review and judge your application at every stage",
      "If you are selected, for promotional and archival use by the Commission, as described in our Terms & Conditions",
    ],
  },
  {
    heading: "4. NIN Verification",
    paragraphs: [
      "Your National Identification Number is used solely to confirm your identity and eligibility (gender and age) before you continue with registration. It is not used for any purpose unrelated to this program.",
    ],
  },
  {
    heading: "5. Data Sharing",
    paragraphs: [
      "Your information — including your photographs and video pitch — is not sold or rented to third parties. It may be shared with the Akwa Ibom State Hotels & Tourism Development Commission and relevant state government offices for purposes directly connected to running this program.",
    ],
  },
  {
    heading: "6. Data Retention",
    paragraphs: [
      "We retain your information for as long as necessary to administer the program and meet any applicable record-keeping obligations. You may request that your account and associated data be removed by contacting us.",
    ],
  },
  {
    heading: "7. Your Rights",
    paragraphs: [
      "You may request access to, correction of, or deletion of your personal information at any time by contacting the Commission. Certain verified identity details cannot be edited once confirmed, and a submitted video pitch cannot be re-recorded, as explained in our Terms & Conditions.",
    ],
  },
  {
    heading: "8. Cookies & Local Storage",
    paragraphs: [
      "This platform uses your browser's local storage to keep you signed in and to remember your application progress. This data stays on your device and is not used for tracking or advertising.",
    ],
  },
  {
    heading: "9. Changes to this Policy",
    paragraphs: [
      "This Privacy Policy may be updated from time to time. We encourage you to review this page periodically for the latest information on our data practices.",
    ],
  },
  {
    heading: "10. Contact Us",
    paragraphs: [
      "For questions about this Privacy Policy or your personal data, please contact the Akwa Ibom State Hotels & Tourism Development Commission.",
    ],
  },
];

export function PrivacyPage() {
  return (
    <LegalPage
      documentTitle="Privacy Policy"
      eyebrow="Legal"
      title="Privacy Policy"
      updatedAt="29 September 2026"
      sections={SECTIONS}
    />
  );
}
