import NextAuth from "next-auth"
import WordpressProvider from "next-auth/providers/wordpress"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    WordpressProvider({
      clientId: process.env.WORDPRESS_CLIENT_ID,
      clientSecret: process.env.WORDPRESS_CLIENT_SECRET,
      token: {
        url: 'https://public-api.wordpress.com/oauth2/token',
        async request(context) {
          const { provider, params: parameters, checks, client } = context
          const { callbackUrl } = provider

          const tokenset = await client.grant({
            grant_type: 'authorization_code',
            code: parameters.code,
            redirect_uri: callbackUrl,
            code_verifier: checks.code_verifier,
            client_id: process.env.WORDPRESS_CLIENT_ID,
            client_secret: process.env.WORDPRESS_CLIENT_SECRET,
          })
          return { tokens: tokenset }
        },
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET!,
}
export default NextAuth(authOptions)