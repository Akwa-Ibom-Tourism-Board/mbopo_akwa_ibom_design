import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { Button, sonnerToast } from "@/shared/ui";
import type { VerifiedUser } from "@/features/auth";
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
import { useVideoRecorder } from "./useVideoRecorder";
import { PersonalStep } from "./steps/PersonalStep";
import { IdentityOriginStep } from "./steps/IdentityOriginStep";
import { EducationStep } from "./steps/EducationStep";
import { VideoPitchStep } from "./steps/VideoPitchStep";
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
const PERSONAL_STEP = 0;
const IDENTITY_STEP = 1;
const EDUCATION_STEP = 2;
const VIDEO_STEP = 3;

// Everything except the video pitch can be saved as a draft and resumed —
// see "Save & Exit" below. The video is different: once it's been
// submitted (useVideoRecorder's "locked" status), it can never be
// re-recorded, even from a resumed draft, so it isn't gated the same way
// the other steps' required fields are.
export function RegistrationForm({
  user,
  initialDraft,
}: {
  user: VerifiedUser;
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
  const [requireFullImage2, setRequireFullImage2] = useState(false);
  const [requireVideo, setRequireVideo] = useState(false);
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
  const fullImage2 = usePhotoUpload({
    initialDataUrl: initialDraft?.photos.fullImage2,
  });
  const videoRecorder = useVideoRecorder({
    userId: user.id,
    initialLockedUrl: initialDraft?.videoPitchUrl,
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

  // The multi-step form is one single route — react-router's own
  // scroll-to-top (see ScrollRestoration.tsx) never fires between steps,
  // so without this, "Continue"/"Back" from partway down a long step would
  // otherwise land the next step's content off-screen below the fold.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStepIndex]);

  useEffect(() => {
    if (submitMutation.isSuccess) window.scrollTo(0, 0);
  }, [submitMutation.isSuccess]);

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
    fullImage2: await fullImage2.getPersistableDataUrl(),
  });

  const goToNextStep = async () => {
    const fieldsValid = await trigger(STEP_FIELDS[currentStepIndex]);
    if (!fieldsValid) return;

    if (currentStepIndex === PERSONAL_STEP) {
      setRequirePassportPhoto(!passportPhoto.hasPhoto);
      if (!passportPhoto.hasPhoto) return;
    } else if (currentStepIndex === IDENTITY_STEP) {
      setRequireCertificate(!certificate.hasPhoto);
      if (!certificate.hasPhoto) return;
    } else if (currentStepIndex === EDUCATION_STEP) {
      setRequireFullImage(!fullImage.hasPhoto);
      setRequireFullImage2(!fullImage2.hasPhoto);
      if (!fullImage.hasPhoto || !fullImage2.hasPhoto) return;
    } else if (currentStepIndex === VIDEO_STEP) {
      setRequireVideo(videoRecorder.status !== "locked");
      if (videoRecorder.status !== "locked") return;
    }

    setCurrentStepIndex((index) =>
      Math.min(index + 1, REGISTRATION_STEPS.length - 1),
    );
  };

  const goToPreviousStep = () =>
    setCurrentStepIndex((index) => Math.max(index - 1, 0));

  const handleSaveAndExit = async () => {
    if (videoRecorder.status === "preview") {
      sonnerToast.error(
        "Tap Submit Video to keep your recording, or Record Again — an unsubmitted take isn't saved with your draft.",
      );
      return;
    }
    const photos = await gatherPhotos();
    saveDraftMutation.mutate({
      userId: user.id,
      values: getValues(),
      currentStepIndex,
      photos,
      videoPitchUrl:
        videoRecorder.status === "locked"
          ? videoRecorder.previewUrl
          : undefined,
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
        (index === PERSONAL_STEP && !passportPhoto.hasPhoto) ||
        (index === IDENTITY_STEP && !certificate.hasPhoto) ||
        (index === EDUCATION_STEP &&
          (!fullImage.hasPhoto || !fullImage2.hasPhoto)) ||
        (index === VIDEO_STEP && videoRecorder.status !== "locked");
      if (hasFieldError || missingPhoto) return index;
    }
    return null;
  };

  const openReview = async () => {
    const fieldsValid = await trigger();
    const photosOk =
      passportPhoto.hasPhoto &&
      certificate.hasPhoto &&
      fullImage.hasPhoto &&
      fullImage2.hasPhoto;
    const videoOk = videoRecorder.status === "locked";

    if (!fieldsValid || !photosOk || !videoOk) {
      setRequirePassportPhoto(!passportPhoto.hasPhoto);
      setRequireCertificate(!certificate.hasPhoto);
      setRequireFullImage(!fullImage.hasPhoto);
      setRequireFullImage2(!fullImage2.hasPhoto);
      setRequireVideo(!videoOk);
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
    if (videoRecorder.status !== "locked") return;
    const photos = await gatherPhotos();
    submitMutation.mutate({
      userId: user.id,
      values: getValues(),
      photos,
      videoPitchUrl: videoRecorder.previewUrl,
    });
  };

  const isLastStep = currentStepIndex === REGISTRATION_STEPS.length - 1;
  const isBusy = submitMutation.isPending || saveDraftMutation.isPending;

  return (
    <Main>
      <Intro>
        <Eyebrow>Mbopo AKWA IBOM</Eyebrow>
        <Title>
          Your place in history
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
          {currentStepIndex === PERSONAL_STEP && (
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
          {currentStepIndex === IDENTITY_STEP && (
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
          {currentStepIndex === EDUCATION_STEP && (
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
              fullImage2Url={fullImage2.previewUrl}
              fullImage2Error={
                fullImage2.error ??
                (requireFullImage2 ? REQUIRED_PHOTO_MESSAGE : undefined)
              }
              onFullImage2Change={fullImage2.onChange}
            />
          )}
          {currentStepIndex === VIDEO_STEP && (
            <VideoPitchStep
              recorder={videoRecorder}
              showRequiredNotice={requireVideo}
            />
          )}
          {isLastStep && (
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
          fullImage2: fullImage2.previewUrl,
        }}
        videoPreviewUrl={videoRecorder.previewUrl}
        isSubmitting={submitMutation.isPending}
        onConfirm={() => void handleConfirmSubmit()}
      />
    </Main>
  );
}
