import { REGEXP_ONLY_DIGITS } from "input-otp";
import { OtpInput, OtpInputSlots } from "@/shared/ui";
import { OTP_LENGTH } from "@/lib/emailVerificationStore";
import { OtpFrame, ResendRow, ResendButton } from "./OtpForm.styles";

export interface OtpFormProps {
  value: string;
  onChange: (value: string) => void;
  onResend: () => void;
  resendDisabled: boolean;
  resendLabel: string;
}

export function OtpForm({
  value,
  onChange,
  onResend,
  resendDisabled,
  resendLabel,
}: OtpFormProps) {
  return (
    <OtpFrame>
      <OtpInput
        maxLength={OTP_LENGTH}
        value={value}
        onChange={onChange}
        pattern={REGEXP_ONLY_DIGITS}
        inputMode="numeric"
      >
        <OtpInputSlots length={OTP_LENGTH} />
      </OtpInput>
      <ResendRow>
        Did not get a code?
        <ResendButton
          type="button"
          onClick={onResend}
          disabled={resendDisabled}
        >
          {resendLabel}
        </ResendButton>
      </ResendRow>
    </OtpFrame>
  );
}
