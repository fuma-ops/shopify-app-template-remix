import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  // Redirect user back to the main dashboard
  return redirect("/app");
};