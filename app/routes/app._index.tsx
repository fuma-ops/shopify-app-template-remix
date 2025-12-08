import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  List,
  Link,
  InlineStack,
  Banner,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate, MONTHLY_PLAN } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, billing } = await authenticate.admin(request);
  const billingCheck = await billing.check({
    plans: [MONTHLY_PLAN],
    isTest: true,
  });

  return json({ 
    shop: session.shop,
    isPro: billingCheck.hasActivePayment 
  });
};

export default function Index() {
  const { shop, isPro } = useLoaderData<typeof loader>();
  const themeEditorUrl = `https://${shop}/admin/themes/current/editor?context=apps`;

  return (
    <Page>
      <TitleBar title="Sticky Cart Dashboard" />
      <BlockStack gap="500">
        {isPro && (
          <Banner tone="info">
            <Text as="p" fontWeight="bold">🎉 Thank you for supporting us! You are on the PRO Plan.</Text>
          </Banner>
        )}
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">App Status</Text>
                  <Banner tone="success">
                    <Text as="p" fontWeight="bold">Active & Running</Text>
                  </Banner>
                  <Text as="p" variant="bodyMd">Your Sticky Cart widget is currently enabled.</Text>
                </BlockStack>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">Quick Actions</Text>
                  <InlineStack gap="300">
                    <Button variant="primary" url={themeEditorUrl} target="_blank">Open Theme Editor</Button>
                  </InlineStack>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">Your Plan</Text>
                  {isPro ? (
                    <div style={{background: '#fff8e1', padding: '15px', borderRadius: '8px', border: '1px solid #ffe57f', textAlign: 'center'}}>
                      <Text as="h3" variant="headingLg">🏆 PRO TIER</Text>
                      <Text as="p" tone="subdued">All features unlocked</Text>
                    </div>
                  ) : (
                    <>
                      <div style={{background: '#e3f2fd', padding: '10px', borderRadius: '5px', color: '#0d47a1', fontWeight: 'bold', textAlign: 'center'}}>
                        FREE TIER
                      </div>
                      <Text as="p" variant="bodySm">Upgrade to remove branding.</Text>
                      <Button url="/app/upgrade" fullWidth variant="primary" tone="critical">Upgrade to Pro ($4.99/mo)</Button>
                    </>
                  )}
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">Need Help?</Text>
                  <List>
                    <List.Item><Link url="mailto:support@zsolutions.ma">Contact Support</Link></List.Item>
                    <List.Item><Link url="#">Read Setup Guide</Link></List.Item>
                  </List>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
