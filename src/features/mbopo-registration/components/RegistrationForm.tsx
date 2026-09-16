import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { Button, sonnerToast } from "@/shared/ui";
import type { User } from "@/features/auth";
import {
  registrationSchema,
  DEFAULT_REGISTRATION_FORM_VALUES,
  STEP_FIELDS,
  type RegistrationFormValues,
} from "../schema";
import { REGISTRATION_STEPS } from "../constants";
import { submitApplication, saveRegistrationDraft } from "../api";
import type { RegistrationDraft, RegistrationPhotoDataUrls } from "../types";
import { StepProgress } from "./StepProgress";
import { usePhotoUpload } from "./usePhotoUpload";
import { PersonalStep } from "./steps/PersonalStep";
import { IdentityOriginStep } from "./steps/IdentityOriginStep";
import { EducationStep } from "./steps/EducationStep";
import { StoryStep } from "./steps/StoryStep";
import { SuccessState } from "./SuccessState";
import { ReviewSubmitModal } from "./ReviewSubmitModal";
import {
  Main,
  Intro,
  Eyebrow,
  Title,
  IntroCopy,
  FormCard,
  FormActions,
  FormActionsStart,
} from "./RegistrationForm.styles";

const REQUIRED_PHOTO_MESSAGE = "This photo is required.";

