/**
 * Single source of truth for all site copy.
 *
 * Jey: edit headlines and body text here. Components read from this file only —
 * you never need to touch a component file to change wording.
 *
 * Convention: text wrapped between {em} ... {/em} renders in italic wine.
 * The components split on those markers, so keep them balanced.
 */

export const site = {
  bookTitle: "Anticipation",
  author: "Jey Lofton",
  genre: "A Psychological Love Story",
  release: "Winter 2026",
  domain: "anticipationnovel.com",
};

export const nav = {
  tagline: "A Psychological Love Story",
  cta: "Read the Prologue",
};

export const hero = {
  eyebrow: "A Psychological Love Story · Winter 2026",
  // Title is split into roman + italic-wine halves.
  titleRoman: "Antici",
  titleItalic: "pation",
  hookLine1: "He had eight weeks to say it.",
  hookLine2: "He spent them waiting.",
  scrollCue: "Scroll",
  imageAlt:
    "Anticipation by Jey Lofton — a man alone on a city balcony at night, the skyline burning low behind him.",
};

export const question = {
  eyebrow: "The Prologue",
  // {em} marks the phrases highlighted in wine.
  quote:
    "I've repeated that sentence so many times it doesn't sound like language anymore. {em}Just noise.{/em} Just the sound of a man realizing what {em}waiting costs.{/em}",
  attribution: "From the opening pages",
};

export const reveal = {
  tag: "The Envelope",
  headline: "She was on her way to me when it happened.",
  body: [
    "There was blood on the corner of the envelope. Not much. Enough.",
    "Her phone was still on the passenger seat when they found the car, the GPS still glowing, still counting down the minutes to an address she never reached. My address.",
    "I was on the balcony when the call came. The candles had burned down. Dinner had gone cold. The ring was in my pocket, where it had been for eight weeks while I waited for the perfect moment to stop being a coward.",
    "The funeral was in the morning. I spent the night holding an envelope I couldn't open, doing the math on every day I'd said I should have called.",
  ],
  ctaLink: "Read what happened before",
  imageAlt:
    "A bloodstained, wax-sealed envelope from Anticipation, a literary fiction novel by Jey Lofton.",
};

export const divider = {
  imageAlt:
    "A city skyline at dusk with a single empty chair — Anticipation, a literary tragedy by Jey Lofton.",
};

export const invitation = {
  eyebrow: "A Reader's Invitation",
  headline: "Read the opening before the world does.",
  sub: "Get the Prologue and full Chapter One delivered to your inbox. No noise. Just the first pages of the story, and the occasional note from me as the book finds its way into the world.",
  included: [
    { label: "The Prologue", meta: "First pages" },
    { label: "Chapter One", meta: "In full" },
    { label: "Behind the scenes", meta: "Notes from Jey" },
  ],
  emailLabel: "Email address",
  emailPlaceholder: "you@email.com",
  submit: "Send me the Prologue",
  sending: "Sending…",
  fineprint: "One-click unsubscribe. Your email stays between you and the work.",
  success: {
    eyebrow: "Check your inbox",
    headline: "The Prologue is on its way.",
    body: "Pour something. Find a chair you like. Read it on the kitchen floor at three in the morning if that's where the story finds you.",
    signoff: "— Jey",
  },
  error: {
    generic: "Something went wrong on our end. Try again in a moment.",
    invalidEmail: "That email doesn't look quite right.",
  },
};

export const about = {
  tag: "The Author",
  headline: "A filmmaker who writes the way he shoots.",
  body: [
    "Jey Lofton came to fiction the long way — through a camera. Years of framing other people's stories taught him what to leave out, and Anticipation reads like it: spare, exact, every scene cut to the bone.",
    "His military background lives in the discipline of the prose. There is no wasted motion here, no sentence that hasn't earned its place. What's left is a story about a man whose intelligence becomes the wall he hides behind, and the eight weeks that wall costs him.",
    "Anticipation is his debut novel.",
  ],
  signature: "— Jey",
  portraitAlt:
    "Jey Lofton, filmmaker and author of the literary fiction novel Anticipation.",
};

export const lastDoor = {
  headlineLine1: "The story already ended",
  headlineLine2: "a week ago.",
  cta: "Send me the Prologue",
  imageAlt:
    "An open ring box beside a glass of wine — Anticipation, a tragic love story by Jey Lofton.",
};

export const footer = {
  line: "A Novel by Jey Lofton · © 2026 · All Rights Reserved",
};
