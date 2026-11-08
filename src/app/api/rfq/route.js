import { sendMail, escapeHtml, oneLine, tooManyRequests } from "@/lib/mail";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB

export async function POST(request) {
  try {
    if (tooManyRequests(request)) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const formData = await request.formData();

    // Hidden field real visitors never fill in; bots do. Pretend it worked and send nothing.
    if (formData.get("website")) {
      return Response.json({ success: true }, { status: 200 });
    }

    const fullName = formData.get("fullName");
    const company = formData.get("company");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const projectName = formData.get("projectName");
    const projectLocation = formData.get("projectLocation");
    const projectType = formData.get("projectType");
    const projectStage = formData.get("projectStage");
    const productsRequired = formData.get("productsRequired");
    const quantitiesDimensions = formData.get("quantitiesDimensions");
    const glassPreference = formData.get("glassPreference");
    const colourFinish = formData.get("colourFinish");
    const subject = formData.get("subject");
    const message = formData.get("message");
    const siteAssessment = formData.get("siteAssessment") === "on";
    const attachment = formData.get("attachment");

    // Basic required-field validation
    if (!fullName || !email) {
      return Response.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Server-side file size re-check: never trust the frontend check alone
    const hasFile = attachment && typeof attachment === "object" && attachment.size > 0;
    if (hasFile && attachment.size > MAX_FILE_BYTES) {
      return Response.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    const rows = [
      ["Name", fullName],
      ["Company", company],
      ["Email", email],
      ["Phone / WhatsApp", phone],
      ["Project name", projectName],
      ["Project location", projectLocation],
      ["Project type", projectType],
      ["Project stage", projectStage],
      ["Products / systems required", productsRequired],
      ["Quantities / dimensions", quantitiesDimensions],
      ["Glass preference", glassPreference],
      ["Colour / finish", colourFinish],
      ["Subject", subject],
      ["On-site assessment requested", siteAssessment ? "Yes" : "No"],
      ["Attachment", hasFile ? attachment.name : "None"],
    ].filter(([, value]) => value);

    const note = message || "(none provided)";

    const text =
      rows.map(([label, value]) => `${label}: ${value}`).join("\n") +
      `\n\nAdditional requirements:\n${note}`;

    const html =
      `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">` +
      rows
        .map(
          ([label, value]) =>
            `<tr><td style="color:#666;vertical-align:top"><b>${escapeHtml(label)}</b></td><td>${escapeHtml(value)}</td></tr>`
        )
        .join("") +
      `</table><p style="font-family:Arial,sans-serif;font-size:14px"><b>Additional requirements</b><br>${escapeHtml(note).replace(/\n/g, "<br>")}</p>`;

    const attachments = hasFile
      ? [{ filename: attachment.name, content: Buffer.from(await attachment.arrayBuffer()) }]
      : [];

    const result = await sendMail({
      subject: `Website enquiry: ${oneLine(subject || "Request a Quote")} - ${oneLine(fullName, 60)}`,
      html,
      text,
      replyTo: oneLine(email, 200),
      attachments,
    });

    if (!result.ok) {
      return Response.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("RFQ submission error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
