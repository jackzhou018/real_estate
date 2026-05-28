"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/fields";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const searchParams = useSearchParams();
  const listingId = searchParams.get("listing") || "";
  const reason = searchParams.get("reason") || "General question";
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      firstName: String(form.get("firstName") || ""),
      lastName: String(form.get("lastName") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      reason: String(form.get("reason") || ""),
      preferredContactMethod: String(form.get("preferredContactMethod") || ""),
      message: String(form.get("message") || ""),
      emailConsent: form.get("emailConsent") === "on",
      smsConsent: form.get("smsConsent") === "on",
      sourcePage: "/contact",
      listingId
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    if (response.ok) {
      setState("success");
      event.currentTarget.reset();
      setMessage("Thank you. Your message has been sent, and Lilian will follow up soon.");
      return;
    }

    setState("error");
    setMessage(data.error || "Something went wrong. Please try again.");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-[20px] border border-hairline bg-white p-6 shadow-soft">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name">
          <Input name="firstName" autoComplete="given-name" required />
        </Field>
        <Field label="Last name">
          <Input name="lastName" autoComplete="family-name" required />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email">
          <Input name="email" type="email" autoComplete="email" required />
        </Field>
        <Field label="Phone">
          <Input name="phone" type="tel" autoComplete="tel" />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Reason for contact">
          <Select name="reason" defaultValue={reason}>
            {["Buying", "Selling", "Investing", "Listing question", "Schedule a showing", "General question"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Preferred contact method">
          <Select name="preferredContactMethod" defaultValue="Email">
            {["Email", "Phone", "Text"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      {listingId ? <Input name="listingIdDisplay" value={listingId} readOnly aria-label="Listing ID" /> : null}
      <Field label="Message">
        <Textarea name="message" required defaultValue={listingId ? `I would like more information about listing ${listingId}.` : ""} />
      </Field>
      <label className="flex gap-3 text-sm leading-6 text-body">
        <Checkbox name="emailConsent" required /> I agree to receive email follow-up about my inquiry.
      </label>
      <label className="flex gap-3 text-sm leading-6 text-body">
        <Checkbox name="smsConsent" /> I agree to receive SMS follow-up if I selected phone or text. No automated texts are sent by this website.
      </label>
      {message ? (
        <p
          className={
            state === "success"
              ? "rounded-lg bg-soft p-3 text-sm font-medium text-ink"
              : "rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700"
          }
        >
          {message}
        </p>
      ) : null}
      <Button type="submit" className="w-full sm:w-auto" variant="primary" disabled={state === "submitting"}>
        {state === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
