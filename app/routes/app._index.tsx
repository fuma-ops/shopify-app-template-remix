import { Page, Layout, Card, Text, BlockStack, Button, InlineGrid, Banner } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // 1. Get the session safely from the server
  const { session } = await authenticate.admin(request);
  
  // 2. Send the shop URL to the frontend
  return json({ shop: session.shop });
};

export default function Index() {
  const { shop } = useLoaderData<typeof loader>();
  
  // 3. Construct the URL safely using the loader data (No 'window' used here)
  const shopName = shop.replace(".myshopify.com", "");

  return (
    <Page title="Sticky Cart Dashboard">
      <BlockStack gap="500">
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
                    Your Sticky Cart widget is currently enabled on your storefront.
                  </Text>
                </BlockStack>
                
                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">Quick Actions</Text>
                  <InlineGrid gap="300">
                    <Button 
                      variant="primary" 
                      url={`https://admin.shopify.com/store/${shopName}/editor?context=apps`} 
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