import styled from "styled-components";
import { media } from "@/theme";

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Greeting = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
`;

// align-items: start is the fix for the real bug here — grid's default
// "stretch" was forcing ApplicationStatusCard to match ProfileSummaryCard's
// height even though it has far less content, leaving a slab of empty
// space in the shorter card. Each card now sizes to its own content.
// The 1.4fr/1fr split reflects that imbalance too: the details card
// carries roughly twice as many fields as the status card.
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: start;
  gap: 20px;

  ${media.lg} {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  }
`;

export const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.875rem;
`;
