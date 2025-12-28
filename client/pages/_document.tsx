import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="description" content="Professional SaaS platform to protect retail investors from unnecessary losses, risky trades, and emotional mistakes." />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="RIRS - Retail Investor Risk Shield" />
        <meta property="og:description" content="Professional SaaS platform to protect retail investors from unnecessary losses, risky trades, and emotional mistakes." />
        <meta property="og:image" content="/og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RIRS - Retail Investor Risk Shield" />
        <meta name="twitter:description" content="Professional SaaS platform to protect retail investors from unnecessary losses, risky trades, and emotional mistakes." />
        <meta name="twitter:image" content="/og-image.png" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}