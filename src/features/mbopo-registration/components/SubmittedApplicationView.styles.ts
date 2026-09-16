import styled from "styled-components";

export const ViewFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StatusBanner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 24px;
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  background: ${({ theme }) => theme.gradients.panel};
  color: ${({ theme }) => theme.colors.white};
`;

export const StatusCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StatusTitle = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.125rem;
  font-weight: 600;
`;

export const StatusMeta = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.8125rem;
`;

export const ReferencePill = styled.span`
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(255, 255, 255, 0.12);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);

  strong {
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
    font-size: 0.9375rem;
    letter-spacing: 0.04em;
  }
`;

export const SummaryCard = styled.div`
  padding: clamp(20px, 4vw, 32px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;
