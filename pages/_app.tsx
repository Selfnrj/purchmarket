import { AppProps } from 'next/app'
import { ClickProvider } from "../contexts/click"
import { Lato } from '@next/font/google'
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apolloClient";
import { AuthProvider } from "../hooks/useAuth";
import Layout from "../components/layout"
import '../styles/index.css'


const lato = Lato({
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-lato',
})

function MyApp({ Component, pageProps }: AppProps) {

  return (
      <ApolloProvider client={client}>
        <AuthProvider>
          <ClickProvider>
            <main className={`${lato.variable} font-sans`}>
              <Layout>
                  <Component {...pageProps} />
              </Layout>
            </main>
          </ClickProvider>
        </AuthProvider>
      </ApolloProvider>
  )
}

export default MyApp
