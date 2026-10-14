const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB

export async function POST(request) {
  try {
    const formData = await request.formData();

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
    if (!fullName || !email || !message) {
      return Response.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Server-side file size re-check: never trust the frontend check alone
    if (attachment && typeof attachment === "object" && attachment.size > 0) {
      if (attachment.size > MAX_FILE_BYTES) {
        return Response.json(
          { error: "File too large. Maximum size is 10MB." },
          { status: 400 }
        );
      }
    }

    // ── TODO: EMAIL SENDING NOT YET CONNECTED ──
    // Once a live business inbox + Resend API key are ready, this section
    // will forward the submission as an email to RFQ_TO_EMAIL, attaching
    // the file directly (no storage; nothing is saved to disk here).
    //
    // For now, log the submission server-side so nothing is lost during
    // testing, and respond successfully so the form's UI works end-to-end.
    console.log("RFQ submission received (email sending not yet connected):", {
      fullName,
      company,
      email,
      phone,
      projectName,
      projectLocation,
      projectType,
      projectStage,
      productsRequired,
      quantitiesDimensions,
      glassPreference,
      colourFinish,
      subject,
      message,
      siteAssessment,
      attachment: attachment?.name || "none",
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("RFQ submission error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}