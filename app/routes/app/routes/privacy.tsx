import { Page, Layout, Card, Text, BlockStack } from "@shopify/polaris";

export default function Privacy() {
  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Privacy Policy for Sticky Card Clean</h1>
      <p><strong>Last Updated:</strong> December 8, 2025</p>

      <h2>1. Introduction</h2>
      <p>Sticky Card Clean ("we", "our", or "us") provides a Shopify App that adds a sticky add-to-cart button to merchant stores. We value your privacy and are committed to protecting your personal information.</p>

      <h2>2. Data We Collect</h2>
      <p>When you install the App, we are automatically able to access certain types of information from your Shopify account:</p>
      <ul>
        <li><strong>Shop Information:</strong> Your shop's domain (`.myshopify.com`) to identify your account.</li>
        <li><strong>Analytics Data:</strong> We track anonymous views and clicks on the sticky button to provide you with performance statistics. We do not track individual customer identities.</li>
      </ul>

      <h2>3. How We Use Your Data</h2>
      <p>We use the collected data solely to:</p>
      <ul>
        <li>Provide the App's functionality (showing the widget).</li>
        <li>Process billing and subscription payments via Shopify.</li>
        <li>Display analytics on your dashboard.</li>
      </ul>

      <h2>4. Data Sharing</h2>
      <p>We do not sell, trade, or otherwise transfer your data to outside parties.</p>

      <h2>5. Contact Us</h2>
      <p>For more information about our privacy practices, please contact us at: <strong>support@zsolutions.ma</strong></p>
    </div>
  );
}