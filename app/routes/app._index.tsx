import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Text, Card, Button, BlockStack, List, Link, InlineStack, Banner, Grid } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate, MONTHLY_PLAN } from "../shopify.server";
import prisma from "../db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, billing } = await authenticate.admin(request);
  const billingCheck = await billing.check({
    plans: [MONTHLY_PLAN],
    isTest: true,
  });

  // Get Real Counts from Database
  const views = await prisma.analytics.count({ where: { shop: session.shop, event: "view" } });
  const clicks = await prisma.analytics.count({ where: { shop: session.shop, event: "click" } });
  const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : "0";

  return json({ 
    shop: session.shop,
    isPro: billingCheck.hasActivePayment,
    stats: { views, clicks, ctr }
  });
};

export default function Index() {
  const { shop, isPro, stats } = useLoaderData<typeof loader>();
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
        {isPro && (
          <Card>
             <BlockStack gap="400">
                <Text as="h2" variant="headingMd">🚀 Pro Analytics (Real Data)</Text>
                <Grid>
                    <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
                       <Card background="bg-surface-secondary">
                          <BlockStack gap="200">
                            <Text as="h3" variant="headingSm" tone="subdued">Total Views</Text>
                            {/* 👇 REAL VARIABLE HERE */}
                            <Text as="p" variant="headingXl">{stats.views}</Text>
                          </BlockStack>
                       </Card>
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
                       <Card background="bg-surface-secondary">
                          <BlockStack gap="200">
                            <Text as="h3" variant="headingSm" tone="subdued">Clicks</Text>
                            {/* �� REAL VARIABLE HERE */}
                            <Text as="p" variant="headingXl">{stats.clicks}</Text>
                          </BlockStack>
                       </Card>
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
                       <Card background="bg-surface-secondary">
                          <BlockStack gap="200">
                            <Text as="h3" variant="headingSm" tone="subdued">CTR</Text>
                            {/* 👇 REAL VARIABLE HERE */}
                            <Text as="p" variant="headingXl" tone="success">{stats.ctr}%</Text>
                          </BlockStack>
                       </Card>
                    </Grid.Cell>
                </Grid>
             </BlockStack>
          </Card>
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
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
