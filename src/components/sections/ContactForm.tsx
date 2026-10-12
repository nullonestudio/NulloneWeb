"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { budgetOptions, contactSchema, serviceOptions, type ContactInput } from "@/lib/contact-schema";
import { LOGO } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const field =
  "peer w-full border-b border-line-strong bg-transparent pb-3 pt-2 text-base text-white placeholder:text-muted-text transition-colors focus:border-white focus:outline-none aria-[invalid=true]:border-red-400";

function Field({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      {children}
      <p id={`${id}-error`} role="alert" className="min-h-5 text-xs text-red-300">
        {error}
      </p>
    </div>
  );
}

function Pills<T extends string>({
  name,
  options,
  value,
  onChange,
  error,
  legend,
}: {
  name: string;
  options: readonly T[];
  value?: T;
  onChange: (v: T) => void;
  error?: string;
  legend: string;
}) {
  return (
    <fieldset aria-describedby={`${name}-error`}>
      <legend className="label mb-4">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const id = `${name}-${opt.replace(/\W+/g, "-")}`;
          const checked = value === opt;
          return (
            <span key={opt}>
              <input
                type="radio"
                id={id}
                name={name}
                value={opt}
                checked={checked}
                onChange={() => onChange(opt)}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className={cn(
                  "inline-flex cursor-pointer items-center rounded-full border px-4 py-2 text-sm transition-colors peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white",
                  checked ? "border-white bg-white text-black" : "border-line-strong text-secondary hover:border-white/50 hover:text-white",
                )}
              >
                {opt}
              </label>
            </span>
          );
        })}
      </div>
      <p id={`${name}-error`} role="alert" className="mt-2 min-h-5 text-xs text-red-300">
        {error}
      </p>
    </fieldset>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", company: "", message: "", website: "" },
  });

  const service = watch("service");
  const budget = watch("budget");

  async function onSubmit(values: ContactInput) {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
      reset();
    } catch (e) {
      setStatus("error");
      setServerError(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex min-h-[32rem] flex-col items-start justify-center gap-8"
        >
          <svg viewBox={LOGO.viewBox} className="h-24 w-24" fill="none" stroke="white" strokeWidth={4} strokeLinecap="round" aria-hidden>
            <motion.circle
              cx={LOGO.circle.cx}
              cy={LOGO.circle.cy}
              r={LOGO.circle.r}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.path
              d="M 40 47 L 50 57 L 70 35"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <div>
            <h2 className="display-md">Message received.</h2>
            <p className="body-lg mt-4 max-w-md">
              Thanks for reaching out. A co-founder will reply within one business day with next steps for your free consultation.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-[12px] uppercase tracking-[0.2em] text-secondary underline-offset-4 hover:text-white hover:underline"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          initial={false}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col gap-8"
          aria-label="Project enquiry form"
        >
          <div className="grid gap-8 md:grid-cols-2">
            <Field id="name" label="Name *" error={errors.name?.message}>
              <input
                id="name"
                autoComplete="name"
                placeholder="Your full name"
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
                className={field}
                {...register("name")}
              />
            </Field>
            <Field id="email" label="Email *" error={errors.email?.message}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
                className={field}
                {...register("email")}
              />
            </Field>
          </div>
          <Field id="company" label="Company" error={errors.company?.message}>
            <input
              id="company"
              autoComplete="organization"
              placeholder="Company or project name (optional)"
              aria-describedby="company-error"
              className={field}
              {...register("company")}
            />
          </Field>

          <input type="hidden" {...register("service")} />
          <Pills
            name="service"
            legend="What do you need? *"
            options={serviceOptions}
            value={service}
            onChange={(v) => setValue("service", v, { shouldValidate: true })}
            error={errors.service?.message}
          />
          <input type="hidden" {...register("budget")} />
          <Pills
            name="budget"
            legend="Budget range *"
            options={budgetOptions}
            value={budget}
            onChange={(v) => setValue("budget", v, { shouldValidate: true })}
            error={errors.budget?.message}
          />

          <Field id="message" label="Tell us about your project *" error={errors.message?.message}>
            <textarea
              id="message"
              rows={5}
              placeholder="What are you building, who is it for, and when do you need it?"
              aria-invalid={!!errors.message}
              aria-describedby="message-error"
              className={cn(field, "resize-none")}
              {...register("message")}
            />
          </Field>

          {/* Honeypot: hidden from people, tempting to bots */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="website">Website</label>
            <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-sweep inline-flex h-14 items-center justify-center gap-3 rounded-full border border-white bg-white px-9 text-[13px] font-medium uppercase tracking-[0.18em] text-black transition-colors duration-500 [--sweep:#0a0a0a] hover:text-white disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  Sending <Loader2 size={16} className="animate-spin" aria-hidden />
                </>
              ) : (
                <>
                  Send message <ArrowUpRight size={16} aria-hidden />
                </>
              )}
            </button>
            <p role="status" aria-live="polite" className="text-sm text-red-300">
              {status === "error" ? serverError : null}
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
