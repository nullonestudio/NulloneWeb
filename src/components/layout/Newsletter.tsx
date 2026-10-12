"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const schema = z.email();

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!schema.safeParse(email).success) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setMessage("You're on the list. Talk soon.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-sm">
      <label htmlFor="newsletter-email" className="label mb-4 block">
        Newsletter
      </label>
      <div className="flex items-center border-b border-line-strong focus-within:border-white transition-colors">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={status === "error"}
          aria-describedby="newsletter-status"
          className="h-12 w-full bg-transparent text-sm text-white placeholder:text-muted-text focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe to the newsletter"
          disabled={status === "loading"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong transition-colors hover:bg-white hover:text-black"
        >
          {status === "done" ? <Check size={16} aria-hidden /> : <ArrowRight size={16} aria-hidden />}
        </button>
      </div>
      <p id="newsletter-status" role="status" className="mt-3 min-h-5 text-xs text-secondary">
        {message || "Occasional notes on building software. No spam."}
      </p>
    </form>
  );
}
