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

export default function Index() {
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
                    <Button
                      onClick={() => window.open('https://admin.shopify.com/store/zsolutions-test-1/themes/current/editor?context=apps', '_blank')}
                      variant="primary"
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
                  
                  {/* 👇 FIXED BUTTON IS HERE */}
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