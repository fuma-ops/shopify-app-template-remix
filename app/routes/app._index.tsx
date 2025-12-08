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
import { authenticate } from "../shopify.server";

// 1. The Loader MUST be outside the component
// This gets the current shop URL (e.g., zsolutions-billing-clean.myshopify.com)
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  return json({ shop: session.shop });
};

export default function Index() {
  // 2. Get the shop data from the loader
  const { shop } = useLoaderData<typeof loader>();

  // 3. Create the dynamic URL
  // This URL works for ANY store. It redirects to the Theme Editor -> App Embeds tab.
  const themeEditorUrl = `https://${shop}/admin/themes/current/editor?context=apps`;

  return (
    <Page>
      <TitleBar title="Sticky Cart Dashboard" />
      
      <BlockStack gap="500">
        <Layout>
          {/* MAIN SECTION - Left Side */}
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    App Status
                  </Text>
                  <Banner tone="success">
                    <Text as="p" fontWeight="bold">Active & Running</Text>
                  </Banner>
                  <Text as="p" variant="bodyMd">
                    Your Sticky Cart widget is currently enabled on your storefront. Customers can see the floating bar on product pages.
                  </Text>
                </BlockStack>
                
                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">Quick Actions</Text>
                  <InlineStack gap="300">
                    {/* 4. Use the dynamic URL here */}
                    <Button
                      variant="primary"
                      url={themeEditorUrl}
                      target="_blank"
                    >
                      Open Theme Editor (Customize Color)
                    </Button>
                  </InlineStack>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* SIDEBAR SECTION - Right Side */}
          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              
              {/* BILLING CARD */}
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Your Plan
                  </Text>
                  <div style={{background: '#e3f2fd', padding: '10px', borderRadius: '5px', color: '#0d47a1', fontWeight: 'bold', textAlign: 'center'}}>
                    FREE TIER
                  </div>
                  <Text as="p" variant="bodySm">
                    Upgrade to Pro to remove branding and unlock analytics.
                  </Text>
                  
                  <Button 
                    url="/app/upgrade" 
                    fullWidth 
                    variant="primary" 
                    tone="critical"
                  >
                    Upgrade to Pro ($4.99/mo)
                  </Button>

                </BlockStack>
              </Card>

              {/* SUPPORT CARD */}
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Need Help?
                  </Text>
                  <List>
                    <List.Item>
                      <Link url="mailto:support@zsolutions.ma">Contact Support</Link>
                    </List.Item>
                    <List.Item>
                      <Link url="#">Read Setup Guide</Link>
                    </List.Item>
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