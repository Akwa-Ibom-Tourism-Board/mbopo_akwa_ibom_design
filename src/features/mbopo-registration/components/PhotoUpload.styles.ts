import styled from "styled-components";

export const PhotoField = styled.div`
  margin-top: 24px;
`;

export const PhotoDrop = styled.label<{ $hasPhoto: boolean }>`
  display: flex;
  min-height: 125px;
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
  height: 170px;
  object-fit: cover;
  object-position: center;
`;
