import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import { getAllAvtal, getAllPostsForHome, getStartsida } from '../lib/api'
import Link from "next/link"
import arrowRight from '../public/arrow-right.svg'
import OmslagsBild from '../public/omslag.jpg'
import Image from "next/image"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import AvtalCard from "../components/avtal-card"

export default function Index({ allPosts: { edges }, allHero, allAvtal }) {
  const heroPost = edges[0]?.node
  const morePosts = edges.slice(1)

  return (
    <>
      <Head>
        <title>Purchmarket</title>
      </Head>
      <div className="relative wp-block-cover w-full flex items-center">
        <div className="absolute h-full w-full bg-black bg-opacity-50 z-40" />
        <div className="text-white z-40 relative container mx-auto px-5">
            <h1 className="max-w-2xl leading-tight mb-8 text-7xl font-black">{allHero?.edges[0]?.node.startsida.heroRubrik}</h1>
            <p className="max-w-lg text-xl leading-8">{allHero?.edges[0]?.node.startsida.heroText}</p>
        </div>
        <Image 
          fill
          className="object-cover"
          alt="header bild"
          src={`https://purchwp.azurewebsites.net/${allHero?.edges[0]?.node.startsida.heroBild.sourceUrl}`} />
      </div>
      <Container>
        <section className="my-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-6xl font-black">Nyheter</h1>
            <Link href="/nyheter" className="flex items-center font-bold text-[#17375E]">
              Visa alla nyheter
              <Image 
                width={40}
                height={14}
                className="ml-4"
                alt="arrow right"
                src={arrowRight} />
            </Link>
          </div>
          <div className="sm:flex">
            <div className="sm:flex-1 mr-5">
              {heroPost && (
                <HeroPost
                  title={heroPost.title}
                  coverImage={heroPost.featuredImage}
                  date={heroPost.date}
                  author={heroPost.author}
                  slug={heroPost.slug}
                  excerpt={heroPost.excerpt}
                  category={heroPost.categories.edges[0].node.name}
                />
              )}
            </div>
            <div className="sm:flex-1">
              {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </div>
          </div>
        </section>
      </Container>
      <div className="relative wp-block-cover w-full flex items-center">
        <div className="absolute h-full w-full bg-black bg-opacity-50 z-40" />
        <div className="text-white z-40 relative container mx-auto px-5">
          <h1 className="max-w-2xl leading-tight mb-8 text-5xl font-black">Vi skapar en bättre vård och omsorg</h1>
          <p className="max-w-lg mb-8 text-xl leading-8">Purch är en inköpsorganisation, specialiserad på vård och omsorg, som arbetar i nära samarbete med kunder och medlemmar.</p>
          <Link href="/" className="flex items-center font-bold text-white">
            Om oss
            <ArrowRightIcon className="h-6 w-6 ml-2 text-white"/>
          </Link>
        </div>
        <Image 
          fill
          placeholder="blur"
          className="object-cover"
          alt="header bild"
          src={OmslagsBild} />
      </div>
      <Container>
        <div className="bg-[#FFDCB8] my-16 px-16 py-10 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="leading-tight mb-2 text-4xl font-black">Inköpsavtal</h1>
            <Link href="/avtal" className="flex items-center font-bold text-[#17375E]">
              Visa alla avtal
              <ArrowRightIcon className="h-6 w-6 ml-2 text-[#17375E]"/>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {allAvtal.edges.filter(item => item.node.tags.edges[0]?.node.name === undefined).map((item) => (
              <AvtalCard 
                className="bg-white shadow-lg"
                key={item.node.id}
                title={item.node.title}
                excerpt={item.node.excerpt}
                slug={item.node.slug}
                categories={item.node.categories}
                item={item}
                sourceUrl={`https://purchwp.azurewebsites.net/${item.node.featuredImage?.node.sourceUrl}`}
              />
            ))}
          </div>
          
        </div>
      </Container>
      <div className="wp-block-cover w-full flex items-center bg-[#DFEDFF]">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="max-w-lg leading-tight mb-8 text-5xl font-black">Alla dina rapporterer samlade på en sida</h1>
              <p className="mb-8 text-xl leading-8">A wonderful serenity has taken possession of my entire soul.</p>
              <Link href="/rapporter" className="flex items-center font-bold">
                Rapporter
                <ArrowRightIcon className="h-6 w-6 ml-2 text-[#17375E]"/>
              </Link>
            </div>
            <div>
              <Image 
                width={800}
                height={800}
                placeholder="blur"
                className="object-cover rounded-xl"
                alt="header bild"
                src={OmslagsBild} 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview)
  const allHero = await getStartsida()
  const allAvtal = await getAllAvtal()

  return {
    props: { allPosts, allHero, allAvtal, preview },
    revalidate: 10,
  }
}
