import { z } from "zod";
import { invitation } from "./copy";

/**
 * Shared by the client form (react-hook-form resolver) and the server route.
 * `website` is a honeypot. We deliberately do NOT constrain it in the schema —
 * the route inspects it explicitly and silently succeeds when a bot fills it,
 * rather than returning a validation error that would tip the bot off.
 */
export const subscribeSchema = z.object({
  email: z.string().email(invitation.error.invalidEmail),
  website: z.string().optional().default(""),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;

/** The client only needs to validate the visible field. */
export const clientSchema = subscribeSchema.pick({ email: true });
export type ClientInput = z.infer<typeof clientSchema>;
