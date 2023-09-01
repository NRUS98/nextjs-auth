import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  clearTokens,
  extractTokenPayload,
  generateTokenPair,
  getTokensFromCookie,
  isTokenValid,
  setTokensToCookie
} from "@/utils/tokens";
import { createNextUrl, isPublicRoute } from "@/utils/routes";
import { ROUTES } from "@/constants/routes";

async function refreshTokens(response: NextResponse, refreshToken: string) {
  const tokenPayload = extractTokenPayload(refreshToken);
  const tokens = await generateTokenPair(tokenPayload);
  setTokensToCookie(response, tokens);
}

export async function middleware(request: NextRequest) {
  try {
    const nextRoute = request.nextUrl.pathname as ROUTES;
    const { refreshToken, accessToken } = getTokensFromCookie(request.cookies);

    if (!accessToken) {
      return isPublicRoute(nextRoute)
        ? NextResponse.next()
        : NextResponse.redirect(createNextUrl(request, ROUTES.LOGIN));
    }

    const isAccessTokenValid = await isTokenValid(accessToken, "access");

    if (isAccessTokenValid && isPublicRoute(nextRoute)) {
      return NextResponse.redirect(createNextUrl(request, ROUTES.HOME));
    }

    if (!isAccessTokenValid) {
      const isRefreshTokenValid = refreshToken && await isTokenValid(refreshToken, "refresh");

      if (!isRefreshTokenValid) {
        const response = NextResponse.redirect(createNextUrl(request, ROUTES.LOGIN));
        clearTokens(response);
        return response;
      }

      const response = NextResponse.next();
      await refreshTokens(response, refreshToken);
      return response;
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)"
};
