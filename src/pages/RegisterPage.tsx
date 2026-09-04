import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileImage,
  Upload,
} from "lucide-react";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import styled from "styled-components";
import { BrandMark } from "@/components/BrandMark";

const LGAS = [
  "Abak",
  "Eastern Obolo",
  "Eket",
  "Esit Eket",
  "Essien Udim",
  "Etim Ekpo",
  "Etinan",
  "Ibeno",
  "Ibesikpo Asutan",
  "Ibiono Ibom",
  "Ika",
  "Ikono",
  "Ikot Abasi",
  "Ikot Ekpene",
  "Ini",
  "Itu",
  "Mbo",
  "Mkpat Enin",
  "Nsit Atai",
  "Nsit Ibom",
  "Nsit Ubium",
  "Obot Akara",
  "Okobo",
  "Onna",
  "Oron",
  "Oruk Anam",
  "Udung Uko",
  "Ukanafun",
  "Uruan",
  "Urue-Offong/Oruko",
  "Uyo",
];

const WARDS = [
  "Ward 1",
  "Ward 2",
  "Ward 3",
  "Ward 4",
  "Ward 5",
  "Ward 6",
  "Ward 7",
  "Ward 8",
  "Ward 9",
  "Ward 10",
];

const STEPS = ["Personal", "Identity", "Education", "Your Story"];
const initialForm = {
  surname: "",
  firstName: "",
  middleName: "",
  dob: "",
  nin: "",
  lga: "",
  village: "",
  ward: "",
  residenceState: "",
  city: "",
  address: "",
  phone: "",
  email: "",
  nextOfKin: "",
  nextOfKinPhone: "",
  education: "",
  institution: "",
  occupation: "",
  undergraduate: "",
  talents: "",
  languages: "",
  initiative: "",
  why: "",
  socialMedia: "",
  declarationIdentity: false,
  declarationAccuracy: false,
  declarationTerms: false,
};
type FormState = typeof initialForm;

