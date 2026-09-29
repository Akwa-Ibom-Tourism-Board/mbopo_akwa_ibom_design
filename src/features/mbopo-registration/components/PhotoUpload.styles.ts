import styled from "styled-components";

export const PhotoField = styled.div`
  margin-top: 24px;
`;

// A passport photo or full-length image is naturally portrait — a wide,
// short box (the old fixed 170px height at full field width) cropped both
// down to an unusable sliver. Sized and shaped like an actual ID-photo
// preview instead: fixed portrait aspect ratio, modest width, so it stays
// consistent whether it's showing the upload prompt or the picked photo.
export const PhotoDrop = styled.label<{ $hasPhoto: boolean }>`
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
