import styled from "styled-components";

export const ShellFrame = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export const ContentPane = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

export const ContentBody = styled.div`
  flex: 1;
  padding: 24px 20px 48px;

  @media (min-width: 1024px) {
    padding: 32px 32px 64px;
  }
`;
