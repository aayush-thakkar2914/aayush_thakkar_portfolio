// Simple in-memory rate limiting
// For production, consider using Redis or a proper rate limiting service

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests = new Map<string, RateLimitEntry>();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key);
      }
    }
  }

  isAllowed(
    identifier: string,
    limit: number = 5,
    windowMs: number = 15 * 60 * 1000 // 15 minutes
  ): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const resetTime = now + windowMs;
    
    const current = this.requests.get(identifier);

    if (!current || now > current.resetTime) {
      // First request or window expired
      this.requests.set(identifier, { count: 1, resetTime });
      return { allowed: true, remaining: limit - 1, resetTime };
    }

    if (current.count >= limit) {
      // Rate limit exceeded
      return { allowed: false, remaining: 0, resetTime: current.resetTime };
    }

    // Increment count
    current.count++;
    return { 
      allowed: true, 
      remaining: limit - current.count, 
      resetTime: current.resetTime 
    };
  }

  // Get current status without incrementing
  getStatus(identifier: string, limit: number = 5): {
    count: number;
    remaining: number;
    resetTime: number | null;
  } {
    const current = this.requests.get(identifier);
    
    if (!current || Date.now() > current.resetTime) {
      return { count: 0, remaining: limit, resetTime: null };
    }

    return {
      count: current.count,
      remaining: Math.max(0, limit - current.count),
      resetTime: current.resetTime,
    };
  }

  // Reset rate limit for a specific identifier
  reset(identifier: string): void {
    this.requests.delete(identifier);
  }

  // Destroy the rate limiter and cleanup
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.requests.clear();
  }
}

// Create a singleton instance
export const rateLimiter = new RateLimiter();

// Helper function for common use case
export function checkRateLimit(
  identifier: string,
  limit?: number,
  windowMs?: number
) {
  return rateLimiter.isAllowed(identifier, limit, windowMs);
}

// Helper to get client IP from request
export function getClientIP(request: Request): string {
  // Check various headers for the real IP
  const headers = [
    'x-forwarded-for',
    'x-real-ip',
    'x-client-ip',
    'cf-connecting-ip', // Cloudflare
    'x-cluster-client-ip',
  ];

  for (const header of headers) {
    const value = request.headers.get(header);
    if (value) {
      // x-forwarded-for can contain multiple IPs, take the first one
      return value.split(',')[0].trim();
    }
  }

  return 'unknown';
}