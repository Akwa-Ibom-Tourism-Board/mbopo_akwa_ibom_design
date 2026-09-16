import styled from "styled-components";
import { DialogContent } from "@/shared/ui";

export const WideDialogContent = styled(DialogContent)`
  max-width: 760px;
`;

export const ScrollArea = styled.div`
  max-height: 50vh;
  overflow-y: auto;
  margin: 4px -4px 0;
  padding: 4px;
`;

export const ConfirmNotice = styled.p`
  margin: 18px 0 0;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.highlight, 0.16)};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 0.8125rem;
  line-height: 1.6;
`;
