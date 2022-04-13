import Document, { Html, Head, Main, NextScript } from "next/document";

const org = {
  "@context": "http://schema.org",
  "@type": "Organization",
  name: "GeatStore",
  url: "https://geatstore.com/",
  logo: "https://geatstore.com/social.png", // add to server later
  sameAs: [
    "https://twitter.com/geatstore",
    "https://www.instagram.com/geatstore",
    "https://www.facebook.com/geatstore",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "support@geatstore.com",
      contactType: "customer support",
      url: "https://geatstore.com/",
    },
  ],
};

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="format-detection" content="telephone=no" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
