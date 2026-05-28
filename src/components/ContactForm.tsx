"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Field, Input, Textarea } from "@/components/fields";

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
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      reason: String(form.get("reason") || ""),
      message: String(form.get("message") || ""),
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
        <Field label="Name">
          <Input name="name" autoComplete="name" required />
        </Field>
        <Field label="Email">
          <Input name="email" type="email" autoComplete="email" required />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone">
          <Input name="phone" type="tel" autoComplete="tel" />
        </Field>
        <Input name="reason" type="hidden" value={reason} readOnly aria-label="Reason for contact" />
      </div>
      {listingId ? <Input name="listingIdDisplay" value={listingId} readOnly aria-label="Listing ID" /> : null}
      <Field label="Message">
        <Textarea name="message" required defaultValue={listingId ? `I would like more information about listing ${listingId}.` : ""} />
      </Field>
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
