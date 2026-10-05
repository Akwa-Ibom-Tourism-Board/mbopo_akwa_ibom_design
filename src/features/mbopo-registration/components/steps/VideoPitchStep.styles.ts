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

  a {
    color: inherit;
    text-decoration: underline;
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
// instead of the cramped 16:9 strip the inline card allowed. display: flex
// (overriding DialogContent's own display: grid) is what makes that
// trustworthy on short phone screens: the header and the action buttons
// below the stage keep their natural size, and only the stage itself gives
// up height when there isn't enough to go around — see Stage's comment.
export const RecordingDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  width: 94vw;
  max-width: 560px;
  max-height: 92vh;
  padding: 20px;

  ${media.sm} {
    padding: 28px;
  }
`;

export const Stage = styled.div`
  position: relative;
  flex: 0 1 auto;
  /* The earlier 34vh cap under-sized this on ordinary phones too, not just
     short ones: once max-height clips below the height aspect-ratio wants
     (width * 4/3), the box stops reading as a portrait frame at all — it
     just gets shorter and wider. The real fix for the short-screen overlap
     this was guarding against is min-height: 0 below, which is what
     actually lets this flex item shrink under pressure; flex items default
     to min-height: auto, which can refuse to shrink past its aspect-ratio
     size even with flex-shrink enabled (the same min-width: auto bug class
     fixed elsewhere in this app, just on the cross axis here). With that in
     place, this cap only needs to be a sensible ceiling for spacious
     screens, not a defensive floor. */
  min-height: 0;
  width: 100%;
  aspect-ratio: 3 / 4;
  max-height: min(58vh, 520px);
  margin: 16px 0 0;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: #0a0f0c;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    ${({ theme }) => theme.shadows.lg};
`;

export const StageVideo = styled.video<{ $mirror?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #0a0f0c;
  /* Mirrored only for the live, controls-free self-view while recording —
     applicants expect to see themselves as if in a mirror at that point.
     Playback (here passed $mirror=false/undefined) deliberately shows the
     true orientation instead: it has native <video controls>, and a CSS
     mirror flips those along with the frame — the play button, scrubber
     and timestamp all render backwards, which is what this is avoiding.
     This is purely a display transform on this <video> element:
     MediaRecorder always captures straight from the camera track, never
     from a rendered element, so the uploaded file itself is untouched —
     true-to-life, the way everyone else (e.g. a judge reviewing it later)
     actually sees the applicant. */
  transform: ${({ $mirror }) => ($mirror ? "scaleX(-1)" : "none")};
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
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
