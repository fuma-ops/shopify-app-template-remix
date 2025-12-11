import { Page, Layout, Card, Text, BlockStack, Button, InlineGrid, Banner } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import prisma from "../db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  
  // Fetch Analytics
  const views = await prisma.analytics.count({ where: { shop: session.shop, event: "view" } });
  const clicks = await prisma.analytics.count({ where: { shop: session.shop, event: "click" } });
  const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : "0";

  return json({ 
    shop: session.shop, // This is 'example.myshopify.com'
    stats: { views, clicks, ctr }
  });
};

export default function Index() {
  const { shop, stats } = useLoaderData<typeof loader>();

  // ⚡ THE FIX: Use the universal admin link format
  // Shopify will automatically redirect this to the correct admin.shopify.com page
  const editorUrl = `https://${shop}/admin/themes/current/editor?context=apps&template=product`;

  return (
    <Page title="Sticky Cart Dashboard">
      <BlockStack gap="500">
        
        {/* Analytics Section */}
        <Layout>
          <Layout.Section>
            <Text as="h2" variant="headingMd">🚀 Pro Analytics (Real Data)</Text>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="200">
                <Text as="h3" variant="headingSm">Total Views</Text>
                <Text as="p" variant="headingXl">{stats.views}</Text>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="200">
                <Text as="h3" variant="headingSm">Clicks</Text>
                <Text as="p" variant="headingXl">{stats.clicks}</Text>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="200">
                <Text as="h3" variant="headingSm">CTR</Text>
                <Text as="p" variant="headingXl" tone="success">{stats.ctr}%</Text>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>

        {/* Status & Actions Section */}
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">App Status</Text>
                  <Banner tone="success">
                    <Text as="p" fontWeight="bold">Active & Running</Text>
                  </Banner>
                  <Text as="p" variant="bodyMd">
                    Your Sticky Cart widget is currently enabled.
                  </Text>
                </BlockStack>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">Quick Actions</Text>
                  <InlineGrid gap="300">
                    
                    {/* The Fixed Button */}
                    <Button 
                      variant="primary" 
                      url={editorUrl} 
                      target="_blank"
                    >
                      Open Theme Editor
                    </Button>

                  </InlineGrid>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>

      </BlockStack>
    </Page>
  );
}