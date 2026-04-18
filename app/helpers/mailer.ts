import nodemailer from 'nodemailer';
import User from "@/app/models/userModel";
import bcrypt from 'bcryptjs';

interface EmailParams {
  email: string;
  emailType: 'VERIFY' | 'RESET';
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailParams) => {
  try {
    // Create a hash token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // Update user with token and expiry
    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000, // 1 hour
        },
        { new: true, runValidators: true }
      );
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
        },
        { new: true, runValidators: true }
      );
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
      port: parseInt(process.env.SMTP_PORT || "2525"),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Prepare email options
    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@example.com",
      to: email,
      subject:
        emailType === 'VERIFY'
          ? 'Verify your email address'
          : 'Reset your password',
      html:
        emailType === 'VERIFY'
          ? `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to verify your email</p>`
          : `<p>Click <a href="${process.env.domain}/resetpassword?token=${hashedToken}">here</a> to reset your password</p>`,
    };

    // Send email
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
};