export function RegistrationForm({
  user,
  initialDraft,
}: {
  user: User;
  initialDraft?: RegistrationDraft | null;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [currentStepIndex, setCurrentStepIndex] = useState(() =>
    Math.min(
      Math.max(initialDraft?.currentStepIndex ?? 0, 0),
      REGISTRATION_STEPS.length - 1,
    ),
  );
  const [requirePassportPhoto, setRequirePassportPhoto] = useState(false);
  const [requireCertificate, setRequireCertificate] = useState(false);
  const [requireFullImage, setRequireFullImage] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  const passportPhoto = usePhotoUpload({
    initialDataUrl: initialDraft?.photos.passportPhoto,
  });
  const certificate = usePhotoUpload({
    allowPdf: true,
    invalidTypeMessage: "Please choose an image or PDF file.",
    initialDataUrl: initialDraft?.photos.certificateOfOrigin,
  });
  const fullImage = usePhotoUpload({
    initialDataUrl: initialDraft?.photos.fullImage,
  });

  const {
    register,
    control,
    getValues,
    trigger,
    getFieldState,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      ...DEFAULT_REGISTRATION_FORM_VALUES,
      ...initialDraft?.values,
    },
  });

  const submitMutation = useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      // Deliberately not invalidating the mbopo-registration "submitted"
      // query here: that query belongs to the outer MbopoRegistrationPage,
      // and refetching it immediately would flip its branch over to the
      // read-only view mid-render, cutting off the SuccessState screen
      // below before the user ever sees it. It's invalidated on unmount
      // instead, once they've actually moved on.
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "summary", user.id],
      });
    },
    onError: () =>
      sonnerToast.error(
        "We couldn't submit your application. Please try again.",
      ),
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({
        queryKey: ["mbopo-registration", "submitted", user.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["mbopo-registration", "draft", user.id],
      });
    },
    [queryClient, user.id],
  );

  const saveDraftMutation = useMutation({
    mutationFn: saveRegistrationDraft,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mbopo-registration", "draft", user.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "summary", user.id],
      });
      sonnerToast.success("Draft saved. Pick up anytime from your dashboard.");
      navigate("/dashboard");
    },
    onError: () =>
      sonnerToast.error("We couldn't save your draft. Please try again."),
  });

  if (submitMutation.isSuccess) {
    return <SuccessState referenceCode={submitMutation.data.referenceCode} />;
  }

  const gatherPhotos = async (): Promise<RegistrationPhotoDataUrls> => ({
    passportPhoto: await passportPhoto.getPersistableDataUrl(),
    certificateOfOrigin: await certificate.getPersistableDataUrl(),
    fullImage: await fullImage.getPersistableDataUrl(),
  });

  const goToNextStep = async () => {
    const fieldsValid = await trigger(STEP_FIELDS[currentStepIndex]);
    if (!fieldsValid) return;

    if (currentStepIndex === 0) {
      setRequirePassportPhoto(!passportPhoto.hasPhoto);
      if (!passportPhoto.hasPhoto) return;
    } else if (currentStepIndex === 1) {
      setRequireCertificate(!certificate.hasPhoto);
      if (!certificate.hasPhoto) return;
    } else if (currentStepIndex === 2) {
      setRequireFullImage(!fullImage.hasPhoto);
      if (!fullImage.hasPhoto) return;
    }

    setCurrentStepIndex((index) =>
      Math.min(index + 1, REGISTRATION_STEPS.length - 1),
    );
  };

  const goToPreviousStep = () =>
    setCurrentStepIndex((index) => Math.max(index - 1, 0));

  const handleSaveAndExit = async () => {
    const photos = await gatherPhotos();
    saveDraftMutation.mutate({
      userId: user.id,
      values: getValues(),
      currentStepIndex,
      photos,
    });
  };

  // Every step's fields are validated as the user moves forward, but a
  // resumed draft may have been last touched on an earlier step — so
  // before opening the review modal, re-validate the whole form and jump
  // back to the first step that still needs attention.
  const findFirstInvalidStep = (): number | null => {
    for (let index = 0; index < STEP_FIELDS.length; index += 1) {
      const hasFieldError = (STEP_FIELDS[index] ?? []).some(
        (name) => getFieldState(name).invalid,
      );
      const missingPhoto =
        (index === 0 && !passportPhoto.hasPhoto) ||
        (index === 1 && !certificate.hasPhoto) ||
        (index === 2 && !fullImage.hasPhoto);
      if (hasFieldError || missingPhoto) return index;
    }
    return null;
  };

  const openReview = async () => {
    const fieldsValid = await trigger();
    const photosOk =
      passportPhoto.hasPhoto && certificate.hasPhoto && fullImage.hasPhoto;

    if (!fieldsValid || !photosOk) {
      setRequirePassportPhoto(!passportPhoto.hasPhoto);
      setRequireCertificate(!certificate.hasPhoto);
      setRequireFullImage(!fullImage.hasPhoto);
      const invalidStep = findFirstInvalidStep();
      if (invalidStep !== null) setCurrentStepIndex(invalidStep);
      sonnerToast.error(
        "Please complete all required fields before submitting.",
      );
      return;
    }

    setReviewOpen(true);
  };

  const handleConfirmSubmit = async () => {
    const photos = await gatherPhotos();
    submitMutation.mutate({ userId: user.id, values: getValues(), photos });
  };

  const isLastStep = currentStepIndex === REGISTRATION_STEPS.length - 1;
  const isBusy = submitMutation.isPending || saveDraftMutation.isPending;

  return (
    <Main>
      <Intro>
        <Eyebrow>Mbopo AKWA IBOM</Eyebrow>
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
              void openReview();
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
            <StoryStep register={register} control={control} errors={errors} />
          )}

          <FormActions>
            <FormActionsStart>
              {currentStepIndex > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={goToPreviousStep}
                  disabled={isBusy}
                >
                  <ArrowLeft size={16} /> Back
                </Button>
              )}
              <Button
                type="button"
                variant="ghost"
                onClick={() => void handleSaveAndExit()}
                disabled={isBusy}
              >
                <Save size={16} />
                {saveDraftMutation.isPending ? "Saving…" : "Save & Exit"}
              </Button>
            </FormActionsStart>
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={isBusy}
            >
              {isLastStep ? "Review & Submit" : "Continue"}
              {!isBusy && <ArrowRight size={16} />}
            </Button>
          </FormActions>
        </form>
      </FormCard>

      <ReviewSubmitModal
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        user={user}
        values={getValues()}
        photos={{
          passportPhoto: passportPhoto.previewUrl,
          certificateOfOrigin: certificate.previewUrl,
          fullImage: fullImage.previewUrl,
        }}
        isSubmitting={submitMutation.isPending}
        onConfirm={() => void handleConfirmSubmit()}
      />
    </Main>
  );
}