export function RegisterPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [fullImage, setFullImage] = useState<File | null>(null);
  const [fullImageUrl, setFullImageUrl] = useState("");
  const [certificate, setCertificate] = useState<File | null>(null);
  const [certificateUrl, setCertificateUrl] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (name: keyof FormState, value: string | boolean) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const onPhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((current) => ({
        ...current,
        photo: "Please choose an image file.",
      }));
      return;
    }
    setPhoto(file);
    setPhotoUrl(URL.createObjectURL(file));
    setErrors((current) => ({ ...current, photo: "" }));
  };

  const onFullImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((current) => ({
        ...current,
        fullImage: "Please choose an image file.",
      }));
      return;
    }
    setFullImage(file);
    setFullImageUrl(URL.createObjectURL(file));
    setErrors((current) => ({ ...current, fullImage: "" }));
  };

  const onCertificateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (
      !file.type.startsWith("image/") &&
      !file.type.startsWith("application/pdf")
    ) {
      setErrors((current) => ({
        ...current,
        certificate: "Please choose an image or PDF file.",
      }));
      return;
    }
    setCertificate(file);
    setCertificateUrl(URL.createObjectURL(file));
    setErrors((current) => ({ ...current, certificate: "" }));
  };

  const validateStep = (currentStep: number) => {
    const nextErrors: Record<string, string> = {};

    // Commenting out validations for now
    // const required: Array<keyof FormState> =
    //   currentStep === 0
    //     ? [
    //         "surname",
    //         "firstName",
    //         "dob",
    //         "phone",
    //         "email",
    //         "nextOfKin",
    //         "nextOfKinPhone",
    //       ]
    //     : currentStep === 1
    //       ? ["nin", "lga", "residenceState", "city", "address"]
    //       : currentStep === 2
    //         ? ["education", "talents", "languages"]
    //         : ["why"];
    // required.forEach((key) => {
    //   if (typeof form[key] === "string" && !form[key].trim())
    //     nextErrors[key] = "This field is required.";
    // });
    // if (currentStep === 0 && !photo)
    //   nextErrors.photo = "A passport photograph is required.";
    // if (
    //   currentStep === 0 &&
    //   form.email &&
    //   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    // )
    //   nextErrors.email = "Enter a valid email address.";
    // if (currentStep === 0 && form.nin && !/^\d{11}$/.test(form.nin))
    //   nextErrors.nin = "NIN must be 11 digits.";
    // if (currentStep === 3) {
    //   if (form.why.trim().split(/\s+/).filter(Boolean).length < 20)
    //     nextErrors.why = "Please share at least 20 words.";
    //   if (!form.declarationIdentity)
    //     nextErrors.declarationIdentity = "Please confirm this declaration.";
    //   if (!form.declarationAccuracy)
    //     nextErrors.declarationAccuracy = "Please confirm this declaration.";
    //   if (!form.declarationTerms)
    //     nextErrors.declarationTerms = "Please accept the terms.";
    // }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // FIX: Prevent event bubbling and ensure proper navigation
  const next = (event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const back = (event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setErrors({});
    setStep((current) => Math.max(current - 1, 0));
  };

  const wordCount = useMemo(
    () =>
      form.why.trim() ? form.why.trim().split(/\s+/).filter(Boolean).length : 0,
    [form.why],
  );

  const applicationReference = useMemo(
    () =>
      `MAI-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
    [submitted],
  );

  // FIX: Only submit on the last step
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // Only validate and submit on the last step
    if (step !== STEPS.length - 1) {
      return; // Prevent submission on other steps
    }

    if (!validateStep(step)) return;
    setSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 850));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) return <SuccessState reference={applicationReference} />;

  return (
    <RegisterPageShell>
      <RegisterHeader>
        <Link to="/" aria-label="Return to home">
          <BrandMark variant="light" />
        </Link>
        <HeaderLabel>2026 APPLICATIONS</HeaderLabel>
      </RegisterHeader>
      <RegisterMain>
        <Intro>
          <LinkBack to="/">
            <ArrowLeft size={15} /> Return to home
          </LinkBack>
          <Eyebrow>MBỌPỌ AKWA IBOM</Eyebrow>
          <Title>
            Your place in the story
            <br />
            <em>starts here.</em>
          </Title>
          <IntroCopy>
            Tell us about yourself, your community and the purpose you carry.
          </IntroCopy>
        </Intro>
        <FormCard>
          <ProgressRow>
            <div>
              <ProgressLabel>APPLICATION FORM</ProgressLabel>
              <ProgressStep>
                {step + 1} of {STEPS.length}
              </ProgressStep>
            </div>
            <ProgressTrack>
              <ProgressFill $progress={(step + 1) / STEPS.length} />
            </ProgressTrack>
          </ProgressRow>
          <StepDots>
            {STEPS.map((item, index) => (
              <StepDot
                key={item}
                $active={index === step}
                $complete={index < step}
              >
                <span>{index < step ? <Check size={12} /> : index + 1}</span>
                <label>{item}</label>
              </StepDot>
            ))}
          </StepDots>
          <Form onSubmit={submit} noValidate>
            {step === 0 && (
              <StepContent>
                <StepTitle>Personal information</StepTitle>
                <StepHint>Let's begin with the essentials.</StepHint>
                <FieldGrid>
                  <Field label="Surname" required error={errors.surname}>
                    <Input
                      value={form.surname}
                      onChange={(event) =>
                        update("surname", event.target.value)
                      }
                      placeholder="Your surname"
                      autoComplete="family-name"
                    />
                  </Field>
                  <Field label="First name" required error={errors.firstName}>
                    <Input
                      value={form.firstName}
                      onChange={(event) =>
                        update("firstName", event.target.value)
                      }
                      placeholder="Your first name"
                      autoComplete="given-name"
                    />
                  </Field>
                  <Field label="Middle name" error={errors.middleName}>
                    <Input
                      value={form.middleName}
                      onChange={(event) =>
                        update("middleName", event.target.value)
                      }
                      placeholder="Optional"
                    />
                  </Field>
                  <Field label="Date of birth" required error={errors.dob}>
                    <Input
                      type="date"
                      value={form.dob}
                      onChange={(event) => update("dob", event.target.value)}
                    />
                  </Field>
                  <Field label="Phone number" required error={errors.phone}>
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      placeholder="080 0000 0000"
                      autoComplete="tel"
                    />
                  </Field>
                  <Field label="Email address" required error={errors.email}>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(event) => update("email", event.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </Field>
                  <Field
                    label="Social Media Handles"
                    error={errors.socialMedia}
                    wide
                  >
                    <Input
                      value={form.socialMedia}
                      onChange={(event) =>
                        update("socialMedia", event.target.value)
                      }
                      placeholder="e.g. Instagram: @handle, Twitter: @handle, Facebook: handle"
                    />
                  </Field>
                  <Field
                    label="Next of kin full name"
                    required
                    error={errors.nextOfKin}
                  >
                    <Input
                      value={form.nextOfKin}
                      onChange={(event) =>
                        update("nextOfKin", event.target.value)
                      }
                      placeholder="Full name"
                    />
                  </Field>
                  <Field
                    label="Next of kin phone"
                    required
                    error={errors.nextOfKinPhone}
                  >
                    <Input
                      type="tel"
                      value={form.nextOfKinPhone}
                      onChange={(event) =>
                        update("nextOfKinPhone", event.target.value)
                      }
                      placeholder="080 0000 0000"
                    />
                  </Field>
                </FieldGrid>
                <PhotoUpload
                  photoUrl={photoUrl}
                  error={errors.photo}
                  onChange={onPhotoChange}
                  label="Passport photograph"
                />
              </StepContent>
            )}
            {step === 1 && (
              <StepContent>
                <StepTitle>Identity &amp; origin</StepTitle>
                <StepHint>Help us understand where you represent.</StepHint>
                <FieldGrid>
                  <Field
                    label="National Identification Number (NIN)"
                    required
                    error={errors.nin}
                  >
                    <Input
                      inputMode="numeric"
                      maxLength={11}
                      value={form.nin}
                      onChange={(event) =>
                        update("nin", event.target.value.replace(/\D/g, ""))
                      }
                      placeholder="11-digit NIN"
                    />
                  </Field>
                  <Field
                    label="Local Government Area of origin"
                    required
                    error={errors.lga}
                  >
                    <Select
                      value={form.lga}
                      onChange={(event) => update("lga", event.target.value)}
                    >
                      <option value="">Select your LGA</option>
                      {LGAS.map((lga) => (
                        <option key={lga}>{lga}</option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Village" required error={errors.village}>
                    <Input
                      value={form.village}
                      onChange={(event) =>
                        update("village", event.target.value)
                      }
                      placeholder="Your village of origin"
                    />
                  </Field>
                  <Field label="Ward" required error={errors.ward}>
                    <Select
                      value={form.ward}
                      onChange={(event) => update("ward", event.target.value)}
                    >
                      <option value="">Select your ward</option>
                      {WARDS.map((ward) => (
                        <option key={ward}>{ward}</option>
                      ))}
                    </Select>
                  </Field>
                  <Field
                    label="State of residence"
                    required
                    error={errors.residenceState}
                  >
                    <Input
                      value={form.residenceState}
                      onChange={(event) =>
                        update("residenceState", event.target.value)
                      }
                      placeholder="State"
                    />
                  </Field>
                  <Field
                    label="Town / city of residence"
                    required
                    error={errors.city}
                  >
                    <Input
                      value={form.city}
                      onChange={(event) => update("city", event.target.value)}
                      placeholder="Town or city"
                    />
                  </Field>
                  <Field
                    label="Home address"
                    required
                    error={errors.address}
                    wide
                  >
                    <TextArea
                      value={form.address}
                      onChange={(event) =>
                        update("address", event.target.value)
                      }
                      placeholder="Your residential address"
                      rows={4}
                    />
                  </Field>
                </FieldGrid>
                <PhotoUpload
                  photoUrl={certificateUrl}
                  error={errors.certificate}
                  onChange={onCertificateChange}
                  label="Certificate of Origin"
                  accept="image/png,image/jpeg,application/pdf"
                />
              </StepContent>
            )}
            {step === 2 && (
              <StepContent>
                <StepTitle>Education &amp; background</StepTitle>
                <StepHint>Share the experiences that have shaped you.</StepHint>
                <FieldGrid>
                  <Field
                    label="Highest educational qualification"
                    required
                    error={errors.education}
                  >
                    <Select
                      value={form.education}
                      onChange={(event) =>
                        update("education", event.target.value)
                      }
                    >
                      <option value="">Select qualification</option>
                      {[
                        "WAEC/NECO",
                        "OND",
                        "HND",
                        "Bachelor's Degree",
                        "Master's Degree",
                        "Other",
                      ].map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </Select>
                  </Field>
                  <Field
                    label="Institution attended"
                    error={errors.institution}
                  >
                    <Input
                      value={form.institution}
                      onChange={(event) =>
                        update("institution", event.target.value)
                      }
                      placeholder="School or institution"
                    />
                  </Field>
                  <Field label="Occupation" required error={errors.occupation}>
                    <Input
                      value={form.occupation}
                      onChange={(event) =>
                        update("occupation", event.target.value)
                      }
                      placeholder="What do you do?"
                    />
                  </Field>
                  <Field
                    label="Are you a full-time undergraduate?"
                    error={errors.undergraduate}
                  >
                    <ToggleGroup>
                      <Toggle
                        type="button"
                        $active={form.undergraduate === "Yes"}
                        onClick={() => update("undergraduate", "Yes")}
                      >
                        Yes
                      </Toggle>
                      <Toggle
                        type="button"
                        $active={form.undergraduate === "No"}
                        onClick={() => update("undergraduate", "No")}
                      >
                        No
                      </Toggle>
                    </ToggleGroup>
                  </Field>
                  <Field label="Talent(s)" required error={errors.talents} wide>
                    <Input
                      value={form.talents}
                      onChange={(event) =>
                        update("talents", event.target.value)
                      }
                      placeholder="e.g. Public speaking, dance, entrepreneurship"
                    />
                  </Field>
                  <Field
                    label="Languages spoken, including native dialect"
                    required
                    error={errors.languages}
                    wide
                  >
                    <Input
                      value={form.languages}
                      onChange={(event) =>
                        update("languages", event.target.value)
                      }
                      placeholder="e.g. Ibibio, English"
                    />
                  </Field>
                </FieldGrid>
                <PhotoUpload
                  photoUrl={fullImageUrl}
                  error={errors.fullImage}
                  onChange={onFullImageChange}
                  label="Upload Full Image"
                />
              </StepContent>
            )}
            {step === 3 && (
              <StepContent>
                <StepTitle>Your story &amp; declarations</StepTitle>
                <StepHint>
                  Purpose is personal. Tell us what yours looks like.
                </StepHint>
                <Field
                  label="Describe any community initiative, business or skill you have undertaken"
                  error={errors.initiative}
                >
                  <TextArea
                    value={form.initiative}
                    onChange={(event) =>
                      update("initiative", event.target.value)
                    }
                    placeholder="Share something you are proud to have started or contributed to..."
                    rows={5}
                  />
                </Field>
                <Field
                  label="Why do you want to be Mbọpọ Akwa Ibom?"
                  required
                  error={errors.why}
                >
                  <TextArea
                    value={form.why}
                    onChange={(event) => update("why", event.target.value)}
                    placeholder="Write a short essay about your purpose, your community and what you hope to represent..."
                    rows={7}
                  />
                  <WordCount $over={wordCount > 300}>
                    {wordCount} words · aim for 150–300
                  </WordCount>
                </Field>
                <Declarations>
                  <Declaration $invalid={Boolean(errors.declarationIdentity)}>
                    <input
                      type="checkbox"
                      checked={form.declarationIdentity}
                      onChange={(event) =>
                        update("declarationIdentity", event.target.checked)
                      }
                    />
                    <span>
                      I confirm I am a female Nigerian citizen indigenous to or
                      resident in Akwa Ibom State.
                    </span>
                  </Declaration>
                  <Declaration $invalid={Boolean(errors.declarationAccuracy)}>
                    <input
                      type="checkbox"
                      checked={form.declarationAccuracy}
                      onChange={(event) =>
                        update("declarationAccuracy", event.target.checked)
                      }
                    />
                    <span>
                      I confirm all information provided is accurate and I am
                      available for the full 365-day ambassador role if
                      selected.
                    </span>
                  </Declaration>
                  <Declaration $invalid={Boolean(errors.declarationTerms)}>
                    <input
                      type="checkbox"
                      checked={form.declarationTerms}
                      onChange={(event) =>
                        update("declarationTerms", event.target.checked)
                      }
                    />
                    <span>
                      I agree to the <a href="#terms">Terms &amp; Conditions</a>{" "}
                      and <a href="#privacy">Privacy Policy</a>.
                    </span>
                  </Declaration>
                </Declarations>
              </StepContent>
            )}
            <FormActions>
              {step > 0 ? (
                <BackButton type="button" onClick={(e) => back(e)}>
                  <ArrowLeft size={16} /> Back
                </BackButton>
              ) : (
                <span />
              )}
              {step < STEPS.length - 1 ? (
                <ContinueButton type="button" onClick={(e) => next(e)}>
                  Continue <ArrowRight size={16} />
                </ContinueButton>
              ) : (
                <ContinueButton type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Application"}{" "}
                  {!submitting && <ArrowRight size={16} />}
                </ContinueButton>
              )}
            </FormActions>
          </Form>
        </FormCard>
      </RegisterMain>
      <RegisterFooter>
        <span>Official cultural platform of Akwa Ibom State</span>
        <span>Beauty with Purpose</span>
      </RegisterFooter>
    </RegisterPageShell>
  );
}

function PhotoUpload({
  photoUrl,
  error,
  onChange,
  label,
  accept = "image/png,image/jpeg",
}: {
  photoUrl: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  accept?: string;
}) {
  return (
    <PhotoField>
      <PhotoLabel>
        {label} <Required>*</Required>
      </PhotoLabel>
      <PhotoDrop
        htmlFor={`${label.toLowerCase().replace(/\s/g, "-")}-upload`}
        $hasPhoto={Boolean(photoUrl)}
      >
        {photoUrl ? (
          <PhotoPreview src={photoUrl} alt={`${label} preview`} />
        ) : (
          <>
            <PhotoIcon>
              <Upload size={18} />
            </PhotoIcon>
            <strong>Upload {label}</strong>
            <span>JPG or PNG · Max 5MB</span>
          </>
        )}
        <input
          id={`${label.toLowerCase().replace(/\s/g, "-")}-upload`}
          type="file"
          accept={accept}
          onChange={onChange}
        />
      </PhotoDrop>
      {error && <ErrorText>{error}</ErrorText>}
    </PhotoField>
  );
}

function Field({
  label,
  children,
  required,
  error,
  wide,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
  wide?: boolean;
}) {
  return (
    <FieldWrap $wide={wide}>
      <Label>
        {label}
        {required && <Required> *</Required>}
      </Label>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </FieldWrap>
  );
}

function SuccessState({ reference }: { reference: string }) {
  return (
    <SuccessPage>
      <SuccessCard>
        <SuccessIcon>
          <Check size={31} />
        </SuccessIcon>
        <Eyebrow>APPLICATION RECEIVED</Eyebrow>
        <SuccessTitle>
          Thank you for
          <br />
          <em>stepping forward.</em>
        </SuccessTitle>
        <SuccessCopy>
          Thank you for applying to represent your community. Our team will
          review your application and reach out via the phone number and email
          provided.
        </SuccessCopy>
        <Reference>
          REFERENCE NUMBER <strong>{reference}</strong>
        </Reference>
        <BackHome to="/">
          Return to Mbọpọ Akwa Ibom <ArrowRight size={16} />
        </BackHome>
      </SuccessCard>
    </SuccessPage>
  );
}

const RegisterPageShell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.cream};
`;
const RegisterHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 76px;
  padding: 0 max(22px, calc((100% - 1240px) / 2));
  background: ${({ theme }) => theme.colors.green};
  color: ${({ theme }) => theme.colors.white};
`;
const HeaderLabel = styled.span`
  color: rgba(255, 255, 255, 0.65);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.17em;
`;
const RegisterMain = styled.main`
  display: grid;
  grid-template-columns: minmax(280px, 0.72fr) minmax(530px, 1.28fr);
  gap: clamp(40px, 8vw, 125px);
  width: min(1130px, calc(100% - 48px));
  margin: 0 auto;
  padding: 82px 0 100px;
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    padding: 55px 0 85px;
    gap: 40px;
  }
`;
const Intro = styled.div`
  padding-top: 9px;
`;
const LinkBack = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 65px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  &:hover {
    color: ${({ theme }) => theme.colors.green};
  }
`;
const Eyebrow = styled.p`
  margin: 0 0 15px;
  color: ${({ theme }) => theme.colors.orange};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;
const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.green};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(44px, 5.3vw, 68px);
  font-weight: 500;
  letter-spacing: -0.06em;
  line-height: 0.97;
  em {
    color: ${({ theme }) => theme.colors.orange};
    font-style: italic;
  }
`;
const IntroCopy = styled.p`
  max-width: 290px;
  margin: 24px 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 15px;
  line-height: 1.75;
`;
const FormCard = styled.section`
  padding: clamp(22px, 4vw, 44px);
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.paper};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;
const ProgressRow = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 22px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
`;
const ProgressLabel = styled.p`
  margin: 0 0 4px;
  color: ${({ theme }) => theme.colors.green};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.16em;
`;
const ProgressStep = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 12px;
`;
const ProgressTrack = styled.div`
  width: 160px;
  height: 4px;
  overflow: hidden;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.creamDeep};
`;
const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => `${$progress * 100}%`};
  background: ${({ theme }) => theme.colors.orange};
  transition: width 300ms ease;
`;
const StepDots = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin: 25px 0 38px;
`;
const StepDot = styled.div<{ $active: boolean; $complete: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  color: ${({ theme, $active }) => ($active ? theme.colors.green : theme.colors.muted)};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  span {
    display: grid;
    width: 25px;
    height: 25px;
    place-items: center;
    border: 2px solid
      ${({ theme, $active, $complete }) => {
        if ($active) return theme.colors.orange;
        if ($complete) return theme.colors.orange;
        return theme.colors.line;
      }};
    border-radius: 50%;
    background: ${({ theme, $active, $complete }) => {
      if ($active) return theme.colors.orange;
      if ($complete) return theme.colors.orange;
      return "transparent";
    }};
    color: ${({ theme, $active, $complete }) => {
      if ($active) return theme.colors.white;
      if ($complete) return theme.colors.white;
      return theme.colors.orange;
    }};
    transition: all 300ms ease;
  }
  label {
    white-space: nowrap;
  }
  @media (max-width: 580px) {
    font-size: 9px;
  }
`;
const Form = styled.form``;
const StepContent = styled.div`
  animation: step-in 380ms ease both;
  @keyframes step-in {
    from {
      opacity: 0;
      transform: translateX(10px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
`;
const StepTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.green};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 30px;
  font-weight: 500;
  letter-spacing: -0.04em;
