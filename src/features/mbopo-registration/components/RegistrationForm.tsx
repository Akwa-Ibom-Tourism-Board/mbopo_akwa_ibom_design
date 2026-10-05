import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { Button, sonnerToast } from "@/shared/ui";
import { friendlyMessage } from "@/lib/http";
import type { VerifiedUser } from "@/features/auth";
import {
  registrationSchema,
  DEFAULT_REGISTRATION_FORM_VALUES,
  STEP_FIELDS,
  type RegistrationFormValues,
} from "../schema";
import { REGISTRATION_STEPS } from "../constants";
import { submitApplication, saveRegistrationDraft } from "../api";
import type { Application } from "../types";
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

// A resumed draft has no notion of "which step was I on" on the backend —
// the Application row is just the fields themselves, not a UI cursor — so
// the initial step is derived from which fields/photos are actually
// missing, the same rule findFirstInvalidStep applies interactively later,
// just checked against the raw fetched row instead of live form state.
function findInitialStep(draft: Application | null | undefined): number {
  if (!draft) return 0;
  for (let index = 0; index < STEP_FIELDS.length; index += 1) {
    const missingField = (STEP_FIELDS[index] ?? []).some((name) => {
      const value = draft[name as keyof Application];
      return (
        value === undefined || value === null || value === "" || value === false
      );
    });
    const missingPhoto =
      (index === PERSONAL_STEP && !draft.passportPhotoUrl) ||
      (index === IDENTITY_STEP && !draft.certificateOfOriginUrl) ||
      (index === EDUCATION_STEP &&
        (!draft.fullImageUrl || !draft.fullImageUrl2)) ||
      (index === VIDEO_STEP && !draft.videoPitchUrl);
    if (missingField || missingPhoto) return index;
  }
  return REGISTRATION_STEPS.length - 1;
}

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
  initialDraft?: Application | null;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [currentStepIndex, setCurrentStepIndex] = useState(() =>
    findInitialStep(initialDraft),
  );
  const [requirePassportPhoto, setRequirePassportPhoto] = useState(false);
  const [requireCertificate, setRequireCertificate] = useState(false);
  const [requireFullImage, setRequireFullImage] = useState(false);
  const [requireFullImage2, setRequireFullImage2] = useState(false);
  const [requireVideo, setRequireVideo] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  // Every photo/video field uploads and saves itself the moment it's
  // picked (see usePhotoUpload/useVideoRecorder) — there's no "gather
  // everything, send it all with the draft" step any more.
  const passportPhoto = usePhotoUpload({
    field: "passportPhoto",
    initialUrl: initialDraft?.passportPhotoUrl ?? undefined,
  });
  const certificate = usePhotoUpload({
    field: "certificateOfOrigin",
    allowPdf: true,
    invalidTypeMessage: "Please choose an image or PDF file.",
    initialUrl: initialDraft?.certificateOfOriginUrl ?? undefined,
  });
  const fullImage = usePhotoUpload({
    field: "fullImage",
    initialUrl: initialDraft?.fullImageUrl ?? undefined,
  });
  const fullImage2 = usePhotoUpload({
    field: "fullImage2",
    initialUrl: initialDraft?.fullImageUrl2 ?? undefined,
  });
  const videoRecorder = useVideoRecorder({
    initialLockedUrl: initialDraft?.videoPitchUrl ?? undefined,
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
      ...initialDraft,
    },
  });

  const submitMutation = useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      // Deliberately not invalidating the mbopo-registration "application"
      // query here: that query belongs to the outer MbopoRegistrationPage,
      // and refetching it immediately would flip its branch over to the
      // read-only view mid-render, cutting off the SuccessState screen
      // below before the user ever sees it. It's invalidated on unmount
      // instead, once they've actually moved on.
      queryClient.invalidateQueries({ queryKey: ["dashboard", "summary"] });
    },
    onError: (error) =>
      sonnerToast.error(
        friendlyMessage(
          error,
          "We could not submit your application. Please try again.",
        ),
      ),
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({
        queryKey: ["mbopo-registration", "application"],
      });
    },
    [queryClient],
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
        queryKey: ["mbopo-registration", "application"],
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "summary"] });
      sonnerToast.success("Draft saved. Pick up anytime from your dashboard.");
      navigate("/dashboard");
    },
    onError: (error) =>
      sonnerToast.error(
        friendlyMessage(
          error,
          "We could not save your draft. Please try again.",
        ),
      ),
  });

  if (submitMutation.isSuccess) {
    return <SuccessState referenceCode={submitMutation.data.referenceCode} />;
  }

  const anyPhotoUploading =
    passportPhoto.isUploading ||
    certificate.isUploading ||
    fullImage.isUploading ||
    fullImage2.isUploading;

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
        "Tap Submit Video to keep your recording, or Record Again — an unsubmitted take is not saved with your draft.",
      );
      return;
    }
    saveDraftMutation.mutate(getValues());
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
    submitMutation.mutate(getValues());
  };

  const isLastStep = currentStepIndex === REGISTRATION_STEPS.length - 1;
  const isBusy =
    submitMutation.isPending ||
    saveDraftMutation.isPending ||
    anyPhotoUploading ||
    videoRecorder.status === "submitting";

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
              passportPhotoUploading={passportPhoto.isUploading}
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
              certificateIsPdf={certificate.isPdf}
              certificateError={
                certificate.error ??
                (requireCertificate ? REQUIRED_PHOTO_MESSAGE : undefined)
              }
              certificateUploading={certificate.isUploading}
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
              fullImageUploading={fullImage.isUploading}
              onFullImageChange={fullImage.onChange}
              fullImage2Url={fullImage2.previewUrl}
              fullImage2Error={
                fullImage2.error ??
                (requireFullImage2 ? REQUIRED_PHOTO_MESSAGE : undefined)
              }
              fullImage2Uploading={fullImage2.isUploading}
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
