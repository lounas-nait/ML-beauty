import { SignJWT, jwtVerify } from 'jose';

const COOKIE_NAME = 'admin_token';
const SESSION_DURATION = '7d';

function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminToken(payload: { adminId: number; email: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecretKey());
}

export async function verifyAdminToken(token: string) {
  const { payload } = await jwtVerify(token, getSecretKey());
  return payload as { adminId: number; email: string };
}

export { COOKIE_NAME };
