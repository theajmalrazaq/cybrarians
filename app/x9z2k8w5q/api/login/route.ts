import { NextResponse } from "next/server";
import { authenticate, createSession } from "@/app/lib/auth";
import { withRateLimit, RateLimits } from "@/app/lib/rate-limit";
import { sanitizeEmail } from "@/app/lib/validation";

export async function POST(request: Request) {
  // Apply rate limiting: 5 login attempts per 15 minutes
  return withRateLimit(request, RateLimits.LOGIN, async () => {
    try {
      const body = await request.json();
      let { email, password } = body;

      if (!email || !password) {
        return NextResponse.json(
          { error: "Email and password are required" },
          { status: 400 },
        );
      }

      // Sanitize email
      email = sanitizeEmail(email);

      const user = await authenticate(email, password);

      if (!user) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 },
        );
      }

      await createSession(user);

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      return NextResponse.json(
        { error: "An error occurred during login" },
        { status: 500 },
      );
    }
  });
}
