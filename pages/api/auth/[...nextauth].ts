import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { gql } from "@apollo/client";
import { client } from "../../../lib/apolloClient";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "wp-graphql",
      name: "WPGraphQL",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await client.mutate({
            mutation: gql`
              mutation Login($email: String!, $password: String!) {
                login(input: { username: $email, password: $password }) {
                  authToken
                  refreshToken
                }
              }
            `,
            variables: {
              email: credentials.email,
              password: credentials.password,
            },
          });

          const user = {
            name: data.login.refreshToken,
            email: credentials.email,
          };

          return user as any;
        } catch (error) {
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
