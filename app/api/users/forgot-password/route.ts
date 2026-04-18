import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const body = await req.json();
    const { email }: { email: string } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is Required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        message: "If user exists, a reset link will be sent to the email",
      });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordTokenExpiry = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink = `${process.env.domain}/reset-password?token=${rawToken}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Reset Your Password",
      text: `Click the link below to reset your password:\n${resetLink}`,
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
    });

    return NextResponse.json({
      message: "If this email exists, a reset link has been sent",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}