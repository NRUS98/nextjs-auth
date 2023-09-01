import { type NextRequest, NextResponse } from "next/server";
import { connect } from "@/database/utils";
import { hashPassword } from "@/utils/auth";
import HTTP_STATUS_CODES from "@/constants/httpStatusCodes";
import { createUser, getUserByEmail } from "@/database/services/user.service";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const data = await request.json();

    const user = await getUserByEmail(data.email);

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: HTTP_STATUS_CODES.BAD_REQUEST }
      );
    }

    await createUser({
      ...data,
      password: await hashPassword(data.password)
    })

    return NextResponse.json({
      message: "User created successfully",
      status: HTTP_STATUS_CODES.OK
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
