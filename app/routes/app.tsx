import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate, MONTHLY_PLAN } from "../shopify.server";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // 1. Authenticate the user
  const { billing } = await authenticate.admin(request);

  // 2. CHECK BILLING (This is the part you were missing!)
  // This tells the app: "If they haven't paid, send them to the payment screen."
  await billing.require({
    plans: [MONTHLY_PLAN],
    isTest: true, // Keep true for the reviewer
    onFailure: async () => billing.request({ plan: MONTHLY_PLAN, isTest: true }),
  });

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavMenu>
        <Link to="/app" rel="home">Home</Link>
      </NavMenu>
      <Outlet />
    </AppProvider>
  );
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};