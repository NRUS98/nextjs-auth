import { ROUTES } from "@/constants/routes";
import { NextRequest } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";

export const isPublicRoute = (route: ROUTES): boolean => [
  ROUTES.SIGNUP,
  ROUTES.LOGIN
].includes(route);

export const createNextUrl = (request: NextRequest, path: string): NextURL => {
  const url = request.nextUrl.clone();
  url.pathname = path;
  return url;
};
