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
  MissingFieldsModal,
  type MissingFieldItem,
} from "./MissingFieldsModal";
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

// Human-readable names for the MissingFieldsModal — matches each field's
// on-screen label exactly (see the step components' own `label=` props),
// so "go to field" takes the applicant to something they recognize.
const FIELD_LABELS: Record<keyof RegistrationFormValues, string> = {
  middleName: "Middle name",
  phone: "Phone number",
  maritalStatus: "Marital status",
  socialMedia: "Social media handles",
  nextOfKin: "Next of kin full name",
  nextOfKinPhone: "Next of kin phone",
  nextOfKinRelationship: "Relationship with next of kin",
  village: "Village",
  localGovernment: "Local Government Area of origin",
  residenceState: "State of residence",
  city: "Town / city of residence",
  address: "Home address",
  education: "Highest educational qualification",
  educationOther: "Name your qualification",
  institution: "Institution attended",
  institutionOther: "Name your institution",
  occupation: "Occupation",
  occupationOther: "Name your occupation",
  talents: "Talent(s)",
  languages: "Languages spoken",
  vin: "Voter Identification Number (VIN)",
  initiative: "Community initiative, business or skill",
  why: "Why you want to be Mbopo Akwa Ibom",
  declarationIdentity: "Identity declaration",
  declarationAccuracy: "Accuracy declaration",
  declarationTerms: "Terms & conditions",
};

// A resumed draft has no notion of "which step was I on" on the backend —
// the Application row is just the fields themselves, not a UI cursor — so
// the initial step is derived from which fields/photos are actually
// missing, the same rule findFirstInvalidStep applies interactively later,
// just checked against the raw fetched row instead of live form state.
// occupationOther/institutionOther are only actually required when their
// dropdown is set to "Other" (see schema.ts's cross-field refines) — a
// blanket emptiness check would wrongly treat a draft as incomplete at the
// Education step for everyone who didn't need to fill either in.
const CONDITIONAL_OTHER_FIELDS = new Set([
  "educationOther",
  "occupationOther",
  "institutionOther",
]);

