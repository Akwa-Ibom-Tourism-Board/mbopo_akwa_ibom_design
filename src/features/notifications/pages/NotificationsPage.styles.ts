import styled from "styled-components";

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 720px;
`;

export const HeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const HeaderCopy = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.875rem;
`;

export const MarkAllButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.card};
  padding: 8px 16px;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Item = styled.button<{ $read: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  width: 100%;
  padding: 16px 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme, $read }) => ($read ? theme.colors.card : theme.alpha(theme.colors.secondary.DEFAULT, 0.05))};
  text-align: left;
  cursor: pointer;
  transition: box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

export const ItemIconFrame = styled.span<{ $type: string }>`
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme, $type }) =>
    theme.alpha(
      $type === "application"
        ? theme.colors.primary.DEFAULT
        : theme.colors.secondary.DEFAULT,
      0.12,
    )};
  color: ${({ theme, $type }) => ($type === "application" ? theme.colors.primary.DEFAULT : theme.colors.secondary.DEFAULT)};
`;

export const ItemBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ItemTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ItemTitle = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const UnreadDot = styled.span`
  flex: 0 0 auto;
  width: 7px;
  height: 7px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
`;

export const ItemText = styled.p`
  margin: 4px 0 0;
  font-size: 0.8125rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const ItemTime = styled.span`
  display: block;
  margin-top: 8px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const EmptyState = styled.div`
  padding: 64px 24px;
  text-align: center;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.875rem;
`;
