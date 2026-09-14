import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PageShell, PageHeroBanner, Container } from "@/shared/components";
import { sonnerToast } from "@/shared/ui";
import {
  NinLookupForm,
  type NinLookupFormValues,
} from "../components/NinLookupForm";
import { NinDetailsModal } from "../components/NinDetailsModal";
import { IneligibleNotice } from "../components/IneligibleNotice";
import { lookupNin, requestEmailVerification } from "../api";
import { evaluateEligibility } from "../eligibility";
import type { NinRecord } from "../types";
import { PageFrame } from "./RegisterPage.styles";

type RegisterStage = "lookup" | "ineligible";

export function RegisterPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<RegisterStage>("lookup");
  const [ninRecord, setNinRecord] = useState<NinRecord | undefined>();
  const [ineligibleReasons, setIneligibleReasons] = useState<string[]>([]);

  useEffect(() => {
    document.title = "Register | Mbobpo Akwa Ibom";
  }, []);

  const lookupMutation = useMutation({
    mutationFn: (values: NinLookupFormValues) => lookupNin(values.nin),
    onSuccess: (record) => {
      const eligibility = evaluateEligibility(record);
      if (eligibility.eligible) {
        setNinRecord(record);
        setStage("lookup");
      } else {
        setIneligibleReasons(eligibility.reasons);
        setStage("ineligible");
      }
    },
  });

  const verificationMutation = useMutation({
    mutationFn: requestEmailVerification,
    onSuccess: ({ pendingId, email }) => {
      navigate("/verify-email", { state: { pendingId, email } });
    },
    onError: () => {
      sonnerToast.error(
        "We couldn't send your verification email. Please try again.",
      );
    },
  });

  const resetToLookup = () => {
    setNinRecord(undefined);
    setIneligibleReasons([]);
    setStage("lookup");
  };

  return (
    <PageShell>
      <PageHeroBanner
        eyebrow="Mbobpo Akwa Ibom Registration"
        title="Verify your identity to begin"
        subtitle="We confirm every applicant's NIN before starting an application."
      />
      <PageFrame>
        <Container>
          {stage === "ineligible" ? (
            <IneligibleNotice
              reasons={ineligibleReasons}
              onTryAgain={resetToLookup}
            />
          ) : (
            <NinLookupForm
              onSubmit={(values) => lookupMutation.mutate(values)}
              isSubmitting={lookupMutation.isPending}
              submitError={
                lookupMutation.isError
                  ? lookupMutation.error.message
                  : undefined
              }
            />
          )}
        </Container>
      </PageFrame>

      {ninRecord && (
        <NinDetailsModal
          open={Boolean(ninRecord)}
          record={ninRecord}
          isSubmitting={verificationMutation.isPending}
          onChangeNin={resetToLookup}
          onSubmit={(email) =>
            verificationMutation.mutate({ ninRecord, email })
          }
        />
      )}
    </PageShell>
  );
}
