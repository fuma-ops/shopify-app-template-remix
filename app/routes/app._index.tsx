import { Page, Layout, Card, Text, BlockStack, Button, InlineGrid, Banner, Box } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import prisma from "../db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  
  // Fetch Real Data safely
  const views = await prisma.analytics.count({ where: { shop: session.shop, event: "view" } });
  const clicks = await prisma.analytics.count({ where: { shop: session.shop, event: "click" } });
  const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : "0";

  return json({ 
    shop: session.shop,
    stats: { views, clicks, ctr }
  });
};

export default function Index() {
  const { shop, stats } = useLoaderData<typeof loader>();
  
  // Universal Safe Link for the Theme Editor
  const editorUrl = `https://${shop}/admin/themes/current/editor?context=apps&template=product`;

  return (
    <Page title="Sticky Cart Dashboard" subtitle="Overview of your widget's performance.">
      <BlockStack gap="600">
        
        {/* 1. STATUS BANNER */}
        <Layout>
          <Layout.Section>
            <Banner tone="success" title="App is Active">
              <p>Your sticky bar is currently visible on your storefront. You are all set!</p>
            </Banner>
          </Layout.Section>

          {/* 2. ANALYTICS GRID (Clean & Professional) */}
          <Layout.Section>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">Performance (Last 30 Days)</Text>
              
              <InlineGrid columns={{ xs: 1, sm: 3 }} gap="400">
                <Card>
                  <BlockStack gap="200">
                    <Text as="h3" variant="headingSm" tone="subdued">TOTAL VIEWS</Text>
                    <Text as="p" variant="heading2xl">{stats.views}</Text>
                  </BlockStack>
                </Card>

                <Card>
                  <BlockStack gap="200">
                    <Text as="h3" variant="headingSm" tone="subdued">TOTAL CLICKS</Text>
                    <Text as="p" variant="heading2xl">{stats.clicks}</Text>
                  </BlockStack>
                </Card>

                <Card>
                  <BlockStack gap="200">
                    <Text as="h3" variant="headingSm" tone="subdued">CONVERSION RATE</Text>
                    <Text as="p" variant="heading2xl">{stats.ctr}%</Text>
                  </BlockStack>
                </Card>
              </InlineGrid>
            </BlockStack>
          </Layout.Section>

          {/* 3. CUSTOMIZATION SECTION */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">Design & Customization</Text>
                <Text as="p" tone="subdued">
                  Want to change colors, fonts, or gradients? Open the theme editor to customize the look and feel of your sticky bar.
                </Text>
                <InlineGrid gap="300">
                  <Button variant="primary" size="large" url={editorUrl} target="_blank">
                    Open Theme Editor
                  </Button>
                </InlineGrid>
              </BlockStack>
            </Card>
          </Layout.Section>

        </Layout>
      </BlockStack>
    </Page>
  );
}