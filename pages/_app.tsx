import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import '../styles/index.css'
import { ClickProvider } from "../contexts/click"
import Layout from "../components/layout"
import { Lato } from '@next/font/google'

const lato = Lato({
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-lato',
})

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <SessionProvider session={session}>
      <ClickProvider>
        <main className={`${lato.variable} font-sans`}>
          <Layout>
              <Component {...pageProps} />
          </Layout>
        </main>
      </ClickProvider>
    </SessionProvider>
  )
}

export default MyApp
