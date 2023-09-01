import * as jose from "jose";
import { NextResponse } from "next/server";
import { TTokenData, TTokenPayload, TTokensPair } from "@/definitions/auth";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

const ACCESS_TOKEN_COOKIE_KEY = process.env.ACCESS_TOKEN_COOKIE_KEY;
const REFRESH_TOKEN_COOKIE_KEY = process.env.REFRESH_TOKEN_COOKIE_KEY;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const encodeSecret = (secret: string) => new TextEncoder().encode(secret);

const createToken = async (data: TTokenData, secret: string, expiresIn = "1d"): Promise<string> => {
  return await new jose.SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(encodeSecret(secret));
};

export const getTokensFromCookie = <T extends RequestCookies | ReadonlyRequestCookies>(cookies: T ): Partial<TTokensPair> => ({
  accessToken: cookies.get(ACCESS_TOKEN_COOKIE_KEY)?.value,
  refreshToken: cookies.get(REFRESH_TOKEN_COOKIE_KEY)?.value
});
export const setTokensToCookie = (response: NextResponse, { refreshToken, accessToken }: TTokensPair) => {
  response.cookies.set(ACCESS_TOKEN_COOKIE_KEY, accessToken, { httpOnly: true });
  response.cookies.set(REFRESH_TOKEN_COOKIE_KEY, refreshToken, { httpOnly: true });
};
export const clearTokens = (response: NextResponse) => {
  response.cookies.delete(ACCESS_TOKEN_COOKIE_KEY)
  response.cookies.delete(REFRESH_TOKEN_COOKIE_KEY)
};
export const extractTokenPayload = (token: string): TTokenPayload => {
  return jose.decodeJwt(token) as TTokenPayload;
};
export const isTokenValid = async (token: string, tokenType: "access" | "refresh"): Promise<boolean> => {
  try {
    const tokenSecret = tokenType === "access"
      ? ACCESS_TOKEN_SECRET
      : REFRESH_TOKEN_SECRET;
    await jose.jwtVerify(token, encodeSecret(tokenSecret!));
    return true;
  } catch (error) {
    return false;
  }
};

export const generateTokenPair = async (user: TTokenPayload): Promise<TTokensPair> => ({
  accessToken: await createToken(user, ACCESS_TOKEN_SECRET, "1m"),
  refreshToken: await createToken(user, REFRESH_TOKEN_SECRET)
});
