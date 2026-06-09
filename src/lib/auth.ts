import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { getJwtSecret } from "@/lib/jwtSecret";

const JWT_EXPIRY = "7d";

export interface AuthPayload {
  userId: string;
  isAdmin: boolean;
}

export interface DecodedToken extends AuthPayload {
  iat: number;
  exp: number;
}

/**
 * Generate a JWT token for user authentication
 */
export function generateToken(payload: AuthPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: JWT_EXPIRY });
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): DecodedToken | null {
  try {
    return jwt.verify(token, getJwtSecret()) as DecodedToken;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

/**
 * Extract and verify token from request
 */
export function getAuthFromRequest(req: NextRequest): DecodedToken | null {
  const token = req.cookies.get("auth-token")?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(req: NextRequest): boolean {
  return getAuthFromRequest(req) !== null;
}

/**
 * Check if user is admin
 */
export function isAdmin(req: NextRequest): boolean {
  const auth = getAuthFromRequest(req);
  return auth?.isAdmin === true;
}

/**
 * Get user ID from request
 */
export function getUserId(req: NextRequest): string | null {
  const auth = getAuthFromRequest(req);
  return auth?.userId || null;
}
