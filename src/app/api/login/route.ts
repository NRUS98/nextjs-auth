import { type NextRequest, NextResponse } from "next/server";
import { connect } from "@/database/utils";
import HTTP_STATUS_CODES from "@/constants/httpStatusCodes";
import bcryptjs from "bcryptjs";
import {  generateTokenPair, setTokensToCookie } from "@/utils/tokens";
import { getUserByEmail } from "@/database/services/user.service";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const data = await request.json();
    const user = await getUserByEmail(data.email);

    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: HTTP_STATUS_CODES.BAD_REQUEST }
      );
    }

    const isPasswordValid = await bcryptjs.compare(data.password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: HTTP_STATUS_CODES.BAD_REQUEST }
      );
    }

    const response = NextResponse.json(
      {
        message: "The user is logged in",
        success: true
      },
      { status: HTTP_STATUS_CODES.OK }
    );

    const tokens = await generateTokenPair({
      id: user._id,
      email: user.email
    });

    setTokensToCookie(
      response,
      tokens
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
