import styled from "styled-components";
import { Link } from "react-router-dom";
import { media } from "@/theme";

export const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: 100px 0 110px;
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.7) 1px,
    transparent 1px
  );
  background-size: 28px 28px;
`;

export const Inner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EyebrowRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

export const EyebrowRule = styled.span`
  width: 40px;
  height: 1px;
  background: ${({ theme }) => theme.colors.white};
`;

export const Eyebrow = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`;

export const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(38px, 6vw, 68px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.02;

  em {
    font-style: italic;
  }
`;

export const Copy = styled.p`
  margin: 22px 0 34px;
  max-width: 480px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 15px;
  line-height: 1.6;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;

  ${media.sm} {
    flex-direction: row;
    gap: 16px;
  }
`;

export const RegisterLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 54px;
  padding: 0 28px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
  }
`;

export const GhostLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 54px;
  padding: 0 26px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: ${({ theme }) => theme.radii.full};
  color: ${({ theme }) => theme.colors.white};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition:
    background-color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.white};
    background: rgba(255, 255, 255, 0.12);
  }
`;
