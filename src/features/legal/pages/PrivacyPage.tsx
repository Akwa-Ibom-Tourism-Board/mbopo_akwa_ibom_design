import { LegalPage, type LegalSection } from "../components/LegalPage";

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Information We Collect",
    blocks: [
      {
        type: "paragraph",
        text: "When you register, verify your identity, and apply for Mbopo Akwa Ibom, we collect information including:",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "Identity details confirmed through your National Identification Number, including a live photo taken to confirm it is you (name, gender, date of birth, NIN)",
          "Your Voter Identification Number (VIN), confirmed when you submit your application",
          "Contact information, including your email address and phone number",
          "Personal and background details you provide, such as your Local Government Area of origin, education, and a personal statement",
          "Photographs you upload, including your Certificate of Origin and two full-length images",
          "A short video pitch you record live on the platform",
        ],
      },
    ],
  },
  {
    heading: "2. How We Use Your Information",
    blocks: [
      {
        type: "paragraph",
        text: "We use the information you provide to verify your eligibility, process your application, communicate with you about your registration, and, if you are selected, to fulfil your role as a program ambassador.",
      },
    ],
  },
  {
    heading: "3. Photographs & Video Pitch",
    blocks: [
      {
        type: "paragraph",
        text: "We do not sell, rent, or transfer your photographs or video recording to any third party. They are stored securely and used solely by the Akwa Ibom State Hotels & Tourism Development Commission, for specific, limited purposes:",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "To verify your identity and eligibility documents",
          "For the selection panel to review and judge your application at every stage",
          "If you are selected, for promotional and archival use by the Commission, as described in our Terms & Conditions",
        ],
      },
    ],
  },
  {
    heading: "4. NIN & VIN Verification",
    blocks: [
      {
        type: "paragraph",
        text: "After you register, verify your email, and log in, the first step of the application form is a one-time identity verification: your National Identification Number, name, and a live photo taken on the platform are checked against your NIN record, confirming your identity and eligibility (gender, age, and state of origin). That photo also becomes your profile photo.",
      },
      {
        type: "paragraph",
        text: "Your Voter Identification Number is confirmed separately, when you submit your completed application. Neither number is used for any purpose unrelated to this program.",
      },
    ],
  },
  {
    heading: "5. Data Sharing",
    blocks: [
      {
        type: "paragraph",
        text: "Your information — including your photographs and video pitch — is not sold or rented to third parties. It may be shared with the Akwa Ibom State Hotels & Tourism Development Commission and relevant state government offices for purposes directly connected to running this program.",
      },
    ],
  },
  {
    heading: "6. Data Retention",
    blocks: [
      {
        type: "paragraph",
        text: "We retain your information for as long as necessary to administer the program and meet any applicable record-keeping obligations. You may request that your account and associated data be removed by contacting us.",
      },
    ],
  },
  {
    heading: "7. Your Rights",
    blocks: [
      {
        type: "paragraph",
        text: "You may request access to, correction of, or deletion of your personal information at any time by contacting the Commission. Certain verified identity details cannot be edited once confirmed, and a submitted video pitch cannot be re-recorded, as explained in our Terms & Conditions.",
      },
    ],
  },
  {
    heading: "8. Cookies & Local Storage",
    blocks: [
      {
        type: "paragraph",
        text: "This platform uses your browser's local storage to keep you signed in and to remember your application progress. This data stays on your device and is not used for tracking or advertising.",
      },
    ],
  },
  {
    heading: "9. Changes to this Policy",
    blocks: [
      {
        type: "paragraph",
        text: "This Privacy Policy may be updated from time to time. We encourage you to review this page periodically for the latest information on our data practices.",
      },
    ],
  },
  {
    heading: "10. Contact Us",
    blocks: [
      {
        type: "paragraph",
        text: "For questions about this Privacy Policy or your personal data, please contact the Akwa Ibom State Hotels & Tourism Development Commission at mbopo.akwaibomstate@gmail.com.",
      },
    ],
  },
];

export function PrivacyPage() {
  return (
    <LegalPage
      documentTitle="Privacy Policy"
      eyebrow="Legal"
      title="Privacy Policy"
      updatedAt="29 October 2026"
      sections={SECTIONS}
    />
  );
}
