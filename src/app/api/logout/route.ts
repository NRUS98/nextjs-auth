import { NextRequest, NextResponse } from "next/server";
import HTTP_STATUS_CODES from "@/constants/httpStatusCodes";
import { clearTokens } from "@/utils/tokens";

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      {
        message: "Logged out",
        success: true
      },
      { status: HTTP_STATUS_CODES.OK }
    );
    clearTokens(response)
    return response;
  } catch (e) {
    console.error(e)
  }
}
