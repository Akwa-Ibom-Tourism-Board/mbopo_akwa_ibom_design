import styled from "styled-components";
import { Link } from "react-router-dom";

export const Section = styled.section`
  padding: 110px 0 120px;
  background: ${({ theme }) => theme.colors.heroDeep};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Eyebrow = styled.p`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`;

export const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(44px, 7vw, 82px);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 0.94;

  em {
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
    font-style: italic;
  }
`;

export const Copy = styled.p`
  margin: 24px 0 30px;
  color: rgba(255, 255, 255, 0.66);
  font-size: 14px;
`;

export const RegisterLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 24px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  box-shadow: 0 11px 25px
    ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.3)};
  transition: transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
  }
`;