`;
const StepHint = styled.p`
  margin: 7px 0 29px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
`;
const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px 17px;
  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;
const FieldWrap = styled.div<{ $wide?: boolean }>`
  grid-column: ${({ $wide }) => ($wide ? "1 / -1" : "auto")};
`;
const Label = styled.label`
  display: block;
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.green};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.045em;
`;
const Required = styled.span`
  color: ${({ theme }) => theme.colors.orange};
`;
const Input = styled.input`
  display: block;
  width: 100%;
  height: 49px;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.sm};
  outline: none;
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 13px;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;
  &:focus {
    border-color: ${({ theme }) => theme.colors.orange};
    background: ${({ theme }) => theme.colors.paper};
    box-shadow: 0 0 0 3px rgba(231, 121, 23, 0.1);
  }
  ::placeholder {
    color: #a0a8a2;
  }
`;
const Select = styled.select`
  ${Input.componentStyle.rules};
  appearance: auto;
`;
const TextArea = styled.textarea`
  display: block;
  width: 100%;
  min-height: 110px;
  padding: 14px;
  resize: vertical;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.sm};
  outline: none;
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 13px;
  line-height: 1.6;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease;
  &:focus {
    border-color: ${({ theme }) => theme.colors.orange};
    box-shadow: 0 0 0 3px rgba(231, 121, 23, 0.1);
  }
  ::placeholder {
    color: #a0a8a2;
  }
