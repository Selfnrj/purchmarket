import { GetStaticProps } from "next"
import Link from "next/link"
import React from 'react'
import Container from "../../components/container"
import Header from "../../components/header"
import Layout from "../../components/layout"
import PostPreview from "../../components/post-preview"
import { getAllPostsForHome } from "../../lib/api"
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'



export default function Nyheter({ allPosts }) {
  const totalCount = allPosts.edges.length

  return (
    <Layout>
      <Header />
      <Container>
        <div className="mt-12 mb-8">
          <h1 className="text-7xl font-bold">Nyheter</h1>
          <p className="font-semibold leading-8">Här finns våra pressmeddelanden och andra nyheter.</p>
        </div>
        <Tab.Group>
          <div className="flex items-center justify-between border border-transparent border-b-gray-300 mb-4">
            <Tab.List>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`uppercase font-semibold p-4 outline-0 ${selected ? 'border-b-4 border-b-gray-900' : ''}`}
                  >
                    Alla
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`uppercase font-semibold p-4 outline-0 ${selected ? 'border-b-4 border-b-gray-900' : ''}`}
                  >
                    Nyhet
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`uppercase font-semibold p-4 outline-0 ${selected ? 'border-b-4 border-b-gray-900' : ''}`}
                  >
                    Press
                  </button>
                )}
              </Tab>
            </Tab.List>
            <p>Totalt: {totalCount} nyheter </p>
          </div>
          
          <Tab.Panels>
            <Tab.Panel>
              {allPosts.edges.map(({ node }) => (
                <PostPreview
                  key={node.slug}
                  title={node.title}
                  coverImage={node.featuredImage}
                  date={node.date}
                  author={node.author}
                  slug={node.slug}
                  excerpt={node.excerpt}
                  category={node.categories.edges[0].node.name}
                />
              ))}
            </Tab.Panel>
            <Tab.Panel>
              {allPosts.edges.filter(item => item.node.categories?.edges[0].node.name === "Nyhet").map(({ node }) => (
                <PostPreview
                  key={node.slug}
                  title={node.title}
                  coverImage={node.featuredImage}
                  date={node.date}
                  author={node.author}
                  slug={node.slug}
                  excerpt={node.excerpt}
                  category={node.categories.edges[0].node.name}
                />
              ))}
            </Tab.Panel>
            <Tab.Panel>
              {allPosts.edges.filter(item => item.node.categories?.edges[0].node.name === "Press").map(({ node }) => (
                <PostPreview
                  key={node.slug}
                  title={node.title}
                  coverImage={node.featuredImage}
                  date={node.date}
                  author={node.author}
                  slug={node.slug}
                  excerpt={node.excerpt}
                  category={node.categories.edges[0].node.name}
                />
              ))}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview)

  return {
    props: { allPosts, preview },
    revalidate: 10,
  }
}