import styled from "styled-components";
import { media } from "@/theme";

export const TopbarFrame = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  background: ${({ theme }) => theme.alpha(theme.colors.background, 0.92)};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  ${media.lg} {
    padding: 18px 32px;
  }
`;

export const MenuToggle = styled.button`
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;

  ${media.lg} {
    display: none;
  }
`;

export const Title = styled.h1`
  flex: 1;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.25rem;
  font-weight: 600;
`;

export const UserCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const UserMeta = styled.div`
  display: none;
  flex-direction: column;
  line-height: 1.3;

  ${media.sm} {
    display: flex;
  }
`;

export const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
`;

// Reference number only appears once there's room for a second line
// under the name — large screens only, per spec.
export const UserReference = styled.span`
  display: none;
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.muted.foreground};

  ${media.lg} {
    display: block;
  }
`;
