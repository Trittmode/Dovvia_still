import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "admin@dovvia.com";

interface EmailPayload {
  formType: "contact" | "distributor" | "newsletter";
  data: Record<string, any>;
}

function formatEmailContent(formType: string, data: Record<string, any>): string {
  const timestamp = new Date().toLocaleString("en-NG", {
    timeZone: "Africa/Lagos",
    dateStyle: "full",
    timeStyle: "long",
  });

  if (formType === "contact") {
    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #16a34a; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #16a34a; }
    .value { margin-top: 5px; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone:</div>
        <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
      </div>
      <div class="field">
        <div class="label">Subject:</div>
        <div class="value">${data.subject}</div>
      </div>
      <div class="field">
        <div class="label">Message:</div>
        <div class="value">${data.message}</div>
      </div>
      <div class="footer">
        Submitted on: ${timestamp}
      </div>
    </div>
  </div>
</body>
</html>
    `;
  }

  if (formType === "distributor") {
    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #16a34a; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #16a34a; }
    .value { margin-top: 5px; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Distributor Inquiry</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Business Name:</div>
        <div class="value">${data.business_name}</div>
      </div>
      <div class="field">
        <div class="label">Contact Person:</div>
        <div class="value">${data.contact_name}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone:</div>
        <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
      </div>
      ${data.whatsapp ? `
      <div class="field">
        <div class="label">WhatsApp:</div>
        <div class="value"><a href="https://wa.me/${data.whatsapp.replace(/\+/g, '')}">${data.whatsapp}</a></div>
      </div>
      ` : ''}
      <div class="field">
        <div class="label">Location:</div>
        <div class="value">${data.location}</div>
      </div>
      <div class="field">
        <div class="label">Business Type:</div>
        <div class="value">${data.business_type}</div>
      </div>
      ${data.expected_volume ? `
      <div class="field">
        <div class="label">Expected Volume:</div>
        <div class="value">${data.expected_volume}</div>
      </div>
      ` : ''}
      ${data.message ? `
      <div class="field">
        <div class="label">Additional Information:</div>
        <div class="value">${data.message}</div>
      </div>
      ` : ''}
      <div class="footer">
        Submitted on: ${timestamp}
      </div>
    </div>
  </div>
</body>
</html>
    `;
  }

  if (formType === "newsletter") {
    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #16a34a; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #16a34a; }
    .value { margin-top: 5px; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Newsletter Subscription</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div class="footer">
        Subscribed on: ${timestamp}
      </div>
    </div>
  </div>
</body>
</html>
    `;
  }

  return "";
}

function getEmailSubject(formType: string): string {
  switch (formType) {
    case "contact":
      return "New Contact Form Submission - Dovvia Still";
    case "distributor":
      return "New Distributor Inquiry - Dovvia Still";
    case "newsletter":
      return "New Newsletter Subscription - Dovvia Still";
    default:
      return "New Form Submission - Dovvia Still";
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { formType, data }: EmailPayload = await req.json();

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email service not configured"
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailContent = formatEmailContent(formType, data);
    const subject = getEmailSubject(formType);

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Dovvia Still <notifications@dovvia.com>",
        to: [ADMIN_EMAIL],
        subject: subject,
        html: emailContent,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend API error:", errorText);
      throw new Error(`Email sending failed: ${errorText}`);
    }

    const result = await emailResponse.json();

    return new Response(
      JSON.stringify({ success: true, messageId: result.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in send-email-notification:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
