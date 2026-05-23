"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema } from "@/lib/validation";
import { invitation } from "@/lib/copy";
import { track } from "@/lib/analytics";

const EMAIL_INPUT_ID = "signup-email";

export function SignupForm({ onSuccess }) {
  const [serverError, setServerError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(clientSchema),
    mode: "onSubmit",
  });

  // Honeypot — registered outside the schema, read straight off the form node.
  const onSubmit = handleSubmit(async (data, event) => {
    setServerError(null);
    track("signup_submitted");

    const website =
      event?.target?.elements?.namedItem("website")?.value || "";

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, website }),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        track("signup_success");
        onSuccess();
        return;
      }

      const message = json.error ?? invitation.error.generic;
      if (res.status === 400) {
        setError("email", { message });
      } else {
        setServerError(message);
      }
      track("signup_error", { reason: `http_${res.status}` });
    } catch {
      setServerError(invitation.error.generic);
      track("signup_error", { reason: "network" });
    }
  });

  const fieldError = errors.email?.message ?? serverError;

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8">
      {/* Honeypot: hidden from users + assistive tech, bots fill it. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={EMAIL_INPUT_ID} className="sr-only">
          {invitation.emailLabel}
        </label>
        <input
          id={EMAIL_INPUT_ID}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={invitation.emailPlaceholder}
          aria-invalid={fieldError ? true : undefined}
          aria-describedby={fieldError ? "signup-error" : undefined}
          {...register("email")}
          className="flex-1 rounded-sm border border-white/15 bg-ink/60 px-4 py-3.5 font-sans text-[15px] text-bone placeholder:text-smoke/70 outline-none transition-colors focus:border-wine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-sm bg-wine px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-bone transition-colors hover:bg-wine-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? invitation.sending : invitation.submit}
        </button>
      </div>

      <p
        id="signup-error"
        role="status"
        aria-live="polite"
        className="min-h-[1.25rem] pt-2 font-sans text-[13px] text-copper"
      >
        {fieldError ?? ""}
      </p>
    </form>
  );
}
