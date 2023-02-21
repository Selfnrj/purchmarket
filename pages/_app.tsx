import { AppProps } from "next/app";
import { Lato } from "@next/font/google";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apolloClient";
import { AuthProvider } from "../hooks/useAuth";
import Layout from "../components/layout";
import "../styles/index.css";
import { ClickProvider } from "../contexts/click";
import { Provider } from "jotai";

const lato = Lato({
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-lato",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Provider>
          <main className={`pt-20 ${lato.variable} font-sans`}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </main>
        </Provider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
