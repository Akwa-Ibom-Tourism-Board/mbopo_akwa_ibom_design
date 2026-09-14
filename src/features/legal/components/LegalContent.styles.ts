import styled from "styled-components";

export const PageFrame = styled.div`
  padding: 56px 0 80px;
`;

export const Prose = styled.article`
  max-width: 760px;
  margin: 0 auto;
`;

export const UpdatedAt = styled.p`
  margin: 0 0 40px;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.8125rem;
`;

export const Section = styled.section`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.25rem;
  font-weight: 600;
`;

export const Paragraph = styled.p`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 0.9375rem;
  line-height: 1.75;
`;

export const List = styled.ul`
  margin: 0 0 12px;
  padding-left: 20px;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 0.9375rem;
  line-height: 1.75;
`;
