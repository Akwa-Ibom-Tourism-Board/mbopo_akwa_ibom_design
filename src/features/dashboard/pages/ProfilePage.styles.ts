import styled from "styled-components";
import { Avatar } from "@/shared/ui";

export const LargeAvatar = styled(Avatar)`
  width: 88px;
  height: 88px;

  span {
    font-size: 1.75rem;
  }
`;

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 720px;
`;

export const AvatarCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  padding: 22px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.card};
`;

export const AvatarFrame = styled.div`
  position: relative;
  flex: 0 0 auto;
`;

export const AvatarUploadButton = styled.label`
  position: absolute;
  right: -2px;
  bottom: -2px;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  border: 2px solid ${({ theme }) => theme.colors.card};
  cursor: pointer;

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    overflow: hidden;
    pointer-events: none;
  }
`;

export const AvatarMeta = styled.div`
  min-width: 0;
`;

export const AvatarName = styled.p`
  margin: 0 0 4px;
  font-size: 1.0625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const AvatarHint = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const AvatarError = styled.p`
  margin: 6px 0 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
`;
