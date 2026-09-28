import styled from "styled-components";
import { Link } from "react-router-dom";

export const BellButton = styled.button`
  position: relative;
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  background: transparent;
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
  }
`;

export const UnreadDot = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  min-width: 8px;
  height: 8px;
  padding: 0 2px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  border: 2px solid ${({ theme }) => theme.colors.background};
`;

export const Panel = styled.div`
  width: 340px;
  max-width: calc(100vw - 32px);
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const PanelTitle = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const MarkAllButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.muted.foreground};
    cursor: not-allowed;
    text-decoration: none;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 340px;
  overflow-y: auto;
`;

export const Row = styled.button<{ $read: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $read }) => ($read ? "transparent" : theme.alpha(theme.colors.secondary.DEFAULT, 0.05))};
  text-align: left;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const RowDot = styled.span<{ $read: boolean }>`
  flex: 0 0 auto;
  margin-top: 6px;
  width: 7px;
  height: 7px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme, $read }) => ($read ? "transparent" : theme.colors.secondary.DEFAULT)};
`;

export const RowBody = styled.div`
  min-width: 0;
`;

export const RowTitle = styled.p`
  margin: 0 0 2px;
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const RowText = styled.p`
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.muted.foreground};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const RowTime = styled.span`
  display: block;
  margin-top: 4px;
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const EmptyState = styled.div`
  padding: 32px 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.8125rem;
`;

export const ShowAllLink = styled(Link)`
  display: block;
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  font-size: 0.8125rem;
  font-weight: 700;
  text-align: center;

  &:hover {
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
  }
`;
