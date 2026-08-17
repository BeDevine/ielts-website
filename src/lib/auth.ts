import { SignJWT, jwtVerify } from "jose";

const SESSION_COOKIE = "ielts_session";
const secretKey = process.env.SESSION_SECRET || "dev-only-insecure-secret-change-me";
const key = new TextEncoder().encode(secretKey);

export const SESSION_COOKIE_NAME = SESSION_COOKIE;

export type SessionPayload = {
  userId: string;
  email: string;
  name: string;
};

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}
