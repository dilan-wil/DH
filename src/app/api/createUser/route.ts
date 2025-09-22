import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { adminAuth } from "@/functions/firebase-admin";

function generateRandomPassword(length: number = 12): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Incoming request body:", body);

    const { email, displayName } = body;

    if (!email || !displayName) {
      return NextResponse.json(
        { error: "Missing email or display name" },
        { status: 400 }
      );
    }

    const password = generateRandomPassword(12);

    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName,
      emailVerified: false,
      disabled: false,
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "dilan@nanosatellitemissions.com",
        pass: "z$Y6C;xm:9E~",
      },
    });

    const mailOptions = {
      from: "dilan@nanosatellitemissions.com",
      to: email,
      subject: "Your Account has been Created",
      text: `Hello ${displayName},\n\nYour account has been successfully created. Here are your credentials:\n\nEmail: ${email}\nPassword: ${password}\n\nPlease change your password after logging in for security reasons.\n\nBest regards,\nYour App Team`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "User created successfully",
      userId: userRecord.uid,
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
