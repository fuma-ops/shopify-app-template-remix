import { Page, Layout, Card, Text, BlockStack, Button, InlineGrid, Banner, Box, Divider, Icon } from "@shopify/polaris";
import { ViewIcon, TapSingleIcon, TrendingUpIcon, PaintBrushIcon, ChatIcon } from "@shopify/polaris-icons";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import prisma from "../db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  
  // Fetch Real Data
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
  
  // Universal Editor Link (Safe)
  const editorUrl = `https://${shop}/admin/themes/current/editor?context=apps&template=product`;

  return (
    <Page title="Sticky Cart Dashboard" subtitle="Monitor performance and customize your widget.">
      <BlockStack gap="600">
        
        {/* 1. STATUS BANNER (Clean & Pro) */}
        <Layout>
          <Layout.Section>
            <Banner tone="success" title="App is Active & Running">
              <p>Your Sticky Add-To-Cart bar is currently visible on your storefront. Customers can see it on all product pages.</p>
            </Banner>
          </Layout.Section>

          {/* 2. ANALYTICS CARDS (With Icons) */}
          <Layout.Section>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">Performance (Last 30 Days)</Text>
              
              <InlineGrid columns={{ xs: 1, sm: 3 }} gap="400">
                
                {/* Views Card */}
                <Card>
                  <BlockStack gap="200" align="start">
                    <InlineGrid gap="200" alignItems="center">
                      <div style={{background: '#f1f8f5', padding: '6px', borderRadius: '6px'}}>
                        <Icon source={ViewIcon} tone="base" />
                      </div>
                      <Text as="h3" variant="headingSm" tone="subdued">Total Views</Text>
                    </InlineGrid>
                    <Text as="p" variant="heading2xl">{stats.views}</Text>
                  </BlockStack>
                </Card>

                {/* Clicks Card */}
                <Card>
                  <BlockStack gap="200" align="start">
                    <InlineGrid gap="200" alignItems="center">
                      <div style={{background: '#ebf5fc', padding: '6px', borderRadius: '6px'}}>
                        <Icon source={TapSingleIcon} tone="base" />
                      </div>
                      <Text as="h3" variant="headingSm" tone="subdued">Button Clicks</Text>
                    </InlineGrid>
                    <Text as="p" variant="heading2xl">{stats.clicks}</Text>
                  </BlockStack>
                </Card>

                {/* CTR Card */}
                <Card>
                  <BlockStack gap="200" align="start">
                    <InlineGrid gap="200" alignItems="center">
                      <div style={{background: '#fff4e5', padding: '6px', borderRadius: '6px'}}>
                        <Icon source={TrendingUpIcon} tone="base" />
                      </div>
                      <Text as="h3" variant="headingSm" tone="subdued">Click Rate (CTR)</Text>
                    </InlineGrid>
                    <Text as="p" variant="heading2xl">{stats.ctr}%</Text>
                  </BlockStack>
                </Card>

              </InlineGrid>
            </BlockStack>
          </Layout.Section>

          {/* 3. MAIN ACTIONS (Hero Section) */}
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <InlineGrid columns={{ xs: "1fr", md: "2fr 1fr" }} gap="400">
                  
                  {/* Left Side: Design Controls */}
                  <BlockStack gap="400">
                    <Text as="h2" variant="headingMd">Design & Customization</Text>
                    <Text as="p" tone="subdued">
                      Change colors, gradients, fonts, and button behaviors to match your brand identity perfectly.
                    </Text>
                    <InlineGrid gap="300">
                      <Button 
                        variant="primary" 
                        size="large"
                        icon={PaintBrushIcon}
                        url={editorUrl} 
                        target="_blank"
                      >
                        Customize Look & Feel
                      </Button>
                    </InlineGrid>
                  </BlockStack>

                  {/* Right Side: Help/Support */}
                  <Box 
                    background="bg-surface-secondary" 
                    padding="400" 
                    borderRadius="200"
                  >
                    <BlockStack gap="200">
                      <InlineGrid gap="200" alignItems="center">
                        <Icon source={ChatIcon} />
                        <Text as="h3" variant="headingSm">Need Help?</Text>
                      </InlineGrid>
                      <Text as="p" variant="bodySm">
                        Having trouble? Our support team is ready to help you set up.
                      </Text>
                      <Button variant="plain" url="mailto:khfuma@gmail.com">Contact Support</Button>
                    </BlockStack>
                  </Box>

                </InlineGrid>
              </BlockStack>
            </Card>
          </Layout.Section>

        </Layout>
      </BlockStack>
    </Page>
  );
}