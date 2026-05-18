import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, "ok" | "error"> = {};
  const errors: Record<string, string> = {};

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = "ok";
  } catch (err) {
    checks.database = "error";
    errors.database = String(err);
  }

  const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);
  const resendConfigured = Boolean(process.env.RESEND_API_KEY);
  const sentryConfigured = Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN);

  const healthy = Object.values(checks).every((s) => s === "ok");

  return NextResponse.json(
    {
      status: healthy ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      checks,
      integrations: {
        stripe: stripeConfigured ? "configured" : "stub-mode",
        resend: resendConfigured ? "configured" : "stub-mode",
        sentry: sentryConfigured ? "configured" : "disabled"
      },
      errors: Object.keys(errors).length ? errors : undefined
    },
    { status: healthy ? 200 : 503 }
  );
}
