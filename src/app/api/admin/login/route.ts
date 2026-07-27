import { NextResponse } from "next/server";
import {
  verifyCredentials,
  createSessionCookieValue,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const username = body?.username;
  const password = body?.password;

  if (typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  if (!verifyCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, createSessionCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
