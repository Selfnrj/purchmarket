import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import '../styles/index.css'
import { ClickProvider } from "../contexts/click"
import Layout from "../components/layout"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <SessionProvider session={session}>
      <ClickProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ClickProvider>
    </SessionProvider>
  )
}

export default MyApp
