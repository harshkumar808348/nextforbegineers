import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/userModel";

// Type interfaces
interface VerifyEmailRequest {
  token: string;
}

interface VerifyEmailResponse {
  message: string;
  success: boolean;
}

interface ErrorResponse {
  error: string;
}

connect();

export async function POST(
  request: NextRequest
): Promise<NextResponse<VerifyEmailResponse | ErrorResponse>> {
  try {
    const reqBody: VerifyEmailRequest = await request.json();
    const { token } = reqBody;

    console.log(token);

    // Find user with valid token and non-expired token
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json<ErrorResponse>(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    console.log(user);

    // Mark user as verified and clear tokens
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json<VerifyEmailResponse>(
      {
        message: "Email verified successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json<ErrorResponse>(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}