import styled from "styled-components";
import { spin } from "@/theme";

export const PhotoField = styled.div`
  margin-top: 24px;
`;

// A passport photo or full-length image is naturally portrait — a wide,
// short box (the old fixed 170px height at full field width) cropped both
// down to an unusable sliver. Sized and shaped like an actual ID-photo
// preview instead: fixed portrait aspect ratio, modest width, so it stays
// consistent whether it's showing the upload prompt or the picked photo.
export const PhotoDrop = styled.label<{ $hasPhoto: boolean }>`
  position: relative;
  display: flex;
  width: 200px;
  max-width: 100%;
  aspect-ratio: 3 / 4;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  overflow: hidden;
  border: 1px dashed
    ${({ theme, $hasPhoto }) => ($hasPhoto ? theme.colors.secondary.DEFAULT : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
  color: ${({ theme }) => theme.colors.muted.foreground};
  text-align: center;
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  strong {
    color: ${({ theme }) => theme.colors.foreground};
    font-size: 12px;
  }

  span {
    padding: 0 12px;
    font-size: 11px;
  }

  input {
    display: none;
  }
`;

export const PhotoIcon = styled.span`
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
`;

export const PhotoPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

// Stands in for PhotoPreview when the uploaded file is a PDF — a browser
// can't render a PDF through an <img> tag, so this is a simple file-type
// badge instead of a thumbnail.
export const PdfPreview = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};

  span {
    font-size: 11px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

// Shown over the (already-visible, locally-previewed) photo while the real
// Cloudinary upload runs in the background — without this, picking a file
// swaps straight to PhotoPreview and the upload becomes invisible, with
// nothing on screen telling the user it hasn't actually been saved yet.
export const UploadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 11px;
  font-weight: 600;

  svg {
    animation: ${spin} 0.8s linear infinite;
  }
`;
