import { Page, Layout, Card, Text, BlockStack, Button, InlineGrid } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export const loader = async ({ request }: any) => {
  await authenticate.admin(request);
  return json({});
};

export default function Index() {
  return (
    <Page title="Sticky Cart Dashboard">
      <BlockStack gap="500">
        
        {/* Success Message */}
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  🎉 Thank you for installing Sticky Card Clean!
                </Text>
                <Text as="p">
                  Your sticky add-to-cart bar is active and ready to boost your sales.
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Main Status Card */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">App Status</Text>
                <div style={{ padding: "10px", background: "#e3fcf0", borderRadius: "5px", color: "#006d45" }}>
                  <strong>✅ Active & Running</strong>
                </div>
                <Text as="p">Your Sticky Cart widget is currently enabled on your storefront.</Text>
                
                <Text as="h3" variant="headingSm">Quick Actions</Text>
                <InlineGrid columns={2} gap="400">
                  <Button variant="primary" url={`https://admin.shopify.com/store/${window.shopify?.config?.shop?.split('.')[0]}/editor?context=apps`}>
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