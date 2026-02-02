# Form Notifications Setup

This document explains how the automatic notification system works for your Dovvia Still website.

## Overview

Your website now automatically sends notifications via **email** and **WhatsApp** whenever users submit any of these forms:
- Contact Form
- Distributor Inquiry Form
- Newsletter Subscription Form

## How It Works

1. **User Submits Form** → Data is saved to Supabase database
2. **Automatic Notifications** → Two edge functions are triggered simultaneously:
   - `send-email-notification` → Sends formatted email to admin@dovvia.com
   - `send-whatsapp-notification` → Sends formatted message to +2348166167775

3. **User Receives Confirmation** → Success message shown to user

## Email Notifications

### Configuration Required

To enable email notifications, you need to set up **Resend API** (recommended free email service):

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain `dovvia.com` (or use their test domain for development)
3. Get your API key from the dashboard
4. The API key will need to be configured as `RESEND_API_KEY` in your Supabase project

### Email Format

Emails are sent with:
- **From:** Dovvia Still <notifications@dovvia.com>
- **To:** admin@dovvia.com
- **Subject:** Form-specific subject (e.g., "New Contact Form Submission - Dovvia Still")
- **Content:** Formatted HTML with all form data, timestamp (Nigeria time zone)

## WhatsApp Notifications

### Configuration Required

To enable WhatsApp notifications, you need to set up **WhatsApp Business API**:

1. Create a Meta (Facebook) Business Account
2. Set up WhatsApp Business API
3. Get your Phone Number ID and Access Token
4. Configure these as environment variables in Supabase:
   - `WHATSAPP_API_TOKEN`
   - `WHATSAPP_PHONE_ID`

### WhatsApp Format

Messages are sent to **+2348166167775** with:
- Formatted message with all form data
- Emojis for visual clarity
- Nigeria timezone timestamp

### Example WhatsApp Message (Contact Form)

```
🔔 *NEW CONTACT FORM SUBMISSION*

📝 *Name:* John Doe
📧 *Email:* john@example.com
📱 *Phone:* +2348012345678
📌 *Subject:* Product Order

💬 *Message:*
I would like to order 10 crates of Dovvia Still water.

⏰ _Submitted: Feb 2, 2026, 3:45 PM_
```

## Form Integration Details

### Contact Form (app/contact/page.tsx)
- Collects: Name, Email, Phone, Subject, Message
- Saves to: `contact_submissions` table
- Sends notifications immediately after successful database insert

### Distributor Inquiry Form (app/partners/page.tsx)
- Collects: Business details, contact info, location, volume expectations
- Saves to: `distributor_inquiries` table
- Sends notifications immediately after successful database insert

### Newsletter Form (components/footer.tsx)
- Collects: Email address
- Saves to: `newsletter_subscriptions` table
- Sends notifications immediately after successful database insert
- Handles duplicate email gracefully (won't send duplicate notifications)

## Edge Functions Deployed

Two Supabase Edge Functions have been deployed:

1. **send-email-notification** (`/functions/v1/send-email-notification`)
   - Handles email notifications via Resend API
   - Formats HTML emails with proper styling
   - Returns success/failure status

2. **send-whatsapp-notification** (`/functions/v1/send-whatsapp-notification`)
   - Handles WhatsApp notifications via WhatsApp Business API
   - Formats messages with markdown and emojis
   - Returns success/failure status

## Error Handling

- Notifications are sent asynchronously (won't block form submission)
- If email fails, user still sees success message
- If WhatsApp fails, user still sees success message
- Errors are logged to console for debugging
- Form data is ALWAYS saved to database regardless of notification status

## Testing

To test the notification system:

1. **Without API Keys (Current State):**
   - Forms will work and save data to database
   - Notifications will fail silently (logged in console)
   - No interruption to user experience

2. **With API Keys Configured:**
   - Forms will work and save data to database
   - Email sent to admin@dovvia.com
   - WhatsApp message sent to +2348166167775
   - Check both channels for notifications

## Next Steps

1. Set up Resend account and verify your domain
2. Set up WhatsApp Business API
3. Configure environment variables in Supabase dashboard
4. Test each form to verify notifications are received

## Support

All form submissions are saved to the Supabase database regardless of notification status, so you won't miss any inquiries even during API setup.
