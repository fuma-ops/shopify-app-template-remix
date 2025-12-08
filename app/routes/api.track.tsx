import { type ActionFunctionArgs, json } from "@remix-run/node";
import prisma from "../db.server";
import { cors } from "remix-utils/cors";

export const action = async ({ request }: ActionFunctionArgs) => {
  // 1. Allow the Storefront to talk to us (CORS)
  if (request.method === "OPTIONS") {
    return cors(request, json({ ok: true }));
  }

  // 2. Get the data sent from the storefront
  const formData = await request.formData();
  const shop = formData.get("shop") as string;
  const event = formData.get("event") as string; // 'view' or 'click'

  if (!shop || !event) {
    return json({ error: "Missing data" }, { status: 400 });
  }

  // 3. Save it to the database
  await prisma.analytics.create({
    data: {
      shop,
      event,
    },
  });

  // 4. Respond with "Success" + CORS headers
  return cors(request, json({ success: true }));
};