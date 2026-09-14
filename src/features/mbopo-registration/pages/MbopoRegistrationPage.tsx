import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button, sonnerToast } from "@/shared/ui";
import mbopoLogo from "@/assets/mbobpo_logo.png";
import { useAuth } from "@/features/auth";
import {
  registrationSchema,
  DEFAULT_REGISTRATION_FORM_VALUES,
  STEP_FIELDS,
  type RegistrationFormValues,
} from "../schema";
import { REGISTRATION_STEPS } from "../constants";
import { submitApplication } from "../api";
import { StepProgress } from "../components/StepProgress";
import { usePhotoUpload } from "../components/usePhotoUpload";
import { PersonalStep } from "../components/steps/PersonalStep";
import { IdentityOriginStep } from "../components/steps/IdentityOriginStep";
import { EducationStep } from "../components/steps/EducationStep";
import { StoryStep } from "../components/steps/StoryStep";
import { SuccessState } from "../components/SuccessState";
import {
  PageShellFrame,
  TopBar,
  TopBarLogo,
  BackToDashboard,
  TopBarLabel,
  Main,
  Intro,
  Eyebrow,
  Title,
  IntroCopy,
  FormCard,
  FormActions,
} from "./MbopoRegistrationPage.styles";

const REQUIRED_PHOTO_MESSAGE = "This photo is required.";

export function MbopoRegistrationPage() {
  const { user } = useAuth();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [requirePassportPhoto, setRequirePassportPhoto] = useState(false);
  const [requireCertificate, setRequireCertificate] = useState(false);
  const [requireFullImage, setRequireFullImage] = useState(false);

  const passportPhoto = usePhotoUpload();
  const certificate = usePhotoUpload({
    allowPdf: true,
    invalidTypeMessage: "Please choose an image or PDF file.",
  });
  const fullImage = usePhotoUpload();

  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: DEFAULT_REGISTRATION_FORM_VALUES,
  });

  useEffect(() => {
    document.title = "Mbobpo Registration | Mbobpo Akwa Ibom";
  }, []);

  const submitMutation = useMutation({
    mutationFn: submitApplication,
    onError: () =>
      sonnerToast.error(
        "We couldn't submit your application. Please try again.",
      ),
  });

  if (!user) return null;

  if (submitMutation.isSuccess) {
    return <SuccessState referenceCode={submitMutation.data.referenceCode} />;
  }

  const goToNextStep = async () => {
    const fieldsValid = await trigger(STEP_FIELDS[currentStepIndex]);
    if (!fieldsValid) return;

    if (currentStepIndex === 0) {
      setRequirePassportPhoto(!passportPhoto.file);
      if (!passportPhoto.file) return;
    } else if (currentStepIndex === 1) {
      setRequireCertificate(!certificate.file);
      if (!certificate.file) return;
    } else if (currentStepIndex === 2) {
      setRequireFullImage(!fullImage.file);
      if (!fullImage.file) return;
    }

    setCurrentStepIndex((index) =>
      Math.min(index + 1, REGISTRATION_STEPS.length - 1),
    );
  };

  const goToPreviousStep = () =>
    setCurrentStepIndex((index) => Math.max(index - 1, 0));

  const onSubmit = handleSubmit((values) => {
    submitMutation.mutate({ userId: user.id, values });
  });

  const isLastStep = currentStepIndex === REGISTRATION_STEPS.length - 1;

  return (
    <PageShellFrame>
      <TopBar>
        <TopBarLogo src={mbopoLogo} alt="Mbobpo Akwa Ibom" />
        <TopBarLabel>2026 APPLICATIONS</TopBarLabel>
      </TopBar>
      <Main>
        <Intro>
          <BackToDashboard to="/dashboard">
            <ArrowLeft size={15} /> Back to dashboard
          </BackToDashboard>
          <Eyebrow>Mbobpo AKWA IBOM</Eyebrow>
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
          <StepProgress currentStepIndex={currentStepIndex} />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (isLastStep) {
                onSubmit();
              } else {
                void goToNextStep();
              }
            }}
            noValidate
          >
            {currentStepIndex === 0 && (
              <PersonalStep
                user={user}
                register={register}
                errors={errors}
                passportPhotoUrl={passportPhoto.previewUrl}
                passportPhotoError={
                  passportPhoto.error ??
                  (requirePassportPhoto ? REQUIRED_PHOTO_MESSAGE : undefined)
                }
                onPassportPhotoChange={passportPhoto.onChange}
              />
            )}
            {currentStepIndex === 1 && (
              <IdentityOriginStep
                user={user}
                register={register}
                control={control}
                errors={errors}
                certificateUrl={certificate.previewUrl}
                certificateError={
                  certificate.error ??
                  (requireCertificate ? REQUIRED_PHOTO_MESSAGE : undefined)
                }
                onCertificateChange={certificate.onChange}
              />
            )}
            {currentStepIndex === 2 && (
              <EducationStep
                register={register}
                control={control}
                errors={errors}
                fullImageUrl={fullImage.previewUrl}
                fullImageError={
                  fullImage.error ??
                  (requireFullImage ? REQUIRED_PHOTO_MESSAGE : undefined)
                }
                onFullImageChange={fullImage.onChange}
              />
            )}
            {currentStepIndex === 3 && (
              <StoryStep
                register={register}
                control={control}
                errors={errors}
              />
            )}

            <FormActions>
              {currentStepIndex > 0 ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={goToPreviousStep}
                >
                  <ArrowLeft size={16} /> Back
                </Button>
              ) : (
                <span />
              )}
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                disabled={submitMutation.isPending}
              >
                {isLastStep
                  ? submitMutation.isPending
                    ? "Submitting…"
                    : "Submit Application"
                  : "Continue"}
                {!submitMutation.isPending && <ArrowRight size={16} />}
              </Button>
            </FormActions>
          </form>
        </FormCard>
      </Main>
    </PageShellFrame>
  );
}
