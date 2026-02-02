import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const WHATSAPP_API_TOKEN = Deno.env.get("WHATSAPP_API_TOKEN");
const WHATSAPP_PHONE_ID = Deno.env.get("WHATSAPP_PHONE_ID");
const ADMIN_WHATSAPP = "2348166167775";

interface WhatsAppPayload {
  formType: "contact" | "distributor" | "newsletter";
  data: Record<string, any>;
}

function formatWhatsAppMessage(formType: string, data: Record<string, any>): string {
  const timestamp = new Date().toLocaleString("en-NG", {
    timeZone: "Africa/Lagos",
    dateStyle: "medium",
    timeStyle: "short",
  });

  if (formType === "contact") {
    return `🔔 *NEW CONTACT FORM SUBMISSION*

📝 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
📌 *Subject:* ${data.subject}

💬 *Message:*
${data.message}

⏰ _Submitted: ${timestamp}_`;
  }

  if (formType === "distributor") {
    let message = `🔔 *NEW DISTRIBUTOR INQUIRY*

🏢 *Business:* ${data.business_name}
👤 *Contact Person:* ${data.contact_name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}`;

    if (data.whatsapp) {
      message += `\n💬 *WhatsApp:* ${data.whatsapp}`;
    }

    message += `\n📍 *Location:* ${data.location}
🏪 *Business Type:* ${data.business_type}`;

    if (data.expected_volume) {
      message += `\n📦 *Expected Volume:* ${data.expected_volume}`;
    }

    if (data.message) {
      message += `\n\n📝 *Additional Info:*\n${data.message}`;
    }

    message += `\n\n⏰ _Submitted: ${timestamp}_`;
    return message;
  }

  if (formType === "newsletter") {
    return `🔔 *NEW NEWSLETTER SUBSCRIPTION*

📧 *Email:* ${data.email}

⏰ _Subscribed: ${timestamp}_`;
  }

  return "";
}

async function sendWhatsAppMessage(to: string, message: string): Promise<boolean> {
  if (!WHATSAPP_API_TOKEN || !WHATSAPP_PHONE_ID) {
    console.log("WhatsApp API not configured, skipping WhatsApp notification");
    return false;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${WHATSAPP_API_TOKEN}`,
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: to,
          type: "text",
          text: {
            preview_url: false,
            body: message,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("WhatsApp API error:", errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return false;
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
    const { formType, data }: WhatsAppPayload = await req.json();

    const message = formatWhatsAppMessage(formType, data);

    const sent = await sendWhatsAppMessage(ADMIN_WHATSAPP, message);

    return new Response(
      JSON.stringify({
        success: sent,
        message: sent ? "WhatsApp notification sent" : "WhatsApp API not configured"
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in send-whatsapp-notification:", error);
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
