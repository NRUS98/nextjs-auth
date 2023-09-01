"use server";

import { cookies } from "next/headers";
import { extractTokenPayload, getTokensFromCookie } from "@/utils/tokens";
import { connect } from "@/database/utils";
import { getUserByEmail, updatePassword } from "@/database/services/user.service";
import { ROUTES } from "@/constants/routes";
import { redirect } from "next/navigation";
import { TTokenPayload } from "@/definitions/auth";

export async function getAccessTokenPayload(): Promise<TTokenPayload> {
  const accessToken = getTokensFromCookie(cookies()).accessToken;
  return extractTokenPayload(accessToken!);
}

export async function getUserName(): Promise<string> {
  await connect();
  const { email } = await getAccessTokenPayload();
  const user = await getUserByEmail(email);
  return user.name;
}

export async function changePassword(data: FormData) {
  await connect();
  const { email } = await getAccessTokenPayload();
  await updatePassword(email, data.get("password") as string);
  redirect(ROUTES.HOME);
}
