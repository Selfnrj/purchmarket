import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome, getPrimaryMenu } from '../lib/api'
import { CMS_NAME } from '../lib/constants'
import Header from "../components/header"
import Link from "next/link"

export default function Index({ allPosts: { edges }, menuItems }) {
  const heroPost = edges[0]?.node
  const morePosts = edges.slice(2)

  return (
    <Layout>
      <Header menuItems={menuItems} />
      <Head>
        <title>Next.js Blog Example with {CMS_NAME}</title>
      </Head>
      <Container>
        {/*  <Intro /> */}
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl">Nyheter</h2>
          <Link href="/">Visa alla nyheter</Link>
        </div>
        <div className="flex">
          <div className="flex-1 mr-5">
            {heroPost && (
              <HeroPost
                title={heroPost.title}
                coverImage={heroPost.featuredImage}
                date={heroPost.date}
                author={heroPost.author}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
              />
            )}
          </div>
          <div className="flex-1">
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview)
  const menuItems = await getPrimaryMenu()

  return {
    props: { allPosts, preview, menuItems },
    revalidate: 10,
  }
}
