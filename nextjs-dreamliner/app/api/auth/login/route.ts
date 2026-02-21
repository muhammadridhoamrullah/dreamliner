import { login } from "@/db/services/authServices";
import { NextRequest, NextResponse } from "next/server";
import z, { email } from "zod";

const schemaLogin = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = schemaLogin.safeParse(body);

    if (!validatedData.success) {
      throw validatedData.error;
    }

    const access_token = await login(body);

    return NextResponse.json(
      {
        success: true,
        data: access_token,
        message: "Login successful",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const path = error.issues[0].path[0];
      const message = error.issues[0].message;

      return NextResponse.json(
        {
          message: `Invalid ${path.toString()}: ${message}`,
        },
        {
          status: 400,
        },
      );
    } else if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        },
      );
    } else {
      return NextResponse.json(
        {
          message: "An unknown error occurred",
        },
        {
          status: 500,
        },
      );
    }
  }
}
