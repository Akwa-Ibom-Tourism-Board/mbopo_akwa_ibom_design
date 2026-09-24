import styled from "styled-components";

export const NoticeCard = styled.div`
  padding: 28px 24px;
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.destructive.DEFAULT};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
`;

export const IconRing = styled.div`
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin: 0 auto 18px;
  border-radius: 50%;
  background: ${({ theme }) => theme.alpha(theme.colors.destructive.DEFAULT, 0.12)};
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
`;

export const NoticeTitle = styled.h2`
  margin: 0 0 12px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.25rem;
  font-weight: 600;
`;

export const ReasonList = styled.ul`
  margin: 0 0 24px;
  padding: 0;
  list-style: none;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ReasonItem = styled.li`
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.875rem;
  line-height: 1.5;
`;
