import { type ActionFunctionArgs, json } from "@remix-run/node";
import prisma from "../db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  // 1. Handle CORS manually (Safer than importing a package)
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // 2. Get Data
  const formData = await request.formData();
  const shop = formData.get("shop") as string;
  const event = formData.get("event") as string;

  if (!shop || !event) {
    return json({ error: "Missing data" }, { status: 400 });
  }

  // 3. Save to Database
  try {
    await prisma.analytics.create({
      data: { shop, event },
    });
  } catch (err) {
    console.error("DB Error:", err);
    return json({ error: "Database error" }, { status: 500 });
  }

  // 4. Return Success
  return json({ success: true }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  });
};
