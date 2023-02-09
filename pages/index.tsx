import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import { getAllAvtal, getAllPostsForHome, getStartsida } from "../lib/api";
import Link from "next/link";
import OmslagsBild from "../public/omslag.jpg";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import AvtalCard from "../components/avtal-card";
import PageCover from "../components/page-cover";
import LatestStories from "../components/latest-stories";
import AvtalList from "../components/avtal-list";

export default function Index({ allPosts, allHero, products }) {
  return (
    <>
      <Head>
        <title>Purchmarket</title>
      </Head>
      <PageCover
        rubrik={allHero?.edges[0]?.node.startsida.heroRubrik}
        text={allHero?.edges[0]?.node.startsida.heroText}
        bild={allHero?.edges[0]?.node.startsida.heroBild.sourceUrl}
      />
      <Container>
        <LatestStories allPosts={allPosts} />
      </Container>
      <Link href="/omoss">
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
            <Link
              href="/omoss"
              className="flex items-center font-bold text-white"
            >
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
      </Link>
      <Container>
        <AvtalList rubrik="Inköpsavtal" products={products} />
      </Container>
      <Link href="/rapporter">
        <div className="flex w-full items-center bg-[#DFEDFF] py-16">
          <div className="container mx-auto px-5">
            <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
              <div>
                <h1 className="mb-8 max-w-lg text-5xl font-black leading-tight">
                  Alla dina rapporterer samlade på en sida
                </h1>
                <p className="mb-8 text-xl leading-8">
                  A wonderful serenity has taken possession of my entire soul.
                </p>
                <Link href="/rapporter" className="flex items-center font-bold">
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
      </Link>
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
