import { Resend } from "resend";

// Every website email (quote requests and newsletter sign-ups) goes to this inbox.
// Set RFQ_TO_EMAIL to send somewhere else without changing code.
export const MAIL_TO = process.env.RFQ_TO_EMAIL || "sales@luxoraglazesystem.com";

// The "from" address must be on a domain verified in Resend (luxoraglazesystem.com).
const MAIL_FROM = process.env.MAIL_FROM || "Luxora Website <noreply@luxoraglazesystem.com>";

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Keeps visitor-typed text out of email headers (subject lines)
export function oneLine(value, max = 120) {
  return String(value ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

// Best-effort limit per visitor (resets when the server restarts): enough to stop a
// simple script from flooding the inbox, without needing a database.
const hits = new Map();
export function tooManyRequests(request, limit = 5, windowMs = 10 * 60 * 1000) {
  const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > limit;
}

// Returns { ok: true } or { ok: false }. Without RESEND_API_KEY it logs instead (local testing
// only); on the live site a missing key is reported as a failure so a visitor is never told
// "sent" when nothing was.
export async function sendMail({ subject, html, text, replyTo, attachments }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("Email not sent: RESEND_API_KEY is not set.");
      return { ok: false };
    }
    console.log("Email not sent (no RESEND_API_KEY, local only):", { to: MAIL_TO, subject, text });
    return { ok: true };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: MAIL_FROM,
    to: MAIL_TO,
    subject,
    html,
    text,
    ...(replyTo ? { replyTo } : {}),
    ...(attachments?.length ? { attachments } : {}),
  });
  if (error) {
    console.error("Email send failed:", error);
    return { ok: false };
  }
  return { ok: true };
}
