import { AppProps } from "next/app";
import { Lato } from "@next/font/google";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apolloClient";
import { AuthProvider } from "../hooks/useAuth";
import Layout from "../components/layout";
import "../styles/index.css";
import { useEffect } from "react";
import { initGA, logPageView } from "../lib/ga";

const lato = Lato({
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-lato",
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!(window as any).GA_INITIALIZED) {
      initGA();
      (window as any).GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <main className={`pt-20 ${lato.variable} font-sans`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
