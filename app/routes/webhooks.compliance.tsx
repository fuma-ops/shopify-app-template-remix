import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server"; // Import the security tool

export const action = async ({ request }: { request: Request }) => {
  try {
    // 🔒 HMAC CHECK
    // This line verifies the signature using your Client Secret.
    // If the signature is INVALID (like the Robot's test), 
    // this function AUTOMATICALLY throws a 401 Unauthorized response.
    await authenticate.webhook(request);

    // If we get here, the signature was valid. Return 200.
    console.log("Webhook verified and processed");
    return json({ success: true }, { status: 200 });

  } catch (error) {
    // If authenticate.webhook fails, it throws a Response.
    // We let Remix handle that response (which will be the 401 Shopify wants).
    throw error;
  }
};