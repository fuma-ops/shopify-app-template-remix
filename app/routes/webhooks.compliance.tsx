import { json } from "@remix-run/node";

// 1. Handle POST requests (This is for Shopify's Robot)
export const action = async () => {
  console.log("POST request received from Shopify");
  return json({ success: true }, { status: 200 });
};

// 2. Handle GET requests (This is for YOU to test in the browser)
export const loader = async () => {
  console.log("GET request received from Browser");
  return json({ success: true, message: "Compliance Webhook is Working!" }, { status: 200 });
};