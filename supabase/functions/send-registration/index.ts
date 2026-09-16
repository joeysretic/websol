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
    } else if (formType === "contact") {
      table = "contact_messages";
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
        JSON.stringify({ error: "Failed to save submission" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Build email content
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const toEmail = Deno.env.get("REGISTRATION_TO_EMAIL") || "hello@littlewonders.com.au";

    let subject: string;
    let htmlBody: string;

    if (formType === "event") {
      subject = `New Event Registration — ${formData.contact_name || formData.surname || "Unknown"}`;
      htmlBody = buildEmail("New Event Registration", "A new event registration has been submitted through the Little Wonders website.", formData);
    } else if (formType === "parent") {
      subject = `New Parent Registration — ${formData.parent_name || formData.guardian1_surname || "Unknown"}`;
      htmlBody = buildEmail("New Parent Registration", "A new parent registration has been submitted through the Little Wonders website.", formData);
    } else {
      subject = `New Contact Message — ${formData.name || "Unknown"}`;
      htmlBody = buildEmail("New Contact Message", "A new contact message has been submitted through the Little Wonders website.", formData);
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

function buildEmail(title: string, intro: string, d: Record<string, unknown>): string {
  const rows = Object.entries(d).map(([label, val]) => {
    const display = Array.isArray(val) ? val.join(", ") : String(val ?? "—");
    return `<tr><td style="padding:8px 16px;border-bottom:1px solid #eee;font-weight:600;color:#315f89;">${label.replace(/[-_]/g, " ")}</td><td style="padding:8px 16px;border-bottom:1px solid #eee;">${display}</td></tr>`;
  }).join("");

  return `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fbfaf7;padding:32px;">
    <h1 style="color:#315f89;font-size:28px;margin-bottom:24px;">${title}</h1>
    <p style="color:#637180;font-size:14px;margin-bottom:24px;">${intro}</p>
    <table style="width:100%;border-collapse:collapse;font-family:'DM Sans',sans-serif;font-size:14px;color:#3d4650;">${rows}</table>
    <p style="margin-top:32px;color:#8291a0;font-size:12px;">This email was sent automatically from the Little Wonders website.</p>
  </div>`;
}
