import { AppProps } from "next/app";
import { Lato } from "@next/font/google";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apolloClient";
import { AuthProvider } from "../hooks/useAuth";
import Layout from "../components/layout";
import "../styles/index.css";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

const lato = Lato({
weight: ["400", "700", "900"],
style: ["normal", "italic"],
subsets: ["latin"],
variable: "--font-lato",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <SessionProvider session={pageProps.session}>
    <ApolloProvider client={client}>
      <main className={`pt-20 ${lato.variable} font-sans`}>
        <Layout>
          {/* Google tag (gtag.js) */}
            <Script
              strategy="afterInteractive"
              src="https://www.googletagmanager.com/gtag/js?id=G-DCHPCF2P9B"
            />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());
            gtag('config', 'G-DCHPCF2P9B');
            `}
          </Script>
        <Component {...pageProps} />
        </Layout>
      </main>
    </ApolloProvider>
  </SessionProvider>
  );
}

export default MyApp;