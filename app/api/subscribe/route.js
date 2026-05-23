import { NextResponse } from "next/server";
import { subscribeSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { mailerlite } from "@/lib/email/mailerlite";

// To switch ESPs, change this one import/binding.
const provider = mailerlite;

function clientIp(req) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req) {
  // Rate limit first — cheap rejection before parsing/network.
  if (!rateLimit(clientIp(req)).allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a minute." },
      { status: 429 },
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? "That email doesn't look quite right.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  // Honeypot: silently succeed for bots so they don't probe further.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const result = await provider.subscribe({ email: parsed.data.email });

  if (!result.ok) {
    // Log the internal detail server-side; never leak it to the client.
    console.error("[subscribe] provider error:", result.detail ?? result.error);
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
