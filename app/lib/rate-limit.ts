/**
 * Simple rate limiting implementation
 * Tracks requests by IP address or user ID
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store for rate limiting
// In production, use Redis or similar
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
setInterval(
  () => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetAt < now) {
        rateLimitStore.delete(key);
      }
    }
  },
  5 * 60 * 1000,
);

export interface RateLimitConfig {
  /**
   * Maximum number of requests allowed in the window
   */
  maxRequests: number;

  /**
   * Time window in milliseconds
   */
  windowMs: number;

  /**
   * Custom identifier (defaults to IP address)
   */
  identifier?: string;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
}

/**
 * Check if a request should be rate limited
 */
export function checkRateLimit(
  request: Request,
  config: RateLimitConfig,
): RateLimitResult {
  const now = Date.now();
  const resetAt = now + config.windowMs;

  // Get identifier (IP address or custom)
  const identifier =
    config.identifier ||
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Create unique key
  const key = `ratelimit:${identifier}`;

  // Get or create entry
  let entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt < now) {
    // Create new entry
    entry = {
      count: 1,
      resetAt,
    };
    rateLimitStore.set(key, entry);

    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      resetAt,
    };
  }

  // Check if limit exceeded
  if (entry.count >= config.maxRequests) {
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  // Increment counter
  entry.count++;
  rateLimitStore.set(key, entry);

  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Rate limit response helper
 */
export function rateLimitResponse(
  result: RateLimitResult,
  response?: Response,
) {
  const headers = new Headers(response?.headers);

  headers.set("X-RateLimit-Limit", result.limit.toString());
  headers.set("X-RateLimit-Remaining", result.remaining.toString());
  headers.set("X-RateLimit-Reset", new Date(result.resetAt).toISOString());

  if (!result.success) {
    headers.set(
      "Retry-After",
      Math.ceil((result.resetAt - Date.now()) / 1000).toString(),
    );
  }

  return headers;
}

/**
 * Predefined rate limit configurations
 */
export const RateLimits = {
  // Strict: 5 requests per minute
  STRICT: {
    maxRequests: 5,
    windowMs: 60 * 1000,
  },

  // Login: 5 attempts per 15 minutes
  LOGIN: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
  },

  // API: 100 requests per minute
  API: {
    maxRequests: 100,
    windowMs: 60 * 1000,
  },

  // Moderate: 30 requests per minute
  MODERATE: {
    maxRequests: 30,
    windowMs: 60 * 1000,
  },

  // Lenient: 200 requests per minute
  LENIENT: {
    maxRequests: 200,
    windowMs: 60 * 1000,
  },
} as const;

/**
 * Middleware wrapper for rate limiting
 */
export async function withRateLimit(
  request: Request,
  config: RateLimitConfig,
  handler: () => Promise<Response>,
): Promise<Response> {
  const result = checkRateLimit(request, config);

  if (!result.success) {
    const headers = rateLimitResponse(result);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Too many requests. Please try again later.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          ...Object.fromEntries(headers.entries()),
        },
      },
    );
  }

  const response = await handler();
  const headers = rateLimitResponse(result, response);

  // Add rate limit headers to response
  for (const [key, value] of headers.entries()) {
    response.headers.set(key, value);
  }

  return response;
}
