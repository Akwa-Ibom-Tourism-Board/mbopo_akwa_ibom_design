import { Check } from "lucide-react";
import { REGISTRATION_STEPS } from "../constants";
import {
  ProgressRow,
  ProgressLabel,
  ProgressStep,
  ProgressTrack,
  ProgressFill,
  StepDots,
  StepDot,
} from "./StepProgress.styles";

export function StepProgress({
  currentStepIndex,
}: {
  currentStepIndex: number;
}) {
  return (
    <>
      <ProgressRow>
        <div>
          <ProgressLabel>APPLICATION FORM</ProgressLabel>
          <ProgressStep>
            {currentStepIndex + 1} of {REGISTRATION_STEPS.length}
          </ProgressStep>
        </div>
        <ProgressTrack>
          <ProgressFill
            $progress={(currentStepIndex + 1) / REGISTRATION_STEPS.length}
          />
        </ProgressTrack>
      </ProgressRow>
      <StepDots>
        {REGISTRATION_STEPS.map((label, index) => (
          <StepDot
            key={label}
            $active={index === currentStepIndex}
            $complete={index < currentStepIndex}
          >
            <span>
              {index < currentStepIndex ? <Check size={12} /> : index + 1}
            </span>
            <label>{label}</label>
          </StepDot>
        ))}
      </StepDots>
    </>
  );
}
