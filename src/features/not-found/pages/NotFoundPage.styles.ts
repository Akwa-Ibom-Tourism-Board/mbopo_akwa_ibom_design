import styled from "styled-components";

export const Frame = styled.div`
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 24px;
  background: ${({ theme }) => theme.colors.background};
  text-align: center;
`;

export const Code = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(64px, 12vw, 120px);
  font-weight: 700;
  line-height: 1;
`;

export const Title = styled.h1`
  margin: 12px 0 8px;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const Copy = styled.p`
  margin: 0 0 28px;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.9375rem;
`;
