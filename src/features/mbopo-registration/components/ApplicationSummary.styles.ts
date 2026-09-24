import styled from "styled-components";

export const Section = styled.section`
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: none;
  }
`;

export const SectionTitle = styled.h3`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1rem;
  font-weight: 600;
`;

export const DetailGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px 20px;
  margin: 0;
`;

export const DetailItem = styled.div<{ $wide?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 3px;
  grid-column: ${({ $wide }) => ($wide ? "1 / -1" : "auto")};
`;

export const DetailLabel = styled.dt`
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const DetailValue = styled.dd`
  margin: 0;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 0.9375rem;
  line-height: 1.5;
  white-space: pre-wrap;
`;

export const PhotoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 18px;
`;

export const PhotoThumb = styled.figure`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;

  img {
    width: 96px;
    height: 96px;
    border-radius: ${({ theme }) => theme.radii.lg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    object-fit: cover;
  }

  figcaption {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.muted.foreground};
  }
`;

// Shown in place of a photo when an older/incomplete stored record has no
// URL for that slot — this display never throws on missing data, it just
// says so.
export const PhotoPlaceholder = styled.div`
  display: grid;
  place-items: center;
  width: 96px;
  height: 96px;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.muted.foreground};
`;