`;
const ErrorText = styled.small`
  display: block;
  margin-top: 6px;
  color: ${({ theme }) => theme.colors.error};
  font-size: 10px;
`;
const PhotoField = styled.div`
  margin-top: 24px;
`;
const PhotoLabel = styled(Label)``;
const PhotoDrop = styled.label<{ $hasPhoto: boolean }>`
  display: flex;
  min-height: 125px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  overflow: hidden;
  border: 1px dashed
    ${({ theme, $hasPhoto }) => ($hasPhoto ? theme.colors.orange : theme.colors.line)};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  cursor: pointer;
  strong {
    color: ${({ theme }) => theme.colors.green};
    font-size: 12px;
  }
  span {
    font-size: 11px;
  }
  input {
    display: none;
  }
`;
const PhotoIcon = styled.span`
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.creamDeep};
  color: ${({ theme }) => theme.colors.orange};
`;
const PhotoPreview = styled.img`
  width: 100%;
  height: 170px;
  object-fit: cover;
  object-position: center;
`;
const ToggleGroup = styled.div`
  display: flex;
  gap: 7px;
`;
const Toggle = styled.button<{ $active: boolean }>`
  height: 49px;
  min-width: 76px;
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.orange : theme.colors.line)};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme, $active }) => ($active ? "rgba(231,121,23,.1)" : theme.colors.cream)};
  color: ${({ theme, $active }) => ($active ? theme.colors.orange : theme.colors.muted)};
  font-size: 12px;
  font-weight: 800;
