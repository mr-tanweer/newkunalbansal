import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function verifyCredentials(username: string, password: string): boolean {
  const expectedUsername = process.env.ADMIN_USERNAME || "";
  const expectedPassword = process.env.ADMIN_PASSWORD || "";
  if (!expectedUsername || !expectedPassword) return false;
  return safeCompare(username, expectedUsername) && safeCompare(password, expectedPassword);
}

function sign(payload: string): string {
  const secret = process.env.SESSION_SECRET || "";
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSessionCookieValue(): string {
  const payload = String(Date.now() + SESSION_TTL_MS);
  return `${payload}.${sign(payload)}`;
}

export function isValidSessionCookie(value: string | undefined): boolean {
  if (!value) return false;
  const lastDot = value.lastIndexOf(".");
  if (lastDot === -1) return false;

  const payload = value.slice(0, lastDot);
  const signature = value.slice(lastDot + 1);
  const expected = sign(payload);

  if (signature.length !== expected.length) return false;
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;

  const expiry = Number(payload);
  return Number.isFinite(expiry) && expiry > Date.now();
}

export const SESSION_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;
