# Anticipation — Landing Page

A single, long-scroll landing page for **Anticipation**, the debut novel by Jey Lofton (Winter 2026). It collects email signups in exchange for the Prologue + Chapter One, delivered through the email service provider's incentive feature.

Built with Next.js (App Router) + TypeScript + Tailwind. No CMS, no UI library — copy lives in one file and the design is hand-built.

---

## Quick start

```bash
npm install
cp .env.example .env.local      # then fill in the values (see below)
npm run dev                      # http://localhost:3000
```

Other scripts:

```bash
npm run build       # production build (also type-checks + lints)
npm run start       # serve the production build
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
```

---

## Editing copy

**All site text lives in [`lib/copy.ts`](lib/copy.ts).** Headlines, body paragraphs, button labels, the success message — everything. You never need to open a `.tsx` file to change wording.

- Text wrapped in `{em}...{/em}` renders in italic ember (the orange highlight). Keep the markers balanced.
- The split title ("Antici" + "pation") is controlled by `hero.titleRoman` / `hero.titleItalic`.

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | What it is |
| --- | --- | --- |
| `MAILERLITE_ACCOUNT_ID` | Yes (for live signups) | Your MailerLite account ID (the number after `/jsonp/` in the embed URL). Not secret. |
| `MAILERLITE_FORM_ID` | Yes (for live signups) | The hosted form new subscribers are added to. Not secret. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional | Your Plausible domain. Leave blank to disable analytics entirely. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL, used for metadata / Open Graph / JSON-LD. |

Without the MailerLite values the form still works end-to-end and returns a graceful error ("Email service is not configured.") — handy for previewing before you wire up the ESP.

---

## MailerLite setup (and delivering the Prologue PDF)

The site posts **server-side** to MailerLite's hosted-form endpoint — the same one a MailerLite embedded form uses:

```
https://assets.mailerlite.com/jsonp/{MAILERLITE_ACCOUNT_ID}/forms/{MAILERLITE_FORM_ID}/subscribe
```

Going through `/api/subscribe` server-side (instead of from the browser) keeps the honeypot + rate limiter in play and lets us read the real HTTP status, so the success/error states are trustworthy. No API token is needed — both IDs are public.

1. **Get your account + form IDs.** In MailerLite, open the form readers join (**Forms → Embedded forms**) and look at the embed code. The endpoint contains both numbers: `.../jsonp/<ACCOUNT_ID>/forms/<FORM_ID>/subscribe`. Put them in `MAILERLITE_ACCOUNT_ID` and `MAILERLITE_FORM_ID`.
2. **Attach the Prologue PDF.** In the form's settings (or an automation triggered by this form), add the autoresponder/email that delivers the Prologue download link. Host the PDF in MailerLite's file manager.
   - The PDF is **never served by this site**. It lives in MailerLite so links can be gated. Don't commit it to `public/`.
3. **Double opt-in:** if the form has confirmed (double) opt-in enabled, the first email readers receive is the confirmation; the Prologue follows once they confirm. Disable it in the form settings if you want instant delivery.
4. **Test it.** With `.env.local` filled in, run `npm run dev`, submit a real address, and confirm the email arrives. The form shows the "The Prologue is on its way." success state once MailerLite accepts the signup.

---

## Swapping to a different email provider (ConvertKit, Beehiiv, …)

The ESP is isolated behind a one-function adapter, so swapping is a two-line change. A ready-made **ConvertKit** adapter ships in [`lib/email/convertkit.ts`](lib/email/convertkit.ts) as a reference.

1. Create `lib/email/<provider>.ts` exporting an object that satisfies the `EmailProvider` interface in [`lib/email/types.ts`](lib/email/types.ts):
   ```ts
   export const beehiiv: EmailProvider = {
     async subscribe({ email }) {
       // call the provider's API, read keys from process.env
       // return { ok: true } or { ok: false, error, detail }
     },
   };
   ```
2. In [`app/api/subscribe/route.ts`](app/api/subscribe/route.ts), change the import/binding:
   ```ts
   import { beehiiv as provider } from "@/lib/email/beehiiv";
   ```

Nothing else changes — validation, honeypot, rate limiting, and the client form all stay the same. Update `.env.example` with the new provider's variables.

---

## Analytics (Plausible)

Privacy-respecting, cookieless — no cookie banner needed. The script loads only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set. Tracked custom events (define these as Goals in Plausible to see them):

- `signup_submitted` — form submitted
- `signup_success` — MailerLite accepted the signup
- `signup_error` — failure (prop `reason`)
- `cta_clicked` — a CTA was clicked (prop `location`: `topbar` | `reveal` | `last_door`)
- `scroll_depth_75` — reader passed 75% of the page

Helpers are typed in [`lib/analytics.ts`](lib/analytics.ts).

---

## Images

Scene images live in `public/images/` and are loaded through `next/image` (AVIF/WebP, lazy-loaded except the hero, with a blur placeholder).

**The current scene images are placeholders** (tasteful dark gradients) generated by `scripts/gen-placeholders.mjs`. Drop your real photos in at the **same paths and filenames** and nothing in the code changes:

| File | Used by | Suggested size |
| --- | --- | --- |
| `public/images/balcony.png` | Hero (full-bleed) | ~1920×1280 |
| `public/images/envelope.png` | Reveal | ~1200×1400 |
| `public/images/divider.png` | Divider | ~1920×600 |
| `public/images/ring.png` | Last Door (full-bleed) | ~1920×1280 |
| `public/images/author.jpg` | About (circular crop) | square, face upper-third |
| `public/images/og-image.png` | Open Graph / Twitter card | 1200×630 |

`scripts/gen-placeholders.mjs` is a one-off helper (run with `node scripts/gen-placeholders.mjs`); it's safe to delete once you've added the real images.

---

## Deploying to Vercel

1. Push the repo to GitHub/GitLab/Bitbucket.
2. In Vercel, **Add New → Project** and import the repo. Framework preset auto-detects as **Next.js**; no extra config needed.
3. Add the environment variables (Project → **Settings → Environment Variables**): `MAILERLITE_ACCOUNT_ID`, `MAILERLITE_FORM_ID`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, `NEXT_PUBLIC_SITE_URL`. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
4. Deploy. Point your custom domain at it in **Settings → Domains**.

No `vercel.json` is required.

---

## Accessibility & motion

- One `<h1>` (the title); semantic `header` / `main` / `footer` landmarks.
- Form input is labelled; errors announce via `aria-live`. Visible ember focus rings everywhere.
- All animations respect `prefers-reduced-motion` (they're disabled, content shows immediately).
- A honeypot field + per-IP rate limiting (5/min) guard the signup endpoint.
