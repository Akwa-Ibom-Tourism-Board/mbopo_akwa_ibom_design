import styled, { keyframes } from "styled-components";
import { DialogContent } from "@/shared/ui";
import { media } from "@/theme";

export const InstructionsCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 22px;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.08)};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 12px;
  line-height: 1.65;

  svg {
    flex: 0 0 auto;
    margin-top: 1px;
  }

  strong {
    font-weight: 700;
  }

  ul {
    margin: 6px 0 0;
    padding-left: 18px;
  }
`;

// The inviting, compact call-to-action shown inline on the step — the
// actual camera work happens in RecordingDialogContent below, opened full
// size so the live preview and recording controls have real room instead
// of being squeezed into the multi-step form's card width.
export const LaunchCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 40px 24px;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
  text-align: center;
`;

export const LaunchIcon = styled.span`
  display: grid;
  width: 56px;
  height: 56px;
  place-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.14)};
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
`;

export const LaunchText = styled.p`
  margin: 0;
  max-width: 360px;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 13px;
  line-height: 1.6;
`;

// A compact, read-only summary once the video is locked in — no more
// controls, just proof it's on file and a way to watch it back.
export const LockedCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.06)};

  ${media.sm} {
    padding: 18px 20px;
  }
`;

export const LockedThumb = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: 68px;
  height: 90px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.md};
  background: #0a0f0c;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const LockedInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const LockedTitle = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 13.5px;
  font-weight: 700;
`;

export const LockedHint = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 12.5px;
  line-height: 1.55;
`;

// Deliberately generous — this is the whole point of moving recording into
// a dialog: room for a real, portrait-friendly "face to chest" frame
// instead of the cramped 16:9 strip the inline card allowed.
export const RecordingDialogContent = styled(DialogContent)`
  width: 94vw;
  max-width: 560px;
  padding: 22px;

  ${media.sm} {
    padding: 28px;
  }
`;

export const Stage = styled.div`
  position: relative;
  width: auto;
  height: min(60vh, 640px);
  aspect-ratio: 3 / 4;
  margin: 18px auto 0;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: #0a0f0c;
`;

export const StageVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #0a0f0c;
`;

export const StagePlaceholder = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  text-align: center;
  padding: 0 24px;
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

export const RecordingBadge = styled.div`
  position: absolute;
  top: 14px;
  left: 14px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

const pulse = keyframes`
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
`;

export const RecordingDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.destructive.DEFAULT};
  animation: ${pulse} 1.1s ease-in-out infinite;
`;

export const StageActions = styled.div`
  display: flex;
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

export const RequiredNotice = styled.p`
  margin: 14px 0 0;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 12.5px;
  text-align: center;
`;

export const LockedNotice = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 14px 0 0;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 12.5px;
  font-weight: 600;
  text-align: center;
`;
