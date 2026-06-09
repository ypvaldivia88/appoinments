const DEV_FALLBACK_SECRET = "dev-only-fallback-secret";

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET must be defined in production");
  }

  return secret || DEV_FALLBACK_SECRET;
}

export function getJwtSecretKey(): Uint8Array {
  return new TextEncoder().encode(getJwtSecret());
}
