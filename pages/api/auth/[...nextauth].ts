import NextAuth from "next-auth"
import WordpressProvider from "next-auth/providers/wordpress"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    WordpressProvider({
      clientId: process.env.WORDPRESS_CLIENT_ID,
      clientSecret: process.env.WORDPRESS_CLIENT_SECRET
    }),
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)