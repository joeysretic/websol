import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { formType, formData } = body;

    if (!formType || !formData) {
      return new Response(
        JSON.stringify({ error: "Missing formType or formData" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Persist the registration to the database
    let table: string;
    if (formType === "event") {
      table = "event_registrations";
    } else if (formType === "parent") {
      table = "parent_registrations";
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid formType" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { error: insertError } = await supabase
      .from(table)
      .insert(formData);

    if (insertError) {
      return new Response(
        JSON.stringify({ error: "Failed to save registration" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Build email content
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const toEmail = Deno.env.get("REGISTRATION_TO_EMAIL") || "hello@littlewonders.com.au";

    let subject: string;
    let htmlBody: string;

    if (formType === "event") {
      subject = `New Event Registration — ${formData.contact_name || "Unknown"}`;
      htmlBody = buildEventEmail(formData);
    } else {
      subject = `New Parent Registration — ${formData.parent_name || "Unknown"}`;
      htmlBody = buildParentEmail(formData);
    }

    // Send email via Resend if API key is configured
    if (resendApiKey) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Little Wonders <registrations@littlewonders.com.au>",
          to: [toEmail],
          subject,
          html: htmlBody,
        }),
      });

      if (!emailResponse.ok) {
        const errText = await emailResponse.text();
        console.error("Resend API error:", errText);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Registration submitted successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

function buildEventEmail(d: Record<string, unknown>): string {
  const rows = [
    ["Contact Name", d.contact_name],
    ["Contact Email", d.contact_email],
    ["Contact Phone", d.contact_phone],
    ["Event Type", d.event_type],
    ["Event Date", d.event_date],
    ["Start Time", d.event_start_time],
    ["End Time", d.event_end_time],
    ["Venue Name", d.event_venue_name],
    ["Venue Address", d.event_venue_address],
    ["City", d.event_city],
    ["Number of Children", d.number_of_children],
    ["Children Ages", d.children_ages],
    ["Care Hours", d.care_hours],
    ["Additional Info", d.additional_info],
  ];

  const tableRows = rows
    .map(([label, val]) => `<tr><td style="padding:8px 16px;border-bottom:1px solid #eee;font-weight:600;color:#3a5d40;">${label}</td><td style="padding:8px 16px;border-bottom:1px solid #eee;">${val ?? "—"}</td></tr>`)
    .join("");

  return `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fdfbf7;padding:32px;">
    <h1 style="color:#3a5d40;font-size:28px;margin-bottom:24px;">New Event Registration</h1>
    <p style="color:#78716c;font-size:14px;margin-bottom:24px;">A new event registration has been submitted through the Little Wonders website.</p>
    <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px;color:#44403c;">${tableRows}</table>
    <p style="margin-top:32px;color:#a8a29e;font-size:12px;">This email was sent automatically from the Little Wonders registration form.</p>
  </div>`;
}

function buildParentEmail(d: Record<string, unknown>): string {
  const rows = [
    ["Parent Name", d.parent_name],
    ["Parent Email", d.parent_email],
    ["Parent Phone", d.parent_phone],
    ["Address", d.parent_address],
    ["Number of Children", d.number_of_children],
    ["Children Details", d.children_details],
    ["Care Type", d.care_type],
    ["Preferred Date", d.preferred_date],
    ["Additional Info", d.additional_info],
  ];

  const tableRows = rows
    .map(([label, val]) => `<tr><td style="padding:8px 16px;border-bottom:1px solid #eee;font-weight:600;color:#3a5d40;">${label}</td><td style="padding:8px 16px;border-bottom:1px solid #eee;">${val ?? "—"}</td></tr>`)
    .join("");

  return `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fdfbf7;padding:32px;">
    <h1 style="color:#3a5d40;font-size:28px;margin-bottom:24px;">New Parent Registration</h1>
    <p style="color:#78716c;font-size:14px;margin-bottom:24px;">A new parent registration has been submitted through the Little Wonders website.</p>
    <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px;color:#44403c;">${tableRows}</table>
    <p style="margin-top:32px;color:#a8a29e;font-size:12px;">This email was sent automatically from the Little Wonders registration form.</p>
  </div>`;
}
