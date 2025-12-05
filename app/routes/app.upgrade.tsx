import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticate, MONTHLY_PLAN } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { billing } = await authenticate.admin(request);

  // 1. Calculate the exact URL of your codespace dynamically
  const { protocol, host } = new URL(request.url);
  const returnUrl = `${protocol}//${host}/app`;

  // 2. Check/Request the Billing
  await billing.require({
    plans: [MONTHLY_PLAN],
    onFailure: async () =>
      billing.request({
        plan: MONTHLY_PLAN, // This now matches your server code
        isTest: true,
        returnUrl: returnUrl,
      }),
  });

  return redirect("/app");
};