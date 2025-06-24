
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FeedbackEmailRequest {
  name: string;
  email?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email }: FeedbackEmailRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ message: "No email provided, skipping email notification" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    // Try to send email, but handle domain verification errors gracefully
    try {
      const emailResponse = await resend.emails.send({
        from: "GOHUBS <onboarding@resend.dev>",
        to: [email],
        subject: "Thank you for your feedback!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(to right, #2563eb, #059669); padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">GOHUBS</h1>
              <p style="color: #e0f2fe; margin: 5px 0 0 0; font-size: 14px;">Going With Health Hubs</p>
            </div>
            
            <div style="padding: 30px 20px; background: #f8fafc;">
              <h2 style="color: #1e40af; margin-bottom: 20px;">Thank you for your feedback, ${name}!</h2>
              
              <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
                We have received your feedback and truly appreciate you taking the time to share your thoughts with us.
              </p>
              
              <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
                Your input helps us improve our healthcare services and better serve communities in need. 
                We are committed to making quality healthcare accessible to everyone, especially in remote areas.
              </p>
              
              <div style="background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 20px 0;">
                <p style="color: #1e40af; margin: 0; font-weight: 500;">
                  Our team will review your feedback and get back to you if needed.
                </p>
              </div>
              
              <p style="color: #374151; line-height: 1.6;">
                Thank you for being part of our mission to bring healthcare to your doorstep.
              </p>
              
              <p style="color: #374151; line-height: 1.6; margin-top: 30px;">
                Best regards,<br>
                <strong>The GOHUBS Team</strong><br>
                <small style="color: #6b7280;">From Remote to Rescued – Timely Healthcare for All</small>
              </p>
            </div>
            
            <div style="background: #1e40af; color: white; padding: 15px; text-align: center;">
              <p style="margin: 0; font-size: 12px;">
                © 2024 GOHUBS. All rights reserved.
              </p>
            </div>
          </div>
        `,
      });

      console.log("Feedback confirmation email sent successfully:", emailResponse);

      return new Response(JSON.stringify({ 
        success: true, 
        message: "Feedback submitted and confirmation email sent successfully",
        emailResponse 
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });

    } catch (emailError: any) {
      console.error("Email sending failed:", emailError);
      
      // If it's a domain verification error, return success but note email wasn't sent
      if (emailError.message && emailError.message.includes("verify a domain")) {
        console.log("Domain verification required - feedback saved but email not sent");
        return new Response(JSON.stringify({ 
          success: true, 
          message: "Feedback submitted successfully. Email confirmation temporarily unavailable.",
          warning: "Email domain needs verification"
        }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        });
      }
      
      // For other email errors, still return success since feedback was saved
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Feedback submitted successfully. Email confirmation failed to send.",
        error: emailError.message
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

  } catch (error: any) {
    console.error("Error in send-feedback-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
