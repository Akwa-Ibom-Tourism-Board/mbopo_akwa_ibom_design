import styled from "styled-components";
import { media } from "@/theme";

export const FooterFrame = styled.footer`
  padding: 60px max(24px, calc((100% - 1160px) / 2)) 25px;
  background: ${({ theme }) => theme.gradients.footer};
  color: ${({ theme }) => theme.colors.white};
`;

export const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px 20px;

  ${media.md} {
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
    gap: 32px;
  }
`;

export const BrandColumn = styled.div`
  grid-column: 1 / -1;

  ${media.md} {
    grid-column: auto;
  }
`;

export const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

export const LogoImage = styled.img`
  height: 34px;
  width: auto;
  object-fit: contain;
`;

export const FooterAgency = styled.p`
  margin: 0 0 3px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 13px;
  font-weight: 700;
  line-height: 1.5;
`;

export const FooterSubline = styled.p`
  margin: 0 0 20px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 11px;
  line-height: 1.6;
`;

export const ColumnHeading = styled.h3`
  position: relative;
  margin: 0 0 16px;
  padding-left: 12px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 13px;
  font-weight: 700;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 2px;
    bottom: 2px;
    width: 3px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  }
`;

export const ColumnLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 12px;

  a:hover {
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  }
`;

export const Socials = styled.div`
  display: flex;
  gap: 8px;
`;

export const Social = styled.a`
  display: grid;
  width: 29px;
  height: 29px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.7);
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary.DEFAULT};
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 48px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.4);
  font-size: 10px;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  ${media.sm} {
    flex-direction: row;
    justify-content: space-between;
  }
`;
