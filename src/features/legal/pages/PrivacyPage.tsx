import { LegalPage, type LegalSection } from "../components/LegalPage";

const INTRO = [
  "This Privacy Notice explains how the Akwa Ibom State Hotels & Tourism Development Commission collects, uses, protects, shares and retains your personal data when you register for, verify your identity for, apply to, vote in or otherwise take part in Mbopo Akwa Ibom. It should be read together with the Programme’s Terms and Conditions. We are committed to processing your personal data lawfully, fairly and transparently in accordance with the Nigeria Data Protection Act 2023.",
  "Document version: 2.0 · To be confirmed and adopted by the Commission. Governing law: Nigeria Data Protection Act 2023 and applicable Nigerian law.",
];

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Who We Are and About This Notice",
    blocks: [
      {
        type: "paragraph",
        text: "1.1. The Akwa Ibom State Hotels & Tourism Development Commission (“the Commission”, “we”, “us” or “our”) is the Data Controller responsible for your personal data in connection with Mbopo Akwa Ibom (“the Programme”).",
      },
      {
        type: "paragraph",
        text: "1.2. This Privacy Notice describes the personal data we collect about you, how and why we use it, the lawful bases on which we rely, who we share it with, how long we keep it, how we protect it, and the rights available to you under applicable law.",
      },
      {
        type: "paragraph",
        text: "1.3. This Notice applies to applicants, contestants, finalists, titleholders and, where relevant, members of the public who interact with the Programme’s website, application portal or voting platform. It should be read together with the Programme’s Terms and Conditions and any rules properly communicated by the Commission.",
      },
      {
        type: "paragraph",
        text: "1.4. We process personal data in accordance with the Nigeria Data Protection Act 2023 (the “NDPA”), any regulations, directives or guidance issued by the Nigeria Data Protection Commission (the “NDPC”), and other applicable Nigerian law.",
      },
    ],
  },
  {
    heading: "2. Key Terms",
    blocks: [
      {
        type: "paragraph",
        text: "2.1. In this Notice, the following terms have the meanings given to them under the NDPA:",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "“Personal Data” means any information relating to an identified or identifiable individual, such as a name, identification number, photograph, or online identifier.",
          "“Sensitive Personal Data” means personal data of a sensitive nature, including biometric data used to uniquely identify an individual (such as the live identity-verification photograph).",
          "“Processing” means any operation performed on personal data, including collection, recording, storage, use, verification, disclosure, retention or deletion.",
          "“Data Controller” means the Commission, which determines the purposes and manner in which your personal data is processed.",
          "“Data Processor” means a third party that processes personal data on the Commission’s behalf and on its instructions, such as an authorised identity-verification provider.",
          "“Data Subject” means you — the individual to whom the personal data relates.",
        ],
      },
    ],
  },
  {
    heading: "3. Information We Collect",
    blocks: [
      {
        type: "paragraph",
        text: "3.1. When you register, verify your identity and apply for the Programme, we collect the following categories of personal data:",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "Identity data confirmed through your National Identification Number (NIN) — including your name, gender, date of birth and NIN — and a live photograph taken to confirm that it is you.",
          "Voter identity data — your Voter Identification Number (VIN), confirmed when you submit your application.",
          "Contact data — including your email address and telephone number.",
          "Background data you provide — such as your Local Government Area of origin, marital status, educational qualifications and a personal statement.",
          "Documentary data — photographs and documents you upload, including your Certificate of Origin and two full-length images.",
          "Audiovisual data — a short video pitch you record live on the platform.",
          "Participation and voting data — information generated through your participation, assessment and, where applicable, Online Voting.",
          "Technical data — limited information stored by your browser to keep you signed in and remember your application progress, as described in Clause 11.",
        ],
      },
      {
        type: "paragraph",
        text: "3.2. The live identity-verification photograph is Sensitive Personal Data (biometric data). We collect and use it only for identity verification and eligibility confirmation, and we apply additional care to protect it, as described in this Notice.",
      },
      {
        type: "paragraph",
        text: "3.3. We collect personal data directly from you and, where you authorise verification, from authorised verification sources that confirm your identity and voter records against the information you provide.",
      },
    ],
  },
  {
    heading: "4. How and Why We Use Your Information",
    blocks: [
      {
        type: "paragraph",
        text: "4.1. We use your personal data to verify your eligibility, process your application, administer the Programme (including its selection stages and any Online Voting), communicate with you about your registration and participation, and, if you are selected, to enable you to fulfil your role as a Programme ambassador.",
      },
      {
        type: "paragraph",
        text: "4.2. Under the NDPA, we must have a lawful basis for processing your personal data. Depending on the purpose, we rely on one or more of the following bases:",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "Performance of, and steps toward, your participation — to register you, verify you, assess your application and administer your involvement in the Programme on the terms you have accepted.",
          "Your consent — for the live biometric verification photograph, for optional publicity uses, and for any other processing for which we ask your consent (which you may withdraw at any time).",
          "Compliance with a legal obligation — where processing is required to meet a legal or regulatory obligation, including recordkeeping.",
          "Performance of a task carried out in the public interest or in the exercise of official authority — the administration of a State cultural and tourism programme.",
          "Our legitimate interests — to protect the integrity and security of the Programme, prevent fraud and impersonation, and promote Akwa Ibom State as a tourism destination, where these interests are not overridden by your rights.",
        ],
      },
      {
        type: "paragraph",
        text: "4.3. Where we rely on your consent, you are free to decline or to withdraw it, and we will tell you where doing so means we cannot process your application or provide a particular feature.",
      },
    ],
  },
  {
    heading: "5. Photographs and Video Pitch",
    blocks: [
      {
        type: "paragraph",
        text: "5.1. We do not sell, rent or transfer your photographs or video recording to any third party for that party’s own purposes. They are stored securely and used by the Commission for specific, limited purposes:",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "To verify your identity and eligibility documents.",
          "For the selection panel to review and assess your application at each stage.",
          "If you are selected, for promotional, documentary and archival use by the Commission and in support of Akwa Ibom State tourism promotion, as described in our Terms and Conditions.",
        ],
      },
      {
        type: "paragraph",
        text: "5.2. Public-facing use of your identifiable photograph, voice or video is governed by the media and image-rights provisions of the Terms and Conditions and the applicable lawful basis, and any broader commercial or sponsor use requires separate authorisation.",
      },
    ],
  },
  {
    heading: "6. NIN and VIN Verification",
    blocks: [
      {
        type: "paragraph",
        text: "6.1. After you register, verify your email and log in, the first step of the application is a one-time identity verification. Your NIN, your name and a live photograph taken on the platform are checked against your NIN record to confirm your identity and eligibility (gender, age and state of origin). That photograph also becomes your profile photo.",
      },
      {
        type: "paragraph",
        text: "6.2. Your VIN is confirmed separately, when you submit your completed application.",
      },
      {
        type: "paragraph",
        text: "6.3. Verification is carried out through authorised verification providers acting as our Data Processors under appropriate safeguards and confidentiality obligations. Neither your NIN nor your VIN is used for any purpose unrelated to the Programme.",
      },
    ],
  },
  {
    heading: "7. Who We Share Your Information With",
    blocks: [
      {
        type: "paragraph",
        text: "7.1. We do not sell or rent your personal data — including your photographs and video pitch — to third parties.",
      },
      {
        type: "paragraph",
        text: "7.2. We may share your personal data, only to the extent necessary and with appropriate safeguards, with:",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "Relevant Akwa Ibom State Government offices, for purposes directly connected with administering the Programme.",
          "Authorised Data Processors and service providers (for example, identity and voter verification, platform hosting and communications) who process data on our instructions and are bound by confidentiality and data-protection obligations.",
          "The selection panel and authorised Programme personnel, for assessment and administration.",
          "Any person or authority to whom we are required or permitted to disclose data by law, regulation or lawful request.",
        ],
      },
      {
        type: "paragraph",
        text: "7.3. Where any processing would involve transferring your personal data outside Nigeria, we will do so only where permitted by the NDPA and subject to an adequate level of protection or other lawful safeguard.",
      },
    ],
  },
  {
    heading: "8. How We Protect Your Information",
    blocks: [
      {
        type: "paragraph",
        text: "8.1. We take appropriate technical and organisational measures to protect your personal data against unauthorised access, disclosure, alteration, loss or misuse, including restricting access to authorised personnel who require it for legitimate Programme purposes.",
      },
      {
        type: "paragraph",
        text: "8.2. Verified identity details may be locked against ordinary editing, and a submitted video pitch may be locked against re-recording, to preserve the integrity and security of the verified record, as explained in our Terms and Conditions.",
      },
      {
        type: "paragraph",
        text: "8.3. No system can be guaranteed to be completely secure. If a personal data breach occurs that is likely to affect your rights, we will take the steps required by the NDPA, including notifying the NDPC and, where required, affected individuals, within the applicable timeframes.",
      },
    ],
  },
  {
    heading: "9. How Long We Keep Your Information",
    blocks: [
      {
        type: "paragraph",
        text: "9.1. We retain your personal data for as long as necessary to administer the Programme and to meet any applicable legal, regulatory or legitimate recordkeeping obligations.",
      },
      {
        type: "paragraph",
        text: "9.2. When your personal data is no longer required for these purposes, we will securely delete, destroy or anonymise it.",
      },
      {
        type: "paragraph",
        text: "9.3. You may request that your account and associated data be removed by contacting us. We will give effect to such a request except to the extent that we are required or permitted by law to retain certain information (for example, to resolve a dispute, prevent fraud or comply with a legal obligation).",
      },
    ],
  },
  {
    heading: "10. Your Rights",
    blocks: [
      {
        type: "paragraph",
        text: "10.1. Subject to the conditions and exceptions in the NDPA, you have the right to:",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "Be informed about how your personal data is processed (this Notice).",
          "Access the personal data we hold about you.",
          "Rectify inaccurate or incomplete personal data.",
          "Request erasure of your personal data where there is no overriding reason to retain it.",
          "Restrict or object to certain processing of your personal data.",
          "Data portability — to receive certain data in a usable format, where applicable.",
          "Withdraw consent at any time where we rely on your consent.",
          "Lodge a complaint with the Nigeria Data Protection Commission.",
        ],
      },
      {
        type: "paragraph",
        text: "10.2. Certain verified identity details cannot be edited once confirmed, and a submitted video pitch cannot be re-recorded, as explained in our Terms and Conditions. This does not remove your right to request correction of genuinely inaccurate information through our support channel.",
      },
      {
        type: "paragraph",
        text: "10.3. We do not make decisions producing legal or similarly significant effects about you based solely on automated processing without appropriate safeguards; identity verification supports, but does not replace, the Commission’s assessment and decisions.",
      },
      {
        type: "paragraph",
        text: "10.4. To exercise any of these rights, please contact us using the details in Clause 14. We may ask you to verify your identity before responding, and we will respond within the timeframe required by applicable law.",
      },
    ],
  },
  {
    heading: "11. Cookies and Local Storage",
    blocks: [
      {
        type: "paragraph",
        text: "11.1. This platform uses your browser’s local storage to keep you signed in and to remember your application progress. This data stays on your device.",
      },
      {
        type: "paragraph",
        text: "11.2. We do not use this data for cross-site tracking or advertising. You can clear local storage through your browser settings, though doing so may affect your saved progress and sign-in.",
      },
    ],
  },
  {
    heading: "12. Children",
    blocks: [
      {
        type: "paragraph",
        text: "12.1. The Programme is intended for adults who meet the published eligibility criteria. We do not knowingly collect personal data from children below the applicable age of majority for participation. If we become aware that we have inadvertently collected such data, we will take reasonable steps to delete it.",
      },
    ],
  },
  {
    heading: "13. Changes to This Notice",
    blocks: [
      {
        type: "paragraph",
        text: "13.1. We may update this Privacy Notice from time to time to reflect changes in our practices or in applicable law. Where a change is material, we will take reasonable steps to bring it to your attention.",
      },
      {
        type: "paragraph",
        text: "13.2. The “Last updated” date on this page indicates when this Notice was last revised. We encourage you to review this Notice periodically.",
      },
    ],
  },
  {
    heading: "14. How to Contact Us",
    blocks: [
      {
        type: "paragraph",
        text: "For questions about this Privacy Notice or your personal data, or to exercise any of your rights, please contact the Data Controller:",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "Data Controller: Akwa Ibom State Hotels & Tourism Development Commission",
          "Email: mbopo.akwaibomstate@gmail.com",
          "Official Website: https://mbopo.akwaibomstate.gov.ng",
          "Telephone: +234 802 331 1264",
          "Data Protection / Privacy Enquiries: mbopo.akwaibomstate@gmail.com",
          "Regulator: Nigeria Data Protection Commission (NDPC)",
        ],
      },
      {
        type: "paragraph",
        text: "You have the right to lodge a complaint with the Nigeria Data Protection Commission if you are not satisfied with how we have handled your personal data. We would, however, appreciate the opportunity to address your concerns before you approach the Commission.",
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
      updatedAt="1 November 2026"
      intro={INTRO}
      sections={SECTIONS}
    />
  );
}
