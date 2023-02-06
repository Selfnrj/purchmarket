import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import { getAllAvtal, getAllPostsForHome, getStartsida } from "../lib/api";
import Link from "next/link";
import arrowRight from "../public/arrow-right.svg";
import OmslagsBild from "../public/omslag.jpg";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import AvtalCard from "../components/avtal-card";

export default function Index({ allPosts: { edges }, allHero, products }) {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1);

  return (
    <>
      <Head>
        <title>Purchmarket</title>
      </Head>
      <div className="wp-block-cover relative flex w-full items-center">
        <div className="absolute z-40 h-full w-full bg-black bg-opacity-50" />
        <div className="container relative z-40 mx-auto px-8 text-white">
          <h1 className="mb-8 max-w-2xl text-7xl font-black leading-tight">
            {allHero?.edges[0]?.node.startsida.heroRubrik}
          </h1>
          <p className="max-w-lg text-xl leading-8">
            {allHero?.edges[0]?.node.startsida.heroText}
          </p>
        </div>
        <Image
          fill
          className="object-cover"
          alt="header bild"
          src={allHero?.edges[0]?.node.startsida.heroBild.sourceUrl}
        />
      </div>
      <Container>
        <section className="my-12">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-6xl font-black">Nyheter</h1>
            <Link
              href="/nyheter"
              className="flex items-center font-bold text-[#17375E]"
            >
              Visa alla nyheter
              <Image
                width={40}
                height={14}
                className="ml-4"
                alt="arrow right"
                src={arrowRight}
              />
            </Link>
          </div>
          <div className="sm:flex">
            <div className="mr-5 sm:flex-1">
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
      <div className="wp-block-cover relative flex w-full items-center">
        <div className="absolute z-40 h-full w-full bg-black bg-opacity-50" />
        <div className="container relative z-40 mx-auto px-5 text-white">
          <h1 className="mb-8 max-w-2xl text-5xl font-black leading-tight">
            Vi skapar en bättre vård och omsorg
          </h1>
          <p className="mb-8 max-w-lg text-xl leading-8">
            Purch är en inköpsorganisation, specialiserad på vård och omsorg,
            som arbetar i nära samarbete med kunder och medlemmar.
          </p>
          <Link href="/" className="flex items-center font-bold text-white">
            Om oss
            <ArrowRightIcon className="ml-2 h-6 w-6 text-white" />
          </Link>
        </div>
        <Image
          fill
          placeholder="blur"
          className="object-cover"
          alt="header bild"
          src={OmslagsBild}
        />
      </div>
      <Container>
        <div className="my-16 rounded-3xl bg-[#FFDCB8] px-16 py-10">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="mb-2 text-4xl font-black leading-tight">
              Inköpsavtal
            </h1>
            <Link
              href="/avtal"
              className="flex items-center font-bold text-[#17375E]"
            >
              Visa alla avtal
              <ArrowRightIcon className="ml-2 h-6 w-6 text-[#17375E]" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {products.edges
              /* .filter((item) => item.node.avtalstyp.valjkund === "Alla") */
              .slice(0, 2)
              .map((item) => (
                <AvtalCard
                  className="bg-white shadow-lg"
                  key={item.node.id}
                  productId={item.node.productId}
                  title={item.node.title}
                  excerpt={item.node.excerpt}
                  slug={item.node.slug}
                  categories={item.node.productCategories}
                  sourceUrl={item.node.featuredImage?.node.sourceUrl}
                />
              ))}
          </div>
        </div>
      </Container>
      <div className="wp-block-cover flex w-full items-center bg-[#DFEDFF]">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-2 items-center gap-8">
            <div>
              <h1 className="mb-8 max-w-lg text-5xl font-black leading-tight">
                Alla dina rapporterer samlade på en sida
              </h1>
              <p className="mb-8 text-xl leading-8">
                A wonderful serenity has taken possession of my entire soul.
              </p>
              <Link href="/login" className="flex items-center font-bold">
                Rapporter
                <ArrowRightIcon className="ml-2 h-6 w-6 text-[#17375E]" />
              </Link>
            </div>
            <div>
              <Image
                width={800}
                height={800}
                placeholder="blur"
                className="rounded-xl object-cover"
                alt="header bild"
                src={OmslagsBild}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);
  const allHero = await getStartsida();
  const products = await getAllAvtal();

  return {
    props: { allPosts, allHero, products, preview },
    revalidate: 10,
  };
};
