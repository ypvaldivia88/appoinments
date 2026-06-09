import { NextRequest, NextResponse } from "next/server";
import { getAuthFromRequest } from "@/lib/auth";

/**
 * Authentication middleware for API routes
 * Returns null if authentication passes, or a NextResponse for errors
 */
export function requireAuth(req: NextRequest): NextResponse | null {
  const auth = getAuthFromRequest(req);
  
  if (!auth) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  return null; // Authentication passed
}

/**
 * Admin authentication middleware for API routes
 * Returns null if authentication passes, or a NextResponse for errors
 */
export function requireAdmin(req: NextRequest): NextResponse | null {
  const auth = getAuthFromRequest(req);
  
  if (!auth) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  if (!auth.isAdmin) {
    return NextResponse.json(
      { error: "Admin access required" },
      { status: 403 }
    );
  }

  return null; // Admin authentication passed
}

/**
 * User ownership middleware - checks if user can access their own resources
 * Returns null if authorization passes, or a NextResponse for errors
 */
export function requireUserOrAdmin(req: NextRequest, resourceUserId: string): NextResponse | null {
  const auth = getAuthFromRequest(req);
  
  if (!auth) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  // Allow if user is admin or accessing their own resource
  if (auth.isAdmin || auth.userId === resourceUserId) {
    return null; // Authorization passed
  }

  return NextResponse.json(
    { error: "Access denied" },
    { status: 403 }
  );
}

/**
 * Rate limiting for login attempts
 * Simple in-memory store - in production, use Redis or similar
 */
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const attempts = loginAttempts.get(identifier);

  if (!attempts) {
    loginAttempts.set(identifier, { count: 1, lastAttempt: now });
    return true; // Allow first attempt
  }

  // Reset if lockout period has passed
  if (now - attempts.lastAttempt > LOCKOUT_DURATION) {
    loginAttempts.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }

  // Check if max attempts exceeded
  if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
    return false; // Rate limited
  }

  // Increment attempt count
  attempts.count++;
  attempts.lastAttempt = now;
  loginAttempts.set(identifier, attempts);
  
  return true; // Allow attempt
}

export function clearRateLimit(identifier: string): void {
  loginAttempts.delete(identifier);
}

/**
 * Appointment ownership middleware - checks if user can access an appointment
 */
export function requireAppointmentOwnerOrAdmin(
  req: NextRequest,
  appointmentUserId: string | undefined | null
): NextResponse | null {
  const auth = getAuthFromRequest(req);

  if (!auth) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const ownerId = appointmentUserId?.toString();

  if (auth.isAdmin || (ownerId && auth.userId === ownerId)) {
    return null;
  }

  return NextResponse.json({ error: "Access denied" }, { status: 403 });
}

/**
 * Allows admins, owners, or claiming of unassigned appointment slots
 */
export function requireAppointmentUpdateAccess(
  req: NextRequest,
  appointmentUserId: string | undefined | null
): NextResponse | null {
  const auth = getAuthFromRequest(req);

  if (!auth) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  if (auth.isAdmin) {
    return null;
  }

  const ownerId = appointmentUserId?.toString();

  if (!ownerId || auth.userId === ownerId) {
    return null;
  }

  return NextResponse.json({ error: "Access denied" }, { status: 403 });
}