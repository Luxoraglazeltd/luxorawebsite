import { sendMail, escapeHtml, oneLine, tooManyRequests } from "@/lib/mail";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Newsletter sign-ups are emailed to the sales inbox. Nothing is stored on the website.
export async function POST(request) {
  try {
    if (tooManyRequests(request)) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Hidden field real visitors never fill in; bots do. Pretend it worked and send nothing.
    if (body.website) {
      return Response.json({ success: true }, { status: 200 });
    }

    const email = oneLine(body.email, 200);
    if (!EMAIL_PATTERN.test(email)) {
      return Response.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    const result = await sendMail({
      subject: `Newsletter sign-up: ${email}`,
      text: `New newsletter subscriber: ${email}\n\nThey agreed to the Privacy Policy when signing up.`,
      html: `<p style="font-family:Arial,sans-serif;font-size:14px">New newsletter subscriber: <b>${escapeHtml(email)}</b></p><p style="font-family:Arial,sans-serif;font-size:12px;color:#666">They agreed to the Privacy Policy when signing up.</p>`,
      replyTo: email,
    });

    if (!result.ok) {
      return Response.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Newsletter sign-up error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