`;
const WordCount = styled.div<{ $over: boolean }>`
  margin-top: 7px;
  color: ${({ theme, $over }) => ($over ? theme.colors.error : theme.colors.muted)};
  font-size: 10px;
  text-align: right;
`;
const Declarations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 33px;
  padding-top: 26px;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
`;
const Declaration = styled.label<{ $invalid?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 11px;
  color: ${({ theme, $invalid }) => ($invalid ? theme.colors.error : theme.colors.muted)};
  font-size: 11px;
  line-height: 1.55;
  cursor: pointer;
  input {
    width: 17px;
    height: 17px;
    flex: 0 0 auto;
    margin: 0;
    accent-color: ${({ theme }) => theme.colors.orange};
  }
  a {
    color: ${({ theme }) => theme.colors.green};
    text-decoration: underline;
  }
`;
const FormActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 38px;
`;
const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 49px;
  padding: 0 4px;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  &:hover {
    color: ${({ theme }) => theme.colors.green};
  }
`;
const ContinueButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 51px;
  margin-left: auto;
  padding: 0 21px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  box-shadow: 0 9px 20px rgba(231, 121, 23, 0.18);
  transition:
    transform 180ms ease,
    background 180ms ease;
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.colors.orangeBright};
  }
  &:disabled {
    cursor: wait;
    opacity: 0.65;
  }
`;
const RegisterFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  width: min(1130px, calc(100% - 48px));
  margin: 0 auto;
  padding: 19px 0 30px;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  color: ${({ theme }) => theme.colors.muted};
  font-size: 10px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  @media (max-width: 580px) {
    flex-direction: column;
    gap: 7px;
  }
`;
const SuccessPage = styled.div`
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 25px;
  background: ${({ theme }) => theme.colors.green};
`;
const SuccessCard = styled.div`
  max-width: 600px;
  padding: clamp(30px, 7vw, 75px);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.greenDeep};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.lifted};
`;
const SuccessIcon = styled.div`
  display: grid;
  width: 66px;
  height: 66px;
  margin: 0 auto 30px;
  place-items: center;
  border: 1px solid ${({ theme }) => theme.colors.orangeBright};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.orangeBright};
  animation: pop 600ms ease both;
  @keyframes pop {
    from {
      opacity: 0;
      transform: scale(0.6);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
const SuccessTitle = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(42px, 7vw, 69px);
  font-weight: 500;
  letter-spacing: -0.06em;
  line-height: 0.95;
  em {
    color: ${({ theme }) => theme.colors.orangeBright};
    font-style: italic;
  }
`;
const SuccessCopy = styled.p`
  max-width: 430px;
  margin: 24px auto 29px;
  color: rgba(255, 255, 255, 0.67);
  font-size: 14px;
  line-height: 1.75;
`;
const Reference = styled.p`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0 auto 33px;
  color: rgba(255, 255, 255, 0.45);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.16em;
  strong {
    color: ${({ theme }) => theme.colors.orangeBright};
    font-size: 17px;
    letter-spacing: 0.06em;
  }
`;
const BackHome = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 49px;
  padding: 0 20px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.white};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