function findInitialStep(draft: Application | null | undefined): number {
  if (!draft) return 0;
  for (let index = 0; index < STEP_FIELDS.length; index += 1) {
    const missingField = (STEP_FIELDS[index] ?? [])
      .filter((name) => !CONDITIONAL_OTHER_FIELDS.has(name))
      .some((name) => {
        const value = draft[name as keyof Application];
        return (
          value === undefined ||
          value === null ||
          value === "" ||
          value === false
        );
      });
    const missingOther =
      (draft.education === "Other" && !draft.educationOther) ||
      (draft.occupation === "Other" && !draft.occupationOther) ||
      (draft.institution === "Other" && !draft.institutionOther);
    const missingPhoto =
      (index === IDENTITY_STEP && !draft.certificateOfOriginUrl) ||
      (index === VIDEO_STEP &&
        (!draft.fullImageUrl || !draft.fullImageUrl2 || !draft.videoPitchUrl));
    if (missingField || missingOther || missingPhoto) return index;
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
  const [requireCertificate, setRequireCertificate] = useState(false);
  const [requireFullImage, setRequireFullImage] = useState(false);
  const [requireFullImage2, setRequireFullImage2] = useState(false);
  const [requireVideo, setRequireVideo] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [missingFieldsOpen, setMissingFieldsOpen] = useState(false);
  const [missingFieldItems, setMissingFieldItems] = useState<
    MissingFieldItem[]
  >([]);

  // Every photo/video field uploads and saves itself the moment it's
  // picked (see usePhotoUpload/useVideoRecorder) — there's no "gather
  // everything, send it all with the draft" step any more.
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
    // This form never calls RHF's own handleSubmit (each step advances via
    // manual trigger() calls instead), so isSubmitted never becomes true.
    // With the default mode ("onSubmit"), RHF skips all onChange
    // re-validation until isSubmitted is true, so a field flagged invalid
    // by trigger() would never clear on its own as the user fixed it.
    // "onChange" re-validates fields that already have an error on every
    // change, which clears them once the field becomes valid.
    mode: "onChange",
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

  // Fires on every "Continue" — separate from saveDraftMutation because
  // that one navigates to the dashboard and toasts success on completion,
  // neither of which belongs here. This one is silent on success (nothing
  // to tell the user — they're already moving on) and only ever speaks up
  // if it fails, since a step transition that waited for this network
  // round trip is exactly the "network makes a mess, start again" problem
  // being fixed: the step change below never waits on this.
  const autosaveMutation = useMutation({
    mutationFn: saveRegistrationDraft,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard", "summary"] });
    },
    onError: (error) =>
      sonnerToast.error(
        friendlyMessage(
          error,
          "We couldn't save your progress just now — check your connection. Your answers are still on this page, so don't close it; try Save & Exit once you're back online.",
        ),
      ),
  });

  if (submitMutation.isSuccess) {
    return <SuccessState referenceCode={submitMutation.data.referenceCode} />;
  }

  const anyPhotoUploading =
    certificate.isUploading || fullImage.isUploading || fullImage2.isUploading;

  const goToNextStep = async () => {
    const fieldsValid = await trigger(STEP_FIELDS[currentStepIndex]);
    if (!fieldsValid) return;

    if (currentStepIndex === IDENTITY_STEP) {
      setRequireCertificate(!certificate.hasPhoto);
      if (!certificate.hasPhoto) return;
    } else if (currentStepIndex === VIDEO_STEP) {
      setRequireFullImage(!fullImage.hasPhoto);
      setRequireFullImage2(!fullImage2.hasPhoto);
      setRequireVideo(videoRecorder.status !== "locked");
      if (
        !fullImage.hasPhoto ||
        !fullImage2.hasPhoto ||
        videoRecorder.status !== "locked"
      )
        return;
    }

    // Persist this step's answers the moment the applicant moves on —
    // fire-and-forget (not awaited), so the step change below happens
    // immediately rather than waiting on the network. Without this, their
    // only save point was the explicit "Save & Exit" button, so a dropped
    // connection partway through the form meant everything typed since the
    // last manual save was gone.
    autosaveMutation.mutate(getValues());

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
        (index === IDENTITY_STEP && !certificate.hasPhoto) ||
        (index === VIDEO_STEP &&
          (!fullImage.hasPhoto ||
            !fullImage2.hasPhoto ||
            videoRecorder.status !== "locked"));
      if (hasFieldError || missingPhoto) return index;
    }
    return null;
  };

  // Named individually (rather than looping every field in STEP_FIELDS)
  // because the certificate/full images/video aren't form fields at all —
  // they're tracked by usePhotoUpload/useVideoRecorder — so they need their
  // own entries alongside whatever trigger() finds invalid.
  const buildMissingFieldItems = (): MissingFieldItem[] => {
    const items: MissingFieldItem[] = [];

    STEP_FIELDS.forEach((fields, stepIndex) => {
      fields.forEach((name) => {
        if (getFieldState(name).invalid) {
          items.push({
            step: stepIndex,
            stepLabel: REGISTRATION_STEPS[stepIndex] ?? "",
            fieldLabel: FIELD_LABELS[name] ?? name,
          });
        }
      });
    });

    if (!certificate.hasPhoto) {
      items.push({
        step: IDENTITY_STEP,
        stepLabel: REGISTRATION_STEPS[IDENTITY_STEP],
        fieldLabel: "Certificate of Origin",
      });
    }
    if (!fullImage.hasPhoto) {
      items.push({
        step: VIDEO_STEP,
        stepLabel: REGISTRATION_STEPS[VIDEO_STEP],
        fieldLabel: "Full Image 1",
      });
    }
    if (!fullImage2.hasPhoto) {
      items.push({
        step: VIDEO_STEP,
        stepLabel: REGISTRATION_STEPS[VIDEO_STEP],
        fieldLabel: "Full Image 2",
      });
    }
    if (videoRecorder.status !== "locked") {
      items.push({
        step: VIDEO_STEP,
        stepLabel: REGISTRATION_STEPS[VIDEO_STEP],
        fieldLabel: "Video pitch",
      });
    }

    return items;
  };

  const openReview = async () => {
    const fieldsValid = await trigger();
    const photosOk =
      certificate.hasPhoto && fullImage.hasPhoto && fullImage2.hasPhoto;
    const videoOk = videoRecorder.status === "locked";

    if (!fieldsValid || !photosOk || !videoOk) {
      setRequireCertificate(!certificate.hasPhoto);
      setRequireFullImage(!fullImage.hasPhoto);
      setRequireFullImage2(!fullImage2.hasPhoto);
      setRequireVideo(!videoOk);
      const invalidStep = findFirstInvalidStep();
      if (invalidStep !== null) setCurrentStepIndex(invalidStep);
      setMissingFieldItems(buildMissingFieldItems());
      setMissingFieldsOpen(true);
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
              control={control}
              errors={errors}
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
            />
          )}
          {currentStepIndex === VIDEO_STEP && (
            <VideoPitchStep
              recorder={videoRecorder}
              showRequiredNotice={requireVideo}
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
          certificateOfOrigin: certificate.previewUrl,
          fullImage: fullImage.previewUrl,
          fullImage2: fullImage2.previewUrl,
        }}
        videoPreviewUrl={videoRecorder.previewUrl}
        isSubmitting={submitMutation.isPending}
        onConfirm={() => void handleConfirmSubmit()}
      />

      <MissingFieldsModal
        open={missingFieldsOpen}
        onOpenChange={setMissingFieldsOpen}
        items={missingFieldItems}
        onGoToStep={setCurrentStepIndex}
      />
    </Main>
  );
}
