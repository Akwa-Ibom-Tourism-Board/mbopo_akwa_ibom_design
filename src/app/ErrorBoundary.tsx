import { Component, type ErrorInfo, type ReactNode } from "react";
import styled from "styled-components";

const Frame = styled.div`
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 24px;
  background: ${({ theme }) => theme.colors.background};
  text-align: center;
`;

const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Copy = styled.p`
  margin: 0 0 20px;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.9375rem;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 10px 18px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.primary.DEFAULT};
  color: ${({ theme }) => theme.colors.primary.foreground};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
`;

const ActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 10px 18px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 0.875rem;
  font-weight: 600;
`;

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  override state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  override render() {
    if (this.state.error) {
      return (
        <Frame>
          <div>
            <Title>This page didn&apos;t load</Title>
            <Copy>
              Something went wrong. You can try refreshing or head back home.
            </Copy>
            <Actions>
              <ActionButton onClick={() => window.location.reload()}>
                Try again
              </ActionButton>
              <ActionLink href="/">Go home</ActionLink>
            </Actions>
          </div>
        </Frame>
      );
    }

    return this.props.children;
  }
}
