"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/fields";

export function NewsletterForm() {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      firstName: String(form.get("firstName") || ""),
      lastName: String(form.get("lastName") || ""),
      email: String(form.get("email") || ""),
      areasOfInterest: String(form.get("areasOfInterest") || ""),
      interestType: String(form.get("interestType") || ""),
      emailConsent: form.get("emailConsent") === "on"
    };

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    if (response.ok) {
      window.location.href = "/thank-you";
      return;
    }

    setSubmitting(false);
    setMessage(data.error || "Something went wrong. Please try again.");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-hairline bg-white p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name">
          <Input name="firstName" autoComplete="given-name" required />
        </Field>
        <Field label="Last name">
          <Input name="lastName" autoComplete="family-name" required />
        </Field>
      </div>
      <Field label="Email">
        <Input name="email" type="email" autoComplete="email" required />
      </Field>
      <Field label="Areas of interest">
        <Textarea name="areasOfInterest" required placeholder="Neighborhoods, cities, property types, or price ranges." />
      </Field>
      <Field label="Interest type">
        <Select name="interestType" defaultValue="General market updates">
          {["Buyer", "Seller", "Investor", "General market updates"].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </Field>
      <label className="flex gap-3 text-sm leading-6 text-body">
        <Checkbox name="emailConsent" required /> I agree to receive real estate market updates by email.
      </label>
      {message ? <p role="status" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">{message}</p> : null}
      <Button type="submit" className="w-full sm:w-auto">
        {submitting ? "Signing Up..." : "Sign Up"}
      </Button>
    </form>
  );
}
