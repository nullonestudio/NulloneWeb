import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

const schema = z.object({ email: z.email().max(200) });

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 422 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[newsletter] RESEND_API_KEY not set — signup logged only:", parsed.data.email);
    return NextResponse.json({ ok: true });
  }
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "NullOne Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL || siteConfig.contact.email],
      subject: "New newsletter signup",
      text: `New newsletter subscriber: ${parsed.data.email}`,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] failed", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
