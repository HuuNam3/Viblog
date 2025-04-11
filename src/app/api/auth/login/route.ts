import { NextResponse } from "next/server";
import accounts from "@/app/data/accounts.json";
import { cookies } from "next/headers";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  role: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received body in API:", body);

    const { usernameOrEmail, password } = body;

    if (typeof usernameOrEmail !== "string" || usernameOrEmail.trim() === "") {
      return NextResponse.json(
        { message: "Username or email is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    if (typeof password !== "string" || password.trim() === "") {
      return NextResponse.json(
        { message: "Password is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    const user = (accounts as User[]).find(
      (acc) => (acc.username === usernameOrEmail || acc.email === usernameOrEmail) && acc.password === password
    );

    if (!user) {
      return NextResponse.json(
        { message: "Invalid username/email or password" },
        { status: 401 }
      );
    }

    const cookieStore = cookies();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userData } = user;
    (await cookieStore).set("sessionId", JSON.stringify(userData), { // Sửa "session" thành "sessionId"
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return NextResponse.json(
      { message: "Login successful", user: userData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Method not allowed. Use POST to login." },
    { status: 405 }
  );
}