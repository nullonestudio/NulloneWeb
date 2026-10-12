import { z } from "zod";
import { services } from "@/content/services";

export const serviceOptions = [...services.map((s) => s.shortTitle), "Not sure yet"] as const;

export const budgetOptions = [
  "Under ₹5 Lakh (< $6k)",
  "₹5–15 Lakh ($6k–18k)",
  "₹15–40 Lakh ($18k–48k)",
  "₹40 Lakh+ ($48k+)",
  "Not sure yet",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.email("Please enter a valid email address").max(200),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.enum(serviceOptions, { error: "Please choose a service" }),
  budget: z.enum(budgetOptions, { error: "Please choose a budget range" }),
  message: z.string().trim().min(20, "Tell us a little more (20+ characters)").max(5000),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
