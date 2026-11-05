import styled from "styled-components";

export const List = styled.ul`
  list-style: none;
  margin: 4px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 40vh;
  overflow-y: auto;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.destructive.DEFAULT, 0.08)};
  border: 1px solid
    ${({ theme }) => theme.alpha(theme.colors.destructive.DEFAULT, 0.2)};
`;

export const ItemText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ItemField = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const ItemStep = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;
