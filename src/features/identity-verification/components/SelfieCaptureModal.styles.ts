import styled from "styled-components";
import { DialogContent } from "@/shared/ui";
import { media } from "@/theme";

export const ModalContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  width: 94vw;
  max-width: 480px;
  max-height: 92vh;
  padding: 20px;

  ${media.sm} {
    padding: 28px;
  }
`;

export const InstructionsCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 2px 0 16px;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.08)};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 12px;
  line-height: 1.6;

  svg {
    flex: 0 0 auto;
    margin-top: 1px;
  }
`;

export const Stage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: #0a0f0c;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
`;

export const StageVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #0a0f0c;
  /* Mirrored so the applicant sees a natural self-view while framing the
     shot — useSelfieCamera's capture() un-mirrors the saved frame to
     compensate, so the actual photo sent for verification is true-to-life. */
  transform: scaleX(-1);
`;

export const CapturedImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StagePlaceholder = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 24px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  text-align: center;
`;

export const PlaceholderIcon = styled.span`
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
`;

export const StageActions = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 18px;
`;

export const ErrorBanner = styled.p`
  margin: 14px 0 0;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 12.5px;
  text-align: center;
`;
