import { ApiError, request } from "@/lib/http";
import {
  IncorrectPasswordError,
  type ChangePasswordInput,
  type LoginInput,
  type Session,
  type User,
} from "../types";

export async function login({
  email,
  password,
  captchaToken,
}: LoginInput): Promise<Session> {
  return request<Session>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password, captchaToken }),
  });
}

export async function getCurrentUser(): Promise<User> {
  return request<User>("/auth/me");
}

export interface UpdateAvatarInput {
  url: string;
  publicId: string;
  bytes?: number;
}

export async function updateAvatar(input: UpdateAvatarInput): Promise<User> {
  return request<User>("/auth/avatar", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function changePassword(
  input: ChangePasswordInput,
): Promise<void> {
  try {
    await request<void>("/auth/change-password", {
      method: "POST",
      body: JSON.stringify(input),
    });
  } catch (error) {
    // change-password.service.ts's only 400 without a Joi `errors` array
    // (field-validation failures always carry one) is "Current password is
    // incorrect" — distinguishing it lets the form attach the error to the
    // right field instead of just toasting.
    if (error instanceof ApiError && error.status === 400 && !error.errors) {
      throw new IncorrectPasswordError();
    }
    throw error;
  }
}

export async function logout(): Promise<void> {
  await request<void>("/auth/logout", { method: "POST" });
}
