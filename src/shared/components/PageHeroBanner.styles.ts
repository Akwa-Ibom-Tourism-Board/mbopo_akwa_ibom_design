import styled from "styled-components";

export const BannerFrame = styled.div`
  padding: 128px 0 48px;
  background: ${({ theme }) => theme.gradients.panel};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

export const BannerEyebrow = styled.p`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.highlight};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

export const BannerTitle = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(30px, 5vw, 46px);
  font-weight: 600;
  letter-spacing: -0.02em;
`;

export const BannerSubtitle = styled.p`
  max-width: 520px;
  margin: 14px auto 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  line-height: 1.7;
`;
